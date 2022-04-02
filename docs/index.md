# widcardw 的笔记

## TODO

### 插件

- wavedrom 波形渲染
- admonition 插件

### 笔记

- 编译原理
- 密码学

### 课外内容

- manim 进阶部分笔记
	- updater 样例
	- 自定义物件
	- 交互场景的用法
	- ==Shaders 的用法==
- ~~学习 CSAPP，包括计算机组成原理和操作系统的结合知识~~
    - 计划大概是破产了
- ==学习 Vue 3 框架内核==
    - 尝试用 Vue 3 + TypeScript 的方式去写一些项目，而不是用 Vue 2 + JavaScript 的方法

## DONE

### 插件

#### 图片显示问题

将所有图片都放在 `public` 目录下，然后通过自己编写的 `double-bracket-media` 插件来将图片链接修改为 vuepress 所能够识别到的路径，在此工作之后再进行渲染

由于将图片都放在了 `public` 目录下，而 obsidian 采用 **相对于工程的绝对路径** 来取到图片，因此需要将链接中的 `public` 前缀去掉，此处使用了正则匹配，详情可参照[源码](https://github.com/widcardw/my-notes/blob/main/docs/.vuepress/plugin/double-bracket-media.js)

