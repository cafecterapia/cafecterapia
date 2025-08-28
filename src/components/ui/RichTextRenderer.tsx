import type { CmsBlock, CmsSpan, CmsRichText } from '@/types/cms';

export default function RichTextRenderer({ value }: { value: CmsRichText }) {
  if (!Array.isArray(value)) return null;
  return (
    <div>
      {value.map((block: CmsBlock, i: number) => {
        const children = Array.isArray(block.children)
          ? block.children.map((c: CmsSpan, idx: number) => <span key={idx}>{c?.text ?? ''}</span>)
          : null;
        switch (block.style) {
          case 'h1':
            return (
              <h1 key={i} className="mb-4 text-3xl font-bold">
                {children}
              </h1>
            );
          case 'h2':
            return (
              <h2 key={i} className="mb-3 text-2xl font-semibold">
                {children}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="mb-2 text-xl font-semibold">
                {children}
              </h3>
            );
          case 'blockquote':
            return (
              <blockquote key={i} className="mb-4 border-l-4 pl-4 italic">
                {children}
              </blockquote>
            );
          default:
            return (
              <p key={i} className="mb-4">
                {children}
              </p>
            );
        }
      })}
    </div>
  );
}
