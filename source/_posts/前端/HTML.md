---
title: HTML
date: 2024-02-23 00:00:00
tags:
  - 前端
  - HTML
---
## 简介

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>test</title>
        <link style=""
    </head>
    <body>
        
    </body>
</html>
```

\<head> 不可见的东西

\<body> 可见的东西

<Img>:src

\<h1><h2><h3>:标题

\<p>段落

\<ul><ol>列表：·或者1./里面用<li>表示一行

- 就是<ul>

1. 就是<ol>

<a>:href

[html5语义化标签](https://juejin.cn/post/6844903544995184653)

## 引入代码文件

body最后：

```html
<script src="aaa.js"></script>
```
head里：
```html
<link rel="stylesheet" href="style.css">
```

## `<label>`标签

`<label>`元素可以通过两种方式与相关的表单元素关联起来：使用`for`属性或者将表单元素放置在`<label>`标签内部。当使用`for`属性时，`for`属性的值应该与相关表单元素的`id`属性值相匹配。这样，当用户点击`<label>`元素时，相关的表单元素就会获得焦点或选中。

这提供了更大的点击区域，使用户更容易选择或输入数据。使用`<label>`元素可以增加HTML文档的语义化。

