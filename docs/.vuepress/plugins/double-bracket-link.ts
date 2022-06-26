import type { default as Token } from 'markdown-it/lib/token'

const processLink = (link: string): string => {
    let [path, title] = link.split('#')

    if (!title) {
        return `/${path}`
    }

    if (title[0] === '^') {
        title = title.slice(1)
    }
    
    if (title.match(/^[0-9][\s\S]+/)) {
        title = `_${title}`
    }

    title = title.replace(/ /g, '-')

    if (!path) {
        return `#${title}`
    }
    
    return `/${path}.html#${title}`
}

export default function (md: markdownit) {
    md.inline.ruler.before('emphasis', 'dbl', (state, silent) => {
        let match
        let pos
        let token: Token

        if (state.pos + 2 >= state.posMax) return false

        if (state.src.slice(state.pos, state.pos + 2) !== '[['
            && state.src.slice(state.pos, state.pos + 3) !== '![[') return false

        let offset: number

        if (state.src.slice(state.pos, state.pos + 2) === '[[') {
            offset = 2
        } else {
            offset = 3
        }

        const start = state.pos + offset

        match = start

        // 从 katex 抄的
        while ((match = state.src.indexOf("]]", match)) !== -1) {
            /*
             * Found potential $, look for escapes, pos will point to
             * first non escape when complete
             */
            pos = match - 1;
            while (state.src[pos] === "\\") pos -= 1;

            // Even number of escapes, potential closing delimiter found
            if ((match - pos) % 2 === 1) break;

            match += 1;
        }

        if (match === -1) {
            if (!silent) state.pending += ']]'

            state.pos = start + offset

            return true
        }


        if (!silent) {
            // 链接节点打开
            token = state.push('link_open', 'a', 1)
            token.markup = 'dblink'
            let content = state.src.slice(start, match)

            let link = processLink(content)

            // 设置链接的参数
            let bIndex = token.attrIndex('href')
            if (bIndex < 0) {
                token.attrPush(['href', link])
            } else {
                if (token.attrs)
                    token.attrs[bIndex][1] = link;
            }

            // 文本节点
            token = state.push('text', '', 0)
            token.content = content

            // 链接节点关闭
            token = state.push('link_close', 'a', -1)
            token.markup = 'dblink'
            token.content = ''
        }

        // 指针向后移动到方括号后面
        state.pos = match + 2

        return true
    })
}