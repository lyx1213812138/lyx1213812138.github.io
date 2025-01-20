---
title: css学习笔记
date: 2024-02-23 15:04:07
tags:
  - 前端
  - CSS
---

# css学习笔记


## 选择多个元素

```
p,li,h1{
	Color:red;
}
```

## 选择器

- 通用选择器（选择全部）：`*`

- 伪类

- 属性选择器

- a:hover {color :red;}当鼠标停在a上时

## 属性

color

Font-family字体

Font-size

Text-align向哪里对齐

Padding 内边距

Margin 外边距

- 当只指定**一个**值时，该值会统一应用到**全部四个边**的外边距上。
- 指定**两个**值时，第一个值会应用于**上边和下边**的外边距，第二个值应用于**左边和右边**。
- 指定**三个**值时，第一个值应用于**上边**，第二个值应用于**右边和左边**，第三个则应用于**下边**的外边距。
- 指定**四个**值时，依次（顺时针方向）作为**上边**，**右边**，**下边**，和**左边**的外边距。
- auto

让浏览器自己选择一个合适的外边距。有时，在一些特殊情况下，该值可以使元素居中。

color：元素内容（通常是文本）的颜色

background-color：元素内容和内边距底下的颜色

Width height

## css变量

必须以--开头

定义：--aa:50px;

应用：height:var(--aa);

## css动画

https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animations/Using_CSS_animations

transition and transform

## flex布局

`display:flex`

### 主轴和交叉轴

`flex-direction:row` 或 `row-reverse` 或 `column` 或 `column-reverse`（主轴）

### 宽度

#### auto

足够大时相当于 width=max-content（一直不换行）

当元素宽度远远超过容器宽度时，相当于 width=min-content（最大单词的距离）

#### 设置宽度

- `flex-basis` 基础长度

- `flex-grow` 生长的权值
	（$\sum_i (flexBasis_i+flexGrow_i*x)=contentWidth$ 这样求x）
	
	（0：最大就是basis）
	
- 实现某元素的宽度是其他元素的宽度的5倍：flex-basis：0px

  （1：容器不够时均匀缩小）

- `flex-shrink` 缩小的权值（如果子元素宽度和大于了容器宽度）

  （$\sum_i (flexBasis_i-flexShrink_i*x)=contentWidth$ 这样求x）

- `flex:<grow> <shrink> <basis> `

  默认 `flex:0 1 auto;= flex:initial`

  none = 0 0 auto

### 对齐

（包括内部的文字也算一个item）

<img src="C:\Users\27427\AppData\Roaming\Typora\typora-user-images\image-20240110103504960.png" alt="image-20240110103504960" style="zoom: 33%;" />

#### 主轴上

**align-items**（一个主轴上）

stretch 所有的元素行高都一样（默认）

在交叉轴起点/终点/中间对齐 align-items : flex-start flex-end center

baseline 不管字体大小，都在文字的基线来对齐

**align-content**（多个主轴上）

同下（justify-content）

#### 交叉轴上

**justify-content** : flex-start flex-end center

space-between 中间相同空隙，首尾紧靠两边

space-around 中间相同空隙，首尾与两边的空隙是中间的1/2

space-evenly 中间与首位的空隙都相同

### 换行

flex-wrap:wrap 保证宽度的同时换行

### 顺序

order

无障碍人士

## css过渡动画

过渡不行时试试

`setTimeout(() => {element.style.top = "100px";},1);`

[discussion](https://stackoverflow.com/questions/64707211/transition-not-working-correctly-when-element-is-added-to-the-dom)

## cursor属性

`cursor`属性用于指定鼠标指针在元素上的样式。它可以改变鼠标指针的外观，以提供视觉反馈或指示用户可以执行的操作。

default箭头 pointer手指，可点击 text文本

## 选择器
### 相邻兄弟选择器 ‘+’ 

`input[type="checkbox"]:checked + label` 是一个 CSS 选择器，用于选择被选中的复选框（checkbox）后面紧邻的 `<label>` 元素。

### 一般兄弟组合器 `~`

后一个节点在前一个节点后面的任意位置，并且共享同一个父节点。

### 后代选择器 ‘ ’（空格）

要实现当某个元素被覆盖时，其子元素的样式发生改变，可以使用 CSS 中的后代选择器（descendant selector）和伪类选择器（pseudo-class selector）。

首先，您可以使用后代选择器来选择被覆盖元素的子元素。后代选择器使用空格来表示元素之间的层级关系。

### `>` : 直接子代选择器

### `:nth-child`

不是真的子元素，是这个选择器选择的第n个，比如下面选择的都是`<li>`

```
/* 选择第3个子元素 */ li:nth-child(3) 
/* 选择所有3的倍数位置的子元素 */ li:nth-child(3n) 
/* 选择所有3的倍数位置的子元素，并减去2 */ li:nth-child(3n-2)
```

### 属性选择器

[link](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)

### 分组选择器 `，`

`,` 是将不同的选择器组合在一起的方法，它选择所有能被列表中的任意一个选择器选中的节点。

### `:where` 

`:where(h1, h2, h3)` 将选择 `<h1>`、`<h2>` 和 `<h3>` 元素
`:where(section, article) p` 选择器将选择 `<section>` 和 `<article>` 元素中的所有 `<p>` 元素，并将样式规则应用于它们。

### `:not`

 是一个CSS伪类选择器，用于选择不符合指定选择器的元素。

`p:not(.red)` 选择器将选择所有 `<p>` 元素，但排除了具有 `red` 类的元素

## 修改属性

嗯，你提到的`labelElement.for = 'myInput'`语法是无效的，因为`for`是`label`元素的保留属性，不能直接通过赋值来修改。

要修改`label`元素的`for`属性，你可以使用`setAttribute()`方法，如下所示：

```
const labelElement = document.getElementById('myLabel');
labelElement.setAttribute('for', 'myInput');
```

这样，`label`元素的`for`属性就会被设置为"myInput"，与id为"myInput"的表单元素关联起来。

请注意，使用`setAttribute()`方法可以在任何情况下修改元素的属性。

## css函数

CSS中有一些内置的函数，可以用于处理值、生成动态效果或执行其他操作。以下是一些常见的CSS函数：

1. `rgb()` 和 `rgba()`：用于设置颜色值，接受红、绿、蓝和透明度参数。

   ````css
   color: rgb(255, 0, 0);       /* 红色 */
   background-color: rgba(0, 0, 255, 0.5);  /* 半透明蓝色 */
   ```

2. `hsl()` 和 `hsla()`：用于设置颜色值，接受色调、饱和度、亮度和透明度参数。

   ````css
   color: hsl(120, 100%, 50%);       /* 饱和度为100%，亮度为50%的绿色 */
   background-color: hsla(240, 100%, 50%, 0.5);  /* 半透明的饱和度为100%，亮度为50%的蓝色 */
   
3. `calc()`：用于执行数学计算，可以在CSS属性中使用。

   ````css
   width: calc(100% - 20px);   /* 宽度为父元素宽度减去20像素 */
   
4. `var()`：用于引用CSS自定义属性的值。

   ````css
   --primary-color: blue;
   color: var(--primary-color);   /* 使用自定义属性的值作为颜色 */
   
5. `url()`：用于引用外部资源，如图像、字体等。

   ````css
   background-image: url("path/to/image.jpg");   /* 引用图像资源 */
   ````

### css单位

1. px

2. 百分比（%）：百分比单位相对于父元素的相对值。

3. em：em单位是相对于元素的字体大小。如果修改的属性为`font-size`，则相对于父元素的字体大小。

   ````css
   font-size: 1.2em;   /* 相对于父元素字体大小的1.2倍 */
   margin: 0.5em;      /* 相对于元素字体大小的0.5倍 */
   ````

4. 视窗单位（vw、vh、vmin、vmax）：视窗单位是相对于视窗大小的相对值。

   ````css
   width: 50vw;    /* 相对于视窗宽度的50% */
   height: 25vh;   /* 相对于视窗高度的25% */
   ````

## 背景图片自适应
```vue
<div
    :style="{
      backgroundImage: `url(${backgroundImageUrl})`,
      height: '100%',
    }"
    class="bg-cover w-full absolute"
    id="container"
```

