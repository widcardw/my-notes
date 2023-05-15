---
title: Development log
description: Docs intro
layout: ~/layouts/MainLayout.astro
---

## 笔记在线部署开发日志

### 碎碎念

首先，这些在线笔记我是从大三开始记录的，那时还处于 COVID-19 时期，为了弥补自己在线上课时候~~基本不听~~的后果，我开始着手根据教材和网络上的视频教学，将笔记一点一点手敲成文字版，虽然感觉好像确实没什么用，只能算是一种自己学过这些内容的见证。

从开始像一个工程一样管理自己的笔记开始，我就在琢磨如何将笔记呈现为在线版，毕竟可以让自己有一个渠道，能够随时随地打开网站即可访问，相当地方便。

在尝试了 [docsify](https://docsify.js.org), [VuePress](https://vuepress.vuejs.org), [VitePress](https://vitepress.dev) 之后，我最终选择了专注于静态部署的 [Astro](https://astro.build). 期间，我在功能性、便捷性、访问速度等方面做了不少抉择，最终还是选择了==便捷性==和==访问速度==。这样我的功能性暂时有非常多的缺失，但是毕竟这也仅仅是一个笔记的镜像，要再多的功能也没什么太大的用处。

### 框架对比

#### Docsify

Docsify 使用 marked 作为 markdown 的翻译器，并且使用一个 index.html 来驱动，只需开启一个端口，或者设置反向代理，就可以启动这个服务。这个工具在使用的便捷性和依赖的大小上，可以说是碾压其他框架的。通过 npmjs 搜索，我们也可以找到一些 docsify 的插件，基本上都是能用就行的程度，不过这也足够了。

非常令人惊讶的一点是，尽管这个框架使用的似乎是客户端渲染，但它的渲染速度其实并不算很慢，大多数情况下很快就能显示出页面了。

然而，也许是我爱折腾，不想仅仅满足于此，也或者是我嫌它的功能性还不够强，例如插件只能通过引入 JavaScript 来驱动，我开始寻觅其他的框架。

#### VuePress & VitePress

这两个兄弟框架算是业界比较常用的了，Vue 相关的基本都靠它们俩。能与之抗衡的基本上就是基于 React 的 [docusaurus](https://docusaurus.io/) 和基于 Next.js 的 [Nextra](https://nextra.site/) 了。

在 component 和 auto-import 插件的加持下，VuePress 和 VitePress 得以将 markdown 中的标签转换为 Vue 中声明的 Component，这样就能在翻译 markdown 的同时进行自动转换了。

另外，VP 兄弟是基于 markdown-it 来转换 markdown 文件的，由于 markdown-it 扁平的 token 流结构，它的插件异常的好写，我也是为了适配 Obsidian 的预设，写了不少 markdown-it 插件，就仅仅是为了能够将一些功能性的特征渲染到页面上。总的来说，在功能性方面，这对工具是比较出色的。

后来，随着笔记的体量越来越大，我发现，用这两个框架在本地甚至不能成功编译，理由是 Node.js 内存耗尽。同时，可能我是加了什么 CDN 的脚本，导致首屏显示很快，但是需要很长的时间才能点击侧边栏进行交互。

#### Astro

这个框架与 Docusaurus 和 Nextra 在 markdown 编译工具上，都使用了 unified 系列工具，包括 remark, rehype, retext 等等，这套工具是将 markdown 或 MDX 编译为抽象语法树的，可扩展的功能应该说是更加强大的。但在另一方面，这部分的插件编写教程比较少，想写一个比较好的插件是相对困难的，而我就卡在了这里。

另外，想要在 markdown 文件中使用一有的组件是不可行的，必须使用 MDX 的扩展语法。同时，将 markdown 文件中被特殊标注的部分直接上报为组件也是存在问题的，它并不是像 Vue 的模板字符串可以被 Vue 编译之后，成为一整个组件。因此，我们可能还得研究一下 astro-integration，将组件注入到 astro 的运行环境中。

之前尝试研究 astro 官方文档的 integration，想要实现 code snippet 的功能，但是不知道为什么总是注入失败，先临时用 `querySelector` 顶上了，之后再看看吧。

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
