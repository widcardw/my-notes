export const SITE = {
  /**
   * The top left title.
   */
  title: 'Notes',
  /**
   * Site description.
   */
  description: 'Notes of widcardw',
  defaultLanguage: 'zh_CN',
  /**
   * Your site name, **must include the trailing slash**.
   */
  site: 'https://notes.widcard.win/',
  repo: 'https://github.com/widcardw/my-notes/'
}

/**
 * The directory that stores all static assets
 */
export const PUBDIR = 'src/pages/public'

/**
 * Just for SEO?
 */
export const OPEN_GRAPH = {
  image: {
    src: 'https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true',
    alt:
      'astro logo on a starry expanse of space,'
      + ' with a purple saturn-like planet floating in the right foreground',
  },
  twitter: 'astrodotbuild',
}

export const GISCUS = {
  enabled: true,
  id: 'comments',
  repo: 'widcardw/giscus-discussion',
  repoId: 'R_kgDOHOA75A',
  category: 'Announcements',
  categoryId: 'DIC_kwDOHOA75M4COuTG',
  term: 'Welcome',
  mapping: 'url',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'en',
  loading: 'lazy',
}

export const COMMUNITY_INVITE_URL = 'https://discord.gg/TeYHxaua38'

export const TOP_LINKS: TopLink[] = [
  { text: 'widcardw', url: 'https://widcard.win' },
]

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

export const GITHUB_EDIT_URL = `${SITE.repo}/tree/main`

// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

interface TopLink {
  text: string
  url: string
}

export interface SidebarChild {
  text: string
  link: string
  children?: SidebarChild[]
  index?: boolean
}

export type SidebarType = SidebarChild[]
