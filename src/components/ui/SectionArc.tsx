import React from 'react';

/**
 * SectionArc creates a large smooth arc (part of a huge circle) that can overlap the previous section.
 * Place it as the first absolutely–positioned child of a section and give it the same background color as the section.
 */
export interface SectionArcProps {
  className?: string;
  /** Fill color of the arc. Usually match the section background. */
  fill?: string;
  /** Height of the arc container (controls how tall the curve appears). Default 200px. */
  height?: number;
  /** Shape style: "convex" (arches upward in center) or "concave" (dips downward at sides so center is filled). */
  variant?: 'convex' | 'concave';
  /** Flip vertically (useful when the arc appears upside down relative to desired overlap). */
  flipVertical?: boolean;
}

export function SectionArc({
  className = '',
  fill = 'currentColor',
  height = 200,
  variant = 'convex',
  flipVertical = false,
}: SectionArcProps) {
  // Two path definitions sharing same viewBox (0 0 1440 320)
  const path =
    variant === 'convex'
      ? // Convex: curves upward in the center, creating an arch that overlaps previous section
        'M -87.072 313.743 Q 715.843 -310.816 1517.229 306.838 L 1590.884 497.881 L -183.745 497.881 Z'
      : // Concave: curves downward in the center, creating a bowl shape
        'M0 0 Q720 480 1440 0 L1440 320 L0 320 Z';

  return (
    <div
      className={'w-full overflow-hidden leading-none ' + className}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className={'block h-full w-full' + (flipVertical ? ' scale-y-[-1]' : '')}
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}

export default SectionArc;
