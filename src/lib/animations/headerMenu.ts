import gsap from '../gsap';

// Utility to morph header pill into the rounded square menu card.
// We avoid using GSAP Flip (paid plugins) and implement manual bounds tween.

export interface MorphHeaderOptions {
  duration?: number;
  ease?: string;
  onComplete?: () => void;
}

export function morphHeaderToMenu(
  pillEl: HTMLElement | null,
  menuEl: HTMLElement | null,
  { duration = 0.6, ease = 'power2.out', onComplete }: MorphHeaderOptions = {},
) {
  if (!pillEl || !menuEl || typeof window === 'undefined') return;

  // Skip if already animated (dataset flag)
  if (menuEl.dataset.morphed === 'true') return;

  // Capture final rect first while menu in flow.
  const finalRect = menuEl.getBoundingClientRect();
  const pillRect = pillEl.getBoundingClientRect();

  // Hide menu content initially (we'll fade in)
  const originalOpacity = window.getComputedStyle(menuEl).opacity;

  // Prepare initial inline styles based on pill geometry
  Object.assign(menuEl.style, {
    position: 'fixed',
    top: pillRect.top + 'px',
    left: pillRect.left + 'px',
    width: pillRect.width + 'px',
    height: pillRect.height + 'px',
    margin: '0',
    opacity: '0',
    borderRadius: window.getComputedStyle(pillEl).borderRadius || '9999px',
    overflow: 'hidden',
    zIndex: '60',
  });

  // Fade out the pill so it looks like it transforms; keep layout to avoid shift.
  gsap.to(pillEl, { opacity: 0, duration: 0.2, ease: 'power1.out' });

  // Animate to final geometry.
  gsap.to(menuEl, {
    top: finalRect.top + 'px',
    left: finalRect.left + 'px',
    width: finalRect.width + 'px',
    height: finalRect.height + 'px',
    borderRadius: window.getComputedStyle(menuEl).borderRadius, // its own rounded square radius (already applied via class)
    opacity: originalOpacity || '1',
    ease,
    duration,
    onComplete: () => {
      // Clear positioning so element falls back into its normal flow container without jump:
      menuEl.dataset.morphed = 'true';
      // Use requestAnimationFrame to avoid layout thrash.
      requestAnimationFrame(() => {
        menuEl.style.removeProperty('position');
        menuEl.style.removeProperty('top');
        menuEl.style.removeProperty('left');
        menuEl.style.removeProperty('width');
        menuEl.style.removeProperty('height');
        menuEl.style.removeProperty('margin');
        menuEl.style.removeProperty('z-index');
        // Keep borderRadius from class and opacity.
      });
      onComplete?.();
    },
  });
}

// Reset pill opacity when menu unmounts/ closes so header shows again
export function restoreHeaderPill(pillEl: HTMLElement | null) {
  if (!pillEl) return;
  gsap.to(pillEl, { opacity: 1, duration: 0.2, ease: 'power1.out' });
}
