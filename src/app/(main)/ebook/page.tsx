import { getAllEbooks } from '@/lib/cms/queries';
import EbookShelf from '@/components/ebook/EbookShelf';

export default async function EbookPage() {
  const items = await getAllEbooks();
  return <EbookShelf items={items} />;
}
