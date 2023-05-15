import { visit } from 'unist-util-visit'
import type { BuildVisitor } from 'unist-util-visit'
import type { BlockContent, Parent, Root } from 'mdast'
import type { AstroIntegration } from 'astro'  

const CodeSnippetTagname = 'CodeSnippets'
export const codeSnippetAutoImport: Record<string, [string, string][]> = {
  '~/plugins/code-highlight/CodeSnippets.astro': [['default', CodeSnippetTagname]],
}

interface NodeProps {
  attributes?: Record<string, string | boolean | number | undefined | null>  
}

export interface CodeSnippetWrapper extends Parent {
	type: 'codeSnippetWrapper'  
	children: BlockContent[]  
}

declare module 'mdast' {
	interface BlockContentMap {
		codeSnippetWrapper: CodeSnippetWrapper  
	}
}

function makeAFMDComponentNode(
  hName: string,
  { attributes }: NodeProps,
  ...children: BlockContent[]
): CodeSnippetWrapper {
  return {
    type: 'codeSnippetWrapper',
    data: { hName, hProperties: attributes },
    children,
  }  
}

// From https://github.com/withastro/docs/blob/3444c5734bfc180548de54a1a34f573b3383c941/integrations/astro-code-snippets.ts
function parseMeta(meta: string) {
  let title: string | undefined  
  meta = meta.replace(/(?:\s|^)title\s*=\s*(["'])(.*?)(?<!\\)\1/, (_, __, content) => {
    title = content
    return ''
  })

  const lineMarkings: string[] = []  
  meta = meta.replace(/(?:\s|^)(?:([a-zA-Z]+)\s*=\s*)?({[0-9,\s-]*})/g, (_, prefix, range) => {
    lineMarkings.push(`${prefix || 'mark'}=${range}`)  
    return ''  
  })  

  const inlineMarkings: string[] = []  
  meta = meta.replace(
    /(?:\s|^)(?:([a-zA-Z]+)\s*=\s*)?([/"'])(.*?)(?<!\\)\2(?=\s|$)/g,
    (_, prefix, delimiter, expression) => {
      inlineMarkings.push(`${prefix || 'mark'}=${delimiter}${expression}${delimiter}`)  
      return ''  
    }
  )  

  return {
    title,
    lineMarkings,
    inlineMarkings,
    meta,
  }  
}

export function encodeMarkdownStringProp(input: string | undefined) {
  return (input !== undefined && encodeURIComponent(input)) || undefined  
}

export function encodeMarkdownStringArrayProp(arrInput: string[] | undefined) {
  if (arrInput === undefined) return undefined  
  return arrInput.map((input) => encodeURIComponent(input)).join(',') || undefined  
}


function visitCodeBlock(ast: any) {
  const visitor: BuildVisitor<Root, 'code'> = (node, index, parent) => {
    if (parent === null || index === null) return
    const { lang, meta } = node
    if (meta) {
      const { title = '', lineMarkings, inlineMarkings } = parseMeta(meta)

      const attributes = {
        lang,
        title: encodeMarkdownStringProp(title),
        lineMarkings: encodeMarkdownStringArrayProp(lineMarkings),
        inlineMarkings: encodeMarkdownStringArrayProp(inlineMarkings),
      }

      const codeSnippetWrapper = makeAFMDComponentNode(
        CodeSnippetTagname,
        { attributes },
        node,
      )

      parent.children.splice(index, 1, codeSnippetWrapper)
    }
  }
  return visit(ast, 'code', visitor)
}

export function remarkHighlightLine() {
  return function transformer(ast: any, vFile: any, next: any) {
    visitCodeBlock(ast)
    if (typeof next === 'function')
      return next(null, ast, vFile)
    return ast
  }
}

export function astroCodeSnippets(): AstroIntegration {
  return {
    name: '@astrojs/code-snippets',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkHighlightLine],
          },
        })
      },
    },
  }
}