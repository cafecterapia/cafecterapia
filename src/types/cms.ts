// CMS-agnostic types for content used in the app.
// For Sanity, a rich text page is a Portable Text array (PortableTextBlock[]).
export type CmsSpan = { _type?: string; text?: string; marks?: string[] };
export type CmsBlock = {
  _type?: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'blockquote' | string;
  children?: CmsSpan[];
} & Record<string, unknown>;
export type CmsRichText = CmsBlock[]; // One rich text document (array of blocks)

export type CmsImage = {
  url: string;
  alt?: string | null;
} | null;

export type EbookShelfItem = {
  title: string;
  slug: string;
  coverImage: CmsImage;
};

export type Ebook = EbookShelfItem & {
  id?: string;
  // Each page is a standalone rich text document so the author can add/remove/reorder pages freely
  pages: CmsRichText[];
};
