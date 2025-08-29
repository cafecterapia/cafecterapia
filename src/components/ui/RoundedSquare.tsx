import type { ReactNode, ElementType } from 'react';
import { forwardRef } from 'react';

type Props<T extends ElementType> = {
  /** Element to render as, defaults to div */
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/**
 * Generic rounded-square surface (large radius) used for pop surfaces (e.g. expanding header menu).
 * Provides translucent background, subtle border + shadow similar to Pill but for larger blocks.
 */
// Simpler non-generic forwardRef (can still accept `as` prop) to avoid TS inference friction
const RoundedSquare = forwardRef<HTMLElement, Props<any>>(function RoundedSquareInner(
  { as, className = '', children, ...rest },
  ref,
) {
  const Comp = (as || 'div') as ElementType;
  return (
    <Comp
      ref={ref as any}
      className={
        'rounded-[1.7rem] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 border border-black/5 shadow-md ' +
        'transition-all duration-300 ease-out ' +
        className
      }
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default RoundedSquare;
