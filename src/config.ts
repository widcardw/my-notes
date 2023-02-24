export const SITE = {
  title: 'Notes',
  description: 'Notes of widcardw',
  defaultLanguage: 'zh_CN',
}

export const OPEN_GRAPH = {
  image: {
    src: 'https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true',
    alt:
      'astro logo on a starry expanse of space,'
      + ' with a purple saturn-like planet floating in the right foreground',
  },
  twitter: 'astrodotbuild',
}

// This is the type of the frontmatter you put in the docs markdown files.
export interface Frontmatter {
  title: string
  description: string
  layout: string
  image?: { src: string; alt: string }
  dir?: 'ltr' | 'rtl'
  ogLocale?: string
  lang?: string
}

export const KNOWN_LANGUAGES = {
  English: 'en',
} as const
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES)

export const GITHUB_EDIT_URL = 'https://github.com/widcardw/my-notes/tree/main'

export const COMMUNITY_INVITE_URL = ''

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: 'XXXXXXXXXX',
  appId: 'XXXXXXXXXX',
  apiKey: 'XXXXXXXXXX',
}

// export type Sidebar = Record<
//   typeof KNOWN_LANGUAGE_CODES[number],
//   Record<string, { text: string; link: string }[]>
// >

export interface SidebarChild {
  text: string
  link: string
  children?: SidebarChild[]
}

export type SidebarType = SidebarChild[]
