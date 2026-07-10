import React from "react";
import { Link } from "react-router-dom";
import { XCircle, ArrowRight } from "lucide-react";
import { useLang } from "../context/I18nContext";

export default function CheckoutCancel() {
  const { t } = useLang();
  return (
    <div className="pt-32 pb-20 min-h-screen" data-testid="checkout-cancel-page">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <XCircle size={56} className="mx-auto text-white/40" />
        <h1 className="font-display text-4xl md:text-5xl mt-8">{t("co.cancel.h1")} <span className="italic-accent">{t("co.cancel.italic")}</span></h1>
        <p className="mt-4 text-white/65">{t("co.cancel.sub")}</p>
        <div className="mt-10 flex gap-3 justify-center">
          <Link to="/shop" className="btn-ghost">{t("co.toShop")}</Link>
          <Link to="/kontakt" className="btn-primary">{t("co.requestConsult")} <ArrowRight size={14}/></Link>
        </div>
      </div>
    </div>
  );
}
