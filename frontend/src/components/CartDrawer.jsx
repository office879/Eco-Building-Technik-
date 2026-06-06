import React, { useState } from "react";
import axios from "axios";
import { X, Trash2, Minus, Plus, ArrowRight, CheckCircle2, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { submitInquiry } from "../lib/api";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, clear, count } = useCart();
  const [step, setStep] = useState("cart");
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "", company: "", message: "" });
  const [sending, setSending] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  // Compute net total from items that have price_from
  const lineTotals = items.map((i) => ({
    ...i,
    netUnit: typeof i.price_from === "number" ? i.price_from : null,
    netLine: typeof i.price_from === "number" ? i.price_from * i.quantity : null,
  }));
  const netTotal = lineTotals.reduce((s, l) => s + (l.netLine || 0), 0);
  const vat = netTotal * 0.2;
  const gross = netTotal + vat;
  const allHavePrice = items.length > 0 && lineTotals.every((l) => l.netUnit != null && l.netUnit > 0);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => setStep("cart"), 300);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitInquiry({
        ...form,
        items: items.map(i => ({ product_id: i.product_id, name: i.name, quantity: i.quantity })),
      });
      setStep("success");
      clear();
      toast.success("Anfrage erfolgreich gesendet");
    } catch {
      toast.error("Fehler beim Senden. Bitte erneut versuchen.");
    } finally {
      setSending(false);
    }
  };

  const handleStripeCheckout = async () => {
    if (!allHavePrice) {
      toast.error("Mindestens ein Artikel ist nur auf Anfrage — bitte über Anfrageformular bestellen");
      return;
    }
    setCheckingOut(true);
    try {
      const { data } = await axios.post(`${API}/checkout/session`, {
        items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        origin_url: window.location.origin,
      });
      if (data.url) window.location.href = data.url;
    } catch (err) {
      const msg = err?.response?.data?.detail || "Checkout konnte nicht gestartet werden";
      toast.error(msg);
    } finally {
      setCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" data-testid="cart-drawer">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <aside className="absolute right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[#0B1736] border-l border-white/10 flex flex-col">
        <div className="flex items-center justify-between p-7 border-b border-white/10">
          <div>
            <div className="eyebrow">Anfragekorb</div>
            <div className="font-display text-2xl mt-2">
              {step === "success" ? "Gesendet." : step === "form" ? "Ihre Daten." : `${count} Artikel.`}
            </div>
          </div>
          <button onClick={close} data-testid="cart-close" className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === "cart" && (
            items.length === 0 ? (
              <div className="p-12 text-center text-white/50" data-testid="cart-empty">
                <div className="w-16 h-16 mx-auto mb-5 border border-white/20 flex items-center justify-center">
                  <ArrowRight size={18} className="text-white/40" />
                </div>
                Ihr Anfragekorb ist leer.<br/>Wählen Sie Produkte aus dem Shop.
              </div>
            ) : (
              <ul className="divide-y divide-white/10">
                {items.map((i) => (
                  <li key={i.product_id} className="p-6 flex gap-4" data-testid={`cart-item-${i.slug}`}>
                    <div className="w-20 h-20 bg-[#0E1A3E] border border-white/10 shrink-0">
                      <img src={i.image} alt={i.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm leading-tight mb-3 truncate">{i.name}</div>
                      <div className="flex items-center gap-2">
                        <button onClick={()=>updateQty(i.product_id, i.quantity - 1)} className="w-7 h-7 border border-white/20 flex items-center justify-center hover:border-white"><Minus size={12}/></button>
                        <span className="text-sm w-6 text-center">{i.quantity}</span>
                        <button onClick={()=>updateQty(i.product_id, i.quantity + 1)} className="w-7 h-7 border border-white/20 flex items-center justify-center hover:border-white"><Plus size={12}/></button>
                        <button onClick={()=>removeItem(i.product_id)} className="ml-auto text-white/50 hover:text-white" data-testid={`remove-${i.slug}`}>
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}

          {step === "form" && (
            <form onSubmit={handleSend} className="p-7 space-y-1" data-testid="inquiry-form">
              <div className="eyebrow mb-5">Schritt 2 von 2</div>
              <input required placeholder="Name *" className="input-field"
                value={form.customer_name} onChange={e=>setForm({...form, customer_name:e.target.value})}
                data-testid="form-name"/>
              <input required type="email" placeholder="E-Mail *" className="input-field"
                value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
                data-testid="form-email"/>
              <input placeholder="Telefon" className="input-field"
                value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}
                data-testid="form-phone"/>
              <input placeholder="Firma (optional)" className="input-field"
                value={form.company} onChange={e=>setForm({...form, company:e.target.value})}
                data-testid="form-company"/>
              <textarea placeholder="Nachricht (optional)" rows={3} className="input-field resize-none"
                value={form.message} onChange={e=>setForm({...form, message:e.target.value})}
                data-testid="form-message"/>
              <div className="text-xs text-white/50 pt-5">
                {count} Artikel werden mit Ihrer Anfrage gesendet.
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="p-12 text-center" data-testid="cart-success">
              <div className="w-16 h-16 mx-auto mb-5 border border-white flex items-center justify-center">
                <CheckCircle2 size={22} />
              </div>
              <div className="font-display text-xl mb-2">Danke für Ihre Anfrage.</div>
              <div className="text-white/60 text-sm">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</div>
            </div>
          )}
        </div>

        {step === "cart" && items.length > 0 && (
          <div className="p-7 border-t border-white/10 space-y-3">
            {netTotal > 0 && (
              <div className="mb-3 text-xs space-y-1.5" data-testid="cart-totals">
                <div className="flex justify-between text-white/55"><span>Netto</span><span>€ {netTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-white/55"><span>MwSt. (20%)</span><span>€ {vat.toFixed(2)}</span></div>
                <div className="flex justify-between text-white pt-1.5 border-t border-white/10 font-medium tracking-wider"><span>Gesamt</span><span>€ {gross.toFixed(2)}</span></div>
                {!allHavePrice && (
                  <div className="text-[10px] text-amber-300/80 pt-1">Manche Artikel nur auf Anfrage — Online-Zahlung deaktiviert.</div>
                )}
              </div>
            )}
            <button
              onClick={handleStripeCheckout}
              disabled={!allHavePrice || checkingOut}
              className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              data-testid="stripe-checkout-btn"
            >
              {checkingOut ? "Wird vorbereitet…" : <>Direkt online kaufen <CreditCard size={14}/></>}
            </button>
            <button
              onClick={() => setStep("form")}
              className="btn-ghost w-full justify-center"
              data-testid="proceed-to-form"
            >
              Stattdessen Anfrage senden <ArrowRight size={14}/>
            </button>
            <button onClick={clear} className="text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-white w-full">Korb leeren</button>
          </div>
        )}

        {step === "form" && (
          <div className="p-7 border-t border-white/10 flex gap-3">
            <button onClick={()=>setStep("cart")} className="btn-ghost flex-1 justify-center" data-testid="back-to-cart">Zurück</button>
            <button type="submit" onClick={handleSend} disabled={sending} className="btn-primary flex-1 justify-center disabled:opacity-60" data-testid="submit-inquiry">
              {sending ? "Senden..." : <>Absenden <ArrowRight size={14}/></>}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="p-7 border-t border-white/10">
            <button onClick={close} className="btn-primary w-full justify-center" data-testid="success-close">
              Schließen
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
