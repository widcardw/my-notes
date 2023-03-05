import { resolve } from 'path'
import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import { remarkMark } from 'remark-mark-highlight'
import remarkCallouts from 'remark-callouts'
import remarkWikiLink from '@flowershow/remark-wiki-link'
import { remarkMermaid } from '@widcardw/remark-mermaid-simple'
import { remarkAsciiMath } from '@widcardw/remark-asciimath'
import { wikilinkPageResolver } from './src/plugins/wikilink/resolver'
import { remarkWavedrom } from './src/plugins/wavedrom/remark'

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs()],
  site: 'https://notes.widcard.win',
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
      [remarkMermaid, { includeLoading: true }],
      remarkWavedrom,
      remarkAsciiMath,
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'nord',
    },
  },
})
