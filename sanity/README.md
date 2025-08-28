# CMS: Ebook schema (Sanity)

Este diretório contém o modelo de dados do tipo "Ebook" pronto para ser usado no Sanity (Headless CMS). Ele foi projetado para oferecer uma experiência de edição simples e à prova de erros para o proprietário do site.

## O que está incluído
- `schemas/ebook.ts`: Documento principal "Ebook" com os campos:
  - `title` (texto)
  - `slug` (slug) gerado automaticamente a partir do `title`, único e próprio para URL
  - `coverImage` (imagem) com campo `alt` obrigatório
  - `pages` (array de Rich Text), onde cada item representa uma página do ebook e abre um editor de texto completo
- `schemas/blockContent.ts`: Definição reutilizável de Rich Text (Portable Text) com títulos, listas, negrito, itálico e código.
- `schemas/index.ts`: Exporta os tipos de schema para serem registrados na configuração do Sanity.

Observação: os arquivos aqui são objetos TypeScript simples (sem importar a lib `sanity`), para evitar depender de pacotes no projeto Next.js. Eles podem ser copiados/colados diretamente em um Studio do Sanity.

## Como instalar e abrir o Sanity Studio
Você pode criar um Studio dentro desta pasta (`/sanity`) ou em um repositório separado. Exemplo criando aqui:

1) Crie o Studio (requer Node 18+):

```sh
# Dentro do diretório do repositório
cd sanity
npm create sanity@latest -- --template clean
# Sanity CMS Setup (optional)
```

2) Copie nossos schemas para o Studio recém-criado, substituindo/mesclando:
- Copie `sanity/schemas/*.ts` deste repo para `sanity/schemas/` do Studio.
- No `sanity.config.ts` do Studio, registre os schemas:

```ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import ebook from './schemas/ebook';
import blockContent from './schemas/blockContent';

export default defineConfig({
  name: 'default',
  title: 'Cafecterapia CMS',
  projectId: '<SEU_PROJECT_ID>',
  dataset: 'production',
  schema: { types: [ebook, blockContent] },
  plugins: [structureTool(), visionTool()],
});
```

3) Rode o Studio:

```sh
npm run dev
```

Acesse o Studio em http://localhost:3333 (ou a porta exibida no terminal).

## Como o modelo cumpre os requisitos
- Slug automático e único: o campo `slug` tem `options.source = 'title'` e `isUnique` padrão do Sanity, além de `slugify` para URL. O autor nunca precisa digitar o slug manualmente.
- Páginas como array de Rich Text: `pages` é um `array` onde cada item é um documento de Rich Text, permitindo adicionar, remover e reordenar livremente páginas.
- Editor completo por página: o `blockContent` habilita títulos (H1–H3), listas (numerada e com marcadores), negrito, itálico e código.
- Fluxo autônomo: o autor cria e modifica ebooks inteiros visualmente, sem intervenção técnica.

## Dicas de uso para o autor
1) Clique em "Ebook" e crie um novo documento.
2) Preencha o título; o slug é gerado automaticamente.
3) Faça upload da capa e escreva o "Alt text" (acessibilidade).
4) Em "Pages", clique em "Add item" para criar cada página do ebook. Use os controles do editor para formatar.
5) Arraste para reordenar as páginas. Publique quando estiver pronto.

## Como consumir no Next.js
Este projeto já tem tipos e consultas de exemplo:
- Tipos: `src/types/cms.ts` (Ebook, CmsImage, CmsRichText)
- Consultas: `src/lib/cms/queries.ts` (GROQ `ebookBySlug` e `allEbooks`)
- Cliente: `src/lib/cms/client.ts` (placeholder para você conectar o SDK oficial do Sanity)

Integração sugerida (exemplo):
- Instale deps no Studio (separado do app) e no app, adicione o cliente do Sanity (`@sanity/client`) e a lib para imagens (`@sanity/image-url`) se desejar.
- Use `ebookBySlug` para obter um ebook completo (inclui `pages`).

Qualquer dúvida ou se preferir outro CMS (Strapi, Contentful, Prismic), posso converter este modelo para o provedor escolhido.
