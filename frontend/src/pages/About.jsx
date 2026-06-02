import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Users, Award, Wrench, ArrowRight } from "lucide-react";

const IMG = "https://images.unsplash.com/photo-1761571740780-d9149a88b759?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwaG91c2UlMjBtb2Rlcm58ZW58MHx8fHwxNzc4MTI3ODMwfDA&ixlib=rb-4.1.0&q=85";

export default function About() {
  return (
    <div className="pt-32 pb-20" data-testid="about-page">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">Über uns</div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] max-w-5xl">
          Der Fachbetrieb für<br/><span className="italic-accent">nachhaltige</span> Gebäudetechnik.
        </h1>
        <p className="mt-10 max-w-3xl text-base md:text-lg text-white/65 leading-relaxed">
          ECO Building Technik ist Ihr Partner für A+++ Wärmepumpen, Gas-Brennwertgeräte und intelligente
          Smart Home Systemintegration in Ebreichsdorf, Österreich. Mit persönlicher Beratung, präziser
          Planung und erstklassiger Installation realisieren wir Ihre Vision einer nachhaltigen Zukunft.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10">
          <div className="relative min-h-[440px] overflow-hidden bg-[#0E1A3E] border-b lg:border-b-0 lg:border-r border-white/10">
            <img src={IMG} alt="Moderne Gebäudetechnik" className="absolute inset-0 w-full h-full object-cover opacity-90"/>
          </div>
          <div className="p-10 lg:p-16">
            <div className="eyebrow mb-5">Unsere Mission</div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05] mb-7">
              Technik, die sich für<br/>Menschen und <span className="italic-accent">Umwelt lohnt.</span>
            </h2>
            <p className="text-white/65 leading-relaxed mb-10">
              Wir glauben, dass nachhaltige Gebäudetechnik weder kompromissbehaftet noch kompliziert sein muss.
              Jedes Projekt wird individuell geplant — von der Heizlastberechnung bis zur Smart-Home-Integration.
            </p>
            <Link to="/kontakt" className="btn-primary" data-testid="about-cta">
              Jetzt beraten lassen <ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="eyebrow mb-10">Unsere Werte</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          <Value n="01" icon={Leaf} title="Nachhaltig" desc="A+++ Produkte, erneuerbare Energie, CO₂-arme Technik."/>
          <Value n="02" icon={Users} title="Persönlich" desc="Direkte Beratung, feste Ansprechpartner, kein Call-Center."/>
          <Value n="03" icon={Award} title="Qualität" desc="Nur geprüfte Marken, zertifizierte Installateure."/>
          <Value n="04" icon={Wrench} title="Alles aus einer Hand" desc="Planung, Lieferung, Installation & Service."/>
        </div>
      </section>
    </div>
  );
}

function Value({ n, icon: Icon, title, desc }) {
  return (
    <div className="bg-[#0B1736] p-10 lg:p-12 min-h-[260px]">
      <div className="flex items-start justify-between mb-12">
        <div className="font-display text-2xl text-white/40">{n}</div>
        <Icon size={20} strokeWidth={1.4} className="text-white/60"/>
      </div>
      <div className="font-display text-xl mb-3">{title}</div>
      <div className="text-sm text-white/60 leading-relaxed">{desc}</div>
    </div>
  );
}
