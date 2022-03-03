module.exports = function (md) {
    const text = md.renderer.rules.text
    md.renderer.rules.text = (...args) => {
        let rawCode = text(...args);
        // 正则匹配
        rawCode = rawCode.replace(/\!\[\[(.+?)\]\]/g, function (match, p1) {
            // 获取后缀
            let suffix = p1.split('.').pop();
            if (suffix === 'png' || suffix === 'jpg' || suffix === 'jpeg' || suffix === 'gif' || suffix === 'svg') {
                return `<img src="${p1}" alt="${p1}"/>`
            } else if (suffix === 'mp4' || suffix === 'webm') {
                return `<video src="${p1}" controls="controls" style="width:100%;height:100%"></video>`
            } else {
                return `${rawCode}`
            }
        });
        return `${rawCode}`
    }
}