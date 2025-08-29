import Pill from '../../../components/ui/Pill';
import Link from 'next/link';

export default function ContatosPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <section className="w-full max-w-2xl px-6 py-20 text-center">
        <h1 className="font-serif text-[3.75rem] md:text-[5.5rem] leading-none">Diga olá</h1>

        <p className="uppercase tracking-widest mt-4 text-sm text-muted-foreground">
          Estamos ansiosos para ouvir você
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Pill as="button" className="px-6 py-3">
            Email <span aria-hidden>↘</span>
          </Pill>

          <Pill as="button" className="px-6 py-3 bg-transparent border-black/20">
            Sociais <span aria-hidden>↘</span>
          </Pill>
        </div>

        <div className="mt-10">
          <Link
            href="mailto:cafecterapia@gmail.com"
            className="text-3xl md:text-5xl font-medium inline-block"
          >
            cafecterapia@gmail.com
          </Link>
        </div>
      </section>
    </main>
  );
}
