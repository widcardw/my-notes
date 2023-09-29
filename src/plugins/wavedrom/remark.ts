import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit'

function createWaveDromDiv(contents: string) {
  return {
    type: 'html',
    value: `<script type="WaveDrom">
    ${contents}
  </script>`,
  }
}

function visitCodeBlock(ast: Root) {
  return visit(ast, 'code', (node, index, parent) => {
    const { lang, value } = node
    if (lang !== 'wavedrom')
      return

    const newNode = createWaveDromDiv(value)
    parent?.children.splice(Number(index), 1, newNode as any)
  })
}

export const remarkWavedrom: Plugin<[], Root> = () => {
  return function transformer(ast: Root, vFile: any, next: any) {
    visitCodeBlock(ast)
    if (typeof next === 'function')
      return next(null, ast, vFile)
    return ast
  }
}
