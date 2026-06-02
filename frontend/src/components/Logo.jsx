import React from "react";

/**
 * ECO Building Technik — vector logo recreated from the official brand mark.
 *
 * Layout (matches the original):
 *   "ec" + leaf-replaced "o" + "BUILDING TECHNIK" underneath
 *
 * Colours adapted for the navy theme:
 *   • Body of "eco" + "BUILDING TECHNIK" → pure white
 *   • Leaf glyph that flows through the "o" → white (subtle outline only)
 * Scales crisply at any size.
 */
export default function Logo({ size = "md", className = "" }) {
  const heights = { sm: 32, md: 44, lg: 96 };
  const h = heights[size] || heights.md;
  const showSub = size === "lg";
  const subH = h * 0.22;

  return (
    <span
      className={`inline-flex flex-col items-start leading-none ${className}`}
      aria-label="ECO Building Technik Logo"
    >
      {/* "ec" + leaf-o */}
      <svg
        viewBox="0 0 200 120"
        height={h}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{ display: "block" }}
      >
        {/* letter e */}
        <text
          x="0"
          y="100"
          fontFamily="Inter, sans-serif"
          fontWeight="900"
          fontSize="118"
          letterSpacing="-6"
          fill="#FFFFFF"
        >
          e
        </text>
        {/* letter c */}
        <text
          x="60"
          y="100"
          fontFamily="Inter, sans-serif"
          fontWeight="900"
          fontSize="118"
          letterSpacing="-6"
          fill="#FFFFFF"
        >
          c
        </text>
        {/* The "o" — drawn as a ring then a leaf shape slicing through it */}
        <g transform="translate(118, 36)">
          {/* outer ring outline */}
          <circle cx="34" cy="34" r="30" stroke="#FFFFFF" strokeWidth="11" fill="none" />
          {/* Leaf shape — diagonal teardrop from upper-right to lower-left
              that wraps the o; uses solid white so it visually replaces the
              right half of the ring. */}
          <path
            d="M62 4
               C 70 22, 68 42, 54 56
               C 40 70, 20 72, 6 66
               C 12 50, 22 36, 36 24
               C 48 14, 56 8, 62 4 Z"
            fill="#FFFFFF"
          />
          {/* leaf central vein (kept very subtle) */}
          <path
            d="M58 10 C 46 28, 28 50, 12 64"
            stroke="#0B1736"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
        </g>
      </svg>

      {showSub && (
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: subH,
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.85)",
            marginTop: 8,
          }}
        >
          BUILDING TECHNIK
        </span>
      )}
    </span>
  );
}
