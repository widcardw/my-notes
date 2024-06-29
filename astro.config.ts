import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { remarkMark } from 'remark-mark-highlight';
import { remarkCallouts } from '@widcardw/remark-callouts';
import remarkMath from 'remark-math';
import rehypeAsciimath from '@widcardw/rehype-asciimath'
// import remarkWikiLink from '@portaljs/remark-wiki-link'

import { remarkWavedrom } from './src/plugins/wavedrom/remark';
import { remarkMermaid } from './src/plugins/mermaid/remark';
import { remarkAsciimath } from './src/plugins/asciimath/am-codeblock';

// https://astro.build/config
export default defineConfig({
  site: 'https://notes.widcard.win/',
  integrations: [
    // astroCodeSnippets(),
    starlight({
      title: 'Notes',
      customCss: ['./src/styles/global.css', './src/styles/mermaid.css'],
      social: {
        github: 'https://github.com/widcardw/my-notes'
      },
      sidebar: [
        {
          label: '业余学习',
          autogenerate: { directory: 'afterclass' },
          collapsed: true,
        },
        {
          label: '本科笔记',
          autogenerate: { directory: 'undergraduate' },
          collapsed: true,
        },
        {
          label: '研究生笔记',
          autogenerate: { directory: 'postgraduate' },
          collapsed: true,
        },
        {
          label: '实用工具',
          autogenerate: { directory: 'utils' },
          collapsed: true,
        },
        {
          label: '娱乐',
          autogenerate: { directory: 'play' },
          collapsed: true,
        }
      ],
      lastUpdated: true,
      editLink: { baseUrl: 'https://github.com/widcardw/my-notes/tree/main/' },
    }),
  ],
  markdown: {
    remarkPlugins: [
      (remarkMark as any),
      [remarkCallouts, { foldIcon: false, leadingIcon: false }],
      remarkAsciimath,
      remarkMath,
      remarkWavedrom,
      remarkMermaid,
      // remarkWikiLink,
    ],
    rehypePlugins: [(rehypeAsciimath as any)]
  }
});
