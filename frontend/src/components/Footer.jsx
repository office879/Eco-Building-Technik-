import React from "react";
import { Link } from "react-router-dom";
import { Zap, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-900 bg-black" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 border border-[#00FF66] flex items-center justify-center">
              <Zap size={18} className="text-[#00FF66]" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold">ECO BUILDING TECHNIK</div>
              <div className="eyebrow text-[10px]">A+++ · NACHHALTIG · SMART</div>
            </div>
          </div>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
            Fachbetrieb für KI-optimierte Gebäudeautomation mit A+++ Wärmepumpen,
            Gas-Brennwertgeräten und intelligenter Systemintegration in Ebreichsdorf, Österreich.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="pill pill-green">A+++ ENERGIE</span>
            <span className="pill">FÖRDERUNG €5.000</span>
            <span className="pill">14T RÜCKGABE</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow mb-4">Navigation</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop" className="hover:text-[#00FF66]">Shop</Link></li>
            <li><Link to="/energie-rechner" className="hover:text-[#00FF66]">Energie-Rechner</Link></li>
            <li><Link to="/ueber-uns" className="hover:text-[#00FF66]">Über uns</Link></li>
            <li><Link to="/kontakt" className="hover:text-[#00FF66]">Kontakt</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow mb-4">Kontakt</div>
          <ul className="space-y-4 text-sm text-zinc-300">
            <li className="flex gap-3">
              <MapPin size={16} className="text-[#00FF66] mt-0.5 shrink-0" />
              <span>Seepromenade 109<br/>AT-2384 Ebreichsdorf</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="text-[#00FF66] mt-0.5 shrink-0" />
              <a href="tel:+436643289599" className="hover:text-[#00FF66]">+43 / 0664 328 95 99</a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="text-[#00FF66] mt-0.5 shrink-0" />
              <a href="mailto:office@eco-building.tech" className="hover:text-[#00FF66]">office@eco-building.tech</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} ECO Building Technik — Alle Rechte vorbehalten.</span>
          <span className="font-mono">AT-2384 · EBREICHSDORF</span>
        </div>
      </div>
    </footer>
  );
}
