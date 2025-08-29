// Flat ESLint config for ESLint v9+
// Migration from legacy .eslintrc.* format.
// Docs: https://eslint.org/docs/latest/use/configure/flat-config
// NOTE: Avoid using eslint-config-next (legacy patch) to prevent @rushstack/eslint-patch error under flat config.

import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
// React plugin (optional stricter rules)
let reactPlugin;
try {
  reactPlugin = require('eslint-plugin-react');
} catch {
  reactPlugin = undefined;
}

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 1. Ignore patterns (placed first so they apply globally)
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'coverage/**',
  'public/**', // static assets
  'sanity/**', // Sanity studio handled separately (add a config later if desired)
  '**/*.md',
  '**/*.css',
  'tailwind.config.ts',
      '*.config.cjs',
      '*.config.js'
    ]
  },
  // 2. Base JavaScript / Next.js plugin rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      ...(reactPlugin ? { react: reactPlugin } : {})
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      // Next.js specific adjustments (App Router friendly)
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'warn',
      // React (guard if plugin loaded)
      ...(reactPlugin
        ? {
            'react/jsx-key': 'warn',
            'react/self-closing-comp': 'warn'
          }
        : {})
    },
    settings: {
      ...(reactPlugin ? { react: { version: 'detect' } } : {})
    }
  },
  // 3. TypeScript specific settings / rules (augmenting what Next already applies)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true, // enables type-aware rules w/out explicit project list (ESLint v9)
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      // Example stricter adjustments (tweak to taste)
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  },
  // 4. Prettier integration (disable conflicting stylistic rules + surface formatting diff as errors)
  prettierConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx,md,mdx,css}'],
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }]
    }
  },
  // 5. General JS/TS overrides or project-specific custom rules can go last
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Example: allow console during development but flag others
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  }
];
