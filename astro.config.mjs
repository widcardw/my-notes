import { resolve } from 'path'
import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import { remarkMark } from 'remark-mark-highlight'
import remarkCallouts from 'remark-callouts'
import remarkWikiLink from '@flowershow/remark-wiki-link'
import { wikilinkPageResolver } from './src/plugins/wikilink/resolver'
import { remarkMermaid } from './src/plugins/mermaid/remark'
import { remarkWavedrom } from './src/plugins/wavedrom/remark'

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs()],
  site: 'http://astro.build',
  publicDir: 'src/pages/public/',
  resolve: {
    alias: {
      '~/': `${resolve(import.meta.url, 'src')}/`,
    },
  },
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      remarkMark,
      remarkCallouts,
      [remarkWikiLink, {
        pageResolver: wikilinkPageResolver,
      }],
      remarkMermaid,
      remarkWavedrom,
    ],
    rehypePlugins: [rehypeKatex],
  },
})
