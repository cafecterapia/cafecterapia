'use client';
import { useEffect } from 'react';

/**
 * Manual service worker registration so we can delay until after hydration and
 * only in production. next-pwa outputs sw.js into the public directory.
 */
export default function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        // Optionally trigger an update check.
        reg.update();
      } catch (err) {
        console.warn('[PWA] SW registration failed', err);
      }
    };

    // Delay a tick to ensure Next has finished painting.
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(register)
      : window.setTimeout(register, 0);
    return () => {
      if (window.cancelIdleCallback && typeof id === 'number')
        window.cancelIdleCallback(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  return null;
}
