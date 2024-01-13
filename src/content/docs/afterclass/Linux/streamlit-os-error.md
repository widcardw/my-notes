---
title: Streamlit 启动时 OSError
---

## streamlit 基本使用

使用命令安装

```sh
pip install streamlit
```

创建一个应用 `app.py`

```py
import streamlit as st
st.title('My App')
user_input = st.text_input('Your name')
if user_input:
    st.write(f'Hello, {user_input}')
```

运行

```sh
streamlit run app.py
```

## 报错处理

```sh
OSError: [Error 28] inotify watch limit reached
```

这个错误通常发生在 Linux 中，当 inotify 实例数量超过系统限制时就会出现这个问题。

### 临时更改

```sh
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### 永久更改

在 `/etc/sysctl.conf` 中添加

```sh
fs.inotify.max_user_watches=524288
```

运行下面的命令以生效

```sh
sudo sysctl -p
```
