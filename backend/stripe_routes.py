"""Stripe Checkout integration for ECO Building Technik.
Server-side price calculation (Netto + 20% MwSt.), payment_transactions tracking, polling support.
"""
import os
import logging
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

router = APIRouter()

VAT_RATE = 0.20  # 20% Austrian MwSt.


class CartItem(BaseModel):
    slug: str
    quantity: int = 1


class CheckoutRequest(BaseModel):
    items: List[CartItem]
    origin_url: str
    customer_email: Optional[str] = None


def init_stripe_routes(db):
    """Wire the Stripe routes with the db dependency."""
    from emergentintegrations.payments.stripe.checkout import (
        StripeCheckout, CheckoutSessionRequest,
    )

    def _stripe_key():
        k = os.environ.get("STRIPE_API_KEY")
        if not k:
            raise HTTPException(500, "Stripe nicht konfiguriert")
        return k

    @router.post("/checkout/session")
    async def create_checkout_session(data: CheckoutRequest, request: Request):
        if not data.items:
            raise HTTPException(400, "Warenkorb ist leer")

        # Resolve products + compute total SERVER-SIDE (security: never trust client)
        slugs = [i.slug for i in data.items]
        prods = await db.products.find({"slug": {"$in": slugs}}, {"_id": 0}).to_list(100)
        slug2 = {p["slug"]: p for p in prods}

        line_items_meta = []
        net_total = 0.0
        for it in data.items:
            p = slug2.get(it.slug)
            if not p:
                raise HTTPException(400, f"Produkt nicht gefunden: {it.slug}")
            price_from = p.get("price_from")
            if not price_from or price_from <= 0:
                raise HTTPException(400, f"Produkt '{p['name']}' ist nur auf Anfrage — Online-Bestellung nicht möglich")
            net_total += float(price_from) * max(1, it.quantity)
            line_items_meta.append({"slug": it.slug, "name": p["name"], "qty": it.quantity, "net_unit": float(price_from)})

        if net_total <= 0:
            raise HTTPException(400, "Gesamtbetrag muss > 0 sein")

        gross_total = round(net_total * (1 + VAT_RATE), 2)

        # URLs
        origin = data.origin_url.rstrip("/")
        success_url = f"{origin}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{origin}/checkout/cancel"

        # Stripe
        webhook_url = f"{str(request.base_url).rstrip('/')}/api/webhook/stripe"
        sc = StripeCheckout(api_key=_stripe_key(), webhook_url=webhook_url)
        req_obj = CheckoutSessionRequest(
            amount=float(gross_total),
            currency="eur",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "net_total": f"{net_total:.2f}",
                "vat_rate": f"{VAT_RATE:.2f}",
                "items_count": str(len(line_items_meta)),
                "customer_email": data.customer_email or "",
            },
        )
        try:
            session = await sc.create_checkout_session(req_obj)
        except Exception as e:
            logger.error(f"Stripe error: {e}")
            raise HTTPException(502, f"Stripe-Fehler: {e}")

        # Persist transaction (pending) BEFORE redirect
        tx = {
            "session_id": session.session_id,
            "status": "initiated",
            "payment_status": "pending",
            "net_total_eur": round(net_total, 2),
            "vat_eur": round(gross_total - net_total, 2),
            "gross_total_eur": gross_total,
            "currency": "EUR",
            "items": line_items_meta,
            "customer_email": data.customer_email,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.payment_transactions.insert_one(tx)
        logger.info(f"Checkout session created: {session.session_id} (gross €{gross_total})")

        return {"url": session.url, "session_id": session.session_id}

    @router.get("/checkout/status/{session_id}")
    async def checkout_status(session_id: str, request: Request):
        webhook_url = f"{str(request.base_url).rstrip('/')}/api/webhook/stripe"
        sc = StripeCheckout(api_key=_stripe_key(), webhook_url=webhook_url)
        tx = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})

        try:
            status = await sc.get_checkout_status(session_id)
        except Exception as e:
            logger.warning(f"Stripe status lookup failed for {session_id}: {e}")
            # Fall back to DB-only state (graceful degradation)
            if not tx:
                raise HTTPException(404, "Transaktion nicht gefunden")
            return {
                "status": tx.get("status", "unknown"),
                "payment_status": tx.get("payment_status", "pending"),
                "amount_total_cents": int(round(tx.get("gross_total_eur", 0) * 100)),
                "currency": tx.get("currency", "EUR"),
                "metadata": {},
                "transaction": tx,
                "stripe_error": str(e),
            }

        # Idempotent update: only update if status changed and not already paid
        if tx and tx.get("payment_status") != "paid":
            new_payment_status = status.payment_status
            update = {
                "status": status.status,
                "payment_status": new_payment_status,
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }
            await db.payment_transactions.update_one({"session_id": session_id}, {"$set": update})
            tx = {**(tx or {}), **update}

        return {
            "status": status.status,
            "payment_status": status.payment_status,
            "amount_total_cents": status.amount_total,
            "currency": status.currency,
            "metadata": status.metadata,
            "transaction": tx,
        }

    @router.post("/webhook/stripe")
    async def stripe_webhook(request: Request):
        body = await request.body()
        sig = request.headers.get("Stripe-Signature", "")
        sc = StripeCheckout(api_key=_stripe_key(), webhook_url="")
        try:
            wh = await sc.handle_webhook(body, sig)
        except Exception as e:
            logger.error(f"Webhook error: {e}")
            raise HTTPException(400, "Invalid webhook")

        if wh.session_id:
            tx = await db.payment_transactions.find_one({"session_id": wh.session_id})
            if tx and tx.get("payment_status") != "paid":
                await db.payment_transactions.update_one(
                    {"session_id": wh.session_id},
                    {"$set": {
                        "payment_status": wh.payment_status,
                        "webhook_event": wh.event_type,
                        "webhook_at": datetime.now(timezone.utc).isoformat(),
                    }},
                )
        return {"ok": True}

    return router
