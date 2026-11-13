import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Razor-sharp 16x16 Pixel Banana matching the portrait style
 */
export function PixelBanana({ className = "", size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Dark outline */}
      <rect x="11" y="2" width="2" height="2" fill="#2d1300" />
      <rect x="9" y="3" width="2" height="2" fill="#2d1300" />
      <rect x="7" y="4" width="2" height="2" fill="#2d1300" />
      <rect x="5" y="5" width="2" height="2" fill="#2d1300" />
      <rect x="3" y="6" width="2" height="3" fill="#2d1300" />
      <rect x="2" y="9" width="2" height="3" fill="#2d1300" />
      <rect x="3" y="12" width="4" height="2" fill="#2d1300" />
      <rect x="7" y="13" width="4" height="2" fill="#2d1300" />
      <rect x="11" y="11" width="3" height="3" fill="#2d1300" />
      <rect x="13" y="9" width="2" height="3" fill="#2d1300" />

      {/* Stem green tip */}
      <rect x="12" y="2" width="1" height="1" fill="#4d8c1e" />
      <rect x="13" y="1" width="1" height="2" fill="#5ea926" />

      {/* Yellow highlight & body */}
      <rect x="8" y="5" width="2" height="2" fill="#fff566" />
      <rect x="6" y="6" width="3" height="2" fill="#fff566" />
      <rect x="4" y="8" width="3" height="3" fill="#ffe033" />
      <rect x="4" y="11" width="3" height="1" fill="#ffd000" />
      <rect x="7" y="11" width="4" height="2" fill="#ffd000" />
      <rect x="10" y="9" width="3" height="2" fill="#ffe033" />
      <rect x="11" y="7" width="2" height="3" fill="#ffd000" />
      <rect x="8" y="7" width="3" height="4" fill="#ffb703" />

      {/* Bottom shadow / tip */}
      <rect x="13" y="8" width="1" height="2" fill="#c47a00" />
      <rect x="2" y="11" width="1" height="1" fill="#7a4200" />
    </svg>
  );
}

/**
 * Razor-sharp 16x16 Pixel Brinjal (Eggplant) matching the portrait style
 */
export function PixelBrinjal({ className = "", size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Dark outline */}
      <rect x="7" y="1" width="2" height="2" fill="#1b0826" />
      <rect x="5" y="3" width="6" height="2" fill="#1b0826" />
      <rect x="4" y="5" width="8" height="2" fill="#1b0826" />
      <rect x="3" y="7" width="10" height="2" fill="#1b0826" />
      <rect x="3" y="9" width="10" height="3" fill="#1b0826" />
      <rect x="4" y="12" width="8" height="2" fill="#1b0826" />
      <rect x="6" y="14" width="4" height="1" fill="#1b0826" />

      {/* Green Calyx / Leaves & Stem */}
      <rect x="7" y="1" width="1" height="2" fill="#4ea824" />
      <rect x="8" y="2" width="1" height="1" fill="#69db35" />
      <rect x="5" y="4" width="2" height="2" fill="#4ea824" />
      <rect x="7" y="3" width="2" height="2" fill="#69db35" />
      <rect x="9" y="4" width="2" height="2" fill="#4ea824" />
      <rect x="6" y="5" width="4" height="1" fill="#2d6e12" />

      {/* Purple Brinjal Flesh & Lavender Highlights */}
      <rect x="5" y="6" width="6" height="6" fill="#6a1b9a" />
      <rect x="4" y="8" width="7" height="4" fill="#7b1fa2" />
      <rect x="5" y="12" width="6" height="1" fill="#4a148c" />
      <rect x="6" y="13" width="4" height="1" fill="#310b5e" />

      {/* Light sheen / highlight */}
      <rect x="5" y="7" width="2" height="3" fill="#ba68c8" />
      <rect x="5" y="8" width="1" height="2" fill="#e1bee7" />
      <rect x="6" y="10" width="1" height="1" fill="#ba68c8" />

      {/* Deep Shadow on right */}
      <rect x="10" y="8" width="2" height="4" fill="#3a0b5c" />
      <rect x="9" y="11" width="2" height="2" fill="#2a0542" />
    </svg>
  );
}

/**
 * Pixel Cross / Sparkle (+ or 4-point star)
 */
export function PixelSparkle({
  className = "",
  size = 12,
  color = "#ff80bf",
}: IconProps & { color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="crispEdges"
    >
      <rect x="2" y="0" width="1" height="5" fill={color} />
      <rect x="0" y="2" width="5" height="1" fill={color} />
      <rect x="1" y="1" width="3" height="3" fill={color} opacity="0.6" />
    </svg>
  );
}

