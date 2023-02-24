import { visit } from 'unist-util-visit'

function createMermaidDiv(contents: string) {
  return {
    type: 'html',
    value: `<pre class="mermaid">
    ${contents}
  </pre>`,
  }
}

function visitCodeBlock(ast: any) {
  return visit(ast, 'code', (node, index, parent) => {
    const { lang, value }: { lang: string; value: string } = node
    if (lang !== 'mermaid')
      return node

    const newNode = createMermaidDiv(value)
    parent.children.splice(index, 1, newNode)

    return node
  })
}

export function remarkMermaid() {
  return function transformer(ast: any, vFile: any, next: any) {
    visitCodeBlock(ast)
    if (typeof next === 'function')
      return next(null, ast, vFile)
    return ast
  }
}
