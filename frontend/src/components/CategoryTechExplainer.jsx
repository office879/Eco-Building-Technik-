import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import { useLang } from "../context/I18nContext";

/**
 * ECO Building Technik — proprietary Category Tech Explainer.
 * Replaces external YouTube videos with a 100 % in-house technical visualisation:
 *   • Animated SVG schematic specific to each technology
 *   • 4-step process flow
 *   • Spec table (4–6 key parameters)
 *   • Bilingual DE / EN / RU / UA
 */
export default function CategoryTechExplainer({ config, categoryKey }) {
  const { lang } = useLang();
  if (!config) return null;
  const pick = (m) => (m && (m[lang] || m.DE)) ?? "";
  const accent = config.accent || "#22d3ee";

  return (
    <section
      className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-20 pt-12"
      data-testid={`category-tech-${categoryKey}`}
      style={{ "--accent": accent }}
    >
      {/* Technical grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="eyebrow mb-5 flex items-center gap-2" style={{ color: accent }}>
              <Cpu size={12}/> {pick(config.eyebrow)}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
              {pick(config.title)} <span className="italic-accent">{pick(config.italic)}</span>
            </h2>
            <p className="mt-5 text-sm md:text-base text-white/65 leading-relaxed">
              {pick(config.subtitle)}
            </p>
          </div>
          <Link
            to={`/shop?cat=${categoryKey || ""}`}
            className="btn-ghost self-start md:self-end whitespace-nowrap"
            data-testid="category-tech-shop-cta"
          >
            {pick(config.cta)} <ArrowRight size={14}/>
          </Link>
        </div>

        {/* In-house video (only when config.video present) */}
        {config.video && (
          <div className="mb-10 border border-white/10 bg-black overflow-hidden relative" data-testid={`category-tech-video-${categoryKey}`}>
            <div className="aspect-video md:aspect-[21/9] relative">
              <video
                src={config.video}
                poster={config.videoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                className="absolute inset-0 w-full h-full object-cover"
                data-testid={`category-tech-video-el-${categoryKey}`}
              />
              <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#0B1736]/80 backdrop-blur-sm border border-white/10 text-[10px] tracking-[0.18em] uppercase z-10">
                <Sparkles size={11} style={{ color: accent }}/>
                <span className="text-white/80">ECO Building Technik · Original-Film</span>
              </div>
            </div>
          </div>
        )}

        {/* Schematic + Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/10 bg-[#0E1A3E]/30">
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10 relative">
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#0B1736]/80 backdrop-blur-sm border border-white/10 text-[10px] tracking-[0.18em] uppercase z-10">
              <Sparkles size={11} style={{ color: accent }}/>
              <span className="text-white/80">ECO · Technik-Schema</span>
            </div>
            <Schematic type={config.schematic} accent={accent}/>
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10">
            <div className="eyebrow mb-6">Prozess · 4 Schritte</div>
            <ol className="space-y-6">
              {config.steps.map((step, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-5" data-testid={`tech-step-${i+1}`}>
                  <div className="flex flex-col items-center pt-1">
                    <div
                      className="font-display text-lg w-10 h-10 border flex items-center justify-center"
                      style={{ borderColor: `${accent}88`, color: accent }}
                    >
                      {step.num}
                    </div>
                    {i < config.steps.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(180deg, ${accent}66, transparent)` }}/>
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="font-display text-base md:text-lg leading-tight mb-1.5">{pick(step.label)}</div>
                    <div className="text-xs md:text-sm text-white/60 leading-relaxed">{pick(step.desc)}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Spec table */}
        <div className="mt-10 border border-white/10 bg-[#0E1A3E]/20">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="eyebrow" style={{ color: accent }}>Technische Daten</div>
            <div className="text-[10px] text-white/40 tracking-[0.18em] uppercase">Werkseitig · A+++</div>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {config.specs.map((s, i) => (
              <div
                key={i}
                className="p-5 border-r last:border-r-0 border-b md:border-b-0 border-white/10"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                data-testid={`tech-spec-${i}`}
              >
                <dt className="text-[10px] tracking-[0.15em] uppercase text-white/45 mb-2 leading-tight min-h-[24px]">{pick(s.label)}</dt>
                <dd className="font-display text-xl md:text-2xl leading-none mb-1" style={{ color: accent }}>{s.value}</dd>
                <div className="text-[10px] text-white/40 tracking-wider">{typeof s.unit === "object" ? pick(s.unit) : s.unit}</div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ============ SVG Schematics ============ */
function Schematic({ type, accent }) {
  const map = {
    "heat-pump-cycle":  HeatPumpCycle,
    "condensing-boiler": CondensingBoiler,
    "smart-home-mesh":  SmartHomeMesh,
    "lighting-spectrum": LightingSpectrum,
    "energy-flow":      EnergyFlow,
    "water-filter":     WaterFilter,
  };
  const C = map[type] || HeatPumpCycle;
  return (
    <div className="aspect-[7/5] w-full p-6">
      <C accent={accent}/>
    </div>
  );
}

const COMMON_LBL = "font-display text-[10px] uppercase tracking-[0.15em]";

function HeatPumpCycle({ accent }) {
  return (
    <svg viewBox="0 0 700 500" className="w-full h-full" data-testid="schematic-heatpump">
      <defs>
        <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={accent}/>
        </marker>
      </defs>
      {/* nodes */}
      {[
        { x: 140, y: 110, lbl: "VERDAMPFER", sub: "−5 → 5 °C" },
        { x: 560, y: 110, lbl: "KOMPRESSOR", sub: "→ 75 °C" },
        { x: 560, y: 390, lbl: "KONDENSATOR", sub: "→ Heizwasser" },
        { x: 140, y: 390, lbl: "EXPANSIONSVENTIL", sub: "Druckabbau" },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x - 90} y={n.y - 40} width="180" height="80" fill="#0B1736" stroke={accent} strokeWidth="1.5"/>
          <text x={n.x} y={n.y - 5} textAnchor="middle" fill="#fff" className={COMMON_LBL} fontSize="12">{n.lbl}</text>
          <text x={n.x} y={n.y + 18} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">{n.sub}</text>
        </g>
      ))}
      {/* flow arrows (clockwise cycle) */}
      <g fill="none" stroke={accent} strokeWidth="2" markerEnd="url(#ah)">
        <line x1="230" y1="110" x2="470" y2="110" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="560" y1="150" x2="560" y2="350" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="470" y1="390" x2="230" y2="390" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="140" y1="350" x2="140" y2="150" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite"/>
        </line>
      </g>
      {/* refrigerant label */}
      <g>
        <circle cx="350" cy="250" r="42" fill="#0B1736" stroke={accent} strokeWidth="1"/>
        <text x="350" y="245" textAnchor="middle" fill={accent} className="font-display" fontSize="20">R290</text>
        <text x="350" y="265" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">PROPAN · GWP 3</text>
      </g>
      {/* pressure side labels */}
      <text x="350" y="95" textAnchor="middle" fill="rgba(120,210,255,0.7)" fontSize="9" letterSpacing="2">⬢ NIEDERDRUCK · GAS</text>
      <text x="350" y="420" textAnchor="middle" fill="rgba(255,150,80,0.8)" fontSize="9" letterSpacing="2">⬢ HOCHDRUCK · FLÜSSIG</text>
    </svg>
  );
}

function CondensingBoiler({ accent }) {
  return (
    <svg viewBox="0 0 700 500" className="w-full h-full" data-testid="schematic-boiler">
      <defs>
        <marker id="ab" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={accent}/>
        </marker>
      </defs>
      {/* Outer casing */}
      <rect x="120" y="70" width="460" height="360" fill="#0B1736" stroke={accent} strokeWidth="1.5"/>
      <text x="350" y="55" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" letterSpacing="2">GAS-BRENNWERTKESSEL</text>

      {/* Burner */}
      <rect x="170" y="100" width="120" height="70" fill="rgba(255,80,40,0.15)" stroke={accent} strokeWidth="1"/>
      <text x="230" y="130" textAnchor="middle" fill="#fff" fontSize="11" className={COMMON_LBL}>BRENNER</text>
      <text x="230" y="148" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">~1100 °C</text>
      {/* flame icon */}
      <path d="M180 175 q5 -15 12 -10 q-2 -10 8 -15 q3 12 -2 18 q12 -2 14 8 q-3 13 -16 13 q-12 0 -16 -14z" fill={accent} opacity="0.55"/>

      {/* Primary HX */}
      <rect x="170" y="200" width="120" height="80" fill="rgba(255,210,100,0.08)" stroke={accent} strokeWidth="1"/>
      <text x="230" y="230" textAnchor="middle" fill="#fff" fontSize="11" className={COMMON_LBL}>PRIMÄR-WT</text>
      <text x="230" y="248" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">80 % Wärme</text>
      {/* coil indicator */}
      <path d="M180 270 q15 -10 30 0 q15 10 30 0 q15 -10 30 0" stroke={accent} strokeWidth="2" fill="none"/>

      {/* Condensing HX */}
      <rect x="170" y="310" width="120" height="80" fill="rgba(56,189,248,0.10)" stroke={accent} strokeWidth="1"/>
      <text x="230" y="340" textAnchor="middle" fill="#fff" fontSize="11" className={COMMON_LBL}>KONDENSATION</text>
      <text x="230" y="358" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">+11 % Energie</text>
      <path d="M180 378 q15 -8 30 0 q15 8 30 0 q15 -8 30 0" stroke="#38bdf8" strokeWidth="2" fill="none"/>

      {/* Gas input */}
      <line x1="50" y1="135" x2="170" y2="135" stroke={accent} strokeWidth="2" markerEnd="url(#ab)"/>
      <text x="50" y="125" fill="rgba(255,255,255,0.5)" fontSize="9">GAS</text>

      {/* Heating water flow */}
      <line x1="290" y1="240" x2="540" y2="240" stroke="#ff6f6f" strokeWidth="2" markerEnd="url(#ab)" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite"/>
      </line>
      <text x="415" y="230" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">HEIZUNG-VORLAUF · 60 °C</text>

      <line x1="540" y1="350" x2="290" y2="350" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#ab)" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite"/>
      </line>
      <text x="415" y="370" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">RÜCKLAUF · 40 °C</text>

      {/* Condensate drain */}
      <line x1="230" y1="390" x2="230" y2="450" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#ab)"/>
      <text x="245" y="445" fill="rgba(56,189,248,0.7)" fontSize="9">H₂O · KONDENSAT</text>

      {/* Efficiency badge */}
      <g transform="translate(560 100)">
        <rect x="-50" y="0" width="100" height="80" fill="#0B1736" stroke={accent} strokeWidth="1.5"/>
        <text x="0" y="22" textAnchor="middle" fill={accent} className="font-display" fontSize="26">109%</text>
        <text x="0" y="42" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">EFFIZIENZ</text>
        <text x="0" y="58" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8">A · ErP</text>
      </g>
    </svg>
  );
}

function SmartHomeMesh({ accent }) {
  const devices = [
    { x: 120, y: 110, label: "LIGHT" },
    { x: 580, y: 110, label: "CAM" },
    { x: 580, y: 390, label: "SENSOR" },
    { x: 120, y: 390, label: "THERMO" },
    { x: 350, y: 70,  label: "LOCK" },
    { x: 350, y: 430, label: "SPEAKER" },
  ];
  return (
    <svg viewBox="0 0 700 500" className="w-full h-full" data-testid="schematic-smarthome">
      {/* mesh connections */}
      <g stroke={accent} strokeWidth="1" fill="none" opacity="0.5">
        {devices.map((d, i) => (
          <line key={i} x1="350" y1="250" x2={d.x} y2={d.y} strokeDasharray="3 5">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
          </line>
        ))}
        {/* peripheral mesh */}
        <path d={`M${devices[0].x} ${devices[0].y} L${devices[4].x} ${devices[4].y} L${devices[1].x} ${devices[1].y} L${devices[2].x} ${devices[2].y} L${devices[5].x} ${devices[5].y} L${devices[3].x} ${devices[3].y} Z`} strokeDasharray="2 4" opacity="0.3"/>
      </g>

      {/* Central hub */}
      <g>
        <circle cx="350" cy="250" r="70" fill="#0B1736" stroke={accent} strokeWidth="2"/>
        <circle cx="350" cy="250" r="80" fill="none" stroke={accent} strokeWidth="1" opacity="0.4">
          <animate attributeName="r" from="80" to="100" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="350" y="245" textAnchor="middle" fill={accent} className="font-display" fontSize="18">EDGE</text>
        <text x="350" y="265" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">HUB · ARM-A55</text>
        <text x="350" y="280" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8">AES-128 · 2 GB</text>
      </g>

      {/* Device nodes */}
      {devices.map((d, i) => (
        <g key={i}>
          <rect x={d.x - 35} y={d.y - 18} width="70" height="36" fill="#0B1736" stroke={accent} strokeWidth="1"/>
          <text x={d.x} y={d.y + 4} textAnchor="middle" fill="#fff" fontSize="10" className={COMMON_LBL}>{d.label}</text>
        </g>
      ))}

      {/* Protocols legend */}
      <g>
        <rect x="30" y="20" width="640" height="30" fill="#0B1736" stroke={accent} strokeWidth="0.5" opacity="0.85"/>
        <text x="80" y="40" fill={accent} fontSize="10" letterSpacing="2">● ZIGBEE 3.0</text>
        <text x="220" y="40" fill={accent} fontSize="10" letterSpacing="2">● WI-FI 6</text>
        <text x="340" y="40" fill={accent} fontSize="10" letterSpacing="2">● MATTER</text>
        <text x="620" y="40" textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="10" letterSpacing="2">200+ GERÄTE · AES-128</text>
      </g>
    </svg>
  );
}

function LightingSpectrum({ accent }) {
  return (
    <svg viewBox="0 0 700 500" className="w-full h-full" data-testid="schematic-lighting">
      <defs>
        <linearGradient id="ctgrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff9b3a"/>
          <stop offset="50%" stopColor="#fff4d6"/>
          <stop offset="100%" stopColor="#b3d8ff"/>
        </linearGradient>
        <linearGradient id="rgbgrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff3b3b"/>
          <stop offset="33%" stopColor="#ffd43b"/>
          <stop offset="50%" stopColor="#3bff8c"/>
          <stop offset="66%" stopColor="#3b9fff"/>
          <stop offset="100%" stopColor="#c84cff"/>
        </linearGradient>
      </defs>

      {/* Tunable White bar */}
      <g transform="translate(80 90)">
        <text x="0" y="-10" fill="#fff" fontSize="11" className={COMMON_LBL}>TUNABLE WHITE · 2200–6500 K</text>
        <rect x="0" y="0" width="540" height="56" fill="url(#ctgrad)" opacity="0.9"/>
        <rect x="0" y="0" width="540" height="56" fill="none" stroke={accent} strokeWidth="1"/>
        {[2200, 2700, 3000, 4000, 5000, 6500].map((k, i) => (
          <g key={i}>
            <line x1={i * 108} y1="56" x2={i * 108} y2="68" stroke="#fff" opacity="0.5"/>
            <text x={i * 108} y="82" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">{k}K</text>
          </g>
        ))}
      </g>

      {/* RGB spectrum bar */}
      <g transform="translate(80 200)">
        <text x="0" y="-10" fill="#fff" fontSize="11" className={COMMON_LBL}>RGB · 16 Mio. Farben · CRI &gt; 90</text>
        <rect x="0" y="0" width="540" height="56" fill="url(#rgbgrad)" opacity="0.85"/>
        <rect x="0" y="0" width="540" height="56" fill="none" stroke={accent} strokeWidth="1"/>
        <text x="0" y="82" fill="rgba(255,255,255,0.55)" fontSize="9">R 255</text>
        <text x="200" y="82" fill="rgba(255,255,255,0.55)" fontSize="9">G 255</text>
        <text x="400" y="82" fill="rgba(255,255,255,0.55)" fontSize="9">B 255</text>
        <text x="500" y="82" textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="9">PWM &gt; 3 kHz</text>
      </g>

      {/* LED schematic */}
      <g transform="translate(150 320)">
        {[
          { x: 0, c: "#ff3b3b", l: "R" },
          { x: 110, c: "#3bff8c", l: "G" },
          { x: 220, c: "#3b9fff", l: "B" },
          { x: 330, c: "#fff4d6", l: "W" },
        ].map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy="40" r="28" fill={d.c} opacity="0.7"/>
            <circle cx={d.x} cy="40" r="32" fill="none" stroke={accent} strokeWidth="1"/>
            <text x={d.x} y="44" textAnchor="middle" fill="#0B1736" className="font-display" fontSize="18">{d.l}</text>
          </g>
        ))}
        <text x="180" y="105" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9" letterSpacing="2">VIER-CHIP LED · 50 000 h</text>
      </g>
    </svg>
  );
}

function EnergyFlow({ accent }) {
  return (
    <svg viewBox="0 0 700 500" className="w-full h-full" data-testid="schematic-energy">
      <defs>
        <marker id="ae" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={accent}/>
        </marker>
      </defs>

      {/* Sun */}
      <g transform="translate(95 100)">
        <circle r="34" fill="rgba(255,200,40,0.18)" stroke={accent} strokeWidth="1.5"/>
        <circle r="22" fill={accent} opacity="0.7"/>
        {[...Array(8)].map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <line key={i} x1={Math.cos(a) * 26} y1={Math.sin(a) * 26} x2={Math.cos(a) * 40} y2={Math.sin(a) * 40} stroke={accent} strokeWidth="2"/>;
        })}
        <text y="65" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9" letterSpacing="2">SONNE</text>
      </g>

      {/* PV panel */}
      <g transform="translate(220 70)">
        <rect width="120" height="60" fill="rgba(56,150,255,0.15)" stroke={accent} strokeWidth="1.5"/>
        <g stroke={accent} strokeWidth="0.5" opacity="0.6">
          <line x1="40" y1="0" x2="40" y2="60"/>
          <line x1="80" y1="0" x2="80" y2="60"/>
          <line x1="0" y1="30" x2="120" y2="30"/>
        </g>
        <text x="60" y="35" textAnchor="middle" fill="#fff" fontSize="10" className={COMMON_LBL}>PV-MODULE</text>
        <text x="60" y="80" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">DC · 400 V · 22,8 %</text>
      </g>

      {/* Hybrid inverter */}
      <g transform="translate(400 70)">
        <rect width="120" height="60" fill="#0B1736" stroke={accent} strokeWidth="2"/>
        <text x="60" y="28" textAnchor="middle" fill={accent} className="font-display" fontSize="14">HYBRID</text>
        <text x="60" y="48" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">INVERTER</text>
        <text x="60" y="80" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">DC → AC · 230 V</text>
      </g>

      {/* Battery */}
      <g transform="translate(400 220)">
        <rect width="120" height="60" fill="rgba(34,200,150,0.1)" stroke={accent} strokeWidth="1.5"/>
        <text x="60" y="28" textAnchor="middle" fill="#fff" fontSize="10" className={COMMON_LBL}>LiFePO₄</text>
        <text x="60" y="44" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">5–20 kWh</text>
        <rect x="-12" y="20" width="10" height="20" fill={accent}/>
        <text x="60" y="80" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">6000+ ZYKLEN · 95 %</text>
      </g>

      {/* Loads */}
      {[
        { x: 80, y: 360, l: "HAUS" },
        { x: 230, y: 360, l: "WP" },
        { x: 380, y: 360, l: "WALLBOX" },
        { x: 530, y: 360, l: "NETZ" },
      ].map((d, i) => (
        <g key={i} transform={`translate(${d.x} ${d.y})`}>
          <rect width="90" height="50" fill="#0B1736" stroke={accent} strokeWidth="1"/>
          <text x="45" y="32" textAnchor="middle" fill="#fff" fontSize="10" className={COMMON_LBL}>{d.l}</text>
        </g>
      ))}

      {/* Flow lines */}
      <g stroke={accent} strokeWidth="2" fill="none" markerEnd="url(#ae)">
        <line x1="135" y1="100" x2="215" y2="100"/>
        <line x1="345" y1="100" x2="395" y2="100"/>
        <line x1="460" y1="135" x2="460" y2="215" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="460" y1="280" x2="460" y2="355" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="400" y1="160" x2="125" y2="355" strokeDasharray="6 4" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite"/>
        </line>
        <line x1="500" y1="160" x2="575" y2="355" strokeDasharray="6 4" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite"/>
        </line>
      </g>

      <text x="350" y="445" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2">EIGENVERBRAUCH · 80 % · MODBUS + KNX</text>
    </svg>
  );
}

function WaterFilter({ accent }) {
  const stages = [
    { l: "PP", sub: "5 µm" },
    { l: "CTO", sub: "Kohle" },
    { l: "RO", sub: "0,0001 µm" },
    { l: "MIN", sub: "Ca/Mg" },
    { l: "UV", sub: "LED" },
  ];
  return (
    <svg viewBox="0 0 700 500" className="w-full h-full" data-testid="schematic-water">
      <defs>
        <marker id="aw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={accent}/>
        </marker>
        <linearGradient id="purity" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5a2b"/>
          <stop offset="50%" stopColor="#6db8db"/>
          <stop offset="100%" stopColor="#cdeaff"/>
        </linearGradient>
      </defs>

      {/* Input water */}
      <g transform="translate(40 230)">
        <circle r="34" fill="rgba(139,90,43,0.25)" stroke={accent} strokeWidth="1"/>
        <text y="4" textAnchor="middle" fill="#fff" fontSize="10" className={COMMON_LBL}>ROH-H₂O</text>
        <text y="55" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">LEITUNG</text>
      </g>

      {/* 5 stages */}
      {stages.map((s, i) => (
        <g key={i} transform={`translate(${130 + i * 100} 200)`}>
          <rect width="80" height="100" fill="#0B1736" stroke={accent} strokeWidth="1.5"/>
          <text x="40" y="40" textAnchor="middle" fill={accent} className="font-display" fontSize="22">{i + 1}</text>
          <text x="40" y="62" textAnchor="middle" fill="#fff" fontSize="10" className={COMMON_LBL}>{s.l}</text>
          <text x="40" y="80" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">{s.sub}</text>
        </g>
      ))}

      {/* Connecting flow */}
      <line x1="78" y1="230" x2="125" y2="230" stroke={accent} strokeWidth="2" markerEnd="url(#aw)"/>
      {stages.slice(0, -1).map((_, i) => (
        <line key={i} x1={210 + i * 100} y1="250" x2={225 + i * 100} y2="250" stroke={accent} strokeWidth="2" markerEnd="url(#aw)"/>
      ))}

      {/* Tank output */}
      <g transform="translate(640 230)">
        <circle r="34" fill="rgba(205,234,255,0.3)" stroke={accent} strokeWidth="1.5"/>
        <text y="4" textAnchor="middle" fill="#fff" fontSize="10" className={COMMON_LBL}>PUR</text>
        <text y="55" textAnchor="middle" fill={accent} fontSize="9">99,9 %</text>
      </g>
      <line x1="610" y1="250" x2="610" y2="250" stroke={accent} strokeWidth="2"/>
      <line x1="625" y1="250" x2="625" y2="250" stroke={accent} strokeWidth="2"/>

      {/* purity gradient bar */}
      <g transform="translate(40 350)">
        <rect width="620" height="14" fill="url(#purity)" opacity="0.85"/>
        <rect width="620" height="14" fill="none" stroke={accent} strokeWidth="1"/>
        <text x="0" y="32" fill="rgba(139,90,43,0.9)" fontSize="9">VERSCHMUTZT</text>
        <text x="310" y="32" textAnchor="middle" fill="rgba(109,184,219,0.9)" fontSize="9">FILTRATION</text>
        <text x="620" y="32" textAnchor="end" fill="rgba(205,234,255,0.9)" fontSize="9">99,9 % REIN</text>
      </g>

      {/* Spec note */}
      <text x="350" y="430" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2">5-STUFEN-KASKADE · 75 GPD · 11 L TANK</text>
    </svg>
  );
}
