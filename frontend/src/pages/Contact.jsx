import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, Clock, CheckCircle2 } from "lucide-react";
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
    <div className="pt-24 pb-16" data-testid="contact-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-zinc-900">
        <div className="eyebrow mb-4">Kontakt</div>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] max-w-4xl">
          Reden wir über<br/>Ihr <span className="text-[#00FF66]">Projekt.</span>
        </h1>
        <p className="mt-6 max-w-xl text-zinc-400">
          Kostenlose Beratung und persönliche Angebotserstellung. Wir antworten innerhalb von 24 Stunden.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
          {/* Info */}
          <div className="lg:col-span-5 bg-[#0A0A0A] p-8 lg:p-12">
            <div className="eyebrow mb-6">Direktkontakt</div>
            <div className="space-y-8">
              <InfoBlock icon={MapPin} title="Adresse"
                body={<>Seepromenade 109<br/>AT-2384 Ebreichsdorf<br/>Österreich</>}/>
              <InfoBlock icon={Phone} title="Telefon"
                body={<a href="tel:+436643289599" className="hover:text-[#00FF66]">+43 / 0664 328 95 99</a>}/>
              <InfoBlock icon={Mail} title="E-Mail"
                body={<a href="mailto:office@eco-building.tech" className="hover:text-[#00FF66]">office@eco-building.tech</a>}/>
              <InfoBlock icon={Clock} title="Öffnungszeiten"
                body={<>Mo–Fr 08:00 — 18:00<br/>Sa nach Vereinbarung</>}/>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-black p-8 lg:p-12">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16" data-testid="contact-success">
                <div className="w-16 h-16 border border-[#00FF66] flex items-center justify-center mb-6">
                  <CheckCircle2 size={24} className="text-[#00FF66]"/>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">Danke für Ihre Nachricht!</h3>
                <p className="text-zinc-400 text-sm max-w-sm">Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.</p>
                <button onClick={()=>setSent(false)} className="btn-ghost mt-8 text-sm" data-testid="contact-new">
                  Neue Nachricht
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-2" data-testid="contact-form">
                <div className="eyebrow mb-4 text-[#00FF66]">Nachricht senden</div>
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
                <div className="pt-6">
                  <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60" data-testid="contact-submit">
                    {sending ? "Senden..." : <>Nachricht senden <Send size={14}/></>}
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
    <div className="flex gap-4">
      <div className="w-10 h-10 border border-[#00FF66] flex items-center justify-center shrink-0">
        <Icon size={16} className="text-[#00FF66]"/>
      </div>
      <div>
        <div className="eyebrow mb-1">{title}</div>
        <div className="text-sm text-zinc-300 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}
