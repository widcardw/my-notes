export enum SupportedTypes {
  Img = 'img',
  Video = 'video',
  Audio = 'audio',
  Pdf = 'iframe',
  Unsupported = 'none',
}

const supportedExtensions = {
  [SupportedTypes.Img]: ["webp", "jpg", "jpeg", "gif", "bmp", "svg", "apng", "png", "avif", "ico"],
  [SupportedTypes.Video]: ['mp4', 'webm'],
  [SupportedTypes.Audio]: ['mp3', 'aac'],
  [SupportedTypes.Pdf]: ['pdf'],
}

export function detectSupportedFormat(filePath: string): [SupportedTypes, string] {
  const fileExtensionPattern = /\.([0-9a-z]{1,4})$/i;
  const match = filePath.match(fileExtensionPattern)
  if (!match) return [SupportedTypes.Unsupported, '']
  const [, ext] = match
  let category: SupportedTypes = SupportedTypes.Unsupported
  for (let cat in supportedExtensions) {
    const exts: string[] = supportedExtensions[cat]
    if (exts.includes(ext)) {
      category = cat as SupportedTypes
      break
    }
  }
  return [category, ext]
}
