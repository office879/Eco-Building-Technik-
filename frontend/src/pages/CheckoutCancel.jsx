import React from "react";
import { Link } from "react-router-dom";
import { XCircle, ArrowRight } from "lucide-react";

export default function CheckoutCancel() {
  return (
    <div className="pt-32 pb-20 min-h-screen" data-testid="checkout-cancel-page">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <XCircle size={56} className="mx-auto text-white/40" />
        <h1 className="font-display text-4xl md:text-5xl mt-8">Zahlung <span className="italic-accent">abgebrochen.</span></h1>
        <p className="mt-4 text-white/65">Keine Sorge — dein Warenkorb ist noch da. Du kannst die Bestellung jederzeit fortsetzen.</p>
        <div className="mt-10 flex gap-3 justify-center">
          <Link to="/shop" className="btn-ghost">Zum Shop</Link>
          <Link to="/kontakt" className="btn-primary">Beratung anfragen <ArrowRight size={14}/></Link>
        </div>
      </div>
    </div>
  );
}
