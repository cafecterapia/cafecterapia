// Sanity v3 schema for the Ebook content type as a plain object (no imports)
const ebook = {
  name: 'ebook',
  title: 'Ebook',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-'),
        isUnique: (slug: any, context: any) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Descrição da imagem para acessibilidade (alt).',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'pages',
      title: 'Pages',
      description:
        'Cada item é uma página. Use o editor para formatar títulos, listas, negrito etc.',
      type: 'array',
      of: [{ type: 'blockContent' }],
      validation: (Rule: any) => Rule.min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'slug.current',
    },
  },
} as const;

export default ebook;
