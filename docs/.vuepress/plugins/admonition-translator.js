const CONFIG = {
    tip: {
        label: '提示',
        className: 'tip'
    },
    hint: {
        label: '提示',
        className: 'info'
    },
    quote: {
        label: '提示',
        className: 'info'
    },
    note: {
        label: '注',
        className: 'note'
    },
    warning: {
        label: '警告',
        className: 'warning'
    },
    caution: {
        label: '注意',
        className: 'warning'
    },
    attention: {
        label: '注意',
        className: 'warning'
    },
    danger: {
        label: '警告',
        className: 'danger'
    },
    error: {
        label: '错误',
        className: 'danger'
    },
    example: {
        label: '示例',
        className: 'details',
    },
}
// Process block-level custom containers
//
'use strict';


module.exports = function (md, name, options) {

    // Second param may be useful if you decide
    // to increase minimal allowed marker length
    function validateDefault(params/*, markup*/) {
        return params.trim().split('-', 2)[0] === name;
    }

    // params = 'ad-name', markup = '```'
    function validateCustom(params/*, markup*/) {
        // 提取 ad 和 name
        let [preTag, containerType] = params.trim().split('-');
        // 判断是否为 admonition 块
        let flag = preTag === name;
        if (flag) {
            // 是则返回 true 以及块类型
            return [flag, containerType];
        } else {
            return [flag];
        }
    }

    function renderDefault(tokens, idx, _options, env, slf) {

        // add a class to the opening tag
        if (tokens[idx].nesting === 1) {
            tokens[idx].attrJoin('class', name);
        }

        return slf.renderToken(tokens, idx, _options, env, slf);
    }

    options = options || {};

    var min_markers = 3,
        marker_str = options.marker || '`',  // marker 为反引号
        marker_char = marker_str.charCodeAt(0),
        marker_len = marker_str.length,
        validate = options.validate || validateCustom,
        render = options.render || renderDefault,
        containerType = options.containerType || 'tip';  // 默认为 tip

    function container(state, startLine, endLine, silent) {
        var pos, nextLine, marker_count, markup, params, token,
            old_parent, old_line_max,
            auto_closed = false,
            start = state.bMarks[startLine] + state.tShift[startLine],
            max = state.eMarks[startLine];

        // Check out the first character quickly,
        // this should filter out most of non-containers
        //
        if (marker_char !== state.src.charCodeAt(start)) {
            return false;
        }

        // Check out the rest of the marker string
        //
        for (pos = start + 1; pos <= max; pos++) {
            if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
                break;
            }
        }

        marker_count = Math.floor((pos - start) / marker_len);
        if (marker_count < min_markers) {
            return false;
        }
        pos -= (pos - start) % marker_len;

        markup = state.src.slice(start, pos);
        params = state.src.slice(pos, max);

        let [flag, containerType] = validate(params, markup);  // flag 为 true 时，说明是 admonition 块
        if (!flag) {
            return false;
        }

        // Since start is found, we can report success here in validation mode
        //
        if (silent) { return true; }

        // Search for the end of the block
        //
        nextLine = startLine;

        let atFirst = true, hasTitle = false;

        for (; ;) {
            nextLine++;
            if (nextLine >= endLine) {
                // unclosed block should be autoclosed by end of document.
                // also block seems to be autoclosed by end of parent
                break;
            }

            start = state.bMarks[nextLine] + state.tShift[nextLine];
            max = state.eMarks[nextLine];

            // 在第一行进行判断，是否为自定义标题
            if (atFirst) {
                atFirst = false;
                // 提取出第一行
                let firstLine = state.src.slice(start, max);
                // 提取出第一行中的标题
                let admonitionTitle = firstLine.split('title:')[1];
                // 判断是否存在标题
                if (admonitionTitle) {
                    // 存在标题，则格式化标题
                    params = ` ${CONFIG[containerType].className} ${admonitionTitle.trim()}`;
                    hasTitle = true;
                } else {
                    params = ` ${CONFIG[containerType].className} ${CONFIG[containerType].label}`;
                }
            }

            if (start < max && state.sCount[nextLine] < state.blkIndent) {
                // non-empty line with negative indent should stop the list:
                // - ```
                //  test
                break;
            }

            if (marker_char !== state.src.charCodeAt(start)) { continue; }

            if (state.sCount[nextLine] - state.blkIndent >= 4) {
                // closing fence should be indented less than 4 spaces
                continue;
            }

            for (pos = start + 1; pos <= max; pos++) {
                if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
                    break;
                }
            }

            // closing code fence must be at least as long as the opening one
            if (Math.floor((pos - start) / marker_len) < marker_count) { continue; }

            // make sure tail has spaces only
            pos -= (pos - start) % marker_len;
            pos = state.skipSpaces(pos);

            if (pos < max) { continue; }

            // found!
            auto_closed = true;
            break;
        }

        old_parent = state.parentType;
        old_line_max = state.lineMax;
        state.parentType = 'container';

        // this will prevent lazy continuations from ever going past our end marker
        state.lineMax = nextLine;

        // 对于有标题的 admonition 块，需要从去除标题的那一行开始渲染
        if (hasTitle) {
            startLine++;
        }

        token = state.push('container_' + CONFIG[containerType].className + '_open', 'div', 1);
        token.markup = markup;
        token.block = true;
        token.info = params;               // 与原版 container 格式一致
        token.map = [startLine, nextLine];

        // console.log("admonition", token)

        state.md.block.tokenize(state, startLine + 1, nextLine);

        token = state.push('container_' + CONFIG[containerType].className + '_close', 'div', -1);
        token.markup = state.src.slice(start, pos);
        token.block = true;

        state.parentType = old_parent;
        state.lineMax = old_line_max;
        state.line = nextLine + (auto_closed ? 1 : 0);

        return true;
    }

    md.block.ruler.before('fence', 'container_' + CONFIG[containerType].className, container, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });
    md.renderer.rules['container_' + CONFIG[containerType].className + '_open'] = render;
    md.renderer.rules['container_' + CONFIG[containerType].className + '_close'] = render;
};
