import { getEbookBySlug } from '@/lib/cms/queries';
import EbookReader from '@/components/ebook/EbookReader';
import { notFound } from 'next/navigation';

export default async function EbookReaderPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const ebook = await getEbookBySlug(slug);
  if (!ebook) return notFound();
  return <EbookReader ebook={ebook} />;
}
