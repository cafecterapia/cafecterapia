'use client';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = '', ...props },
  ref,
) {
  return <button ref={ref} className={`px-4 py-2 pill ${className}`} {...props} />;
});

export default Button;
