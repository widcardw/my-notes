---
title: Nginx 使用 Vue 子路由 刷新时 404
---

例如使用 8080 端口的 `/app` 来服务这个 Vue 的前端网页，则需要 Vue Router 使用 history 格式路由，`basrUrl` 为 `app`。

Nginx 配置中，这样配置

```nginx
http {
  // ...
  server {
    listen 8080;
    server_name localhost;

    location ^~ /app/ {
      root /home/user1/project/;
      try_files $uri $uri/ /app/index.html;
    }
  }
}
```

文件路径为

```
/home/user1/project
    +--- app
        +--- assets
        +--- favicon.ico
        +--- index.html
```

