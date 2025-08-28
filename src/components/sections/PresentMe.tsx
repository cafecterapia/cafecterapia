import SectionArc from '../ui/SectionArc';

export default function PresentMe() {
  return (
    <section className="relative bg-bege pb-12 pt-6">
      {/* Decorative arc background */}
      <div className="absolute -top-[9.89rem] left-0 right-0 pointer-events-none select-none">
        <SectionArc variant="convex" fill="var(--color-bege, #F5EFE6)" height={160} />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <p className="text-3xl md:text-3xl font-semibold leading-snug text-muted-foreground text-center">
          Psicóloga, Palestrante & Escritora
        </p>
      </div>
    </section>
  );
}
