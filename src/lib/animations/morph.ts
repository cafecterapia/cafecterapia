// Reusable MorphSVG helper utilities
// NOTE: MorphSVGPlugin is part of GSAP's paid plugins (Club GreenSock). Ensure it's loaded globally
// or replace the dynamic import logic below with your bundler's plugin registration.

import gsap from '../gsap';

// Types for shape targets - can be string (selector), SVGElement, or path data string
export type MorphTarget = string | SVGElement | null | undefined;

export interface MorphOptions {
  /** Duration in seconds */
  duration?: number;
  /** Easing */
  ease?: string;
  /** Delay in seconds */
  delay?: number;
  /** Repeat count */
  repeat?: number;
  /** Yoyo effect when repeating */
  yoyo?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Additional GSAP vars */
  vars?: gsap.TweenVars;
}

interface EnsureResult {
  ok: boolean;
  reason?: string;
}

let morphRegistered = false;

/**
 * Attempt to register MorphSVGPlugin if available on window.
 */
function ensureMorphPlugin(): EnsureResult {
  if (morphRegistered) return { ok: true };
  if (typeof window === 'undefined') return { ok: false, reason: 'SSR' };
  const anyWin = window as any;
  const plugin =
    anyWin.MorphSVGPlugin ||
    (anyWin.gsap && anyWin.gsap.plugins && anyWin.gsap.plugins.MorphSVGPlugin);
  if (plugin) {
    gsap.registerPlugin(plugin);
    morphRegistered = true;
    return { ok: true };
  }
  return { ok: false, reason: 'MorphSVGPlugin not found on window. Make sure it is loaded.' };
}

/**
 * Morph one SVG path (or compatible shape) to another.
 * Accepts selectors or elements. Returns the tween or undefined if plugin missing.
 */
export function morph(
  from: MorphTarget,
  to: MorphTarget,
  {
    duration = 1,
    ease = 'power1.inOut',
    delay = 0,
    repeat = 0,
    yoyo = false,
    onComplete,
    vars = {},
  }: MorphOptions = {},
) {
  const ensured = ensureMorphPlugin();
  if (!ensured.ok) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[morph] Skipped:', ensured.reason);
    }
    return undefined;
  }

  if (!from || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[morph] Invalid targets', { from, to });
    }
    return undefined;
  }

  // Cast to any to avoid missing MorphSVG types when plugin d.ts not present
  const tween = gsap.to(
    from as any,
    {
      ...vars,
      duration,
      ease,
      delay,
      repeat,
      yoyo,
      onComplete,
      // MorphSVG specific var name
      morphSVG: to as any,
    } as any,
  );
  return tween;
}

/**
 * Convenience helper to morph sequentially through multiple shapes (array of targets/path data)
 */
export function morphSequence(
  target: MorphTarget,
  shapes: MorphTarget[],
  {
    duration = 0.8,
    ease = 'power1.inOut',
    delay = 0,
    repeat = 0,
    yoyo = false,
    onComplete,
    vars = {},
  }: MorphOptions = {},
) {
  const ensured = ensureMorphPlugin();
  if (!ensured.ok) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[morphSequence] Skipped:', ensured.reason);
    }
    return [];
  }
  if (!target || !shapes.length) return [];

  const timeline = gsap.timeline({ repeat, yoyo, delay, onComplete });
  shapes.forEach((shape, i) => {
    timeline.to(
      target as any,
      { morphSVG: shape as any, duration, ease, ...vars } as any,
      i === 0 ? 0 : '>',
    );
  });
  return timeline;
}

/**
 * Utility to preload (register) the plugin early (e.g., in a layout effect on client).
 */
export function preloadMorphPlugin() {
  const res = ensureMorphPlugin();
  if (!res.ok && process.env.NODE_ENV !== 'production') {
    console.warn('[preloadMorphPlugin]', res.reason);
  }
  return res.ok;
}

export default {
  morph,
  morphSequence,
  preloadMorphPlugin,
};
