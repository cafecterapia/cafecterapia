import Image from 'next/image';
import Link from 'next/link';
import type { EbookShelfItem } from '@/types/cms';

export default function EbookShelf({ items }: { items: EbookShelfItem[] }) {
  if (!items?.length) {
    return (
      <div className="container mx-auto min-h-[60vh] flex items-center justify-center px-4 pt-32 pb-24 text-center opacity-70">
        Nenhum ebook encontrado.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-32 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <h1 className="text-center text-3xl md:text-5xl font-bold tracking-tight mb-12">Ebooks</h1>
        <div className="flex-1 flex items-center justify-center">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 md:gap-14 max-w-5xl mx-auto">
            {items.map(item => (
              <li key={item.slug} className="group">
                <Link href={`/ebook/${item.slug}`} className="block">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-neutral-900/50 to-neutral-700/30 backdrop-blur-sm hover:scale-[1.03] transition-transform">
                    {item.coverImage?.url ? (
                      <Image
                        src={item.coverImage.url}
                        alt={item.coverImage.alt || item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs sm:text-sm opacity-80">
                        Sem capa
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-xs sm:text-sm md:text-base font-medium text-center group-hover:underline underline-offset-2">
                    {item.title}
                  </div>
                </Link>
              </li>
            ))}
            {/* Empty slots to visually suggest more space for future books */}
            {Array.from({ length: Math.max(0, 8 - items.length) }).map((_, i) => (
              <li
                key={`placeholder-${i}`}
                className="hidden md:block rounded-xl border border-dashed border-white/10 h-full aspect-[3/4] opacity-30 place-self-stretch"
                aria-hidden="true"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
