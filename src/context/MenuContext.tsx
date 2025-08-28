'use client';
export type MenuState = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const Ctx = createContext<MenuState | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v: boolean) => !v), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, toggle, close }), [open, toggle, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMenu() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
}
