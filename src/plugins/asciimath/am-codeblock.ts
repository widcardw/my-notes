import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit'

function createAsciiMathBlock(value: string) {
    return {
      type: 'math',
      meta: null,
      value,
      data: {
        hName: 'div',
        hProperties: { className: ['math', 'math-display'] },
        hChildren: [{ type: 'text', value }],
      },
    }
  }
  

function visitCodeBlock(ast: Root) {
  return visit(ast, 'code', (node, index, parent) => {
    const { lang, value } = node
    if (lang !== 'am' && lang !== 'asciimath')
      return

    const newNode = createAsciiMathBlock(value)
    parent?.children.splice(Number(index), 1, newNode as any)
  })
}

export const remarkAsciimath: Plugin<[], Root> = () => {
  return function transformer(ast: Root, vFile: any, next: any) {
    visitCodeBlock(ast)
    if (typeof next === 'function')
      return next(null, ast, vFile)
    return ast
  }
}
