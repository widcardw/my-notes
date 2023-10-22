---
title: VirtualBox 安装最小 CentOS 后的事项
---

## 1. 尴尬之境

最小化安装由于什么都没有，包括虚拟机增强插件，不能直接粘贴，所以只能手动把所有的依赖都装上。

如果是 VMWare 安装的，应该也类似，更多的内容还是见[[undergraduate/pratice/c1|实训第一次课]]吧。

## 2. 换源

由于刚刚安装的是 minimal 版本，什么都没有，因此必须手动把源换掉。

```sh
cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
vi /etc/yum.repos.d/CentOS-Base.repo
```

阿里源的地址为 http://mirrors.aliyun.com/repo/Centos-7.repo

其关键内容如下

```
name=CentOS-$releasever - Base - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/os/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7
```

只需手敲这一部分，其他都可以直接拷贝了。使用 vim 的 Visual Mode，将敲完的这部分选中，而后拷贝到 `[base]`, `[updates]`, `[extras]`, `[centosplus]`, `[contrib]` 下面即可。最后两个添加上 `enabled=0`

然后运行命令

```sh
yum clean all
yum makecache
yum update
```

如果其中遇到了无法解析域名的问题，则需要在 `/etc/resolv.conf` 中添加一些域名服务器

```
nameserver 8.8.8.8
nameserver 8.8.4.4
```

## 3. 一些必要的包

```sh
yum install gcc kernel kernel-devel bzip2 wget net-tools
```

## 4. 网络连接

最开始安装的时候没网，尝试进入 `/etc/sysconfig/network-scripts/`，`ls` 一下，一般 `ifcfg-enxxx` 就是网口的配置文件，将 `BOOTPROTO` 改为 `dhcp`，`ONBOOT` 改为 `yes`，最后重启一下网络服务。

```sh
systemctl restart network
```

在安装 VirtualBox 之后，**设置 > 以太网 > 更改适配器设置** 中会出现新的 VirtualBox 网络。于是就是非常常规的改 IP 网管子网掩码了。

```
IP      192.168.56.1
MASK    255.255.255.0
GATE    192.168.56.99
DNS1    8.8.8.8
```

需要为虚拟机配置两个网卡。

### 4.1. 网络地址转换 NAT

设置 > 网络 > 网卡 1

注意其 MAC 地址，比如地址尾号为 `B17E`

### 4.2. 仅主机 (Host-Only) 网络

> 混杂模式要不要选全部允许，似乎没什么影响。

注意其 MAC 地址，比如尾号为 `E277`

### 4.3. 在虚拟机内固定地址

使用 `ip addr` 命令可以看到可用的网络，一般来说能看到 2 个或者 3 个。其中 `lo` 是指 loopback，即回环，不用管。其他的一个或者两个，则为上述的网卡端口了。

```sh mark=/(b1:7e)|(e2:77)/
1: lo: <LOOPBACK>
    inet 127.0.0.1/8
2: enp0s3
	link/ether 08:00:27:d9:b1:7e
	inet 10.0.2.15/24
3: enps08
	link/ether 08:00:27:93:e2:77
	inet 192.168.56.101/24
```

比如，`ifcfg-enp0s3` 对应的地址尾号是 `B17E`，那么它对应的就是 NAT 的接口了。这个 NAT 接口是该虚拟机用来上网的，既然之前能上网，那么配置文件就不用改了。

另一个文件，`ifcfg-enp0s8` 可能不存在，也有可能存在。如果不存在，那么就先拷贝一份。

```sh
cp ifcfg-enp0s3 ifcfg-enp0s8
```

这个文件是为==仅主机网络==使用的，目的是为了能够让本地更稳定的 ssh 连接上。使用下面的命令查看每个网口的信息。

```sh
nmcli con show
```


| NAME   | UUID    | TYPE     | DEVICE |
| ------ | ------- | -------- | ------ |
| enp0s3 | xxx377f | ethernet | enp0s3 |
| enps08 | xxx113e | ethernet | enps08 | 


使用 `vim` 编辑 `ifcfg-enp0s8` 配置文件。

```sh {4,6-8} ins={10-13}
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
...
NAME=enps08
UUID=xxx113e
DEVICE=enps08
ONBOOT=yes
IPADDR=192.168.56.101
NETMASK=255.255.255.0
GATEWAY=192.168.56.1
DNS1=8.8.8.8
```

更改完成后，重启网络，并测试是否能连接网络，以及从本机上能否通过 ssh 连接到虚拟机。

```sh
systemctl restart network
```

## 添加 sudoers

```sh
visudo
```

将本用户按照 `root` 的样式抄上去。

有其他问题的话再补充。
