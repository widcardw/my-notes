---
title: Development log
description: Docs intro
layout: ~/layouts/MainLayout.astro
---

## TODO

### 课外内容

#### remark

- [x] 使用 Astro 部署文档，这样访问可以秒开
- [x] remark mark highlight
- [ ] 学习 remark 的核心并编写一些插件
- [x] 在 Astro 中注入 mermaid-js 和 wavedrom，难度较大，暂时先放着
  - 其实用了一个比较讨巧的方式，就是 `querySelector` 查看页面上是否有对应的元素，如果有，那么就注入插件
- [x] 接入 giscus 评论模块
- [x] 为 remark 支持 AsciiMath
- [ ] 为 remark-plugin-wikilink 接入 video, audio 的支持

## DONE

### 使用 Astro 部署文档

之前的笔记都是用 VuePress 来部署的，但似乎因为我引入了一些包，导致首次加载速度非常慢，因此一直想要找一个替代品。最近也在学 Solidjs，对 TSX 的好感极佳，因此就转而使用 Astro + Solidjs 了。

然而，remark 的插件还是相当的强大，只不过对我来说很难写，之后再一步一步的学习吧。

### markdown-it 插件

> 该部分主要用于 vitepress 或者 vuepress 的文档，现在我已经改用 Astro 了，所以也只是给后人铺路了。

#### 1. 图片显示问题

> 现在已经抽离成单独的插件啦，详情见 [mdit-plg-double-bracket-media](https://github.com/widcardw/mdit-plg-double-bracket-media) 和 [mdit-plg-double-bracket-link](https://github.com/widcardw/mdit-plg-double-bracket-link)

将所有图片都放在 `public` 目录下，然后通过自己编写的 `double-bracket-media` 插件来将图片链接修改为 vuepress 所能够识别到的路径，在此工作之后再进行渲染

由于将图片都放在了 `public` 目录下，而 obsidian 采用 **相对于工程的绝对路径** 来取到图片，因此需要将链接中的 `public` 前缀去掉，此处使用了正则匹配

##### 使用说明

使用命令安装插件

```sh
pnpm i -D mdit-plg-double-bracket-media
```

然后在 `docs/.vuepress/config.js` 中引入

```js ins={5}
import doubleBracketMedia from 'mdit-plg-double-bracket-media'

export default {
  extendsMarkdown: (md) => {
    md.use(doubleBracketMedia, { removePrefix: 'public/' })
  }
}
```

于是就可以这样安排工程文件

```
my-notes
├── docs
│   ├── .obsidian
│   ├── .vuepress
│   │   ├── config.js
│   │   └── plugins
│   │       └── double-bracket-media.js
│   ├── notes1
│   │   ├── some-note1.md
│   │   └── some-note2.md
│   ├── notes2
│   │   ├── some-note3.md
│   │   └── some-note4.md
│   ├── public
│   │   ├── img
│   │   │   ├── 1.jpg
│   │   │   └── 2.jpg
│   │   └── other.jpg
│   └── index.md
├── .gitignore
└── package.json
```

而在 markdown 文件中，这样引入图片、音频或视频

```md
![[public/img/1.jpg]]
![[public/other.jpg]]
```

~~终于把 plugin 的单数改成复数了~~

#### 2. admonition 插件

> 这个也抽离成插件啦，见 [mdit-plugin-callouts](https://github.com/widcardw/mdit-plugin-callouts)

Obsidian 在 0.14 版本之后提供了 Callout 插件，使用格式如下

```md
> [!note] 这是一条笔记
> 下面是笔记内容
```

他会渲染成下面的样子

> [!note] 这是一条笔记
> 下面是笔记内容

花了点时间，把它做出来了。之前还是采用了 Markdown It Container 来进行转义的，这次就直接用它的本体吧。

##### 使用说明

使用命令行安装插件

```sh
pnpm i -D mdit-plugin-callouts
```

在 `config.ts` 中引入

```ts
import callout from 'mdit-plugin-callouts'
export default defineUserConfig({
  extendsMarkdown: (md) => {
    md.use(callout)
  }
})
```

引入 CSS 样式（我不太清楚 VuePress 怎么引入，跟 VitePress 好像还不太一样，需要在 main entry 处引入）

```ts
import 'mdit-plugin-callouts/index.css'
```

#### 3. wavedrom

> 2022-10-23 关于它的插件其实写起来应该不会很困难，但是主要问题就是在：它是一个一个一个 module，我需要在 client 端渲染，而不是 SSG 的时候就把它渲染好。同样地，mermaid-js 也是相同的道理，只不过 VuePress-Theme-Hope 的作者是把它封装成组件来渲染的。

在 vitepress 好像是能用了，但是还不太清楚怎么在 vuepress 引入，而且实装的话感觉极有可能导致 vite 编译内存爆炸，所以暂时不用了

~~总之应该就是烂摊子很多，首先不知道怎么引入~~

> 我该用哪个！用两种方法导入都会炸！

```ts
import * as WaveDrom from 'wavedrom'
import WaveDrom from 'wavedrom'
```

还是挺麻烦的，毕竟没有去读人家的源码，不知道哪些包是直接用 `default` 导出的，哪些是 `module.exports` 直接赋值的。

直接看打包过的 js 文件很乱，本来还想写一个 `vitepress-plugin-wavedrom` 插件，但是没有想到怎么引入，所以就直接摆烂了 `¯\_(ツ)_/¯` 。
