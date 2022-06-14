const { mdEnhancePlugin } = require("vuepress-plugin-md-enhance");
const sidebar = require("./themes/sidebar.js")
const navbar = require("./themes/navbar.js")
const { defaultTheme } = require('@vuepress/theme-default')


module.exports = {
    title: "widcardw 的笔记",
    base: "/",
    theme: defaultTheme({
        sidebar,
        navbar,
        repo: "widcardw/my-notes",
        repoLabel: "GitHub",
        // 是否在导航栏内显示仓库链接，默认为 `true`
        repoDisplay: true,
        editLink: true,
        editLinkText: "Edit this page on GitHub",
    }),
    public: './docs/public',
    plugins: [
        mdEnhancePlugin({
            tex: true,
            mermaid: true,
            mark: true,
            container: true,
            tasklist: true,
        }),
    ],
    extendsMarkdown: md => {
        md.use(require("./plugin/double-bracket-media.js"));
        md.use(require("./plugin/admonition-translator.js"), 'ad');
    },
    markdown: {
        code: {
            lineNumbers: true
        }
    }
}