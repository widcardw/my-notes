---
title: CentOS 安装 Nodejs
---

## 下载 Nodejs

在镜像网站上下载 Linux 版本的包，注意偶数版本的为正式版，奇数版本的是开发版

https://npm.taobao.org/mirrors/node

```shell
wget https://npm.taobao.org/mirrors/node/v16.9.1/node-v16.9.1-linux-x64.tar.gz
```

## 解包

将安装包解压到某个目录下

```shell
tar -zxvf node-v16.9.1-linux-x64.tar.gz -C /opt
```

改名，使得路径更加方便书写

```shell
mv node-v16.9.1-linux-x64/ node
```

## 添加环境变量

```shell
vim /etc/profile
```

在 profile 文件末尾添加 nodejs 的路径

```bash
## setting nodejs path 
export NODE_HOME=/opt/node/
export PATH=$NODE_HOME/bin:$PATH
```

执行命令重载环境

```shell
source /etc/profile
```

测试是否安装成功

```shell
node -v
v16.9.1
npm -v
v7.21.1
```

## 修改 npm 源

```shell
npm config set registry https://registry.npm.taobao.org
```

验证是否成功

```shell
npm config get registry npm info express
registry=https://registry.npm.taobao.org/
npm=undefined
info=undefined
express=undefined
```
