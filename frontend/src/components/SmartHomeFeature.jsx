import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Wifi, Cpu, Smartphone, Lightbulb } from "lucide-react";

// Modern Smart Home tour — Aqara Smart Home Tour by HomeAutomationX
const YOUTUBE_ID = "mYiSfFVnz3U";
const POSTER = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;

/**
 * Hi-tech Smart Home spotlight section with a YouTube embed.
 * Modern aesthetic with grid overlay & glow accent — matches the dark navy theme.
 */
export default function SmartHomeFeature() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-28 pt-12"
      data-testid="smarthome-feature"
    >
      {/* Subtle grid backdrop for tech feel */}
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-2">
              <Cpu size={12} className="text-cyan-300" />
              Smart Home · Hi-Tech Living
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
              Vernetztes <span className="italic-accent">Wohnen.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm md:text-base text-white/65 leading-relaxed">
              WiFi · Zigbee 3.0 · Matter. Über 200 Smart-Devices steuern Sie zentral mit App,
              Stimme oder Automation. Sehen Sie ein komplettes Setup in Aktion.
            </p>
          </div>
          <Link
            to="/shop?cat=smart-home"
            className="btn-ghost self-start md:self-end"
            data-testid="smarthome-shop-link"
          >
            Smart Home Shop <ArrowRight size={14} />
          </Link>
        </div>

        {/* Video container with neon glow */}
        <div
          className="relative aspect-video border border-white/10 bg-black overflow-hidden group"
          style={{
            boxShadow:
              "0 0 0 1px rgba(34,211,238,0.12), 0 30px 80px -20px rgba(34,211,238,0.25)",
          }}
        >
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              data-testid="smarthome-play-btn"
              className="absolute inset-0 w-full h-full"
              aria-label="Smart Home Video abspielen"
            >
              <img
                src={POSTER}
                alt="Smart Home Tour Poster"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
                }}
              />
              {/* Tinted overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1736] via-[#0B1736]/30 to-transparent" />
              {/* Cyan scan-line strip */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

              {/* Center play */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-24 h-24 md:w-28 md:h-28 border-2 border-cyan-300 bg-[#0B1736]/40 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play size={36} fill="#fff" strokeWidth={1} />
                </span>
              </span>

              {/* Tag chip bottom-left */}
              <span className="absolute bottom-5 left-5 px-3 py-1.5 bg-cyan-400/10 border border-cyan-300/40 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase text-cyan-100">
                4K · Smart Home Tour
              </span>
              {/* Click label bottom-right */}
              <span className="absolute bottom-5 right-5 text-[11px] tracking-[0.15em] uppercase text-white/70">
                Klicken zum Abspielen
              </span>
            </button>
          ) : (
            <iframe
              data-testid="smarthome-iframe"
              title="Smart Home Tour"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Feature pills below video */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Wifi, label: "WiFi · Zigbee · Matter" },
            { icon: Smartphone, label: "App & Sprachsteuerung" },
            { icon: Lightbulb, label: "Szenen-Automation" },
            { icon: Cpu, label: "Lokales Edge-Processing" },
          ].map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-white/10 bg-white/[0.02] px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-white/70 hover:border-cyan-300/40 transition-colors"
              data-testid={`smarthome-pill-${i}`}
            >
              <Icon size={14} className="text-cyan-300" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
