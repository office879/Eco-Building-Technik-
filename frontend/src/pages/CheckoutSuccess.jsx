import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/I18nContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const MAX_POLLS = 8;
const POLL_INTERVAL = 2500;

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState({ status: "polling", data: null, error: null });
  const { clear } = useCart();
  const { t } = useLang();

  useEffect(() => {
    if (!sessionId) {
      setState({ status: "error", error: t("co.error.noSession") });
      return;
    }
    let attempts = 0;
    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;
      attempts++;
      try {
        const { data } = await axios.get(`${API}/checkout/status/${sessionId}`);
        if (data.payment_status === "paid") {
          setState({ status: "paid", data });
          clear();
          return;
        }
        if (data.status === "expired") {
          setState({ status: "expired", data });
          return;
        }
        if (attempts >= MAX_POLLS) {
          setState({ status: "timeout", data });
          return;
        }
        setTimeout(poll, POLL_INTERVAL);
      } catch (e) {
        setState({ status: "error", error: e?.response?.data?.detail || t("co.error.statusFail") });
      }
    };
    poll();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="pt-32 pb-20 min-h-screen" data-testid="checkout-success-page">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {state.status === "polling" && (
          <>
            <Clock size={56} className="mx-auto text-cyan-300 animate-pulse" />
            <h1 className="font-display text-4xl md:text-5xl mt-8">{t("co.checking.h1")} <span className="italic-accent">{t("co.checking.italic")}</span></h1>
            <p className="mt-4 text-white/60 text-sm">{t("co.checking.sub")}</p>
          </>
        )}
        {state.status === "paid" && (
          <>
            <CheckCircle2 size={64} className="mx-auto text-emerald-400" />
            <h1 className="font-display text-4xl md:text-5xl mt-8" data-testid="payment-success">{t("co.paid.h1")} <span className="italic-accent">{t("co.paid.italic")}</span></h1>
            <p className="mt-4 text-white/65">{t("co.paid.sub")}</p>
            {state.data?.transaction && (
              <div className="mt-8 border border-white/10 p-6 text-left text-sm" data-testid="order-summary">
                <div className="eyebrow mb-3">{t("co.summary")}</div>
                <div className="flex justify-between text-white/70 py-1"><span>{t("co.net")}</span><span>€ {state.data.transaction.net_total_eur?.toFixed(2)}</span></div>
                <div className="flex justify-between text-white/70 py-1"><span>{t("co.vat")}</span><span>€ {state.data.transaction.vat_eur?.toFixed(2)}</span></div>
                <div className="flex justify-between text-white pt-2 border-t border-white/10 font-medium"><span>{t("co.total")}</span><span>€ {state.data.transaction.gross_total_eur?.toFixed(2)}</span></div>
              </div>
            )}
            <Link to="/shop" className="btn-primary mt-10 inline-flex" data-testid="back-to-shop">{t("co.continueShop")} <ArrowRight size={14}/></Link>
          </>
        )}
        {state.status === "expired" && (
          <>
            <AlertCircle size={56} className="mx-auto text-amber-400" />
            <h1 className="font-display text-4xl mt-8">{t("co.expired.h1")} <span className="italic-accent">{t("co.expired.italic")}</span></h1>
            <p className="mt-4 text-white/65">{t("co.expired.sub")}</p>
            <Link to="/shop" className="btn-ghost mt-8 inline-flex">{t("co.backShop")}</Link>
          </>
        )}
        {state.status === "timeout" && (
          <>
            <Clock size={56} className="mx-auto text-white/40" />
            <h1 className="font-display text-4xl mt-8">{t("co.timeout.h1")}</h1>
            <p className="mt-4 text-white/65">{t("co.timeout.sub")}</p>
            <Link to="/kontakt" className="btn-ghost mt-8 inline-flex">{t("co.contact")}</Link>
          </>
        )}
        {state.status === "error" && (
          <>
            <AlertCircle size={56} className="mx-auto text-red-400" />
            <h1 className="font-display text-4xl mt-8">{t("co.error.h1")}</h1>
            <p className="mt-4 text-white/65">{state.error}</p>
            <Link to="/shop" className="btn-ghost mt-8 inline-flex">{t("co.backShop")}</Link>
          </>
        )}
      </div>
    </div>
  );
}
