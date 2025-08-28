'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

/**
 * FooterTab renders a wide "tab" shape (like a folder tab) that can sit just above the footer.
 * The shape path was provided by design: M-100 220V104a24 24 0 0124-24H180a56 56 0 0156-56H964a56 56 0 0156 56H1276a24 24 0 0124 24V220Z
 */
export interface FooterTabProps {
  /** Optional text or custom content rendered centered inside the tab. */
  children?: React.ReactNode;
  /** Fill color of the tab shape. */
  fill?: string;
  /** Background behind the SVG (outside the tab path). Use a light/beige to avoid brown band. Set to 'transparent' to disable. */
  background?: string;
  /** Maximum height (at very large viewports). Default 220 to match the original design. */
  maxHeight?: number;
  /** Minimum height on the smallest screens. Default 120. */
  minHeight?: number;
  className?: string;
}

/**
 * Responsive strategy (no path modification):
 * - Maintain the original aspect ratio (1400:220) so the curvature doesn't deform when the width changes.
 * - Use CSS aspect-ratio for modern browsers + a clamp() fallback for consistent scaling.
 * - Height scales with viewport width (roughly width * 0.157) but stays within [minHeight, maxHeight].
 */
export function FooterTab({
  children = <span className="text-sm sm:text-base font-medium">Mais Sobre Mim</span>,
  fill = 'var(--color-brown-600)',
  background = 'var(--color-bege)',
  maxHeight = 320,
  minHeight = 120,
  className = '',
}: FooterTabProps) {
  const pathname = usePathname();
  const isPalestras = pathname.startsWith('/palestras');
  // Override palette for palestras route
  const actualFill = isPalestras ? 'var(--color-sage-600)' : fill;
  // For the palestras route we want the area above the tab to stay beige to avoid a white/green break
  const actualBackground = isPalestras ? 'var(--color-bege)' : background;
  // Aspect ratio derived from original viewBox (1400w x 220h)
  const ratio = 220 / 1400; // ≈0.157142857

  return (
    <div
      className={'relative w-full ' + className}
      style={{
        lineHeight: 0,
        // Only show the provided background on the upper ~47% where the SVG is not filled at the sides.
        background:
          actualBackground === 'transparent'
            ? 'transparent'
            : `linear-gradient(to bottom, ${actualBackground} 0 47.5%, transparent 47.5%)`,
        // Modern aspect ratio support (keeps uniform scaling)
        aspectRatio: '1400 / 220',
        // Fallback dynamic height (limits via clamp). This is ignored when aspect-ratio governs layout.
        height: `clamp(${minHeight}px, ${Math.round(ratio * 1000) / 10}vw, ${maxHeight}px)`,
        maxHeight,
        minHeight,
        // Tiny overlap to mask potential 1px hairline seam on some mobile DPRs
        marginTop: '-0.5px',
      }}
      aria-label="Footer tab"
    >
      <svg
        viewBox="-100 0 1400 220"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M-100 220V104a24 24 0 0124-24H180a56 56 0 0156-56H964a56 56 0 0156 56H1276a24 24 0 0124 24V220Z"
          fill={actualFill}
        />
      </svg>
      {/* Centered content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default FooterTab;
