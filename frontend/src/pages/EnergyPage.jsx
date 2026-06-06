import React from "react";
import EnergyCalculator from "../components/EnergyCalculator";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/I18nContext";

export default function EnergyPage() {
  const { t } = useLang();
  return (
    <div className="pt-32 pb-20" data-testid="energy-page">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 border-b border-white/10">
        <div className="eyebrow mb-6">{t("energy.eyebrow")}</div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] max-w-5xl">
          {t("energy.h1.1")} <span className="italic-accent">{t("energy.h1.italic")}</span> {t("energy.h1.2")}
        </h1>
        <p className="mt-8 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
          {t("energy.intro")}
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <EnergyCalculator/>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="border border-white/10 p-12 md:p-20 text-center">
          <div className="eyebrow mb-5">{t("energy.nextStep")}</div>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto leading-[1.05]">
            {t("energy.h2.1")}<br/><span className="italic-accent">{t("energy.h2.italic")}</span> {t("energy.h2.2")}
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/kontakt" className="btn-primary" data-testid="energy-cta-contact">
              {t("energy.ctaConsult")} <ArrowRight size={14}/>
            </Link>
            <Link to="/shop?cat=waermepumpen" className="btn-ghost" data-testid="energy-cta-shop">
              {t("energy.ctaShop")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
