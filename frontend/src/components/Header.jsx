import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/I18nContext";
import Logo from "./Logo";

const nav = [
  { to: "/", label: "Start" },
  { to: "/shop", label: "Shop" },
  { to: "/energie-rechner", label: "Energie-Rechner" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const { count, setIsOpen } = useCart();
  const { lang, setLang, supported } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0B1736]/95 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" data-testid="logo-link" className="flex items-center gap-3 group">
          <Logo size="md"/>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm tracking-[0.18em]">ECO BUILDING</div>
            <div className="eyebrow text-[10px] mt-0.5">TECHNIK GMBH</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.to.replace("/", "") || "home"}`}
              className={({ isActive }) =>
                `text-xs font-semibold tracking-[0.18em] uppercase pb-1 border-b transition-colors ${
                  isActive
                    ? "text-white border-white"
                    : "text-white/70 border-transparent hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center" data-testid="lang-switcher">
            {supported.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                data-testid={`lang-${l.toLowerCase()}`}
                className={`lang-btn ${lang === l ? "active" : ""}`}
                aria-label={`Sprache ${l}`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            data-testid="header-cart-button"
            className="relative w-11 h-11 border border-white/30 hover:border-white flex items-center justify-center transition-colors"
            aria-label="Anfragekorb"
          >
            <ShoppingCart size={16} strokeWidth={1.6}/>
            {count > 0 && (
              <span
                data-testid="cart-count-badge"
                className="absolute -top-1.5 -right-1.5 bg-white text-[#0B1736] text-[10px] font-bold w-5 h-5 flex items-center justify-center"
              >
                {count}
              </span>
            )}
          </button>

          <Link to="/kontakt" data-testid="header-cta" className="btn-primary text-[11px] !py-3 !px-5">
            Beratung anfragen
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            data-testid="mobile-cart-button"
            className="relative w-10 h-10 border border-white/30 flex items-center justify-center"
          >
            <ShoppingCart size={14}/>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-[#0B1736] text-[10px] font-bold w-4 h-4 flex items-center justify-center">{count}</span>
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 border border-white/30 flex items-center justify-center"
            data-testid="mobile-menu-toggle"
            aria-label="Menü"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0B1736] border-t border-white/10" data-testid="mobile-menu">
          <nav className="px-6 py-6 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className="text-xs uppercase tracking-[0.18em] py-4 border-b border-white/10"
                data-testid={`mobile-nav-${n.to.replace("/", "") || "home"}`}
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/kontakt" className="btn-primary mt-6 justify-center" data-testid="mobile-cta">
              Beratung anfragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
