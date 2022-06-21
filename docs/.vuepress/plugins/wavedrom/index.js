const wavedromPlugin = (md) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, index, options, env, slf) => {
    const token = tokens[index];

    if (token.info.trim() === "wavedrom") {
      try {
        const content = token.content.trim();
        return `<Wavedrom id="${index}" parent-text='${content.toString()}'></Wavedrom>`;
        // return `<pre>${content}</pre>`
      } catch (err) {
        return `<pre>${err}</pre>`;
      }
    }
    return temp(tokens, index, options, env, slf);
  };
}

module.exports = wavedromPlugin;
