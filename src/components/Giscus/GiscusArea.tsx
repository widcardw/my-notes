import { createSignal, type Component, onMount, Show, createEffect, onCleanup } from "solid-js";
import { colorTheme } from "../RightSidebar/ThemeToggleButton";

const GiscusArea: Component<{
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping: string
  strict: string
  reactionsEnabled: string
  emitMetadata: string
  inputPosition: 'top' | 'bottom'
  lang: string
  loading: string
}> = (props) => {
  const [mounted, setMounted] = createSignal(false)
  createEffect(() => {
    if (mounted())
      return
    import('giscus')
    setMounted(true)
  })

  const [target, setTarget] = createSignal<HTMLDivElement>()
  const [visible, setVisible] = createSignal(false)

  const observerCb: IntersectionObserverCallback = (entries) => {
    if (visible()) return
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setVisible(true)
        break
      }
    }
  }

  const observer = new IntersectionObserver(observerCb)

  onMount(() => observer.observe(target()))

  onCleanup(() => observer.disconnect())

  return (
    <>
      <div 
        ref={r => setTarget(r)} 
        style={{ 'margin': '4rem auto', 'opacity': 0.5, 'border-bottom': '1px solid #7f7f7f', 'max-width': '15rem' }}
      />
      <Show when={mounted() && visible()}>
        <giscus-widget
          repo={props.repo}
          repo-id={props.repoId}
          category={props.category}
          category-id={props.categoryId}
          mapping={props.mapping}
          strict={props.strict}
          reactions-enabled={props.reactionsEnabled}
          emit-metadata={props.emitMetadata}
          input-position={props.inputPosition}
          lang={props.lang}
          loading={props.loading}
          theme={colorTheme()}
        />
      </Show>
    </>
  )
}

export {
  GiscusArea
}
