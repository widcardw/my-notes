import fs from 'fs/promises'
import type { SidebarChild, SidebarType } from '~/config'

const D = './src/pages'

function testDir(dir: string): boolean {
  return !(dir.startsWith('_') || dir.startsWith('.') || dir === 'public' || dir.endsWith('.astro') || dir === 'intro.md')
}

async function getTitle(path: string) {
  const match = (await fs.readFile(path)).toString('utf-8', 0, 200).match(/title: (.*)/)
  if (match)
    return match[1]

  return null
}

const parentStack: SidebarChild[] = []

async function accessDir(url: string) {
  const fullDir = `${D}/${url}`
  const dir = await fs.opendir(fullDir)
  const b: SidebarType = []
  for await (const dirent of dir) {
    if (!testDir(dirent.name))
      continue
    if (dirent.isFile()) {
      const noExt = dirent.name.replace(/\.md$/, '')
      if (noExt === 'index') {
        const parent = parentStack[parentStack.length - 1] // -1 is out of range
        if (parent)
         parent.index = true
        const title = await getTitle(`${fullDir}/${dirent.name}`)
        if (title && parent) 
          parent.text = title
      }
      else {
        b.push({ text: await getTitle(`${fullDir}/${dirent.name}`) || noExt, link: noExt })
      }
    }
    else if (dirent.isDirectory()) {
      const current: SidebarChild = { text: dirent.name, link: dirent.name, children: [] }
      parentStack.push(current)
      const innerUrl = `${url}/${dirent.name}`
      const b2 = (await accessDir(innerUrl)).sort((i, j) => i.link.localeCompare(j.link))
      current.children = b2
      b.push(current)
      parentStack.pop()
    }
  }
  return b
}

async function generateRoute() {
  try {
    await fs.access(D)
    const res = { 
      routes: (await accessDir(''))
        .sort((i, j) => (j.children ? 1 : 0) - (i.children ? 1 : 0) || i.link.localeCompare(j.link)) 
    }
    fs.writeFile('./src/scripts/routes.json', JSON.stringify(res, null, 2))
  }
  catch (e) {
    console.error(e)
  }
}

generateRoute()
