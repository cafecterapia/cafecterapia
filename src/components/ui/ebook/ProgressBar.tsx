'use client';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-0 left-0 h-1 w-full bg-black/10 dark:bg-white/10">
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-[width] duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      />
    </div>
  );
}
