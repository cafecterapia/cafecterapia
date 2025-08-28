'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Photos() {
  // Replace/add items here when real photos are available
  const photos = [
    '/images/hold-coffee.jpeg',
    '/images/placeholder-cover.jpeg',
    '/images/placeholder-cover.jpeg',
  ];

  return (
    <section className="py-36 bg-bege" style={{ marginTop: '-0.5px' }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mt-6">
          <Swiper slidesPerView={1} loop className="rounded-2xl overflow-hidden">
            {photos.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative h-[28rem] w-full overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={src}
                    alt={`Foto ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
