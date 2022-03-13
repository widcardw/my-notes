const { mdEnhance } = require("vuepress-plugin-md-enhance");
const sidebar = require("./themes/sidebar.js")

module.exports = {
    title: "widcardw",
    base: "./",
    themeConfig: {
        sidebar,
    },
    plugins: [
        mdEnhance({
            tex: true,
            mermaid: true,
            mark: true,
            container: true,
            tasklist: true,
        }),
    ],
    extendsMarkdown: md => {
        // console.log(md.utils)
        md.use(require("./plugin/double-bracket-media.js"));
        md.use(require("./plugin/admonition-translator.js"));
        // md.use(require("markdown-it-container"), "markdown-it-container", {marker: "```ad-"})
    },
    markdown: {
        code: {
            lineNumbers: true
        }
    }
}