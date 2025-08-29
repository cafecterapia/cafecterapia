// Minimal ambient type so TypeScript doesn't error if @gsap/react types not yet resolved.
// If the real package provides types they will override this.

declare module '@gsap/react' {
  import type { ContextFunc } from 'gsap';
  export function useGSAP(
    scope: ContextFunc | (() => void),
    deps?: { dependencies?: unknown[]; revertOnUpdate?: boolean },
  ): void;
}
