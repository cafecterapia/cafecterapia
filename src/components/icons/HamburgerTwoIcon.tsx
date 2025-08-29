type Props = {
  open?: boolean;
  className?: string;
};

export default function HamburgerTwoIcon({ open = false, className = '' }: Props) {
  return (
    <span className={`relative block w-4.5 h-2.5 ${className}`} aria-hidden>
      <span
        style={{ backgroundColor: 'currentColor' }}
        className={`absolute left-0 top-0 h-[2px] w-full transition-transform duration-200 ease-out ${
          open ? 'translate-y-[6px] rotate-45' : ''
        }`}
      />
      <span
        style={{ backgroundColor: 'currentColor' }}
        className={`absolute left-0 bottom-0 h-[2px] w-full transition-transform duration-200 ease-out ${
          open ? '-translate-y-[6px] -rotate-45' : ''
        }`}
      />
    </span>
  );
}
