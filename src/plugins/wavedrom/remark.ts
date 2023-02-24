import { visit } from 'unist-util-visit'

function createWaveDromDiv(contents: string) {
  return {
    type: 'html',
    value: `<script type="WaveDrom">
    ${contents}
  </script>`,
  }
}

function visitCodeBlock(ast: any) {
  return visit(ast, 'code', (node, index, parent) => {
    const { lang, value }: { lang: string; value: string } = node
    if (lang !== 'wavedrom')
      return node

    const newNode = createWaveDromDiv(value)
    parent.children.splice(index, 1, newNode)

    return node
  })
}

export function remarkWavedrom() {
  return function transformer(ast: any, vFile: any, next: any) {
    visitCodeBlock(ast)
    if (typeof next === 'function')
      return next(null, ast, vFile)
    return ast
  }
}
