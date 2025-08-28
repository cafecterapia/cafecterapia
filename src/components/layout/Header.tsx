'use client';
import CoffeeCupholderIcon from '@/components/icons/CoffeeCupholderIcon';
import HamburgerTwoIcon from '@/components/icons/HamburgerTwoIcon';
import ToggleIcon from '@/components/icons/ToggleIcon';
import { useMenu } from '@/context/MenuContext';
import Link from 'next/link';

export default function Header() {
  const { open, toggle } = useMenu();
  return (
    <div className="container-px h-full grid grid-cols-3 items-center">
      <Link
        href="/"
        aria-label="Ir para a página inicial"
        className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
      >
        <CoffeeCupholderIcon className="shrink-0 w-15 h-15" />
      </Link>

      <div className="flex items-center justify-center">
        <button className="icon-btn text-white" aria-label="menu" onClick={toggle}>
          <HamburgerTwoIcon open={open} />
        </button>
      </div>

      <div className="flex items-center justify-end">
        <ToggleIcon className="text-white" />
      </div>
    </div>
  );
}
