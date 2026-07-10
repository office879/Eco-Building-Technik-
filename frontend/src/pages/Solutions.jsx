import React from "react";
import { Link } from "react-router-dom";
import { User, Shield, Briefcase, Building2, ArrowRight } from "lucide-react";
import { useLang } from "../context/I18nContext";

export default function Solutions() {
  const { t } = useLang();
  return (
    <div className="pt-32 pb-20" data-testid="solutions-page">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">{t("sol.eyebrow")}</div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] max-w-5xl">
          {t("sol.h1.1")} <span className="italic-accent">{t("sol.h1.italic")}</span><br/>{t("sol.h1.2")}
        </h1>
        <p className="mt-10 max-w-3xl text-base md:text-lg text-white/65 leading-relaxed">
          {t("sol.intro")}
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <Segment n="01" icon={User} title={t("sol.personal.t")} desc={t("sol.personal.d")} testid="seg-personal"/>
          <Segment n="02" icon={Shield} title={t("sol.insurance.t")} desc={t("sol.insurance.d")} testid="seg-insurance"/>
          <Segment n="03" icon={Briefcase} title={t("sol.business.t")} desc={t("sol.business.d")} testid="seg-business"/>
          <Segment n="04" icon={Building2} title={t("sol.enterprise.t")} desc={t("sol.enterprise.d")} testid="seg-enterprise"/>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-t border-white/10">
        <div className="eyebrow mb-10">{t("sol.stats")}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
          <Stat v="596" k={t("footer.tag.energy", "Wärmepumpen-Projekte")} label="Wärmepumpen-Projekte"/>
          <Stat v="1 Mio." k="Realisierte m²" label="Realisierte m²"/>
          <Stat v="56" k="Business-Partner" label="Business-Partner"/>
          <Stat v="30%" k="weniger Energie" label="weniger Energie"/>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="border border-white/10 p-12 md:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow mb-6">{t("nav.solutions")}</div>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05]">
                {t("sol.cta.h2")} <span className="italic-accent">{t("sol.cta.italic")}</span>
              </h2>
              <p className="mt-6 text-white/65 max-w-xl leading-relaxed">
                {t("sol.cta.sub")}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link to="/kontakt" className="btn-primary inline-flex" data-testid="solutions-cta">
                {t("sol.cta.btn")} <ArrowRight size={14}/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Segment({ n, icon: Icon, title, desc, testid }) {
  return (
    <div className="bg-[#0B1736] p-10 lg:p-14 min-h-[280px]" data-testid={testid}>
      <div className="flex items-start justify-between mb-10">
        <div className="font-display text-2xl text-white/40">{n}</div>
        <Icon size={22} strokeWidth={1.4} className="text-white/60"/>
      </div>
      <div className="font-display text-2xl mb-4">{title}</div>
      <div className="text-sm text-white/65 leading-relaxed">{desc}</div>
    </div>
  );
}

function Stat({ v, label }) {
  return (
    <div className="bg-[#0B1736] p-8">
      <div className="font-display text-3xl md:text-4xl whitespace-nowrap">{v}</div>
      <div className="text-[11px] tracking-[0.15em] uppercase text-white/45 mt-2">{label}</div>
    </div>
  );
}
