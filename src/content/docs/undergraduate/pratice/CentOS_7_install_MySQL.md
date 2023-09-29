---
title: CentOS 安装 MySQL
---

## 1. 下载安装包

### 1.1. 链接

<https://dev.mysql.com/downloads/mysql/>

### 1.2. 版本选择

- OS : Red Hat Enterprise Linux 7 / Oracle Linux
- Version : Red Hat Enterprise Linux 7 / Oracle Linux (x86, 64-bit)
- RPM Bundle - Download
- **[No thanks, just start my download.](https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.27-1.el7.x86_64.rpm-bundle.tar)**

### 1.3. 上传 `tar` 文件至虚拟机

移动到 `/usr/local/mysql/` 目录下。此步骤需要在 `/usr/local/` 下新建 `mysql` 文件夹。

```shell
$ sudo mv mysql-8.0.27-1.el7.x86_64.rpm-bundle.tar /usr/local/mysql/
```

## 2. 删除mariadb

### 2.1. 通过命令查看 mariadb 的安装包

```shell
$ rpm -qa | grep mariadb
```

### 2.2. 通过命令卸载 mariadb

```shell
$ rpm -e mariadb-libs-5.5.68-1.el7.x86_64 --nodeps
```

通过命令查看 mariadb 是否卸载

```shell
$ rpm -qa | grep mariadb
```

## 3. 安装 MySQL

```shell
$ pwd
/usr/local/mysql
```

### 3.1. 解压

```shell
$ sudo tar -xvf mysql-8.0.27-1.el7.x86_64.rpm-bundle.tar
```

### 3.2. 安装 common

```shell
$ sudo rpm -ivh mysql-community-common-8.0.27-1.el7.x86_64.rpm --nodeps --force
```

### 3.3. 安装 libs

```shell
$ sudo rpm -ivh mysql-community-libs-8.0.27-1.el7.x86_64.rpm --nodeps --force
```

### 3.4. 安装 client

```shell
$ sudo rpm -ivh mysql-community-client-8.0.27-1.el7.x86_64.rpm --nodeps --force
```

### 3.5. 安装 server

该步骤花费时间较长

```shell
$ sudo rpm -ivh mysql-community-server-8.0.27-1.el7.x86_64.rpm --nodeps --force
```

### 3.6. 通过命令查看安装包

```shell
$ rpm -qa | grep mysql
```

## 4. 初始化与相关配置

### 4.1. 初始化

```shell
$ sudo mysqld --initialize;
```

如果遇到报错 `mysqld: error while loading shared libraries: libnuma.so.1`，执行下面的命令

```shell
$ yum -y install numactl
```

```shell
$ sudo chown mysql:mysql /var/lib/mysql -R;
$ sudo systemctl start mysqld.service;
$ sudo systemctl enable mysqld;
```

### 4.2. 查看密码

```shell
$ sudo cat /var/log/mysqld.log | grep password
```

```shell
2021-11-21T14:21:26.120237Z 6 [Note] [MY-010454] [Server] 
A temporary password is generated for root@localhost: 3l-/wkz#>iHl
```

## 5. 使用数据库

### 5.1. 登录

```shell
$ mysql -uroot -p
```

密码即为刚刚生成的字符串。

### 5.2. 退出

```sql
exit;
```

## 6. Access denied

### 6.1. 编辑 `/etc/my.cnf`

在文件尾部添加以下内容

```
skip-grant-tables
```

### 6.2. 重启 mysql 服务

```shell
$ sudo service mysqld restart
```

### 6.3. 再次登录 mysql

```shell
$ mysql -uroot -p
```

此时登录密码为空。

### 6.4. 修改密码

#### 6.4.1. 清空 `authentication_string`

```sql
use mysql;
UPDATE user SET authentication_string = '' WHERE User = 'root';
```

#### 6.4.2. 关闭 `skip-grant-tables`

- 退出数据库
- 删除 `/etc/my.cnf` 的 `skip-grant-tables`
- 重启 mysql 服务

#### 6.4.3. 真·修改密码

无密码登录 mysql，并通过下面的脚本命令修改密码。

```sql
ALTER user 'root'@'localhost' IDENTIFIED BY 'a123456'; -- BY 后面为密码
```

#### 6.4.4. 重新登录数据库

可以使用刚刚的密码登录

## 7. 开启外部访问

### 7.1. 登录 MySQL

### 7.2. 进入 mysql 库

```sql
use mysql;
```

### 7.3. 更新域属性，`'%'` 表示允许外部访问：

```sql
update user set host='%' where user ='root';
```

### 7.4. flush

```shell
FLUSH PRIVILEGES;
```

### 7.5. 再执行授权语句

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
```

### 7.6. 测试

TODO
