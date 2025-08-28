import Image from 'next/image';
import Link from 'next/link';
import type { EbookShelfItem } from '@/types/cms';

export default function EbookShelf({ items }: { items: EbookShelfItem[] }) {
  if (!items?.length) {
    return (
      <div className="container mx-auto py-12 text-center opacity-70">Nenhum ebook encontrado.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Ebooks</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map(item => (
          <li key={item.slug} className="group">
            <Link href={`/ebook/${item.slug}`} className="block">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                {item.coverImage?.url ? (
                  <Image
                    src={item.coverImage.url}
                    alt={item.coverImage.alt || item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-sm">
                    Sem capa
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm sm:text-base font-medium group-hover:underline">
                {item.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
