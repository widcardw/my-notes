module.exports = function (md) {
    md.block.ruler.before('paragraph', 'dbm', function (state, startLine, endLine) {
        var ch, level, tmp, token,
            pos = state.bMarks[startLine] + state.tShift[startLine],
            max = state.eMarks[startLine];
        ch = state.src.charCodeAt(pos);

        if (ch !== 0x21 || pos >= max) { return false; }

        let text = state.src.substring(pos, max);
        // 匹配 ![[public/(path/to/img.jpg)]]
        let rg = /^!\[\[public\/(.*?)\]\]/
        let match = text.match(rg);

        if (match && match.length) {
            let media = match[1];
            // 判断是否存在文件后缀，有后缀的才是图片或视频
            if (!media.match(/(.+?)\.(.+?)/)) { return false; }
            // 将路径中所有的空格都替换为 "%20"，这样就能保证路径带空格也能索引到媒体了
            media = media.replace(/\s/g, "%20");
            let result = "";
            // 匹配视频/音频/图片
            if (media.endsWith('.mp4')) {
                result = `<video controls="controls" src="/${media}" style="width: 100%; height: 100%;"></video>`
            } else if (media.endsWith('.mp3')) {
                result = `<audio controls="controls" src="/${media}"></audio>`
            } else {
                result = `![${media}](/${media})`;  // here
            }
            // console.log(result);

            // markdown it 的处理操作
            token = state.push('paragraph_open', 'p', 1);
            token.markup = '@';
            token.map = [startLine, state.line];

            token = state.push('inline', '', 0);
            token.content = result;
            token.map = [startLine, state.line];
            token.children = [];

            token = state.push('paragraph_close', 'p', -1);
            token.markup = '@';

            state.line = startLine + 1;
            return true;
        }
    })
}