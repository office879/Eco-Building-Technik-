import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Was sind die besten Wärmepumpen für Einfamilienhäuser in Österreich?",
    a: "Unsere JNOD A+++ Wärmepumpen mit R32 Kältemittel zählen zu den effizientesten am Markt. Die 12kW-Variante eignet sich optimal für Einfamilienhäuser bis 150m², für größere Häuser empfehlen wir die 16kW-Version. COP-Werte über 4,8 sorgen für niedrige Betriebskosten.",
  },
  {
    q: "Was kostet eine Wärmepumpe inklusive Installation in Österreich?",
    a: "Die Gesamtkosten liegen in der Regel zwischen 18.000 € und 35.000 € inkl. Installation und hängen stark von Gebäudegröße, Heizsystem und örtlichen Gegebenheiten ab. Mit der Klimaförderung können bis zu 5.000 € direkt abgezogen werden. Gerne erstellen wir Ihnen ein individuelles, kostenloses Angebot.",
  },
  {
    q: "Lohnt sich ein Gas-Brennwertgerät noch im Jahr 2026?",
    a: "Für Bestandsgebäude mit bestehender Gas-Infrastruktur ist ein modernes Gas-Brennwertgerät weiterhin wirtschaftlich sinnvoll – besonders übergangsweise. Unsere Squirrel M30 Geräte mit 109% Wirkungsgrad und App-Steuerung sparen bis zu 30% gegenüber alten Heizkesseln.",
  },
  {
    q: "Welche Smart Home Systeme sind kompatibel mit Wärmepumpen?",
    a: "Unsere Wärmepumpen unterstützen Modbus, WiFi und SG-Ready – somit sind sie kompatibel mit Tuya/Smart Life, Home Assistant, Alexa und Google Home. Der GIRIER Zigbee 3.0 Gateway bildet die zentrale Steuereinheit für ein vollständig integriertes Smart Home.",
  },
  {
    q: "Wie hoch ist die Förderung für Wärmepumpen in Österreich?",
    a: 'Die Bundesförderung „Sauber Heizen für Alle" bietet bis zu 75% der Investitionskosten, maximal 23.000 €. Die Klimaförderung des Bundes („Raus aus Öl und Gas") liegt bei bis zu 5.000 €. Zusätzlich gibt es Landesförderungen je nach Bundesland.',
  },
  {
    q: "Was ist der Unterschied zwischen Wärmepumpe und Gas-Brennwertgerät?",
    a: "Wärmepumpen nutzen Umweltenergie (Luft, Erde, Wasser) und erzeugen aus 1 kWh Strom bis zu 5 kWh Wärme – CO₂-frei bei Ökostrom. Gas-Brennwertgeräte verbrennen Erdgas mit ~109% Wirkungsgrad. Wärmepumpen sind langfristig günstiger und nachhaltiger, Gas-Brennwert ist in der Anschaffung günstiger.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-4xl mx-auto" data-testid="faq-section">
      <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900">
        {FAQS.map((f, i) => (
          <div key={i} className="py-1">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              data-testid={`faq-toggle-${i}`}
              className="w-full flex items-center justify-between py-6 text-left group"
            >
              <span className={`font-display text-lg md:text-xl font-medium pr-8 ${open===i ? "text-[#00FF66]" : "text-white"} group-hover:text-[#00FF66] transition-colors`}>
                {f.q}
              </span>
              <span className={`w-10 h-10 border flex items-center justify-center shrink-0 transition-colors ${open===i ? "border-[#00FF66] bg-[#00FF66]/10" : "border-zinc-800"}`}>
                {open === i ? <Minus size={14} className="text-[#00FF66]"/> : <Plus size={14}/>}
              </span>
            </button>
            {open === i && (
              <div className="pb-8 pr-16 text-zinc-400 leading-relaxed text-sm md:text-base">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
