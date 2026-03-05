// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// katex's esm build references a bare `__VERSION__` global that vite
// doesn't replace during ssr evaluation — provide it explicitly
const katexPackage = JSON.parse(
  readFileSync(new URL('./node_modules/katex/package.json', import.meta.url), 'utf-8')
);

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  markdown: {
    remarkPlugins: ['remark-math'],
    rehypePlugins: ['rehype-katex'],
  },

  vite: {
    plugins: [tailwindcss()],
    define: {
      __VERSION__: JSON.stringify(katexPackage.version),
    },
  },
});