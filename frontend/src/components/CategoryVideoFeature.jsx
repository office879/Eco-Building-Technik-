import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Wifi, Cpu, Sparkles, Zap } from "lucide-react";
import { useLang } from "../context/I18nContext";

/**
 * Generic, ECO-branded category video spotlight.
 * Each category gets its own bilingual (DE/EN) copy from /config/categoryVideos.js
 * and a category-specific accent color.
 */
export default function CategoryVideoFeature({ config, categoryKey }) {
  const [playing, setPlaying] = useState(false);
  const { lang } = useLang();
  const useEN = lang === "EN";
  if (!config) return null;

  const t = (de, en) => (useEN ? en : de);
  const eyebrow = t(config.eyebrow_de, config.eyebrow_en);
  const title = t(config.title_de, config.title_en);
  const italic = t(config.italic_de, config.italic_en);
  const subtitle = t(config.subtitle_de, config.subtitle_en);
  const cta = t(config.cta_de, config.cta_en);
  const accent = config.accent || "#22d3ee";
  const poster = `https://i.ytimg.com/vi/${config.youtube_id}/maxresdefault.jpg`;

  return (
    <section
      className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-20 pt-12"
      data-testid={`category-video-${config.youtube_id}`}
      style={{ "--accent": accent }}
    >
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative">
        {/* Bilingual Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="eyebrow mb-5 flex items-center gap-2" style={{ color: accent }}>
              <Cpu size={12} /> {eyebrow}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
              {title} <span className="italic-accent">{italic}</span>
            </h2>
            <p className="mt-5 text-sm md:text-base text-white/65 leading-relaxed">
              {subtitle}
            </p>
            {/* Always show secondary language as subtle subtitle for bilingual branding */}
            <p className="mt-3 text-xs text-white/35 italic leading-relaxed">
              {useEN ? config.subtitle_de : config.subtitle_en}
            </p>
          </div>
          <Link
            to={`/shop?cat=${categoryKey || ""}`}
            className="btn-ghost self-start md:self-end"
            data-testid="category-video-shop-cta"
          >
            {cta} <ArrowRight size={14} />
          </Link>
        </div>

        {/* Video frame */}
        <div
          className="relative aspect-video border border-white/10 bg-black overflow-hidden group"
          style={{
            boxShadow: `0 0 0 1px ${accent}33, 0 30px 80px -20px ${accent}55`,
          }}
        >
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              data-testid="category-video-play"
              className="absolute inset-0 w-full h-full"
              aria-label="Video abspielen"
            >
              <img
                src={poster}
                alt={`${title} ${italic}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://i.ytimg.com/vi/${config.youtube_id}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1736] via-[#0B1736]/30 to-transparent" />
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}cc, transparent)` }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}cc, transparent)` }}
              />

              {/* ECO Building Branded watermark */}
              <span className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 bg-[#0B1736]/60 backdrop-blur-sm border border-white/15 text-[10px] tracking-[0.18em] uppercase">
                <Sparkles size={12} style={{ color: accent }} />
                <span className="text-white/90">ECO Building Technik</span>
              </span>

              {/* Play */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span
                  className="w-24 h-24 md:w-28 md:h-28 border-2 bg-[#0B1736]/40 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ borderColor: accent }}
                >
                  <Play size={36} fill="#fff" strokeWidth={1} />
                </span>
              </span>

              <span
                className="absolute bottom-5 left-5 px-3 py-1.5 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase"
                style={{ background: `${accent}1A`, border: `1px solid ${accent}66`, color: "#fff" }}
              >
                4K · {useEN ? "Tour" : "Tour"}
              </span>
              <span className="absolute bottom-5 right-5 text-[11px] tracking-[0.15em] uppercase text-white/70">
                {useEN ? "Click to play" : "Klicken zum Abspielen"}
              </span>
            </button>
          ) : (
            <iframe
              data-testid="category-video-iframe"
              title={`${title} video`}
              src={`https://www.youtube.com/embed/${config.youtube_id}?autoplay=1&rel=0&modestbranding=1`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Feature pills with DE + EN labels */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {config.pills.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-white/10 bg-white/[0.02] px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-white/70 transition-colors hover:border-white/30"
              style={{ "--hoverBorder": `${accent}66` }}
              data-testid={`category-pill-${i}`}
            >
              <Zap size={14} style={{ color: accent }} />
              <div>
                <div>{t(p.de, p.en)}</div>
                <div className="text-[9px] text-white/35 normal-case tracking-normal mt-0.5">
                  {useEN ? p.de : p.en}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
