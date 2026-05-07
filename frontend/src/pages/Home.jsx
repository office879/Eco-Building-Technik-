import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Award, Wrench, Leaf, Cpu, Sun } from "lucide-react";
import ProductCard from "../components/ProductCard";
import EnergyCalculator from "../components/EnergyCalculator";
import FAQ from "../components/FAQ";
import { fetchProducts } from "../lib/api";

const HERO_IMG = "https://images.unsplash.com/photo-1638008313433-11ce583a90d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MHx8fHwxNzc4MTI3ODEwfDA&ixlib=rb-4.1.0&q=85";
const TECH_IMG = "https://images.unsplash.com/photo-1761571740780-d9149a88b759?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwaG91c2UlMjBtb2Rlcm58ZW58MHx8fHwxNzc4MTI3ODMwfDA&ixlib=rb-4.1.0&q=85";

const TRUSTS = [
  { icon: Award, label: "Klimaförderung", value: "bis € 5.000" },
  { icon: Shield, label: "Rückgaberecht", value: "14 Tage" },
  { icon: Wrench, label: "Beratung", value: "Kostenlos" },
  { icon: Zap, label: "Energieklasse", value: "A+++" },
];

const CATS = [
  { key: "waermepumpen", name: "Wärmepumpen", icon: Leaf, desc: "A+++ Heizsysteme" },
  { key: "gas-brennwert", name: "Gas-Brennwert", icon: Zap, desc: "WiFi-Boiler" },
  { key: "smart-home", name: "Smart Home", icon: Cpu, desc: "WiFi & Zigbee" },
  { key: "beleuchtung", name: "Beleuchtung", icon: Sun, desc: "RGB & Dimm" },
  { key: "energiemanagement", name: "Energie", icon: Zap, desc: "PV, Speicher, Zähler" },
  { key: "wasser", name: "Wasser", icon: Shield, desc: "Warmwasser & Monitoring" },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchProducts({ featured: true }).then(setFeatured).catch(() => {});
  }, []);

  return (
    <div className="relative" data-testid="home-page">
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-end overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Modern sustainable architecture" className="w-full h-full object-cover opacity-60"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 grid-frame opacity-40"/>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 md:col-span-8 reveal-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="pill pill-green">● A+++ ENERGIEEFFIZIENZ 2026</span>
                <span className="hidden sm:inline pill">FACHBETRIEB · EBREICHSDORF</span>
              </div>
              <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tighter">
                Gebäudetechnik.<br/>
                <span className="text-[#00FF66]">Neu gedacht.</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed">
                KI-optimierte Heizsysteme, smarte Automation & A+++ Energieeffizienz — 
                kompromisslos nachhaltig, perfekt installiert.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary" data-testid="hero-shop-btn">
                  Produkte entdecken <ArrowRight size={16}/>
                </Link>
                <Link to="/energie-rechner" className="btn-ghost" data-testid="hero-calc-btn">
                  Energie-Rechner
                </Link>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 hidden md:block">
              <div className="border border-white/10 bg-black/40 backdrop-blur-xl p-6">
                <div className="eyebrow text-[#00FF66] mb-3">LIVE</div>
                <div className="font-display text-5xl font-bold leading-none">40+</div>
                <div className="text-zinc-400 text-sm mt-2">Premium-Produkte</div>
                <div className="hline my-5"/>
                <div className="font-mono text-xs text-zinc-500 space-y-2">
                  <div className="flex justify-between"><span>COP Ø</span><span className="text-white">4.8</span></div>
                  <div className="flex justify-between"><span>GARANTIE</span><span className="text-white">10 J.</span></div>
                  <div className="flex justify-between"><span>LIEFERUNG</span><span className="text-[#00FF66]">AT/DE</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges marquee */}
      <section className="border-y border-zinc-900 bg-black py-4 overflow-hidden">
        <div className="marquee-track font-mono text-xs uppercase tracking-[0.3em]">
          {Array.from({length: 2}).map((_, k) => (
            <div key={k} className="flex gap-16 shrink-0">
              {TRUSTS.map((t, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  <t.icon size={14} className="text-[#00FF66]"/>
                  <span>{t.label}</span>
                  <span className="text-[#00FF66]">{t.value}</span>
                  <span className="text-zinc-700">///</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow mb-4">01 — Sortiment</div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight max-w-xl">
              Technik für jedes Gewerk.
            </h2>
          </div>
          <Link to="/shop" className="btn-ghost text-sm" data-testid="all-products-btn">
            Alle Produkte <ArrowRight size={14}/>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-zinc-900">
          {CATS.map((c) => (
            <Link
              to={`/shop?cat=${c.key}`}
              key={c.key}
              data-testid={`cat-${c.key}`}
              className="group relative p-8 border-b border-r border-zinc-900 hover:bg-[#00FF66]/5 transition-colors"
            >
              <c.icon size={28} className="text-[#00FF66] mb-5" strokeWidth={1.5} />
              <div className="font-display text-2xl font-medium tracking-tight">{c.name}</div>
              <div className="text-sm text-zinc-500 mt-1">{c.desc}</div>
              <ArrowRight size={18} className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#00FF66]"/>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <div className="eyebrow mb-4">02 — Bestseller</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
              Ausgewählte Premium-Produkte.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-zinc-900">
          {featured.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Split: Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
          <div className="bg-[#0A0A0A] p-10 lg:p-16">
            <div className="eyebrow mb-4">03 — Unser Versprechen</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-6">
              Nachhaltig wohnen.<br/><span className="text-[#00FF66]">Intelligent heizen.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-md">
              Wir kombinieren die effizientesten A+++ Wärmepumpen mit intelligenter Gebäudeautomation.
              Jedes System wird individuell geplant, installiert und für maximale Effizienz optimiert.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
              <Stat k="COP bis" v="5.1" />
              <Stat k="Ersparnis" v="bis 60%" />
              <Stat k="Förderung" v="€ 5.000" />
              <Stat k="Installation" v="in 2–5 T." />
            </div>
          </div>
          <div className="relative min-h-[500px] overflow-hidden">
            <img src={TECH_IMG} alt="Nachhaltige Gebäudetechnik" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"/>
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <div className="eyebrow text-[#00FF66] mb-2">INSTALLIERT IN</div>
                <div className="font-display text-3xl font-semibold">Österreich & DACH</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="eyebrow mb-4">04 — Energie</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            So viel können Sie sparen.
          </h2>
        </div>
        <EnergyCalculator/>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="eyebrow mb-4">05 — FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Häufig gestellte Fragen.
          </h2>
        </div>
        <FAQ/>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-zinc-900">
          <div className="absolute inset-0 grid-frame opacity-30"/>
          <div className="relative p-12 md:p-20 text-center">
            <div className="eyebrow mb-6 text-[#00FF66]">ZUM LETZTEN SCHRITT</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
              Bereit für Ihre <span className="text-[#00FF66]">A+++</span> Zukunft?
            </h2>
            <p className="mt-6 text-zinc-400 max-w-xl mx-auto">
              Kostenlose Beratung. Individuelles Angebot. Premium-Installation in Österreich & DACH.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/kontakt" className="btn-primary" data-testid="cta-contact-btn">
                Beratung anfordern <ArrowRight size={16}/>
              </Link>
              <Link to="/shop" className="btn-ghost" data-testid="cta-shop-btn">
                Shop durchstöbern
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ k, v }) {
  return (
    <div className="bg-[#0A0A0A] p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">{k}</div>
      <div className="font-display text-3xl font-semibold">{v}</div>
    </div>
  );
}
