'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isPalestras = pathname.startsWith('/palestras');
  return (
    <footer className={`border-t ${isPalestras ? 'bg-sage-700 text-on-sage-dark' : ''}`}>
      <div className="mx-auto max-w-6xl container-px py-8 text-center">
        {/* Main content */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
          <div>
            <h3 className="text-base font-semibold">Lenny S.</h3>
            <p className="mt-1 text-sm max-w-xl opacity-80">Psicóloga, Escritora, Palestrante.</p>
            {/* Social links */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <Link
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:opacity-80"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a2.998 2.998 0 0 0-2.11-2.117C19.59 3.5 12 3.5 12 3.5s-7.59 0-9.388.569A2.998 2.998 0 0 0 .502 6.186 31.75 31.75 0 0 0 0 12a31.75 31.75 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.11 2.117C4.41 20.5 12 20.5 12 20.5s7.59 0 9.388-.569a2.998 2.998 0 0 0 2.11-2.117A31.75 31.75 0 0 0 24 12a31.75 31.75 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-80"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 .001 5.001A2.5 2.5 0 0 0 12 7.5zM18.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <nav className="flex flex-col sm:flex-row sm:gap-4 gap-2 text-sm items-center justify-center">
              <Link href="/#hero" className="hover:underline">
                Inicio
              </Link>
              <Link href="/ebook" className="hover:underline">
                Ebook
              </Link>
              <Link href="/palestras" className="hover:underline">
                Palestras
              </Link>
              <Link href="/contatos" className="hover:underline">
                Contato
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-6 border-t pt-4 text-sm flex flex-col gap-1 items-center sm:flex-row sm:justify-center opacity-80">
          <div>© COPYRIGHT 2025 Lenny Santos</div>
        </div>
      </div>
    </footer>
  );
}
