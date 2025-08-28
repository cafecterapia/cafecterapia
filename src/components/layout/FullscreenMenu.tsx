'use client';
import Link from 'next/link';
import { useMenu } from '@/context/MenuContext';
import Header from '@/components/layout/Header';

export default function FullscreenMenu() {
  const { open, close } = useMenu();
  return (
    // fs-menu uses CSS to cover the entire viewport and center its children
    <div className={`fs-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="w-full h-full flex flex-col">
        <header className="header-height">
          <Header />
        </header>

        <nav
          role="menu"
          aria-orientation="vertical"
          className=" flex-1 flex items-center justify-center"
        >
          <ul className="flex flex-col items-center gap-8 list-none p-0 m-0">
            <li>
              <Link href="/ebook" onClick={close} className="text-4xl font-semibold text-center">
                Ebook
              </Link>
            </li>
            <li>
              <Link
                href="/palestras"
                onClick={close}
                className="text-4xl font-semibold text-center"
              >
                Palestras
              </Link>
            </li>
            <li>
              <Link href="/contatos" onClick={close} className="text-4xl font-semibold text-center">
                Contatos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
