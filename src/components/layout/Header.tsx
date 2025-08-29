'use client';
import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useMenu } from '@/context/MenuContext';
import HamburgerTwoIcon from '@/components/icons/HamburgerTwoIcon';
import RoundedSquare from '@/components/ui/RoundedSquare';
import Circle from '@/components/ui/Circle';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {
  const { open, toggle, close } = useMenu();
  const pathname = usePathname();

  function NavItem({ href, children }: { href: string; children: ReactNode }) {
    const isActive = pathname === href;
    const baseClass = 'text-3xl md:text-4xl font-semibold text-center';
    const disabledClass = `${baseClass} text-stone-400 pointer-events-none select-none`;

    return (
      <li>
        {isActive ? (
          <span aria-disabled="true" className={disabledClass}>
            {children}
          </span>
        ) : (
          <Link href={href} onClick={close} className={baseClass}>
            {children}
          </Link>
        )}
      </li>
    );
  }

  const containerRef = useRef<HTMLDivElement | null>(null); // animated pill container
  const navWrapperRef = useRef<HTMLDivElement | null>(null); // collapsible content

  useGSAP(
    () => {
      const container = containerRef.current;
      const nav = navWrapperRef.current;
      if (!container || !nav) return;

      const baseHeight = 56; // collapsed height (h-14)
      container.style.overflow = 'hidden';
      if (!open) {
        // ensure collapsed baseline for closing animation
        gsap.set(container, { height: baseHeight });
      }

      const expandedExtra = nav.scrollHeight; // content height below bar
      const expandedHeight = baseHeight + expandedExtra;

      if (open) {
        gsap.set(nav, { opacity: 0, y: 12, pointerEvents: 'none' });
        gsap
          .timeline({ defaults: { ease: 'power2.out' } })
          .to(container, { height: expandedHeight, duration: 0.55 })
          .to(
            nav,
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', pointerEvents: 'auto' },
            '-=0.25',
          );
      } else {
        gsap
          .timeline()
          .to(nav, { opacity: 0, y: 8, duration: 0.25, ease: 'power1.in' })
          .to(container, { height: baseHeight, duration: 0.4, ease: 'power2.inOut' }, '-=0.05')
          .set(nav, { pointerEvents: 'none' });
      }
    },
    { dependencies: [open] },
  );
  // Close on route navigation (links below) is handled by onClick.

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <RoundedSquare
        as="nav"
        aria-label="Primary"
        data-header-pill
        ref={containerRef as any}
        className="relative mt-4 px-6 w-full max-w-4xl flex flex-col items-center justify-start"
      >
        {/* Top bar (fixed position so it never shifts vertically when expanding) */}
        <div className="absolute inset-x-0 top-0 h-14 px-6">
          <div
            className="h-full w-full grid items-center"
            style={{ gridTemplateColumns: 'auto 1fr auto' }}
          >
            <Circle
              asButton
              ariaLabel={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={toggle}
              className="justify-self-start -ml-4 text-current"
              size={48}
            >
              <HamburgerTwoIcon open={open} className="text-black" />
            </Circle>
            <div className="flex justify-center">
              <div
                className="font-serif tracking-wide text-lg md:text-xl text-stone-800 focus:outline-none rounded"
                aria-hidden={false}
              >
                <span className="font-normal">Café</span>{' '}
                <em className="not-italic font-light">c/</em>{' '}
                <span className="font-semibold">TERAPIA</span>
              </div>
            </div>
            {/* Spacer to balance the Circle width, keeping the title centered */}
            <div className="w-12 h-12 mr-4" aria-hidden />
          </div>
        </div>
        {/* Expanding content (margin-top reserves space for fixed top bar) */}
        <div ref={navWrapperRef} className="mt-14 pt-6 pb-10">
          <nav role="menu" aria-orientation="vertical" className="flex items-center">
            <ul className="flex flex-col items-center gap-8 list-none p-0 m-0">
              <NavItem href="/">Início</NavItem>
              <NavItem href="/ebook">Ebook</NavItem>
              <NavItem href="/palestras">Palestras</NavItem>
              <NavItem href="/contatos">Contatos</NavItem>
            </ul>
          </nav>
        </div>
      </RoundedSquare>
    </div>
  );
}
