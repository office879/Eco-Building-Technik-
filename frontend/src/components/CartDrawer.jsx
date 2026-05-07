import React, { useState } from "react";
import { X, Trash2, Minus, Plus, Send, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { submitInquiry } from "../lib/api";
import { toast } from "sonner";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, clear, count } = useCart();
  const [step, setStep] = useState("cart"); // cart | form | success
  const [form, setForm] = useState({
    customer_name: "", email: "", phone: "", company: "", message: "",
  });
  const [sending, setSending] = useState(false);

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
    } catch (err) {
      toast.error("Fehler beim Senden. Bitte erneut versuchen.");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" data-testid="cart-drawer">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <aside className="absolute right-0 top-0 bottom-0 w-full sm:w-[460px] bg-[#0A0A0A] border-l border-zinc-900 flex flex-col reveal-up" style={{animation:"none"}}>
        <div className="flex items-center justify-between p-6 border-b border-zinc-900">
          <div>
            <div className="eyebrow">Anfragekorb</div>
            <div className="font-display text-2xl font-semibold mt-1">
              {step === "success" ? "Gesendet" : step === "form" ? "Ihre Daten" : `${count} Artikel`}
            </div>
          </div>
          <button onClick={close} data-testid="cart-close" className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:border-[#00FF66]">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === "cart" && (
            items.length === 0 ? (
              <div className="p-10 text-center text-zinc-400" data-testid="cart-empty">
                <div className="w-16 h-16 mx-auto mb-4 border border-zinc-800 flex items-center justify-center">
                  <Send size={20} className="text-zinc-600" />
                </div>
                Ihr Anfragekorb ist leer.<br/>Wählen Sie Produkte aus dem Shop.
              </div>
            ) : (
              <ul className="divide-y divide-zinc-900">
                {items.map((i) => (
                  <li key={i.product_id} className="p-5 flex gap-4" data-testid={`cart-item-${i.slug}`}>
                    <div className="w-20 h-20 bg-black border border-zinc-900 shrink-0">
                      <img src={i.image} alt={i.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm leading-tight mb-2 truncate">{i.name}</div>
                      <div className="flex items-center gap-2">
                        <button onClick={()=>updateQty(i.product_id, i.quantity - 1)} className="w-7 h-7 border border-zinc-800 flex items-center justify-center hover:border-[#00FF66]"><Minus size={12}/></button>
                        <span className="font-mono text-sm w-6 text-center">{i.quantity}</span>
                        <button onClick={()=>updateQty(i.product_id, i.quantity + 1)} className="w-7 h-7 border border-zinc-800 flex items-center justify-center hover:border-[#00FF66]"><Plus size={12}/></button>
                        <button onClick={()=>removeItem(i.product_id)} className="ml-auto text-zinc-500 hover:text-[#00FF66]" data-testid={`remove-${i.slug}`}>
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
            <form onSubmit={handleSend} className="p-6 space-y-1" data-testid="inquiry-form">
              <div className="eyebrow mb-4 text-[#00FF66]">Schritt 2 von 2</div>
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

              <div className="text-xs text-zinc-500 pt-4">
                {count} Artikel werden mit Ihrer Anfrage gesendet.
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="p-10 text-center" data-testid="cart-success">
              <div className="w-16 h-16 mx-auto mb-5 border border-[#00FF66] flex items-center justify-center">
                <CheckCircle2 size={24} className="text-[#00FF66]"/>
              </div>
              <div className="font-display text-xl mb-2">Danke für Ihre Anfrage</div>
              <div className="text-zinc-400 text-sm">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</div>
            </div>
          )}
        </div>

        {step === "cart" && items.length > 0 && (
          <div className="p-6 border-t border-zinc-900 space-y-3">
            <button
              onClick={() => setStep("form")}
              className="btn-primary w-full justify-center"
              data-testid="proceed-to-form"
            >
              Weiter zur Anfrage <Send size={14}/>
            </button>
            <button onClick={clear} className="text-xs text-zinc-500 hover:text-[#00FF66] w-full">Korb leeren</button>
          </div>
        )}

        {step === "form" && (
          <div className="p-6 border-t border-zinc-900 flex gap-3">
            <button onClick={()=>setStep("cart")} className="btn-ghost flex-1 justify-center text-sm" data-testid="back-to-cart">Zurück</button>
            <button
              type="submit"
              onClick={handleSend}
              disabled={sending}
              className="btn-primary flex-1 justify-center text-sm disabled:opacity-60"
              data-testid="submit-inquiry"
            >
              {sending ? "Senden..." : <>Absenden <Send size={14}/></>}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="p-6 border-t border-zinc-900">
            <button onClick={close} className="btn-primary w-full justify-center" data-testid="success-close">
              Schließen
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
