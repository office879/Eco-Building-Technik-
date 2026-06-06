import React, { useState, useMemo } from "react";
import { TrendingDown } from "lucide-react";
import { useLang } from "../context/I18nContext";

const TYPE_KEYS = [
  { key: "altbau",  w: 120 },
  { key: "neubau",  w: 70 },
  { key: "kfw",     w: 40 },
  { key: "passiv",  w: 15 },
];

const SOURCE_KEYS = [
  { key: "strom",       price: 0.30 },
  { key: "gas",         price: 0.10 },
  { key: "oel",         price: 0.12 },
  { key: "waermepumpe", price: 0.075 },
];

export default function EnergyCalculator() {
  const { t } = useLang();
  const [type, setType] = useState("neubau");
  const [area, setArea] = useState(140);
  const [source, setSource] = useState("gas");

  const result = useMemo(() => {
    const tt = TYPE_KEYS.find((x) => x.key === type);
    const s = SOURCE_KEYS.find((x) => x.key === source);
    const heatLoad = (tt.w * area) / 1000;
    const annualKwh = heatLoad * 1800;
    const currentCost = annualKwh * s.price;
    const wpCost = annualKwh * 0.075;
    const saving = Math.max(0, currentCost - wpCost);
    return {
      heatLoad: heatLoad.toFixed(1),
      annualKwh: Math.round(annualKwh),
      currentCost: Math.round(currentCost),
      wpCost: Math.round(wpCost),
      saving: Math.round(saving),
      wpTarget: heatLoad < 8 ? "8 kW" : heatLoad < 12 ? "12 kW" : heatLoad < 16 ? "16 kW" : "20 kW+",
    };
  }, [type, area, source]);

  return (
    <div className="border border-white/10" data-testid="energy-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3 p-10 lg:p-14 border-r border-white/10">
          <div className="eyebrow mb-8">{t("energy.eyebrow")}</div>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-12">
            {t("calc.h2.1")}<br/><span className="italic-accent text-4xl md:text-5xl">{t("calc.h2.italic")}</span>
          </h2>

          <div className="space-y-10">
            <div>
              <div className="eyebrow mb-4">{t("calc.buildingType")}</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TYPE_KEYS.map((tt) => (
                  <button
                    key={tt.key}
                    onClick={() => setType(tt.key)}
                    data-testid={`calc-type-${tt.key}`}
                    className={`border p-4 text-left transition-all ${
                      type === tt.key ? "border-white bg-white/5" : "border-white/15 hover:border-white/40"
                    }`}
                  >
                    <div className="font-medium text-sm">{t(`calc.type.${tt.key}`)}</div>
                    <div className="text-[10px] text-white/50 mt-1">{t(`calc.type.${tt.key}Sub`, "")}</div>
                    <div className="text-xs text-white/70 mt-2 tracking-wider">{tt.w} W/m²</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="eyebrow">{t("calc.area")}</div>
                <div className="text-white tabular-nums">{area} m²</div>
              </div>
              <input
                type="range" min={50} max={500} step={10}
                value={area} onChange={(e) => setArea(Number(e.target.value))}
                data-testid="calc-area-slider"
                className="w-full accent-white"
              />
              <div className="flex justify-between mt-1 text-[10px] text-white/40 uppercase tracking-wider">
                <span>50 m²</span><span>500 m²</span>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-4">{t("calc.source")}</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SOURCE_KEYS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSource(s.key)}
                    data-testid={`calc-source-${s.key}`}
                    className={`border p-3 text-left transition-all ${
                      source === s.key ? "border-white bg-white/5" : "border-white/15 hover:border-white/40"
                    }`}
                  >
                    <div className="font-medium text-sm">{t(`calc.src.${s.key}`)}</div>
                    <div className="text-[10px] text-white/50 mt-1">€{s.price.toFixed(2)}/kWh</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 p-10 lg:p-14">
          <div className="eyebrow mb-8">{t("calc.result")}</div>
          <div className="space-y-7">
            <div>
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">{t("calc.heatLoad")}</div>
              <div className="font-display text-4xl" data-testid="calc-heatload">{result.heatLoad} kW</div>
              <div className="text-xs text-white/50 mt-1">{t("calc.recommended")}: {result.wpTarget}</div>
            </div>
            <div className="hline"/>
            <div>
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">{t("calc.annualKwh")}</div>
              <div className="font-display text-2xl" data-testid="calc-kwh">{result.annualKwh.toLocaleString()} kWh</div>
            </div>
            <div className="hline"/>
            <div>
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">{t("calc.currentCost")}</div>
              <div className="font-display text-2xl text-white/70" data-testid="calc-current">
                € {result.currentCost.toLocaleString()}<span className="text-sm text-white/40">{t("calc.year")}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">{t("calc.withWp")}</div>
              <div className="font-display text-2xl" data-testid="calc-wp">
                € {result.wpCost.toLocaleString()}<span className="text-sm text-white/50">{t("calc.year")}</span>
              </div>
            </div>
            <div className="p-6 border border-white bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={14}/>
                <span className="eyebrow text-white">{t("calc.savingYear")}</span>
              </div>
              <div className="font-display text-3xl" data-testid="calc-saving">
                € {result.saving.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
