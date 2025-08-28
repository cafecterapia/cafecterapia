import type { Ebook, EbookShelfItem } from '@/types/cms';
import { getCmsClient } from './client';

// Data layer: centralize fetching from the CMS.
// For now, provide a tiny in-memory fallback so the app runs without a live CMS.

const fallbackShelf: EbookShelfItem[] = [
  {
    title: 'Cafecterapia — Volume 1',
    slug: 'cafecterapia-volume-1',
    coverImage: {
      url: '/svgs/placeholder-cover.svg',
      alt: 'Capa do ebook Cafecterapia Volume 1',
    },
  },
];

const fallbackDetail: Record<string, Ebook> = {
  'cafecterapia-volume-1': {
    id: 'mock-1',
    title: 'Cafecterapia — Volume 1',
    slug: 'cafecterapia-volume-1',
    coverImage: {
      url: '/svgs/placeholder-cover.svg',
      alt: 'Capa do ebook Cafecterapia Volume 1',
    },
    pages: [
      [
        { _type: 'block', style: 'h1', children: [{ text: 'Bem-vindo(a) ao Cafecterapia' }] },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              text: 'Este é um exemplo de página. Conecte seu CMS para ver o conteúdo real.',
            },
          ],
        },
      ],
      [
        { _type: 'block', style: 'h2', children: [{ text: 'Capítulo 1: O ritual do café' }] },
        {
          _type: 'block',
          style: 'normal',
          children: [{ text: 'Use os botões ou o swipe para navegar entre as páginas.' }],
        },
      ],
    ],
  },
};

export async function getAllEbooks(): Promise<EbookShelfItem[]> {
  const client = getCmsClient();
  void client; // Replace with real fetch when wiring CMS
  return fallbackShelf;
}

export async function getEbookBySlug(slug: string): Promise<Ebook | null> {
  const client = getCmsClient();
  void client; // Replace with real fetch when wiring CMS
  return fallbackDetail[slug] ?? null;
}
