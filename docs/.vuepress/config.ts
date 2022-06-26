import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import sidebar from './theme/sidebar'
import navbar from './theme/navbar'
import doubleBracketMedia from './plugins/double-bracket-media'
import admonitionTranslator from './plugins/admonition-translator'
import { commentPlugin } from "vuepress-plugin-comment2";
import { localTheme } from './theme/index'
import doubleBracketLink from './plugins/double-bracket-link'
import { defineUserConfig } from 'vuepress'


export default defineUserConfig({
    title: "widcardw 的笔记",
    base: "/",
    theme: localTheme({
        sidebar,
        navbar,
        repo: "widcardw/my-notes",
        repoLabel: "GitHub",
        editLink: true,
        editLinkText: "Edit this page on GitHub",
        lastUpdated: true,
    }),
    public: './docs/public',
    plugins: [
        commentPlugin({
            provider: 'Giscus',
            comment: true,
            repo: "widcardw/giscus-discussion",
            repoId: "R_kgDOHOA75A",
            category: "Announcements",
            categoryId: "DIC_kwDOHOA75M4COuTG",
            inputPosition: 'bottom',
        }),
        mdEnhancePlugin({
            tex: true,
            mermaid: true,
            mark: true,
            container: true,
            tasklist: true,
        }),
    ],
    extendsMarkdown: md => {
        md.use(doubleBracketMedia);
        md.use(doubleBracketLink)
        md.use(admonitionTranslator, 'ad');
    },
    markdown: {
        code: {
            lineNumbers: true
        }
    }
})