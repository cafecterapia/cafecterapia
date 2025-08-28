'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';

/**
 * SiteHeader wraps the visual Header and conditionally disables the global
 * fixed/overlay behavior for specific routes that need normal document flow.
 * Currently we turn OFF the fixed (sticky) header for ebook reader pages so
 * the content isn't hidden underneath and gains natural top spacing.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const disableFixed = pathname.startsWith('/ebook/');

  const className = disableFixed
    ? 'header-height relative w-full' // normal flow (no overlay)
    : 'header-height fixed top-0 left-0 w-full z-50 bg-transparent';

  return (
    <header className={className}>
      <Header />
    </header>
  );
}
