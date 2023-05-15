import { defineConfig } from 'astro/config'
import solidJs from "@astrojs/solid-js"
import { remarkMark } from 'remark-mark-highlight'
import remarkCallouts from 'remark-callouts'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { remarkAsciiMath } from '@widcardw/remark-asciimath'
import { remarkWikiLink } from '@flowershow/remark-wiki-link'
import rehypeExternalLinks from 'rehype-external-links'
import { SITE, PUBDIR } from './src/config'
import { remarkMermaid } from './src/plugins/mermaid/remark'
import { wikilinkPageResolver } from './src/plugins/wikilink/resolver'
import { astroCodeSnippets } from './src/plugins/code-highlight/remark'
import { remarkWavedrom } from './src/plugins/wavedrom/remark'

// https://astro.build/config
export default defineConfig({
  site: SITE.site,
  integrations: [
    solidJs(),
    astroCodeSnippets(),
  ],
  // you should put your static assets in this directory
  publicDir: PUBDIR,
  markdown: {
    gfm: true,
    remarkPlugins: [
      remarkMark as any,
      remarkCallouts,
      [remarkMermaid, { includeLoading: true }],
      remarkWavedrom,
      remarkMath,  // used for math
      remarkAsciiMath,  // used for math
      [remarkWikiLink, { pageResolver: wikilinkPageResolver }],
    ],
    rehypePlugins: [
      rehypeKatex,  // used for math
      [rehypeExternalLinks, { target: '_blank', rel: 'nofollow' }],
    ],
    shikiConfig: {
      theme: 'nord',
    },
  },
})
