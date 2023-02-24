import type { MarkdownHeading } from 'astro'
import type { Component } from 'solid-js'
import { For, mergeProps } from 'solid-js'

// interface ItemOffsets {
//   id: string
//   topOffset: number
// }

const TableOfContents: Component<{ headings: MarkdownHeading[] }> = (_props) => {
  const props = mergeProps({ headings: [] }, _props)

  return (
    <>
      <h2 class="heading">On this page</h2>
      <ul>
        <li class="heading-link depth-2">
          <a href="#overview">Overview</a>
        </li>
        <For each={props.headings.filter(({ depth }: { depth: number }) => depth > 1 && depth < 4)}>
          {heading => (
            <li class={`depth-${heading.depth} heading-link`}>
              <a href={`#${heading.slug}`}>{heading.text}</a>
            </li>
          )}
        </For>
      </ul>
    </>
  )
}

export default TableOfContents
