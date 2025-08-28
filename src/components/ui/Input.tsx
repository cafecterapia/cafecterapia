'use client';
import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', ...props },
  ref,
) {
  return <input ref={ref} className={`pill px-3 py-2 ${className}`} {...props} />;
});

export default Input;
