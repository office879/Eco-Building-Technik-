import React, { useState, useMemo } from "react";
import { Calculator, TrendingDown } from "lucide-react";

const TYPES = [
  { key: "altbau", label: "Altbau", sub: "bis 1995", w: 120 },
  { key: "neubau", label: "Neubau", sub: "ab 1995", w: 70 },
  { key: "kfw", label: "KfW", sub: "Effizienzhaus", w: 40 },
  { key: "passiv", label: "Passivhaus", sub: "", w: 15 },
];

const SOURCES = [
  { key: "strom", label: "Strom", price: 0.30 },
  { key: "gas", label: "Gas", price: 0.10 },
  { key: "oel", label: "Öl", price: 0.12 },
  { key: "waermepumpe", label: "Wärmepumpe", price: 0.075 },
];

export default function EnergyCalculator() {
  const [type, setType] = useState("neubau");
  const [area, setArea] = useState(140);
  const [source, setSource] = useState("gas");

  const result = useMemo(() => {
    const t = TYPES.find((x) => x.key === type);
    const s = SOURCES.find((x) => x.key === source);
    const heatLoad = (t.w * area) / 1000; // kW
    const annualKwh = heatLoad * 1800; // 1800 Vollbenutzungsstunden Heizen
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
    <div className="bg-[#0F0F0F] border border-zinc-900 overflow-hidden" data-testid="energy-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Inputs */}
        <div className="lg:col-span-3 p-8 lg:p-12">
          <div className="flex items-center gap-2 mb-6">
            <Calculator size={16} className="text-[#00FF66]" />
            <span className="eyebrow">Energie-Rechner</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-10">
            Berechnen Sie Ihre<br/>Heizkosten-Ersparnis.
          </h2>

          <div className="space-y-10">
            <div>
              <div className="eyebrow mb-4">Gebäudetyp</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setType(t.key)}
                    data-testid={`calc-type-${t.key}`}
                    className={`border p-4 text-left transition-all ${
                      type === t.key ? "border-[#00FF66] bg-[#00FF66]/5" : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-medium text-sm">{t.label}</div>
                    <div className="text-[10px] text-zinc-500 mt-1">{t.sub}</div>
                    <div className="font-mono text-xs text-[#00FF66] mt-2">{t.w} W/m²</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="eyebrow">Wohnfläche</div>
                <div className="font-mono text-[#00FF66]">{area} m²</div>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                data-testid="calc-area-slider"
                className="w-full accent-[#00FF66]"
              />
              <div className="flex justify-between mt-1 text-[10px] text-zinc-500 font-mono">
                <span>50 m²</span><span>500 m²</span>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-4">Aktuelle Energiequelle</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SOURCES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSource(s.key)}
                    data-testid={`calc-source-${s.key}`}
                    className={`border p-3 text-left transition-all ${
                      source === s.key ? "border-[#00FF66] bg-[#00FF66]/5" : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-medium text-sm">{s.label}</div>
                    <div className="font-mono text-[10px] text-zinc-500 mt-1">€{s.price.toFixed(2)}/kWh</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 bg-black p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-zinc-900">
          <div className="eyebrow mb-6">Ergebnis</div>

          <div className="space-y-6">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Heizlast</div>
              <div className="font-display text-4xl font-semibold" data-testid="calc-heatload">{result.heatLoad} kW</div>
              <div className="text-xs text-zinc-500 mt-1">Empfohlen: {result.wpTarget}</div>
            </div>

            <div className="hline"/>

            <div>
              <div className="text-xs text-zinc-500 mb-1">Jahresverbrauch</div>
              <div className="font-display text-2xl font-medium" data-testid="calc-kwh">{result.annualKwh.toLocaleString()} kWh</div>
            </div>

            <div className="hline"/>

            <div>
              <div className="text-xs text-zinc-500 mb-1">Kosten aktuell</div>
              <div className="font-display text-2xl font-medium text-zinc-400" data-testid="calc-current">
                € {result.currentCost.toLocaleString()}<span className="text-sm text-zinc-600">/Jahr</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-[#00FF66] mb-1">Mit Wärmepumpe</div>
              <div className="font-display text-2xl font-medium" data-testid="calc-wp">
                € {result.wpCost.toLocaleString()}<span className="text-sm text-zinc-500">/Jahr</span>
              </div>
            </div>

            <div className="p-5 border border-[#00FF66] bg-[#00FF66]/5">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown size={14} className="text-[#00FF66]"/>
                <span className="eyebrow text-[#00FF66]">Ersparnis/Jahr</span>
              </div>
              <div className="font-display text-3xl font-bold text-[#00FF66]" data-testid="calc-saving">
                € {result.saving.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
