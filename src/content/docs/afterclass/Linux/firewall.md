---
title: Firewall-cmd
---

## 查看防火墙状态

```sh
systemctl status firewalld
```

开启防火墙，设置开机自动启动

```sh
systemctl start firewalld
systemctl enable firewalld
```

关闭防火墙，设置开机不自动启动

```sh
systemctl stop firewalld
systemctl disable firewalld
```

## 开放端口

开启 8080 端口

```sh
firewall-cmd --zone=public --add-port=8080/tcp --permanent
```

`--permanent` 设置永久生效，否则重启后将失效。

重新载入防火墙设置，使之生效

```sh
firewall-cmd --reload
```

查询端口是否开放

```sh
firewall-cmd --zone=public --query-port=8080/tcp
```

查看打开的所有端口

```sh
firewall-cmd --zone=public --list-ports
```

查看当前系统防火墙所有设置

```sh
firewall-cmd --list-all
```

批量操作

```sh
firewall-cmd --zone=public --add-port=10000-10100/tcp --permanent
firewall-cmd --reload
```

## 限制端口


```sh
firewall-cmd --zone=public --remove-port=8080/tcp --permanent
```

`--permanent` 设置永久生效，否则重启后将失效。

重新载入防火墙设置，使之生效

```sh
firewall-cmd --reload
```

批量操作

```sh
firewall-cmd --zone=public --remove-port=10000-10100/tcp --permanent
firewall-cmd --reload
```

