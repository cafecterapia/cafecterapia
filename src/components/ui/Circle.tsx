import type { ReactNode } from 'react';

type Props = {
  size?: number;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  asButton?: boolean;
};

/**
 * Circular surface (used for the hamburger trigger inside the header pill).
 * Can optionally act as a button when `asButton` is true.
 */

export default function Circle({
  size = 52,
  className = '',
  children,
  onClick,
  ariaLabel,
  asButton = false,
}: Props) {
  const base =
    'rounded-full inline-flex items-center justify-center shadow-sm shrink-0 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60';

  // Default style uses a warm brown from global.css variables.
  const style = {
    width: size,
    height: size,
    backgroundColor: 'var(--color-brown-700)',
    color: 'var(--color-brown-50)',
  } as const;

  if (asButton) {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={base + ' ' + className}
        style={style}
      >
        {children}
      </button>
    );
  }
  return (
    <div
      className={base + ' ' + className}
      style={style}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {children}
    </div>
  );
}
