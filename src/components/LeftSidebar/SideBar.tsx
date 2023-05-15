import { For, Match, Show, Switch } from 'solid-js'
import type { Component } from 'solid-js'
import type { SidebarChild, SidebarType } from '~/config'
import './SideBar.css'

function removeLeadingSlash(s: string) {
  if (s.slice(0, 1) === '/')
    return s.slice(1)
  return s
}

const ChildBar: Component<{
  bar: SidebarChild
  url?: string
  current: string
}> = (props) => {
  return (
    <Switch>
      <Match when={!props.bar.children || props.bar.children.length <= 0}>
        <a
          href={props.url}
          aria-current={props.current === removeLeadingSlash(props.url || '') ? 'page' : false}
        >
          {props.bar.text}
        </a>
      </Match>
      <Match when={props.bar.children && props.bar.children.length > 0}>
        <details
          class="nav-group"
          open={props.current.startsWith(removeLeadingSlash(props.url || ''))}
        >
          <summary>
            <Show when={props.bar.index} fallback={<span class="heading">{props.bar.text}</span>}>
              <a
                class="heading not-link"
                style={{ "font-weight": 'bold' }}
                href={props.url}
                aria-current={props.current === removeLeadingSlash(props.url || '') ? 'page' : false}
              >{props.bar.text}</a>
            </Show>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-down fold-icon"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="nav-body">
            <For each={props.bar.children}>
              {child => (
                <li class="nav-link">
                  <ChildBar bar={child} url={`${props.url}/${child.link}`} current={props.current} />
                </li>
              )}
            </For>
          </div>
        </details>
      </Match>
    </Switch>
  )
}

const SideBar: Component<{
  SIDEBAR: SidebarType
  current: string
  url?: string
}> = (props) => {
  return (
    <nav aria-labelledby="grid-left">
      <ul class="nav-groups">
        <For each={props.SIDEBAR}>
          {child => (
            <li class="nav-link">
              <ChildBar bar={child} url={props.url + child.link} current={props.current} />
            </li>)}
        </For>
      </ul>
    </nav>
  )
}

export {
  SideBar,
}
