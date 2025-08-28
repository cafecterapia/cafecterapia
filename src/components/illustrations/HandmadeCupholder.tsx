'use client';

import React from 'react';

type Props = {
  size?: number;
  className?: string;
};

/**
 * HandmadeCupholder
 * A handcrafted-looking stitched cupholder (coaster) built with SVG.
 * It uses gradients, light noise, and dashed stitches to evoke a tactile feel.
 */
export default function HandmadeCupholder({ size = 320, className }: Props) {
  return (
    <svg
      role="img"
      aria-labelledby="cupholderTitle cupholderDesc"
      width={size}
      height={size}
      viewBox="0 0 400 400"
      className={className}
    >
      <title id="cupholderTitle">Handmade stitched cupholder</title>
      <desc id="cupholderDesc">
        A warm, handcrafted round cupholder with stitched edges and a small patch seam in the
        middle.
      </desc>
      <defs>
        {/* Felt/leather-like radial gradient (updated to dark terrain brown palette) */}
        <radialGradient id="feltGrad" cx="50%" cy="40%" r="70%">
          {/* center (slightly lighter warm brown) */}
          <stop offset="0%" stopColor="#8a5f3e" />
          {/* mid (slightly lighter) */}
          <stop offset="55%" stopColor="#6f4327" />
          {/* outer rim (a touch lighter deep earthy brown) */}
          <stop offset="100%" stopColor="#4a2c19" />
        </radialGradient>

        {/* Soft vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
          <stop offset="20%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </radialGradient>

        {/* Subtle surface noise */}
        <filter id="noise" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="noiseMono" />
          <feComponentTransfer in="noiseMono" result="noiseAlpha">
            <feFuncA type="table" tableValues="0 0 0.04 0.08" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="noiseAlpha" mode="multiply" />
        </filter>

        {/* Inner shadow for depth */}
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite
            in="SourceGraphic"
            in2="blur"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="innerShadow"
          />
          <feColorMatrix
            in="innerShadow"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
          />
          <feComposite in="SourceGraphic" />
        </filter>

        {/* Slight highlight */}
        <radialGradient id="highlight" cx="40%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base coaster */}
      <g filter="url(#noise)">
        <circle cx="200" cy="200" r="150" fill="url(#feltGrad)" filter="url(#innerShadow)" />
        {/* Vignette */}
        <circle cx="200" cy="200" r="150" fill="url(#vignette)" />
        {/* Subtle highlight */}
        <circle cx="170" cy="150" r="90" fill="url(#highlight)" />
      </g>

      {/* Edge border */}
      <circle
        cx="200"
        cy="200"
        r="154"
        fill="none"
        stroke="#6b4a2f"
        strokeWidth="6"
        opacity="0.9"
      />

      {/* Inner stitches, slightly rotated for a handmade irregular look */}
      <g transform="rotate(7 200 200)">
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="#f1e1c7"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="2 16"
          opacity="0.9"
        />
      </g>

      {/* Small top-stitches ring for extra texture */}
      <g transform="rotate(-5 200 200)">
        <circle
          cx="200"
          cy="200"
          r="128"
          fill="none"
          stroke="#fff7e6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 10"
          opacity="0.7"
        />
      </g>

      {/* Tiny random hand specks to suggest fabric texture */}
      <g opacity="0.12" fill="#000000">
        <circle cx="250" cy="120" r="1.5" />
        <circle cx="285" cy="210" r="1.2" />
        <circle cx="160" cy="250" r="1.3" />
        <circle cx="120" cy="190" r="1.1" />
        <circle cx="220" cy="280" r="1.4" />
      </g>
    </svg>
  );
}
