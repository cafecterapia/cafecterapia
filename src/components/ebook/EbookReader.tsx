'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Ebook } from '@/types/cms';
import RichTextRenderer from '@/components/ui/RichTextRenderer';

type SwiperControls = { slideNext: () => void; slidePrev: () => void } | null;

export default function EbookReader({ ebook }: { ebook: Ebook }) {
  const swiperRef = useRef<SwiperControls>(null);

  return (
    <div className="container mx-auto px-4 pt-10 pb-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{ebook.title}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev?.()}
            className="px-3 py-1.5 rounded bg-muted hover:bg-muted/80"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext?.()}
            className="px-3 py-1.5 rounded bg-muted hover:bg-muted/80"
          >
            Próxima
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Keyboard]}
        onSwiper={(swiper: SwiperType) => {
          // Expose a tiny control surface for buttons
          swiperRef.current = {
            slideNext: () => swiper.slideNext(),
            slidePrev: () => swiper.slidePrev(),
          };
        }}
        navigation
        keyboard
        className="rounded-lg overflow-hidden ebook-swiper"
      >
        {ebook.pages.map((page, idx) => (
          <SwiperSlide key={idx}>
            <div className="prose max-w-none p-6">
              <RichTextRenderer value={page} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
