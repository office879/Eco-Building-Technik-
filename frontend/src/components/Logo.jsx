import React from "react";

/**
 * ECO Building Technik — typographic mark.
 *
 * Reinterprets the original logo (lowercase "eco" + leaf forming the second "o",
 * with "BUILDING TECHNIK" underneath) using clean typography that adapts perfectly
 * to the dark navy theme. The leaf glyph is rendered as a soft inline SVG to mimic
 * the spirit of the original brand without colour-conflict on dark backgrounds.
 */
export default function Logo({ size = "md", className = "" }) {
  const cfg = {
    sm: { ecoSize: 22, subSize: 7, gap: 0, sub: false },
    md: { ecoSize: 28, subSize: 8, gap: 1, sub: false },
    lg: { ecoSize: 60, subSize: 13, gap: 3, sub: true },
  }[size] || { ecoSize: 28, subSize: 8, gap: 1, sub: false };

  return (
    <span
      className={`inline-flex flex-col items-start leading-none ${className}`}
      aria-label="ECO Building Technik Logo"
    >
      <span className="inline-flex items-center" style={{ height: cfg.ecoSize }}>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: cfg.ecoSize,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#FFFFFF",
          }}
        >
          ec
        </span>
        <LeafO size={cfg.ecoSize} />
      </span>
      {cfg.sub && (
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: cfg.subSize,
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.85)",
            marginTop: cfg.gap + 4,
          }}
        >
          BUILDING TECHNIK
        </span>
      )}
    </span>
  );
}

/**
 * The signature "o" shaped as a leaf — outlined ring with an inset leaf glyph
 * so the silhouette of the second o is preserved while gaining a green-tech
 * character (re-coloured white for the dark site).
 */
function LeafO({ size }) {
  const s = size * 0.95;
  return (
    <span
      style={{
        position: "relative",
        width: s,
        height: s,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -size * 0.02,
      }}
    >
      {/* Outer ring (the o) */}
      <svg viewBox="0 0 100 100" width={s} height={s} style={{ position: "absolute", inset: 0 }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#FFFFFF" strokeWidth="16" />
      </svg>
      {/* Leaf overlay – diagonal leaf glyph that hints at "eco" */}
      <svg viewBox="0 0 100 100" width={s * 0.62} height={s * 0.62} style={{ position: "relative", zIndex: 1 }}>
        <path
          d="M85 15c0 25-15 50-40 60-10 4-22 4-30 0 0-12 4-23 11-32C36 22 60 12 85 15z"
          fill="#FFFFFF"
        />
        <path
          d="M20 80c12-15 30-30 50-45"
          stroke="#0B1736"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
