import { visit } from 'unist-util-visit'
import { is } from 'unist-util-is'
import type { AsciiMathConfig } from 'asciimath-parser'
import { AsciiMath } from 'asciimath-parser'

function createAsciiMathBlock(content: string, am: AsciiMath) {
  return {
    type: 'math',
    meta: null,
    value: content,
    data: {
      hName: 'div',
      hProperties: { className: ['math', 'math-display'] },
      hChildren: [{ type: 'text', value: am.toTex(content) }],
    },
  }
}

function createAsciiMathSpan(content: string, am: AsciiMath) {
  return {
    type: 'math',
    meta: null,
    value: content,
    data: {
      hName: 'span',
      hProperties: { className: ['math', 'math-inline'] },
      hChildren: [{ type: 'text', value: am.toTex(content) }],
    },
  }
}

function normalizePrefixes(prefixes?: string | string[]) {
  if (typeof prefixes === 'string')
    return [prefixes]

  else if (Array.isArray(prefixes))
    return prefixes

  return ['am', 'asciimath']
}

function visitCodeBlock(ast: any, config: RestrictedEscapeConfig, am: AsciiMath) {
  const opening = config.inlineOpen.slice(1)
  const closing = config.inlineClose.slice(0, -1)
  return visit(ast,
    (node) => {
      return (
        is(node, 'code')
        && (node as any).lang
        && (config.prefixes.includes((node as any).lang))
      )
      || (
        is(node, 'inlineCode')
        && (node as any).value.startsWith(opening)
        && (node as any).value.endsWith(closing)
      )
    },
    (node, index, parent) => {
      const { type, value }: { type: string; value: string } = node
      let newNode
      if (type === 'code') {
        newNode = createAsciiMathBlock(value, am)
      }
      else if (type === 'inlineCode') {
        const v = value.slice(opening.length, -closing.length)
        newNode = createAsciiMathSpan(v, am)
      }
      if (newNode)
        parent.children.splice(index, 1, newNode)
      return node
    },
  )
}

interface EscapeConfig {
  prefixes?: string | string[]
  inlineOpen?: string
  inlineClose?: string
}

type RestrictedEscapeConfig = Required<EscapeConfig>

type AmConfig = EscapeConfig & AsciiMathConfig

export function remarkAsciiMathBlock(options: AmConfig = {}) {
  const prefixes = normalizePrefixes(options.prefixes)
  const inlineOpen = options.inlineOpen || '`$'
  const inlineClose = options.inlineClose || '$`'
  const am = new AsciiMath({
    display: options.display,
    extConst: options.extConst,
    replaceBeforeTokenizing: options.replaceBeforeTokenizing,
  })

  return function transformer(ast: any, vFile: any, next: any) {
    visitCodeBlock(ast, { prefixes, inlineClose, inlineOpen }, am)
    if (typeof next === 'function')
      return next(null, ast, vFile)
    return ast
  }
}
