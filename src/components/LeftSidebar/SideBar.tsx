import { For, Match, Switch } from 'solid-js'
import type { Component } from 'solid-js'
import type { SidebarChild, SidebarType } from '~/config'
import { SIDEBAR } from '~/config'
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
            <h2 class="heading">{props.bar.text}</h2>
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
        <For each={SIDEBAR}>
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
