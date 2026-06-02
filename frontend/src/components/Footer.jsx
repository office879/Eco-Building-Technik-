import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-white/10 bg-[#0B1736]" data-testid="site-footer">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <Logo size="md"/>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm tracking-[0.18em]">ECO BUILDING</div>
              <div className="eyebrow text-[10px] mt-0.5">TECHNIK GMBH</div>
            </div>
          </div>
          <p className="text-white/60 text-sm max-w-md leading-relaxed">
            ECO Building Technik GmbH plant, liefert und installiert nachhaltige Gebäudetechnik — von A+++ Wärmepumpen
            über Gas-Brennwertgeräte bis hin zu Smart-Home- und Energiemanagement-Systemen. Fachbetrieb mit
            persönlicher Beratung in Ebreichsdorf, Österreich.
          </p>
          <div className="flex items-center gap-4 mt-7 text-[11px] tracking-[0.15em] uppercase text-white/40 font-medium">
            <span>A+++ Energie</span>
            <span className="text-white/20">·</span>
            <span>Förderung € 5.000</span>
            <span className="text-white/20">·</span>
            <span>Wien-Österreich</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow mb-5">Navigation</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="text-white/80 hover:text-white">Start</Link></li>
            <li><Link to="/shop" className="text-white/80 hover:text-white">Shop</Link></li>
            <li><Link to="/energie-rechner" className="text-white/80 hover:text-white">Energie-Rechner</Link></li>
            <li><Link to="/ueber-uns" className="text-white/80 hover:text-white">Über uns</Link></li>
            <li><Link to="/kontakt" className="text-white/80 hover:text-white">Kontakt</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow mb-5">Kontakt</div>
          <ul className="space-y-4 text-sm text-white/80">
            <li>
              <div className="text-white/50 text-xs mb-1">Adresse</div>
              Seepromenade 109<br/>
              AT-2384 Ebreichsdorf<br/>
              Österreich
            </li>
            <li>
              <div className="text-white/50 text-xs mb-1">Mobil</div>
              <a href="tel:+436643289599" className="hover:text-white">+43 / 0664 328 95 99</a>
            </li>
            <li>
              <div className="text-white/50 text-xs mb-1">E-Mail</div>
              <a href="mailto:office@eco-building.tech" className="hover:text-white">office@eco-building.tech</a>
            </li>
            <li>
              <div className="text-white/50 text-xs mb-1">Internet</div>
              <a href="https://www.eco-building.tech" target="_blank" rel="noreferrer" className="hover:text-white">www.eco-building.tech</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.12em] uppercase text-white/40 font-medium">
          <span>© {new Date().getFullYear()} ECO Building Technik GmbH — Alle Rechte vorbehalten.</span>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="hover:text-white" data-testid="footer-impressum">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white" data-testid="footer-datenschutz">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
