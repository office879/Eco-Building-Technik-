import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Leaf, Cpu, Shield, Zap, Sun, Droplet } from "lucide-react";
import ProductCard from "../components/ProductCard";
import EnergyCalculator from "../components/EnergyCalculator";
import FAQ from "../components/FAQ";
import VideoFeature from "../components/VideoFeature";
import { fetchProducts } from "../lib/api";

const HERO_VIDEO = "https://customer-assets.emergentagent.com/job_building-tech-neu/artifacts/q1nbilbz_74089e90-a0ba-4dd9-816e-392ee56c9f9b-h264-hd.mp4";
const HERO_POSTER = "https://images.unsplash.com/photo-1638008313433-11ce583a90d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MHx8fHwxNzc4MTI3ODEwfDA&ixlib=rb-4.1.0&q=85";
const TECH_IMG = "https://customer-assets.emergentagent.com/job_building-tech-neu/artifacts/xtfndjpm_H6adb350c50da4c92bc1d15d5aab200f7R.png";

const SERVICES = [
  { n: "01", icon: Leaf, title: "Wärmepumpen & Heiztechnik",
    desc: "A+++ Wärmepumpen mit R32 Kältemittel, COP bis 5,1 — hocheffizient, leise und PV-ready.", cat: "waermepumpen" },
  { n: "02", icon: Zap, title: "Gas-Brennwert & Warmwasser",
    desc: "Vollkondensierende Boiler mit WiFi-Steuerung, Modulation und Wirkungsgrad bis 109%.", cat: "gas-brennwert" },
  { n: "03", icon: Cpu, title: "Smart Home & Gebäudeautomation",
    desc: "Zigbee 3.0 & WiFi Module — Schalter, Dimmer, Thermostate, Gateways. Tuya/Smart Life kompatibel.", cat: "smart-home" },
  { n: "04", icon: Sun, title: "Beleuchtung & LED",
    desc: "Smart RGBW-Lampen, LED-Streifen und Deckenleuchten mit App- und Sprachsteuerung.", cat: "beleuchtung" },
  { n: "05", icon: Shield, title: "Energiemanagement & PV",
    desc: "Wechselrichter, LiFePO4 Batteriespeicher, Smart Meter — alles aus einer Hand.", cat: "energiemanagement" },
  { n: "06", icon: Droplet, title: "Wasser & Warmwasser",
    desc: "Smart Wasserzähler, Absperrventile mit Leckage-Schutz, Durchlauferhitzer mit App.", cat: "wasser" },
];

const MARQUEE_ITEMS = [
  "A+++ Energieeffizienz",
  "Klimaförderung bis € 5.000",
  "14 Tage Rückgaberecht",
  "Kostenlose Fachberatung",
  "WiFi & Zigbee 3.0",
  "BIM-integriert",
  "Wien & DACH",
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchProducts({ featured: true }).then(setFeatured).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      {/* Hero — Royalhouse style */}
      <section className="relative min-h-[100vh] flex flex-col justify-end pb-0">
        <div className="absolute inset-0 bg-[#0B1736]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full pt-32 pb-16">
          <div className="reveal-up">
            <div className="eyebrow mb-8">Nachhaltige Gebäudetechnik · A+++</div>
            <h1 className="font-display text-[64px] md:text-[110px] lg:text-[140px] leading-[0.92] tracking-[-0.03em]">
              ECO BUILDING<br/>
              <span className="italic-accent text-[72px] md:text-[125px] lg:text-[160px]">Technik.</span>
            </h1>
            <p className="mt-12 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
              Fachbetrieb für Heizung, Kälte, Lüftung, Smart Home und Energiemanagement —
              werkseitig geplant, hocheffizient installiert und in nachhaltige Gebäude integriert.
              Mit persönlicher Beratung und individueller Angebotserstellung in Ebreichsdorf, Österreich.
            </p>
            <div className="mt-12 flex flex-wrap gap-4 items-center">
              <Link to="/shop" className="btn-primary" data-testid="hero-shop-btn">
                Produkte entdecken <ArrowRight size={14}/>
              </Link>
              <Link to="/kontakt" className="btn-ghost" data-testid="hero-contact-btn">
                Beratung anfragen
              </Link>
              <Link to="/energie-rechner" className="ml-2 text-[11px] tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2" data-testid="hero-calc-link">
                Energie-Rechner <ArrowUpRight size={12}/>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero video strip below */}
        <div className="relative h-[44vh] md:h-[60vh] w-full overflow-hidden">
          <video
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            data-testid="hero-video"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1736] via-transparent to-[#0B1736]/30"/>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/10 py-5 overflow-hidden">
        <div className="marquee-track text-[11px] tracking-[0.25em] uppercase text-white/60 font-medium">
          {Array.from({length: 2}).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {MARQUEE_ITEMS.map((m, i) => (
                <div key={i} className="flex items-center gap-12 shrink-0">
                  <span>{m}</span>
                  <span className="text-white/20">★</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Auftrag / Intro */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-28 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-6">Auftrag</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              Haustechnik,<br/>die <span className="italic-accent">einfach funktioniert.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              ECO Building Technik plant, liefert und installiert die komplette Haustechnik —
              von A+++ Wärmepumpen und Gas-Brennwertgeräten über intelligente Lüftungs- und Beleuchtungssysteme
              bis zu vollintegrierten Smart-Home-Lösungen. Jede Komponente wird vorab geprüft, dimensioniert
              und vor Ort präzise installiert. Auf der Baustelle entsteht so ein nahtloses Plug-and-Play.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 mt-10 text-[12px] tracking-[0.18em] uppercase font-semibold border-b border-white/40 pb-2 hover:border-white" data-testid="intro-shop-link">
              Mehr im Produktkatalog <ArrowUpRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      {/* Services - numbered cards */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {SERVICES.map((s) => (
            <Link
              to={`/shop?cat=${s.cat}`}
              key={s.n}
              data-testid={`service-${s.cat}`}
              className="bg-[#0B1736] num-card group hover:bg-[#0E1A3E]"
            >
              <div className="flex items-start justify-between mb-12">
                <div className="font-display text-3xl text-white/40">{s.n}</div>
                <s.icon size={22} strokeWidth={1.4} className="text-white/60 group-hover:text-white transition-colors"/>
              </div>
              <h3 className="font-display text-xl md:text-2xl mb-4 tracking-tight leading-tight">{s.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
              <div className="mt-8 text-[11px] tracking-[0.15em] uppercase text-white/40 group-hover:text-white flex items-center gap-2 transition-colors">
                Entdecken <ArrowUpRight size={12}/>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-28">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow mb-5">02 · Bestseller</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              Ausgewählte <span className="italic-accent">Premium-Produkte.</span>
            </h2>
          </div>
          <Link to="/shop" className="btn-ghost" data-testid="all-products-btn">
            Alle Produkte <ArrowRight size={14}/>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {featured.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Video Feature */}
      <VideoFeature/>

      {/* Split feature */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10">
          <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="eyebrow mb-5">03 · Unser Versprechen</div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05] mb-8">
              Nachhaltig wohnen.<br/><span className="italic-accent">Intelligent heizen.</span>
            </h2>
            <p className="text-white/65 leading-relaxed max-w-md mb-10">
              Wir kombinieren die effizientesten A+++ Wärmepumpen mit intelligenter Gebäudeautomation.
              Jedes System wird individuell geplant, installiert und für maximale Effizienz optimiert.
            </p>
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
              <Stat k="COP bis" v="5.1" />
              <Stat k="Ersparnis" v="bis 60%" />
              <Stat k="Förderung" v="€ 5.000" />
              <Stat k="Installation" v="2–5 T." />
            </div>
          </div>
          <div className="relative min-h-[500px] overflow-hidden bg-[#0E1A3E]">
            <img src={TECH_IMG} alt="Nachhaltige Gebäudetechnik" className="absolute inset-0 w-full h-full object-cover opacity-90"/>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="eyebrow text-white mb-2">Installiert in</div>
              <div className="font-display text-3xl">Österreich & DACH</div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-28">
        <div className="mb-12">
          <div className="eyebrow mb-5">04 · Energie</div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            So viel können Sie <span className="italic-accent">sparen.</span>
          </h2>
        </div>
        <EnergyCalculator/>
      </section>

      {/* FAQ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-28">
        <div className="mb-12 text-center">
          <div className="eyebrow mb-5">05 · FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            Häufig gestellte <span className="italic-accent">Fragen.</span>
          </h2>
        </div>
        <FAQ/>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-32">
        <div className="border border-white/10 p-12 md:p-20 lg:p-28 text-center">
          <div className="eyebrow mb-6">06 · Anfrage</div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl mx-auto leading-[1.05]">
            Bereit für Ihre<br/><span className="italic-accent">A+++ Zukunft?</span>
          </h2>
          <p className="mt-8 text-white/65 max-w-xl mx-auto leading-relaxed">
            Kostenlose Beratung. Individuelles Angebot. Premium-Installation in Österreich & DACH.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/kontakt" className="btn-primary" data-testid="cta-contact-btn">
              Beratung anfragen <ArrowRight size={14}/>
            </Link>
            <Link to="/shop" className="btn-ghost" data-testid="cta-shop-btn">
              Shop durchstöbern
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ k, v }) {
  return (
    <div className="bg-[#0B1736] p-6">
      <div className="text-[11px] tracking-[0.15em] uppercase text-white/45 mb-2">{k}</div>
      <div className="font-display text-3xl">{v}</div>
    </div>
  );
}
