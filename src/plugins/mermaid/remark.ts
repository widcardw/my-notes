import { visit } from 'unist-util-visit'
import type {
  Root as MdastRoot,
  HTML as HTMLContent
} from 'mdast'


interface Options {
  includeLoading?: boolean
}

/**
 * 
 * @param {string} contents 
 * @param {boolean} includeLoading
 * @returns {HTMLContent}
 */
function createMermaidDiv(contents: string, includeLoading: boolean): HTMLContent {
  return {
    type: 'html',
    value: `<div style="position: relative;"><div class="mermaid ${includeLoading ? 'loading' : ''}">
    ${contents}
  </div>
  <div class="mermaid ${includeLoading ? 'loading' : ''} theme-dark">
  %%{init: {'theme':'dark'}}%%
  ${contents}
  </div></div>`,
  }
}

/**
 * 
 * @param {MdastRoot} ast 
 * @param {boolean} includeLoading
 * @returns 
 */
function visitCodeBlock(ast: MdastRoot, includeLoading: boolean) {
  return visit(
    ast,
    'code',
    (node, index, parent) => {
      const { lang, value } = node
      if (lang !== 'mermaid')
        return

      const newNode = createMermaidDiv(value, includeLoading)
      parent && index !== null && parent.children.splice(index, 1, newNode)
    })
}

/** @type {import('unified').Plugin<[Options?] | void[], MdastRoot>} */
export function remarkMermaid(options: Options = {}) {
  const { includeLoading = false } = options
  return function transformer(ast: MdastRoot, vFile: any, next: any) {
    visitCodeBlock(ast, includeLoading)
    if (typeof next === 'function')
      return next(null, ast, vFile)
    return ast
  }
}
