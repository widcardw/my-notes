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
        element: 'details',
        titleEl: 'summary'
    },
}

function admonitionTranslator(md) {
    const fence = md.renderer.rules.fence
    // const render = md.render
    md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args
        const token = tokens[idx]
        const rawCode = fence(...args)
        if (token.info.includes('ad')) {
            // 获取 admonition 类别
            let adType = token.info.split('-')[1].trim()
            // 根据字典获取样式类
            let adClass = CONFIG[adType].className;
            // 根据字典获取标签
            let adLabel = CONFIG[adType].label;
            // 根据字典获取元素
            let adElement = CONFIG[adType].element ? CONFIG[adType].element : 'div';
            let titleElement = CONFIG[adType].titleEl ? CONFIG[adType].titleEl : 'p';
            // 获取第一行，判断是否为标题
            let firstLine = token.content.split('\n')[0]
            if (firstLine.includes("title:")) {
                let trueTitle = firstLine.split('title:')[1].trim()
                adLabel = trueTitle === '' ? adLabel : trueTitle
                token.content = token.content.replace(firstLine, '')
            }
            // 拼接元素
            return `<${adElement} class="custom-container ${adClass}">` +
                `<${titleElement} class="custom-container-title">${adLabel}</${titleElement}>` +
                // `${md.render(token.content)}` +
                `</${adElement}>`
        }
        // 其他类别的处理
        return `${rawCode}`
    }
}

module.exports = admonitionTranslator

// // Process block-level custom containers
// //
// 'use strict';


// module.exports = function container_plugin(md, name, options) {

//     // Second param may be useful if you decide
//     // to increase minimal allowed marker length
//     function validateDefault(params/*, markup*/) {
//         return params.trim().split(' ', 2)[0] === name;
//     }

//     function renderDefault(tokens, idx, _options, env, slf) {

//         // add a class to the opening tag
//         if (tokens[idx].nesting === 1) {
//             tokens[idx].attrJoin('class', name);
//         }

//         return slf.renderToken(tokens, idx, _options, env, slf);
//     }

//     options = options || {};

//     var min_markers = 3,
//         marker_str = options.marker || '`',
//         marker_char = marker_str.charCodeAt(0),
//         marker_len = marker_str.length,
//         validate = options.validate || validateDefault,
//         render = options.render || renderDefault;

//     function container(state, startLine, endLine, silent) {
//         var pos, nextLine, marker_count, markup, params, token,
//             old_parent, old_line_max,
//             auto_closed = false,
//             start = state.bMarks[startLine] + state.tShift[startLine],
//             max = state.eMarks[startLine];

//         // Check out the first character quickly,
//         // this should filter out most of non-containers
//         //
//         if (marker_char !== state.src.charCodeAt(start)) { return false; }

//         // Check out the rest of the marker string
//         //
//         for (pos = start + 1; pos <= max; pos++) {
//             if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
//                 break;
//             }
//         }

//         marker_count = Math.floor((pos - start) / marker_len);
//         if (marker_count < min_markers) { return false; }
//         pos -= (pos - start) % marker_len;

//         markup = state.src.slice(start, pos);
//         params = state.src.slice(pos, max);
//         if (!validate(params, markup)) { return false; }

//         // Since start is found, we can report success here in validation mode
//         //
//         if (silent) { return true; }

//         // Search for the end of the block
//         //
//         nextLine = startLine;

//         for (; ;) {
//             nextLine++;
//             if (nextLine >= endLine) {
//                 // unclosed block should be autoclosed by end of document.
//                 // also block seems to be autoclosed by end of parent
//                 break;
//             }

//             start = state.bMarks[nextLine] + state.tShift[nextLine];
//             max = state.eMarks[nextLine];

//             if (start < max && state.sCount[nextLine] < state.blkIndent) {
//                 // non-empty line with negative indent should stop the list:
//                 // - ```
//                 //  test
//                 break;
//             }

//             if (marker_char !== state.src.charCodeAt(start)) { continue; }

//             if (state.sCount[nextLine] - state.blkIndent >= 4) {
//                 // closing fence should be indented less than 4 spaces
//                 continue;
//             }

//             for (pos = start + 1; pos <= max; pos++) {
//                 if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
//                     break;
//                 }
//             }

//             // closing code fence must be at least as long as the opening one
//             if (Math.floor((pos - start) / marker_len) < marker_count) { continue; }

//             // make sure tail has spaces only
//             pos -= (pos - start) % marker_len;
//             pos = state.skipSpaces(pos);

//             if (pos < max) { continue; }

//             // found!
//             auto_closed = true;
//             break;
//         }

//         old_parent = state.parentType;
//         old_line_max = state.lineMax;
//         state.parentType = 'container';

//         // this will prevent lazy continuations from ever going past our end marker
//         state.lineMax = nextLine;

//         token = state.push('container_' + name + '_open', 'div', 1);
//         token.markup = markup;
//         token.block = true;
//         token.info = params;
//         token.map = [startLine, nextLine];

//         state.md.block.tokenize(state, startLine + 1, nextLine);

//         token = state.push('container_' + name + '_close', 'div', -1);
//         token.markup = state.src.slice(start, pos);
//         token.block = true;

//         state.parentType = old_parent;
//         state.lineMax = old_line_max;
//         state.line = nextLine + (auto_closed ? 1 : 0);

//         return true;
//     }

//     md.block.ruler.before('fence', 'container_' + name, container, {
//         alt: ['paragraph', 'reference', 'blockquote', 'list']
//     });
//     md.renderer.rules['container_' + name + '_open'] = render;
//     md.renderer.rules['container_' + name + '_close'] = render;
// };
