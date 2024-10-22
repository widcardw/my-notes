---
title: curl 命令的使用
---

## Get 请求

- `-v` 表示显示详细请求信息

```shell
curl https://www.baidu.com -v
```

## Post 请求

- 通过 `-x POST` 来声明请求方法
- `-d` 添加请求参数
- `-H` 声明请求头

```shell
curl http://www.baidu.com \
    -X POST \
    -d "title=comewords&content=articleContent"
```

通常，我们的请求是 JSON 格式的，可以用**单引号**将 JSON 字符串括起来

```shell
curl http://www.baidu.com \
    -X POST \
    -H "Content-Type:application/json" \
    -d '"title":"comewords","content":"articleContent"'
```

## POST 上传文件

- 通过 `-F "file=@_FILE_PATH__"` 来指定要上传的文件

```shell
curl http://www.baidu.com/upimg 
    -F "file=@/Users/fungleo/Downloads/401.png" \
    -H "token: 222" \
    -v
```

现在出现了更好的工具 [posting](https://github.com/darrenburns/posting)，可以使用 pipx 来安装，具有终端界面，同样方便使用。

或者使用 VSCode 的 REST Client 插件，可操作性更强（强推）。
