---
comment: false
---

# 这里是开发日志捏

## TODO

### 笔记

- markdown it
- 计组
- 计算机网络
- 数据结构（大概率不会记）

### 课外内容

- 在线文档相关（需要参考 VuePress-Theme-Hope 的组件）
	- [ ] VuePress 和 VitePress 更加完善的 admonition 插件
	- [ ] 阅读 markdown it 源码（大概率会咕）
	- [ ] 编写 Blue Topaz 标签转 Badge 的插件
	- [ ] wavedrom 插件再稍微尝试一下，如果编译还爆内存就不去搞它的
- manim 进阶部分笔记
    - [ ] 更新 manim 中文文档 <https://docs.manim.org.cn>
	- [ ] updater 样例
	- [ ] 自定义物件
	- [ ] 交互场景的用法
	- [x] ==Shaders 的用法==
- ==学习 Vue 3 框架内核==
    - 尝试用 Vue 3 + TypeScript 的方式去写一些项目，而不是用 Vue 2 + JavaScript 的方法
	- 没想到啊，这个也鸽了
- 学习 wasm
	- [x] vite 搭建 wasm 环境已经成功了，详见 [Vite-rsw](https://widcardw.github.io/article/notes/vite-rsw.html)

## DONE

### 插件

#### 1. 图片显示问题

将所有图片都放在 `public` 目录下，然后通过自己编写的 `double-bracket-media` 插件来将图片链接修改为 vuepress 所能够识别到的路径，在此工作之后再进行渲染

由于将图片都放在了 `public` 目录下，而 obsidian 采用 **相对于工程的绝对路径** 来取到图片，因此需要将链接中的 `public` 前缀去掉，此处使用了正则匹配

##### 使用说明

下载 `docs/.vuepress/plugins/double-bracket-media.js` ，然后在 `docs/.vuepress/config.js` 中引入

```js
import doubleBracketMedia from './plugins/double-bracket-media'

export default {
	extendsMarkdown: md => {
		md.use(doubleBracketMedia)
	}
}
```

于是就可以这样安排工程文件

```text
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

#### 2. admonition 插件转义

在 obsidian 中，admonition 插件的用法为：使用连续的反引号将块包住，头部使用 `ad-name` 来进行修饰，同时能够自定义标题，例如

~~~
```ad-note
title: 提示
这是一个 admonition 块
```
~~~

输出结果为

```ad-note
title: 提示
这是一个 admonition 块
```

为了这个插件转义，还特意去学了很多 markdown-it 的知识，好累哦……总之各个插件它们的适配规则不一样，就真的好烦……

##### 使用说明

下载 `docs/.vuepress/plugins/admonition-translator.js` ，然后在 `docs/.vuepress/config.js` 中引入

```js
import admonitionTranslator from './plugins/admonition-translator'

export default {
	extendsMarkdown: md => {
		// 'ad' 与你的 admonition 的前缀一致，例如上面我的就是 `ad` 为前缀
 		md.use(admonitionTranslator, 'ad')
	}
}
```

#### 3. wavedrom

在 vitepress 好像是能用了，但是还不太清楚怎么在 vuepress 引入，而且实装的话感觉极有可能导致 vite 编译内存爆炸，所以暂时不用了

总之应该就是烂摊子很多，首先不知道怎么引入

> 我该用哪个！用两种方法导入都会炸！

```ts
import * as WaveDrom from 'wavedrom'
import WaveDrom from 'wavedrom'
```

还是挺麻烦的，毕竟没有去读人家的源码，不知道哪些包是直接用 `default` 导出的，哪些是 `module.exports` 直接赋值的。

直接看打包过的 js 文件很乱，本来还想写一个 `vitepress-plugin-wavedrom` 插件，但是没有想到怎么引入，所以就直接摆烂了 `¯\_(ツ)_/¯` 。

#### 4. 评论系统

使用了 vuepress-plugin-comment2 插件，终于能在这里评论了。大家评论的时候注意 ==不要泄露个人信息== ！
