// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// katex's esm build references a bare `__VERSION__` global that is not
// defined when modules are evaluated in Node.js (outside Vite's transform).
// Setting the global here ensures it is available both at SSR render time
// AND during Vite's bundling pass.
const katexPackage = JSON.parse(
  readFileSync(new URL('./node_modules/katex/package.json', import.meta.url), 'utf-8')
);
// @ts-ignore – intentional global patch for katex
globalThis.__VERSION__ = katexPackage.version;

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  markdown: {
    // Use imported plugin objects instead of strings so they are
    // resolved through the same Node.js context where __VERSION__ is set.
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  vite: {
    plugins: [tailwindcss()],
    define: {
      __VERSION__: JSON.stringify(katexPackage.version),
    },
  },
});