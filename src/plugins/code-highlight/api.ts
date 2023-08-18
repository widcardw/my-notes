import rangeParser from "parse-numeric-range"
import {
  InlineMarkingDefinition,
  LineMarkingDefinition,
  MarkerType,
  MarkerTypeOrder,
} from './types'
import { ShikiBlock } from "./shiki-block"

function isTerminal(lang: string) {
  return ["shellscript", "shell", "bash", "sh", "zsh"].includes(lang)
}

function applyMarkings(
  highlightedCodeHtml: string,
  strLineMarkings: string,
  strInlineMarkings: string
) {
  const lineMarkings: LineMarkingDefinition[] = parseMarkingDefinition(
    strLineMarkings,
    // Syntax: [mark=|del=|ins=]{2-5,7}
    /^(?:(.*)=){(.+)}$/,
    `Invalid code snippet line marking: Expected a range like "{2-5,7}",
      optionally with one of the prefixes "mark=", "del=" or "ins=", but got "$entry"`
  ).map(({ markerType, groupValues: [content] }) => {
    const lines = rangeParser(content)

    return {
      markerType,
      lines,
    };
  });

  const inlineMarkings: InlineMarkingDefinition[] = parseMarkingDefinition(
    strInlineMarkings,
    // Syntax for plaintext strings:
    // - Double quotes:   [mark=|del=|ins=]"<Button />"
    // - Single quotes:   [mark=|del=|ins=]'<p class="hi">'
    //
    // Syntax for regular expressions:
    // - Forward slashes: [mark=|del=|ins=]/hi [a-z]+/
    /^(?:(.*)=)([/"'])(.+)\2$/,
    `Invalid code snippet inline marking: Expected either a string in single or double quotes,
      or a RegExp in forward slashes like "/hi [a-z]+/", optionally with one of the prefixes
      "mark=", "del=" or "ins=", but got "$entry"`
  ).map(({ markerType, groupValues: [delimiter, content] }) => {
    let text: string | undefined;
    let regExp: RegExp | undefined;

    if (delimiter === "/") {
      try {
        // Try to use regular expressions with capture group indices
        regExp = new RegExp(content, "gd");
      } catch (error) {
        // Use fallback if unsupported
        regExp = new RegExp(content, "g");
      }
    } else {
      text = content;
    }

    return {
      markerType,
      text,
      regExp,
    };
  });

  const shikiBlock = new ShikiBlock(highlightedCodeHtml);
  shikiBlock.applyMarkings(lineMarkings, inlineMarkings);
  return shikiBlock.renderToHtml();
}

function parseMarkingDefinition(
  serializedArr: string,
  parts: RegExp,
  parseErrorMsg: string
) {
  return serializedArr
    .split(",")
    .map((entry) => decodeURIComponent(entry))
    .map((entry) => {
      const matches = entry.match(parts);
      let rawMarkerType = matches?.[1];
      // Fix common marker type mistakes
      if (rawMarkerType === "add") rawMarkerType = "ins";
      if (rawMarkerType === "rem") rawMarkerType = "del";
      const markerType = (rawMarkerType as MarkerType) || "mark";
      const isValid = matches && MarkerTypeOrder.includes(markerType);
      if (entry && !isValid) {
        const formattedParseErrorMsg = parseErrorMsg
          .replace("$entry", entry)
          .replace(/\r?\n\s+/g, " ");
        console.error(`*** ${formattedParseErrorMsg}\n`);
      }
      return {
        entry,
        markerType: markerType,
        groupValues: isValid ? matches.slice(2) : [],
      };
    })
    .filter((entry) => entry.groupValues.length);
}

interface CodeSnippetsProps {
  lang: string
  title: string
  lineMarkings: string
  inlineMarkings: string
}

function transformHtml(_, props: string, inner: string) {
  const p: CodeSnippetsProps = {
    lang: '',
    title: '',
    lineMarkings: '',
    inlineMarkings: '',
  }
  props.replace(/lang="([^\"]+)"/, (_, $1: string) => {
    p.lang = $1
    return ''
  })

  props.replace(/title="([^\"]+)"/, (_, $1: string) => {
    p.title = decodeURIComponent($1).replace(/([\\/])/g, "$1<wbr/>")
    return ''
  })

  props.replace(/(?<!in)lineMarkings="([^\"]+)"/, (_, $1: string) => {
    p.lineMarkings = $1
    return ''
  })

  props.replace(/inlineMarkings="([^\"]+)"/, (_, $1: string) => {
    p.inlineMarkings = $1
    return ''
  })

  return (
    '<div class="code-snippet'
    + (isTerminal(p.lang) ? ' is-terminal' : '')
    + (p.title ? ' has-title' : '')
    + ` lang-${p.lang}`
    + '">'
    + (p.title ? '<div class="header">' + p.title + '</div>' : '')
    + applyMarkings(inner, p.lineMarkings, p.inlineMarkings)
    + '</div>'
  )
}

export {
  isTerminal,
  applyMarkings,
  parseMarkingDefinition,
  transformHtml,
}

export type {
  CodeSnippetsProps
}