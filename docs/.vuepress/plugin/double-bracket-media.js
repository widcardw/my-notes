module.exports = function (md) {
    md.block.ruler.before('paragraph', 'dbm', function (state, startLine, endLine) {
        var ch, level, tmp, token,
            pos = state.bMarks[startLine] + state.tShift[startLine],
            max = state.eMarks[startLine];
        ch = state.src.charCodeAt(pos);

        if (ch !== 0x21 || pos >= max) { return false; }

        let text = state.src.substring(pos, max);
        let rg = /^!\[\[public\/(.*?)\]\]/
        let match = text.match(rg);

        if (match && match.length) {
            let media = match[1];
            if (!media.match(/(.+?)\.(.+?)/)) { return false; }
            let result = "";
            if (media.endsWith('.mp4')) {
                result = `<video controls="controls" src="/${media}" style="width: 100%; height: 100%;"></video>`
            } else if (media.endsWith('.mp3')) {
                result = `<audio controls="controls" src="/${media}"></audio>`
            } else {
                result = `![${media}](/${media})`;  // here
            }
            // console.log(result);

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