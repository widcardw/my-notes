import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { applyMarkings, isTerminal } from './api'

const rehypePlugin: Plugin = function () {
  return (tree) => {
    visit(tree, 'element', (element) => {
      // Here `element` is marked as `never`, but it really exists
      // but it's no good to completely disable ts-check
      const el = element as any
      const tagName = el.tagName
      if (tagName !== 'CodeSnippets')
        return

      let { lang, title = '', lineMarkings = '', inlineMarkings = '' }: {
        lang: string
        title: string
        lineMarkings: string
        inlineMarkings: string
      } = el.properties

      title = decodeURIComponent(title).replace(/([\\/])/g, "$1<wbr/>")

      /**
       * Actually we only use this type...
       */
      const children: Array<{ type: 'raw', value: string }> = el.children
      const codeRaw = children[0].value

      let hasTitle = false
      let langIsTerminal = isTerminal(lang)

      const transformedCodeRaw = applyMarkings(codeRaw, lineMarkings, inlineMarkings)
      children[0].value = transformedCodeRaw

      if (title && title.trim()) {
        hasTitle = true
        const headerEl: { type: 'raw'; value: string; } = {
          type: 'raw',
          value: `<div class="header">${title}</div>`
        }
        children.unshift(headerEl)
      }

      el.tagName = 'div'
      el.properties = {
        className: [
          hasTitle && 'has-title',
          langIsTerminal && 'is-terminal',
          `lang-${lang}`,
          'code-snippet'
        ].filter(Boolean).join(' ')
      }
    })
  }
}

export {
  rehypePlugin as rehypeCodeSnippets
}
