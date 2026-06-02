import React from "react";
import EnergyCalculator from "../components/EnergyCalculator";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function EnergyPage() {
  return (
    <div className="pt-32 pb-20" data-testid="energy-page">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">Energie-Rechner</div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] max-w-5xl">
          Wie viel <span className="italic-accent">sparen</span> Sie?
        </h1>
        <p className="mt-8 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
          Berechnen Sie Heizlast und jährliche Energiekosten für Ihr Gebäude — und vergleichen Sie,
          was eine moderne Wärmepumpe bringt.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <EnergyCalculator/>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="border border-white/10 p-12 md:p-20 text-center">
          <div className="eyebrow mb-5">Nächster Schritt</div>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto leading-[1.05]">
            Lassen Sie uns ein<br/><span className="italic-accent">individuelles Angebot</span> erstellen.
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/kontakt" className="btn-primary" data-testid="energy-cta-contact">
              Beratung anfragen <ArrowRight size={14}/>
            </Link>
            <Link to="/shop?cat=waermepumpen" className="btn-ghost" data-testid="energy-cta-shop">
              Wärmepumpen entdecken
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
