'use client';

export type ThemeOption = 'sepia' | 'dark' | 'light';

export interface ReaderControlsProps {
  fontSize: number;
  onFontSize: (v: number | ((n: number) => number)) => void;
  theme: ThemeOption;
  onTheme: (t: ThemeOption) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ReaderControls({
  fontSize,
  onFontSize,
  theme,
  onTheme,
  onPrev,
  onNext,
}: ReaderControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
      <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 rounded-full px-2 py-1">
        <button
          type="button"
          onClick={() => onFontSize(f => Math.max(14, f - 1))}
          className="px-2 py-0.5 hover:opacity-80"
        >
          A-
        </button>
        <span className="min-w-[3ch] text-center">{fontSize}</span>
        <button
          type="button"
          onClick={() => onFontSize(f => Math.min(28, f + 1))}
          className="px-2 py-0.5 hover:opacity-80"
        >
          A+
        </button>
      </div>
      <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
        {(['sepia', 'light', 'dark'] as ThemeOption[]).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => onTheme(t)}
            className={`px-3 py-1 text-[10px] tracking-wide uppercase font-medium transition ${
              theme === t ? 'bg-black/10 dark:bg-white/20 underline' : 'opacity-70'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-3 py-1.5 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-3 py-1.5 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
        >
          →
        </button>
      </div>
    </div>
  );
}
