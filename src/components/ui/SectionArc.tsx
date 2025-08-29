'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type SectionArcProps = {
  className?: string;
  fill?: string;
  height?: number;
  maxApex?: number;
  minApex?: number;
  children?: React.ReactNode;
};

export default function SectionArc({
  className = '',
  fill = 'var(--color-bege)',
  height = 320,
  maxApex = 180,
  minApex = 100,
  children,
}: SectionArcProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(1440);
  const [path, setPath] = useState('');

  const calc = useCallback(
    (w: number) => {
      const clampedApex = Math.max(minApex, Math.min(maxApex, Math.round(w * 0.12)));
      const apexHeight = clampedApex;
      const chordWidth = w;
      const radius = (Math.pow(chordWidth / 2, 2) + Math.pow(apexHeight, 2)) / (2 * apexHeight);
      const startY = apexHeight;
      const bottomY = height;
      return `M0 ${startY} A ${radius} ${radius} 0 0 1 ${chordWidth} ${startY} L${chordWidth} ${bottomY} L0 ${bottomY} Z`;
    },
    [height, maxApex, minApex],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        setWidth(w);
        setPath(calc(w));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [calc]);

  useEffect(() => {
    setPath(calc(width));
  }, [width, calc]);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="block w-full h-auto"
        aria-hidden="true"
      >
        <path d={path} fill={fill} />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center px-6">{children}</div>
      )}
    </div>
  );
}
