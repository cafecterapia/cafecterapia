'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Ebook } from '@/types/cms';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import ReaderControls, { type ThemeOption } from '@/components/ui/ebook/ReaderControls';
import ProgressBar from '@/components/ui/ebook/ProgressBar';

type SwiperControls = { slideNext: () => void; slidePrev: () => void } | null;

export default function EbookReader({ ebook }: { ebook: Ebook }) {
  const swiperRef = useRef<SwiperControls>(null);
  const [fontSize, setFontSize] = useState(18); // px
  const [theme, setTheme] = useState<ThemeOption>('sepia');
  const [progress, setProgress] = useState(0); // 0-1

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') swiperRef.current?.slideNext?.();
    if (e.key === 'ArrowLeft') swiperRef.current?.slidePrev?.();
    if (e.key === '+') setFontSize(f => Math.min(28, f + 1));
    if (e.key === '-') setFontSize(f => Math.max(14, f - 1));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const themeClasses: Record<typeof theme, string> = {
    sepia: 'bg-[#f5ecd9] text-[#3b2f23]',
    dark: 'bg-[#111827] text-gray-200',
    light: 'bg-white text-zinc-900',
  } as const;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-16">
      <header className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{ebook.title}</h1>
          <Link
            href="/ebook"
            className="inline-flex w-fit items-center gap-1 text-xs uppercase tracking-wide font-medium px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
          >
            ← Voltar
          </Link>
        </div>
        <ReaderControls
          fontSize={fontSize}
          onFontSize={setFontSize}
          theme={theme}
          onTheme={setTheme}
          onPrev={() => swiperRef.current?.slidePrev?.()}
          onNext={() => swiperRef.current?.slideNext?.()}
        />
      </header>

      <div className="relative rounded-2xl shadow ring-1 ring-black/10 overflow-hidden">
        <Swiper
          modules={[Navigation, Keyboard]}
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = {
              slideNext: () => swiper.slideNext(),
              slidePrev: () => swiper.slidePrev(),
            };
          }}
          onSlideChange={s => setProgress(s.activeIndex / (ebook.pages.length - 1 || 1))}
          className="ebook-swiper"
        >
          {ebook.pages.map((page, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`${themeClasses[theme]} transition-colors duration-300 min-h-[60vh] md:min-h-[70vh] flex`}
              >
                <div
                  className="mx-auto w-full max-w-3xl px-6 md:px-14 py-10 leading-relaxed"
                  style={{ fontSize }}
                >
                  <RichTextRenderer value={page} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <ProgressBar progress={progress} />
      </div>
      <p className="mt-4 text-center text-xs opacity-60">
        Use ← → ou clique para navegar. + / - ajusta o tamanho.
      </p>
    </div>
  );
}
