import Hero from '@/components/sections/Hero';
import ContactForm from '@/components/sections/ContactForm';
import Image from 'next/image';

export default function ContatosPage() {
  return (
    <>
      {/* Reduced-height rectangular hero */}
      <Hero title="Contatos" height={240} />

      {/* Two-column layout: photo (left) + contact form (right) */}
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* Photo */}
          <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-full overflow-hidden rounded-lg shadow-md">
            <Image
              src="/images/hold-coffee.jpeg"
              alt="Foto ilustrativa segurando uma xícara de café"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Contact form */}
          <div className="space-y-6">
            <header>
              <h2 className="text-2xl font-semibold tracking-tight">Fale Comigo</h2>
              <p className="mt-2 text-sm opacity-80 max-w-prose">
                Preencha o formulário e retornarei o mais breve possível.
              </p>
            </header>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
