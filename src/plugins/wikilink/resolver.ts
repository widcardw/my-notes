function wikiLinkTransclusionFormat(extension: string): [boolean, string] {
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
    return [false, strippedExtension && strippedExtension[0].replace('.', '') || '']

  return [true, supportedFormat.replace('.', '')]
}

function wikilinkPageResolver(name: string) {
  const image = wikiLinkTransclusionFormat(name)[1]
  let heading = ''
  if (!image && !name.startsWith('#') && name.match(/#/)) {
    [, heading] = name.split('#')
    name = name.replace(`#${heading}`, '')
  }
  if (name.startsWith('public'))
    name = name.replace('public/', '')
  if (!name.startsWith('/'))
    name = '/' + name
  name = name.replace(/ (\d)/g, '$1')
  return image ? [name] : [name.replace(/ /g, '-').toLowerCase() + (heading ? `#${heading}` : '')]
}

export {
  wikiLinkTransclusionFormat,
  wikilinkPageResolver,
}
