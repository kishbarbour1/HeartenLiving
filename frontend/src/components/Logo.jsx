import React from "react";

// Original heart-with-home emblem inspired by the brochure palette.
export default function Logo({ size = 44, className = "", tone = "burgundy" }) {
  const main = tone === "cream" ? "#FBF6EC" : "#6E1423";
  const gold = "#BE8A2C";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* rays */}
      {[...Array(5)].map((_, i) => {
        const x = 34 + i * 8;
        return (
          <line
            key={i}
            x1={x}
            y1={8}
            x2={x}
            y2={2 + (i === 2 ? 0 : 3)}
            stroke={gold}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        );
      })}
      {/* laurel leaves */}
      <path d="M20 44 Q10 50 16 62 Q24 56 20 44Z" fill={gold} opacity="0.9" />
      <path d="M80 44 Q90 50 84 62 Q76 56 80 44Z" fill={gold} opacity="0.9" />
      {/* heart */}
      <path
        d="M50 84 C50 84 20 64 20 40 C20 27 30 20 39 20 C45 20 49 24 50 27 C51 24 55 20 61 20 C70 20 80 27 80 40 C80 64 50 84 50 84Z"
        stroke={main}
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* house inside */}
      <path d="M50 34 L64 46 L60 46 L60 62 L40 62 L40 46 L36 46 Z" fill={main} />
      <rect x="46" y="52" width="8" height="10" fill={tone === "cream" ? "#6E1423" : "#FBF6EC"} />
    </svg>
  );
}
