import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

function visitCodeBlock(ast: Root) {
  return visit(ast, "code", (node, index, parent) => {
    const { lang, value } = node;
    if (lang !== "mermaid") return
    const newNode = {
      type: "html",
      value: `<div style="position: relative;"><div class="mermaid loading">
      ${value}
    </div>
    <div class="mermaid loading theme-dark">
    %%{init: {'theme':'dark'}}%%
    ${value}
    </div></div>`,
    };
    parent?.children.splice(Number(index), 1, newNode as any);
  })
};

export const remarkMermaid: Plugin<[], Root> = () => {
  return function transformer(ast: Root, vFile: any, next: any) {
    visitCodeBlock(ast);
    if (typeof next === "function") return next(null, ast, vFile);
    return ast;
  };
}
