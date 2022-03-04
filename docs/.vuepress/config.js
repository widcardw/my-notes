const { mdEnhance } = require("vuepress-plugin-md-enhance");
const sidebar = require("./themes/sidebar.js")

module.exports = {
    title: "widcardw",
    base: "/my-notes/",
    themeConfig: {
        sidebar
    },
    plugins: [
        mdEnhance({
            tex: true,
            mermaid: true,
            mark: true,
        }),
    ],
    extendsMarkdown: md => {
        md.use(require("./plugin/double-bracket-media"));
        md.use(require("./plugin/admonition-translator.js"));
    },
    markdown: {
        code :{
            lineNumbers: true
        }
    }
}