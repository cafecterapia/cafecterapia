import type { ReactNode, ElementType } from 'react';
import { forwardRef } from 'react';

type Props<T extends ElementType> = {
  /** Element to render as, defaults to div */
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/**
 * Generic rounded "pill" surface used for the site header container.
 * Provides a translucent white background + subtle border & shadow.
 */
const Pill = forwardRef<HTMLElement, Props<any>>(function PillInner(
  { as, className = '', children, ...rest },
  ref,
) {
  const Comp = (as || 'div') as ElementType;
  return (
    <Comp
      ref={ref as any}
      className={
        'rounded-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 border border-black/5 shadow-sm ' +
        'flex items-center ' +
        className
      }
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default Pill;
