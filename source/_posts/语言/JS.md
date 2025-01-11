---
title: JS
date: 2024-02-23 00:00:00
tags:
  - 前端
  - JS
  - 语言学习
---
## 变量名要使用let和const，完全摒弃var

let只在作用域里，与c++

var定义后在哪里都可以用

## get document中的对象

`const canvas = document.getElementById("canvas"); `

`const a = document.getElementsByClass("num");//注意a是个数组`

建议搞个函数

## 函数

```
function a(){return …;}
```

可以函数里定义函数

## 定义数组

let s=[];

 ## parseInt();

转换为整数（什么类型都可）

## string处理

不能s[i]='a'

用substring和+

s.toUpperCase()全部转大写

## 要用 `===` 而不是 `==`

## 箭头函数

```
(param1, param2, …, paramN) => { statements }

(param1, param2, …, paramN) => expression
//相当于：(param1, param2, …, paramN) =>{ return expression; }
```

不会创建自己的this

## 剩余参数

```
function f(a, b, ...theArgs) {
  for(int i=0;i<theArgs.length;i++){
  	console.log(theArgs[i]);
  }
}
f(0,0,1,2,3);//[1,2,3]
f(1,2,3,4,5,3,2);//[3,4,5,3,2]
```

## getBoundingClientRects()

返回值是一个 [`DOMRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象，是包含整个元素的最小矩形（包括 `padding` 和 `border-width`）。该对象使用 `left`、`top`、`right`、`bottom`、`x`、`y`、`width` 和 `height` 这几个以像素为单位的只读属性描述整个矩形的位置和大小。除了 `width` 和 `height` 以外的属性是相对于视图窗口的左上角来计算的。

该方法返回的 [`DOMRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象中的 `width` 和 `height` 属性是包含了 `padding` 和 `border-width` 的，而不仅仅是内容部分的宽度和高度。在标准盒子模型中，这两个属性值分别与元素的 `width`/`height` + `padding` + `border-width` 相等。而如果是 [`box-sizing: border-box`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)，两个属性则直接与元素的 `width` 或 `height` 相等。

## 改属性时注意是字符串

out.style.left = event.x-0.5*box.width+"px";

## `**` 指数运算符

右结合

`2 ** 3 ** 4` 即 $2^{(3^4)}$

## Error对象和throw语句

`throw new Error("这是一个错误");` 手动中断程序执行，抛出一个错误

对于 JavaScript 引擎来说，遇到`throw`语句，程序就中止了。引擎会接收到`throw`抛出的信息，可能是一个错误实例，也可能是其他类型的值。

try...catch 结构

`try`代码块抛出错误（上例用的是`throw`语句），JavaScript 引擎就立即把代码的执行，转到`catch`代码块，或者说错误被`catch`代码块捕获了。`catch`接受一个参数，表示`try`代码块抛出的值。

`catch`代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

`try...catch`结构允许在最后添加一个`finally`代码块，表示不管是否出现错误，都必需在最后运行的语句。(就算是return)

```
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

上面代码首先打开一个文件，然后在`try`代码块中写入文件，如果没有发生错误，则运行`finally`代码块关闭文件；一旦发生错误，则先使用`catch`代码块处理错误，再使用`finally`代码块关闭文件。

```
try {
  try {
    consle.log('Hello world!'); // 报错
  } finally {
    console.log('Finally');
  }
  console.log('Will I run?');
} catch(error) {
  console.error(error.message);
}
// Finally
// consle is not defined
```

## 码风

1. 表示函数调用与定义时，函数名与左括号之间没有空格。
2. 其他情况时，前面位置的语法元素与左括号之间，都有一个空格。

## class

### 基本概念

每个类中包含了一个特殊的方法 **constructor()**，它是类的**构造函数**，这种方法用于创建和初始化一个由 **class** 创建的对象。

```js
class Runoob {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
  work(age){//create its function
      
  }
}
```

### 继承 extends

当创建一个类时，您不需要重新编写新的数据成员和成员函数，只需指定新建的类继承了一个已有的类的成员即可。这个已有的类称为**基类（父类）**，新建的类称为**派生类（子类）**。

**super()** 方法引用父类的构造方法。需要在自己的构造方法中使用。

```js
class Animal {...}
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        ....
    }
    bark(){...}
}
```

### 静态方法

静态方法是使用 static 关键字修饰的方法，又叫类方法，属于类的，但不属于对象，在实例化对象之前可以通过 **类名.方法名** 调用静态方法。

静态方法不能在对象上调用，只能在类中调用。

## export & import

[export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)

命名导出和默认导出

命名导出一般只能用相同的名字，但可以换名字 export { myFunction as function1, myVariable as variable };

默认导出一个模块只能有一个，在导入时可以定义名字

type="module" 的 script 元素

```
// 导出列表
export { name1, name2, …, nameN };

// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };
```
[require和import及其用法](https://cloud.tencent.com/developer/article/1548972)

## 赋值

let obj1 = {a:1, b:2};

let obj3 = obj1;

obj3与obj1的内存位置相同，会同步修改

> 在开始之前，我先普及一些基础知识。Javascript 的对象只是指向内存中某个位置的指针。这些指针是可变的，也就是说，它们可以重新被赋值。所以仅仅复制这个指针，其结果是有两个指针指向内存中的同一个地址。

浅拷贝（只能在所有属性都是值的情况下拷贝）

```javascript
var obj1 = { foo: "foo" };
var obj2 = { bar: "bar" };
var copySpread = { ...obj1, ...obj2 };
// Object { foo: "foo", bar: "bar" }
var copyAssign = Object.assign({}, obj1, obj2);
// Object { foo: "foo", bar: "bar" }
```
