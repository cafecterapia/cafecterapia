import { HeroHoldCoffeePhoto, PalestrasPhoto } from '../illustrations/Photos';

type HeroProps = {
  title: string;
  textColor?: string; // Title text color
  overlayColor?: string; // Overlay (tint) color
  overlayOpacity?: number; // 0 - 1 opacity for overlay
  height?: number; // Hero height in px
  fontFamily?: string;
  /** Choose which background photo variant to render (server-selected) */
  variant?: 'hero' | 'palestras';
};

export default function Hero({
  title,
  textColor = '#ffffff',
  overlayColor = 'var(--color-background)',
  overlayOpacity = 0.6,
  height = 560,
  fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  variant = 'hero',
}: HeroProps) {
  const fontSizePx = Math.floor(height * 0.22); // same scale factor as before
  const PhotoComponent = variant === 'palestras' ? PalestrasPhoto : HeroHoldCoffeePhoto;

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ height }}>
      {/* Background image chosen on the server via prop */}
      <PhotoComponent alt={title} />
      {/* Color overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
      />
      {/* Title */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center">
        <h1
          className="font-bold tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] text-[clamp(2rem,8vw,3.5rem)] md:text-[clamp(2.25rem,var(--hero-desktop-size),6rem)]"
          style={{
            color: textColor,
            fontFamily,
            lineHeight: 1.05,
            // Provide computed desktop ideal size via CSS variable
            ['--hero-desktop-size' as any]: `${fontSizePx}px`,
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
