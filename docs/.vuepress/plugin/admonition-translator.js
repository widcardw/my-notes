const CONFIG = {
    tip: {
        label: '提示',
        className: 'tip'
    },
    hint: {
        label: '提示',
        className: 'tip'
    },
    quote: {
        label: '提示',
        className: 'tip'
    },
    note: {
        label: '提示',
        className: 'tip'
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
                `${md.render(token.content).toString()}` +
                `</${adElement}>`
        }
        // 其他类别的处理
        return `${rawCode}`
    }
}

module.exports = admonitionTranslator

