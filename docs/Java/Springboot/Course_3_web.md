# 简单样例

## 静态资源访问

### 静态资源目录

静态资源默认放在类路径下 `/static` 或 `/public` 或 `/resources` 目录中可以直接通过 https://localhost:8080/resource.jpg 来访问

当请求进入后，先看 Controller 能否处理；如果不能，则寻找静态资源；如果还不能，则 404

#### 修改静态资源目录

```yaml
spring:
  web:
    resources:
      static-locations: classpath:/mydir
```

此时，静态资源必须放在 `mydir` 中才能被访问到

### 静态资源访问前缀

通过修改 `spring.mvc.static-path-pattern=/resource/**` 可以修改静态资源访问的路径

```yaml
spring:
  mvc:
    static-path-pattern: /res/**
```

此时需要通过 https://localhost:8080/res/img.jpg 来访问

### webjars

```xml
<dependency>
  <groupId>org.webjars</groupId>
  <artifactId>jquery</artifactId>
  <version>3.5.1</version>
</dependency>
```

通过 https://localhost:8080/webjars/jquery/3.5.1/jquery.js 访问

## web

### welcome

在默认资源路径下编写 `index.html` 即可在根路径 https://localhost:8080 访问

### favicon

在静态资源路径下放 `favicon.ico` 即可自动将图标显示在页面标题上

### 静态资源配置原理

- Springboot 启动默认加载 xxxAutoConfiguration 类
- SpringMVC 的自动配置类 WebMvcAutoConfiguration 生效
- 给容器中配了
    - `@EnableConfigurationProperties(WebMvcProperties.class, ResourceProperties.class)`
- 配置文件相关属性和 xxx 绑定
    - `WebMvcProperties==spring.mvc`
    - `ResourceProperties==spring.resources`


