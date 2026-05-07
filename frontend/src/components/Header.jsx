import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";

const nav = [
  { to: "/", label: "Start" },
  { to: "/shop", label: "Shop" },
  { to: "/energie-rechner", label: "Energie-Rechner" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const { count, setIsOpen } = useCart();
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
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" data-testid="logo-link" className="flex items-center gap-2 group">
          <div className="w-9 h-9 border border-[#00FF66] flex items-center justify-center group-hover:bg-[#00FF66] transition-colors">
            <Zap size={16} className="text-[#00FF66] group-hover:text-black" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm tracking-tight">ECO BUILDING</div>
            <div className="eyebrow text-[10px]">TECHNIK · A+++</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.to.replace("/", "") || "home"}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-[#00FF66]" : "text-zinc-300 hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            data-testid="header-cart-button"
            className="relative p-2 border border-zinc-800 hover:border-[#00FF66] transition-colors"
            aria-label="Anfragekorb"
          >
            <ShoppingCart size={18} />
            {count > 0 && (
              <span
                data-testid="cart-count-badge"
                className="absolute -top-2 -right-2 bg-[#00FF66] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center"
              >
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 border border-zinc-800"
            data-testid="mobile-menu-toggle"
            aria-label="Menü"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-black border-t border-zinc-900" data-testid="mobile-menu">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className="text-base py-2 border-b border-zinc-900"
                data-testid={`mobile-nav-${n.to.replace("/", "") || "home"}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
