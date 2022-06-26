const validateInfo = (info: string) => {
    if (!info) {
        throw new Error('`info` is required')
    }
    let regex = /^\>\s\[\!([A-Za-z]+)\]\s?([\S\s]+)?$/
    let match = info.match(regex)
    if (!match) {
        return {}
    }
    return {
        type: match[1].toLowerCase(),
        info: match[2]
    }
}

export default function (md: markdownit, name: string) {
    let marker_char = '>'
    md.block.ruler.before('blockquote', `callout_${name}`,
        (state, startLine, endLine, silent) => {
            let start = state.bMarks[startLine] + state.tShift[startLine]
            let max = state.eMarks[startLine]
            // check the mark of the line
            if (state.src.charAt(start) !== marker_char) {
                return false
            }
            // validate the info (the title)
            let info = state.src.substring(start, max)
            let { type, info: infoText } = validateInfo(info)
            if (!type) {
                return false
            }

            if (silent) { return false }

            // search for the end of the block

            let nextLine = startLine

            for (; ;) {
                nextLine++
                if (nextLine >= endLine) {
                    break
                }

                start = state.bMarks[nextLine] + state.tShift[nextLine]
                max = state.eMarks[nextLine]

                if (state.src.charAt(start) !== marker_char) {
                    break
                }
            }

            state.lineMax = nextLine

            let token = state.push(`callout_${name}_open`, 'details', 1)
            token.markup = marker_char
            token.block = true

            token.info = info
            token.map = [startLine, nextLine]

            token = state.push('callout_title_open', 'summary', 1)

            token = state.push('inline', '', 0)
            token.content = infoText || type.replace(/^\w/, (c) => c.toUpperCase())
            token.map = [startLine, state.line]
            token.children = []

            token = state.push('callout_title_close', 'summary', -1)

            if (startLine + 1 < nextLine) {
                state.md.block.tokenize(state, startLine + 1, nextLine)
            }

            token = state.push(`callout_${name}_close`, 'details', -1)
            token.markup = marker_char
            token.block = true

            state.line = nextLine
            if (startLine + 1 < nextLine) {
                return true
            }

            // empty block
            state.line++
            return true
        })
    md.renderer.rules[`callout_${name}_open`] = (tokens, idx, options, env, self) => {
        let token = tokens[idx]
        let info = token.info
        let { type } = validateInfo(info)
        let html = `<details class="custom-callout ${type}"`
        if (type !== 'example') {
            html += ' open'
        }
        html += '>'

        return html
    }
    md.renderer.rules[`callout_${name}_close`] = (tokens, idx, options, env, self) => {
        return `</details>`
    }

    md.renderer.rules[`callout_title_open`] = (tokens, idx, options, env, self) => {
        return `<summary><div class="callout-title">`
    }
    md.renderer.rules[`callout_title_close`] = (tokens, idx, options, env, self) => {
        return `</div></summary>`
    }
}