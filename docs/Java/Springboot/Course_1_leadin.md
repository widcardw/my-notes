# 1. 开始第一个项目

官方文档 <https://spring.io>

## 1.1. 使用 maven 创建工程

保持默认即可，修改 maven 的 conf

```xml
<mirrors>
  <mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>Nexus aliyun</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
  </mirror>
</mirrors>
 
<profiles>
  <profile>
    <id>jdk-1.8</id>
    <activation>
      <activeByDefault>true</activeByDefault>
      <jdk>1.8</jdk>
    </activation>
    <properties>
      <maven.compiler.source>1.8</maven.compiler.source>
      <maven.compiler.target>1.8</maven.compiler.target>
      <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
  </profile>
</profiles>
```

## 1.2. 到官方文档获取配置

作为一个 SpringBoot 的应用，需要有一个父工程，在 pom 中添加如下项

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.2</version>
</parent>
```

接着，在依赖中添加

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```
## 1.3. 编写代码

### 1.3.1. 主程序类 MainApplication

```java
/**
 * 告诉程序这是一个 SpringBoot 应用程序 @SpringBootApplication
 * 主程序类
 */
@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) {
        // 启动后在 localhost:8080/hello 打开
        SpringApplication.run(MainApplication.class, args);
    }
}
```

同时，使用这个注解，就意味着自动的包扫描就在主程序所在的文件夹和它的子文件夹中。也就是说，上层的包不会被扫描到。如果要扫描到上层的包，需要修改注解

```java
@SpringBootApplication(scanBasePackages="org.example")
```

或者将 `@SpringBootApplication` 注解拆成它等价的 3 个注解，其中有一个 `@ComponentScan` 可以指定扫描路径

### 1.3.2. 处理器包 controller

#### 处理器类 HelloController

```java
@RestController  // 响应 & 控制器的结合体注释
public class HelloController {

    @RequestMapping("/hello")  // 映射请求，希望浏览器里返回 hello 的请求
    public String handle01() {
        return "Hello, Spring Boot!";  // 处理完后返回一段话，以字符串形式写给浏览器
    }
}
```

### 1.3.3. 配置文件

https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties

文件路径在 `resources/application.properties`

在其中可以编写 Springboot 的各种配置，而不用再在 Tomcat 中手动修改

### 1.3.4. 运行

在 MainApplication 中可以直接运行，之后可以在 https://localhost:8080/hello 看到页面

### 1.3.5. 打包为 jar

pom 中加入配置，clean 并 package 后可以生成 jar 包

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

通过命令行可以直接启动该服务

```shell
java -jar .\boot-01-helloworld-1.0-SNAPSHOT.jar
```

## 1.4. 配置

### 类与配置文件

#### 方法 1

Component + ConfigurationProperties

```java
@Component // 将组件加载到容器中，只有在容器中才能得到 SpringBoot 的功能  
@ConfigurationProperties(prefix = "mycar") // 与配置文件的前缀一致
public class Car;
```

#### 方法 2

ConfigurationProperties + EnableConfigurationProperties(Car.class)

```java
// MyConfig
@EnableConfigurationProperties(Car.class)  
// 开启 Car 的配置绑定功能 & 把指定的组件自动导入
```

```java
@ConfigurationProperties(prefix = "mycar") // 与配置文件的前缀一致
public class Car;
```

### 自动配置原理

总结：

-   SpringBoot 先加载所有的自动配置类 xxxxxAutoConfiguration
-   每个自动配置类按照条件进行生效，默认都会绑定配置文件指定的值。xxxxProperties 里面拿。xxxProperties 和配置文件进行了绑定

-   生效的配置类就会给容器中装配很多组件
-   只要容器中有这些组件，相当于这些功能就有了

-   定制化配置

-   用户直接自己@Bean替换底层的组件
-   用户去看这个组件是获取的配置文件什么值就去修改。

**xxxxxAutoConfiguration $\rightarrow$ 组件 $\rightarrow$** **xxxxProperties里面拿值 $\rightarrow$ application.properties**

