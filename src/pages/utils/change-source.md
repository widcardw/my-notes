---
title: 关于换源的一些配置
layout: ~/layouts/MainLayout.astro
---


## pip

### 全局配置

可以用命令

```shell
$ pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### 临时使用

```shell
$ pip3 install numpy -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## npm

### 命令方法

```shell
$ npm config set registry https://registry.npm.taobao.org
```

## maven

> 很惊人的是，用 IDEA 开发，你甚至不用把 maven 写到 path 里面去

只需修改 maven 的配置文件，然后在工程里面选择对应的配置文件即可

```xml
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
  <mirrorOf>central</mirrorOf>
</mirror>
```

## cargo

使用 vim 编辑

```shell
$ vi ~/.cargo/config
```

```conf
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
[net]
git-fetch-with-cli = true
```
