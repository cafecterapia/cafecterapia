import React from 'react';
import SectionArc from '../ui/SectionArc';

export default function PresentMe() {
  return (
    <div className="relative -mt-40 md:-mt-56" aria-labelledby="presentme-heading">
      <SectionArc height={300} maxApex={200} minApex={140} fill="var(--color-bege)">
        <h2
          id="presentme-heading"
          className="text-center text-[clamp(2.25rem,6vw,4.25rem)] font-bold tracking-tight text-[var(--color-brown-900)] leading-tight"
        >
          Psicologa, Escritora & Palestrante
        </h2>
      </SectionArc>
    </div>
  );
}
