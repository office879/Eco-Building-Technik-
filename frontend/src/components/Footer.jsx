import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useLang } from "../context/I18nContext";

export default function Footer() {
  const { t } = useLang();
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
            {t("footer.companyDesc")}
          </p>
          <div className="flex items-center gap-4 mt-7 text-[11px] tracking-[0.15em] uppercase text-white/40 font-medium">
            <span>{t("footer.tag.energy")}</span>
            <span className="text-white/20">·</span>
            <span>{t("footer.tag.subsidy")}</span>
            <span className="text-white/20">·</span>
            <span>{t("footer.tag.location")}</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow mb-5">{t("footer.navigation")}</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="text-white/80 hover:text-white">{t("nav.start")}</Link></li>
            <li><Link to="/shop" className="text-white/80 hover:text-white">{t("nav.shop")}</Link></li>
            <li><Link to="/energie-rechner" className="text-white/80 hover:text-white">{t("nav.energy")}</Link></li>
            <li><Link to="/ueber-uns" className="text-white/80 hover:text-white">{t("nav.about")}</Link></li>
            <li><Link to="/kontakt" className="text-white/80 hover:text-white">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow mb-5">{t("footer.contact")}</div>
          <ul className="space-y-4 text-sm text-white/80">
            <li>
              <div className="text-white/50 text-xs mb-1">{t("footer.address")}</div>
              Seepromenade 109<br/>
              AT-2384 Ebreichsdorf<br/>
              Österreich
            </li>
            <li>
              <div className="text-white/50 text-xs mb-1">{t("footer.mobile")}</div>
              <a href="tel:+436643289599" className="hover:text-white">+43 / 0664 328 95 99</a>
            </li>
            <li>
              <div className="text-white/50 text-xs mb-1">{t("form.email")}</div>
              <a href="mailto:office@eco-building.tech" className="hover:text-white">office@eco-building.tech</a>
            </li>
            <li>
              <div className="text-white/50 text-xs mb-1">{t("footer.web")}</div>
              <a href="https://www.eco-building.tech" target="_blank" rel="noreferrer" className="hover:text-white">www.eco-building.tech</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.12em] uppercase text-white/40 font-medium">
          <span>© {new Date().getFullYear()} ECO Building Technik GmbH — {t("footer.copyright")}</span>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="hover:text-white" data-testid="footer-impressum">{t("footer.impressum")}</Link>
            <Link to="/datenschutz" className="hover:text-white" data-testid="footer-datenschutz">{t("footer.privacy")}</Link>
            <Link to="/agb" className="hover:text-white" data-testid="footer-agb">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
