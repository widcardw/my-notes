---
title: 更加方便的 querySelector
---

原链接 <https://www.cnblogs.com/chun6/p/7053053.html>

## 背景

每次我们都需要下面这样写添加点击事件，相当的繁琐，而我们又不甘心用 jQuery，那么怎么办呢？

```javascript
var btn = document.querySelector("#xxid");
btn.addEventListener("click", (e) => {
	console.log(e);
});
```

## 解决方案

### 抛砖

我们都应该稍微接触过一些 jQuery，它的格式大概是这样：

```javascript
$("#xxid").click(function () {
	$(this).hide();
});
```

所以我们肯定会尝试这样去写

```javascript
let $ = document.querySelector;
let btn = $("#xxid");
```

但是测试之后，我们开始怀疑人生。

```shell
Uncaught TypeError: Illegal invocation
```

这里报错的原因是 `querySelectorAll` 所需的执行上下文必需是 `document`，而我们赋值到 `$` 调用后上下文变成了全局 `window`。

### 引玉

经过上面的分析，我们将代码改成了这样

```javascript
let $ = document.querySelector.bind(document);
Element.prototype.$on = Element.prototype.addEventListener;

$("#xxid").$on("click", (e) => { console.log(e); });
```

于是，我们的代码变得相当的精简，有了一分 jQuery 的味道。

### Tips

同样的，我们可以写更多的方法

```javascript
var query = document.querySelector.bind(document);
var queryAll = document.querySelectorAll.bind(document);
var fromId = document.getElementById.bind(document);
var fromClass = document.getElementsByClassName.bind(document);
var fromTag = document.getElementsByTagName.bind(document);
```

然而，通过 query 获得的节点可以是单个或多个节点，而我们不能直接用 `map` 和 `foreach` 来操作 NodeList，正确的操作姿势应该是：

```js
Array.prototype.map.call(document.querySelectorAll('button'), (element,index) => {
    element.onclick = function () {
        // Your code here
    }
})
```
