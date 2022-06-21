---
comment: false
---

# 这里是开发日志捏

## TODO

### 笔记

- 编译原理
- 密码学

### 课外内容

- manim 进阶部分笔记
    - 更新 manim 中文文档 <https://docs.manim.org.cn>
	- updater 样例
	- 自定义物件
	- 交互场景的用法
	- ==Shaders 的用法==
- ~~学习 CSAPP，包括计算机组成原理和操作系统的结合知识~~
    - 计划大概是破产了
- ==学习 Vue 3 框架内核==
    - 尝试用 Vue 3 + TypeScript 的方式去写一些项目，而不是用 Vue 2 + JavaScript 的方法
	- 没想到啊，这个也鸽了
- 学习 wasm
	- vite 搭建 wasm 环境已经成功了，详见 [Vite-rsw](https://widcardw.github.io/article/notes/vite-rsw.html)

## DONE

### 插件

#### 图片显示问题

将所有图片都放在 `public` 目录下，然后通过自己编写的 `double-bracket-media` 插件来将图片链接修改为 vuepress 所能够识别到的路径，在此工作之后再进行渲染

由于将图片都放在了 `public` 目录下，而 obsidian 采用 **相对于工程的绝对路径** 来取到图片，因此需要将链接中的 `public` 前缀去掉，此处使用了正则匹配

#### admonition 插件转义

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

#### wavedrom

在 vitepress 好像是能用了，但是还不太清楚怎么在 vuepress 引入，而且实装的话感觉极有可能导致 vite 编译内存爆炸，所以暂时不用了

总之应该就是烂摊子很多，首先不知道怎么引入

> 我该用哪个！用两种方法导入都会炸！

```ts
import * as WaveDrom from 'wavedrom'
import WaveDrom from 'wavedrom'
```

还是挺麻烦的，毕竟没有去读人家的源码，不知道哪些包是直接用 `default` 导出的，哪些是 `module.exports` 直接赋值的。

直接看打包过的 js 文件很乱，本来还想写一个 `vitepress-plugin-wavedrom` 插件，但是没有想到怎么引入，所以就直接摆烂了 `¯\_(ツ)_/¯` 。

#### 评论系统

使用了 vuepress-plugin-comment2 插件，终于能在这里评论了。大家评论的时候注意 ==不要泄露个人信息== ！
