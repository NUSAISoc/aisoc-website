// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// katex's ESM build references a bare `__VERSION__` global.
// we must set it on globalThis BEFORE katex.mjs is evaluated.
// because ESM `import` statements are hoisted and run before any top-level
// code, we cannot set the global and then statically import rehype-katex in
// the same file: katex would already have crashed by the time our assignment
// ran. instead, we set the global here (no katex import above this point),
// then use dynamic import() for the plugins so they are resolved after this
// assignment executes.
const katexPackage = JSON.parse(
  readFileSync(new URL('./node_modules/katex/package.json', import.meta.url), 'utf-8')
);
// @ts-ignore – intentional global patch for katex
globalThis.__VERSION__ = katexPackage.version;

// dynamic imports ensure the global is set before katex.mjs is evaluated.
const { default: remarkMath } = await import('remark-math');
const { default: rehypeKatex } = await import('rehype-katex');

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  vite: {
    plugins: [tailwindcss()],
    define: {
      // Still needed for client-side bundles processed by Vite
      __VERSION__: JSON.stringify(katexPackage.version),
    },
  },
});