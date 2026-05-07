import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Users, Award, Wrench, ArrowRight } from "lucide-react";

const IMG = "https://images.unsplash.com/photo-1761571740780-d9149a88b759?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwaG91c2UlMjBtb2Rlcm58ZW58MHx8fHwxNzc4MTI3ODMwfDA&ixlib=rb-4.1.0&q=85";

export default function About() {
  return (
    <div className="pt-24 pb-16" data-testid="about-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-zinc-900">
        <div className="eyebrow mb-4">Über uns</div>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] max-w-4xl">
          Der Fachbetrieb für <span className="text-[#00FF66]">nachhaltige</span> Gebäudetechnik.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-zinc-400 leading-relaxed">
          ECO Building Technik ist Ihr Partner für A+++ Wärmepumpen, Gas-Brennwertgeräte und intelligente
          Smart Home Systemintegration in Ebreichsdorf, Österreich. Mit persönlicher Beratung, präziser
          Planung und erstklassiger Installation realisieren wir Ihre Vision einer nachhaltigen Zukunft.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
          <div className="relative min-h-[400px] overflow-hidden">
            <img src={IMG} alt="Moderne Gebäudetechnik" className="absolute inset-0 w-full h-full object-cover"/>
          </div>
          <div className="bg-[#0A0A0A] p-10 lg:p-16">
            <div className="eyebrow mb-4">Unsere Mission</div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-6">
              Technik, die sich für Menschen und Umwelt lohnt.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Wir glauben, dass nachhaltige Gebäudetechnik weder kompromissbehaftet noch kompliziert sein muss.
              Jedes Projekt wird individuell geplant — von der Heizlastberechnung bis zur Smart-Home-Integration.
            </p>
            <Link to="/kontakt" className="btn-primary" data-testid="about-cta">
              Jetzt beraten lassen <ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="eyebrow mb-8">Unsere Werte</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
          <Value icon={Leaf} title="Nachhaltig" desc="A+++ Produkte, erneuerbare Energie, CO₂-arme Technik."/>
          <Value icon={Users} title="Persönlich" desc="Direkte Beratung, feste Ansprechpartner, kein Call-Center."/>
          <Value icon={Award} title="Qualität" desc="Nur geprüfte Marken, zertifizierte Installateure."/>
          <Value icon={Wrench} title="Alles aus einer Hand" desc="Planung, Lieferung, Installation & Service."/>
        </div>
      </section>
    </div>
  );
}

function Value({ icon: Icon, title, desc }) {
  return (
    <div className="bg-[#0A0A0A] p-8 lg:p-10">
      <Icon size={24} className="text-[#00FF66] mb-5" strokeWidth={1.5}/>
      <div className="font-display text-xl font-medium mb-2">{title}</div>
      <div className="text-sm text-zinc-400 leading-relaxed">{desc}</div>
    </div>
  );
}
