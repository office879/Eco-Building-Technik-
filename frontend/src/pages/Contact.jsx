import React, { useState } from "react";
import { MapPin, Phone, Mail, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { submitContact } from "../lib/api";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitContact(form);
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      toast.success("Nachricht gesendet");
    } catch {
      toast.error("Fehler beim Senden");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-32 pb-20" data-testid="contact-page">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">Kontakt</div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] max-w-5xl">
          Reden wir über<br/>Ihr <span className="italic-accent">Projekt.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
          Kostenlose Beratung und persönliche Angebotserstellung. Wir antworten innerhalb von 24 Stunden.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/10">
          <div className="lg:col-span-5 p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="eyebrow mb-8">Direktkontakt</div>
            <div className="space-y-10">
              <InfoBlock icon={MapPin} title="Adresse" body={<>Seepromenade 109<br/>AT-2384 Ebreichsdorf<br/>Österreich</>}/>
              <InfoBlock icon={Phone} title="Telefon" body={<a href="tel:+436643289599" className="hover:text-white">+43 / 0664 328 95 99</a>}/>
              <InfoBlock icon={Mail} title="E-Mail" body={<a href="mailto:office@eco-building.tech" className="hover:text-white">office@eco-building.tech</a>}/>
              <InfoBlock icon={Clock} title="Öffnungszeiten" body={<>Mo–Fr 08:00 — 18:00<br/>Sa nach Vereinbarung</>}/>
            </div>
          </div>

          <div className="lg:col-span-7 p-10 lg:p-14">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20" data-testid="contact-success">
                <div className="w-16 h-16 border border-white flex items-center justify-center mb-7">
                  <CheckCircle2 size={22}/>
                </div>
                <h3 className="font-display text-3xl mb-3">Danke für Ihre <span className="italic-accent">Nachricht.</span></h3>
                <p className="text-white/65 text-sm max-w-sm">Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.</p>
                <button onClick={()=>setSent(false)} className="btn-ghost mt-10" data-testid="contact-new">Neue Nachricht</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-2" data-testid="contact-form">
                <div className="eyebrow mb-6">Nachricht senden</div>
                <input required placeholder="Ihr Name *" className="input-field"
                  value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}
                  data-testid="contact-name"/>
                <input required type="email" placeholder="E-Mail *" className="input-field"
                  value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}
                  data-testid="contact-email"/>
                <input placeholder="Telefon" className="input-field"
                  value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})}
                  data-testid="contact-phone"/>
                <textarea required rows={6} placeholder="Ihre Nachricht *" className="input-field resize-none"
                  value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})}
                  data-testid="contact-message"/>
                <div className="pt-8">
                  <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60" data-testid="contact-submit">
                    {sending ? "Senden..." : <>Nachricht senden <ArrowRight size={14}/></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBlock({ icon: Icon, title, body }) {
  return (
    <div className="flex gap-5">
      <div className="w-11 h-11 border border-white/40 flex items-center justify-center shrink-0">
        <Icon size={15} strokeWidth={1.6}/>
      </div>
      <div>
        <div className="eyebrow mb-2">{title}</div>
        <div className="text-sm text-white/85 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}
