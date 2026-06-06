"""Email notifications via Resend (non-blocking)."""
import os
import asyncio
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)


def _build_inquiry_html(inquiry: Dict[str, Any]) -> str:
    items = inquiry.get("items", []) or []
    rows = "".join(
        f"<tr><td style='padding:8px;border-bottom:1px solid #eee;'>{i.get('quantity', 1)}×</td>"
        f"<td style='padding:8px;border-bottom:1px solid #eee;'>{i.get('name', '')}</td></tr>"
        for i in items
    ) or "<tr><td colspan='2' style='padding:8px;color:#888;'>(keine Produkte ausgewählt)</td></tr>"

    msg = (inquiry.get("message") or "").replace("\n", "<br>") or "<i>(keine Nachricht)</i>"

    return f"""
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0B1736;">
      <div style="background:#0B1736;color:#fff;padding:24px;">
        <h2 style="margin:0;font-weight:300;letter-spacing:1px;">Neue Kundenanfrage</h2>
        <div style="font-size:12px;opacity:0.7;margin-top:6px;">ECO Building Technik — eco-building.tech</div>
      </div>
      <div style="padding:24px;background:#fff;border:1px solid #eee;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#666;width:140px;">Name</td><td><b>{inquiry.get('customer_name','')}</b></td></tr>
          <tr><td style="padding:6px 0;color:#666;">E-Mail</td><td><a href="mailto:{inquiry.get('email','')}">{inquiry.get('email','')}</a></td></tr>
          <tr><td style="padding:6px 0;color:#666;">Telefon</td><td>{inquiry.get('phone','') or '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Firma</td><td>{inquiry.get('company','') or '—'}</td></tr>
        </table>
        <h3 style="margin-top:24px;font-weight:500;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#666;">Nachricht</h3>
        <div style="padding:12px;background:#f7f7f7;font-size:14px;line-height:1.6;">{msg}</div>
        <h3 style="margin-top:24px;font-weight:500;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#666;">Produkte</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #eee;">{rows}</table>
        <p style="margin-top:24px;font-size:12px;color:#888;">Anfrage-ID: {inquiry.get('id','')}<br>Eingegangen: {inquiry.get('created_at','')}</p>
      </div>
    </div>
    """


async def send_inquiry_email(inquiry: Dict[str, Any]) -> None:
    """Fire-and-forget email. Logs errors but never raises (must not block inquiry creation)."""
    api_key = os.environ.get("RESEND_API_KEY", "").strip()
    recipient = os.environ.get("NOTIFY_EMAIL", "").strip()
    sender = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev").strip()

    if not api_key:
        logger.info("RESEND_API_KEY not set — skipping email notification")
        return
    if not recipient:
        logger.warning("NOTIFY_EMAIL not set — skipping email notification")
        return

    try:
        import resend
        resend.api_key = api_key
        params = {
            "from": sender,
            "to": [recipient],
            "reply_to": [inquiry.get("email")] if inquiry.get("email") else None,
            "subject": f"Neue Anfrage von {inquiry.get('customer_name','Kunde')} — ECO Building Technik",
            "html": _build_inquiry_html(inquiry),
        }
        # remove None values
        params = {k: v for k, v in params.items() if v is not None}
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Inquiry email sent: id={result.get('id') if isinstance(result, dict) else result}")
    except Exception as e:
        logger.error(f"Failed to send inquiry email: {e}")
