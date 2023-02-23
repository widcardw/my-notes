function wikiLinkTransclusionFormat(extension: string) {
  const transclusionFormats = [
    /\.jpe?g$/,
    /\.a?png$/,
    /\.webp$/,
    /\.avif$/,
    /\.gif$/,
    /\.svg$/,
    /\.bmp$/,
    /\.ico$/,
    /\.pdf$/,
  ]

  const supportedFormat = extension.match(
    transclusionFormats.filter(r => extension.match(r))[0],
  )?.[0]
  const strippedExtension = extension.match(/\.[0-9a-z]{1,4}$/gi)

  if (!supportedFormat)
    return [false, strippedExtension && strippedExtension[0].replace('.', '')]

  return [true, supportedFormat.replace('.', '')]
}

function wikilinkPageResolver(name: string) {
  const image = wikiLinkTransclusionFormat(name)[1]
  let heading = ''
  if (!image && !name.startsWith('#') && name.match(/#/)) {
    [, heading] = name.split('#')
    name = name.replace(`#${heading}`, '')
  }
  // if (opts.permalinks || opts.markdownFolder) {
  //   const url = opts.permalinks.find(
  //     p =>
  //       p === name
  //       || (p.split('/').pop() === name
  //         && !opts.permalinks.includes(p.split('/').pop())),
  //   )
  //   if (url) {
  //     if (heading)
  //       return [`${url}#${heading}`.replace(/ /g, '-').toLowerCase()]
  //     return image ? [url] : [url.replace(/ /g, '-').toLowerCase()]
  //   }
  // }
  if (name.startsWith('public'))
    name = name.replace('public/', '')
  name = name.replace(/ (\d)/g, '$1')
  return image ? [name] : [name.replace(/ /g, '-').toLowerCase()]
}

export {
  wikiLinkTransclusionFormat,
  wikilinkPageResolver,
}
