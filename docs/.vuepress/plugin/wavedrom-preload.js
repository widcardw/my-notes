// 暂时不能用
module.exports = function (md) {
    const fence = md.renderer.rules.fence
    md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args
        const token = tokens[idx]
        const rawCode = fence(...args)
        if (token.info.trim() === 'wavedrom') {
            return `<script type="WaveDrom">` +
                `${token.content}` +
                `</script>`
        }
        // 其他类别的处理
        return `<!--beforebegin--><div class="language-${token.info.trim()} extra-class">` +
            `<!--afterbegin-->${rawCode}<!--beforeend--></div><!--afterend-->`
    }
}