import React from "react";
import EnergyCalculator from "../components/EnergyCalculator";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function EnergyPage() {
  return (
    <div className="pt-24 pb-16" data-testid="energy-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-zinc-900">
        <div className="eyebrow mb-4">Energie-Rechner</div>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] max-w-4xl">
          Wie viel <span className="text-[#00FF66]">sparen</span> Sie?
        </h1>
        <p className="mt-6 max-w-xl text-zinc-400">
          Berechnen Sie Heizlast und jährliche Energiekosten für Ihr Gebäude — und vergleichen Sie,
          was eine moderne Wärmepumpe bringt.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EnergyCalculator/>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border border-zinc-900 p-12 md:p-20 text-center">
          <div className="eyebrow mb-4 text-[#00FF66]">NÄCHSTER SCHRITT</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
            Lassen Sie uns ein individuelles Angebot erstellen.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/kontakt" className="btn-primary" data-testid="energy-cta-contact">
              Beratung anfordern <ArrowRight size={16}/>
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
