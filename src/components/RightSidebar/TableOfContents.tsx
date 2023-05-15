import type { MarkdownHeading } from 'astro'
import type { Component } from 'solid-js'
import { For, createSignal, mergeProps, onCleanup, onMount } from 'solid-js'

const TableOfContents: Component<{ headings: MarkdownHeading[] }> = (_props) => {
  const props = mergeProps({ headings: [] }, _props)

  const [currentHeading, setCurrentHeading] = createSignal({
    slug: props.headings?.[0]?.slug || '',
    text: props.headings?.[0]?.text || '',
  })

  const setCurrent: IntersectionObserverCallback = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const { id } = entry.target
        setCurrentHeading({
          slug: id,
          text: entry.target.textContent || '',
        })
        break
      }
    }
  }

  const observerOptions: IntersectionObserverInit = {
    rootMargin: '-100px 0% -66%',
    threshold: 1,
  }

  const headingsObserver = new IntersectionObserver(setCurrent, observerOptions)

  onMount(() => {
    document.querySelectorAll('article :is(h2,h3)').forEach(h => headingsObserver.observe(h))
  })

  onCleanup(() => headingsObserver.disconnect())

  return (
    <>
      <h2 class="heading">On this page</h2>
      <ul>
        <li class="heading-link depth-2">
          <a href="#overview">Overview</a>
        </li>
        <For each={props.headings.filter(({ depth }: { depth: number }) => depth > 1 && depth < 4)}>
          {heading => (
            <li
              class={`depth-${heading.depth} heading-link`}
              classList={{ active: currentHeading().slug === heading.slug }}
            >
              <a href={`#${heading.slug}`}>{heading.text}</a>
            </li>
          )}
        </For>
      </ul>
    </>
  )
}

export default TableOfContents
