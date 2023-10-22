import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { remarkMark } from 'remark-mark-highlight';
import { remarkCallouts } from '@widcardw/remark-callouts';
import remarkMath from 'remark-math';
import rehypeAsciimath from '@widcardw/rehype-asciimath'
import { remarkWikiLink } from './src/plugins/wiki/remarkWikiLink';
import { remarkWavedrom } from './src/plugins/wavedrom/remark';
import { remarkMermaid } from './src/plugins/mermaid/remark';

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    // astroCodeSnippets(),
    expressiveCode({ theme: ['github-light', 'github-dark'] }),
    starlight({
      title: 'Notes',
      customCss: ['./src/styles/global.css', './src/styles/mermaid.css'],
      social: {
        github: 'https://github.com/widcardw/my-notes'
      },
      sidebar: [{
        label: '业余学习',
        autogenerate: {
          directory: 'afterclass'
        },
        collapsed: true
      }, {
        label: '本科笔记',
        autogenerate: {
          directory: 'undergraduate'
        },
        collapsed: true
      }, {
        label: '研究生笔记',
        autogenerate: {
          directory: 'postgraduate'
        },
        collapsed: true
      }, {
        label: '实用工具',
        autogenerate: {
          directory: 'utils'
        },
        collapsed: true
      }]
    })],
  publicDir: 'src/content/docs/public',
  markdown: {
    remarkPlugins: [
      (remarkMark as any), 
      remarkCallouts, 
      remarkMath, 
      // remarkAsciiMath, 
      [remarkWikiLink, {
      // wikiLinkResolver: wikilinkPageResolver
      pathFormat: 'obsidian-absolute',
      wikiLinkResolver: (target: string) => {
        // for [[#heading]] links
        if (!target) return [];
        let permalink = target.replace(/\/index$/, "");
        // TODO what to do with [[index]] link?
        if (permalink.length === 0) permalink = "/";
        permalink = permalink.replace('public/', '');
        return [permalink];
      }
    }],
      remarkWavedrom,
      remarkMermaid,
    ],

    rehypePlugins: [(rehypeAsciimath as any)]
  }
});