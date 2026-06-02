import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const KEY = "ecobt_cookie_ack_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ack = localStorage.getItem(KEY);
    if (!ack) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-[55] w-[calc(100%-3rem)] sm:w-[400px] bg-[#0E1A3E] border border-white/15 p-6 shadow-2xl"
      data-testid="cookie-banner"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="eyebrow">Cookies</div>
        <button onClick={accept} className="text-white/40 hover:text-white" data-testid="cookie-close" aria-label="Schließen">
          <X size={14}/>
        </button>
      </div>
      <div className="font-display text-base mb-3">Diese Website verwendet Cookies.</div>
      <p className="text-xs text-white/60 leading-relaxed mb-5">
        Wir nutzen ausschließlich technisch notwendige Cookies (Session, Sprach-Präferenz).
        Keine Tracker, kein Drittanbieter-Marketing.
      </p>
      <div className="flex items-center gap-4">
        <button onClick={accept} className="btn-primary !py-3 !px-5 text-[11px]" data-testid="cookie-accept">
          Verstanden
        </button>
        <button onClick={accept} className="text-[11px] tracking-[0.12em] uppercase text-white/60 hover:text-white" data-testid="cookie-readmore">
          Datenschutz lesen
        </button>
      </div>
    </div>
  );
}
