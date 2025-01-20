---
title: Node.js
date: 2024-02-23 00:00:00
tags:
  - 前端
  - Nodejs
---
# node.js

## 基本操作

node aa.js 运行

第一行总是写上`'use strict';`是因为我们总是以严格模式运行JavaScript代码，避免各种潜在陷阱。

此外，文件名只能是英文字母、数字和下划线的组合。

看到只有`>`是在Node交互式环境下

两次ctrl+c退出node环境

`node --use_strict calc.js ` 开启严格模式

模块：完成一种功能的单独一个文件

`module.exports = greet;` 把greet函数作为入口（hello.js文件中）

 `var aa = require("./hello");`  引入的hello模块作为变量保存在aa变量中，aa就是hello中的greet

位于同一个目录，所以我们用了当前目录`.` 。

## global 

唯一的全局变量

## process

- 如果我们想要在下一次事件响应中执行代码，可以调用`process.nextTick()`

- 如果我们响应`exit`事件，就可以在程序即将退出时执行某个回调函数：

  ```js
  // 程序即将退出时的回调函数:
  process.on('exit', function (code) {
      console.log('about to exit with code: ' + code);
  });
  ```

## fs模块 

读写文件

### 异步读文件

```js
var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
```

但正常读取时err=null

- 文本文档 data是String

- 二进制文件 data是Buffer 一个包含零个或任意个字节的数组

  ```
  let a = new Buffer('END.', 'utf-8');//string to buffer by utf-8
  ```


### 同步读文件

```
var data = fs.readFileSync('sample.txt', 'utf-8');
```

### 异步写文件

```js
var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
```
### 文件信息
```js
fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
```

## stream

支持“流”这种数据结构，还是在fs模块中的

### 读

`var rs = fs.createReadStream('sample.txt', 'utf-8');`

`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

要注意，`data`事件可能会有多次，每次传递的`chunk`是流的一部分数据。

### 写

`createWriteStream`

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：

### pipe()

把两个文件流串起来

```
var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');
rs.pipe(ws);//cope the file
//rs.pipe(ws, { end: false });//not close ws stream, can still write
```

## http模块

request对象：HTTP请求

response对象：HTTP响应

由于`response`对象本身是一个`Writable Stream`

## npm

CLI(只允许键盘输入) & GUI(图形化界面)

### 起始

`cd xxx`

`npm init` 生成package.json档案

### 设置代理

 `npm config set proxy http://127.0.0.1:翻牆端口`

代理服务器 IP 地址和端口号查找

1. 在开始搜索“Internet 选项”。
2. 选择“连接”标签页。
3. 点击“局域网设置”按钮。
4. 在弹出的窗口中，您可以看到代理服务器 IP 地址和端口号。

### 锁定文件
pnpm-lock.yaml 和 package-lock.json 都是项目中的锁定文件，它们的作用是锁定项目所依赖的包的版本。

pnpm-lock.yaml 是由 pnpm（一个 JavaScript 包管理工具）生成的锁定文件，它记录了所有项目依赖的包的版本。

package-lock.json 是 NPM（Node Package Manager，一个 JavaScript 包管理工具）生成的锁定文件，它也记录了所有项目依赖的包的版本。

## install

npm install lodash --save 

设置与项目相依，会存在package.json中

卸载 uninstall

npm ls查看已安装

npm update lodash

### 版本控制

版本号有三位数字组成（譬如：1.2.3），`1` 表示主版本、`1.2`表示次要版本、`1.2.3` 表示补丁版本。

`^`  表示用于确定主版本号、 `~`  用于确定主版本号 + 次要版本号；

- `^1` ：等同于 `1.x.x` ,  以`1`开头的所有版本；
- `~2.2` ：等同于 `2.2.x` ，以  `2.2`  开头的所有版本。
- `~2.2.1` ：以  `2.2`  开头，且最后一位 补丁号≥1 的所有版本，即 `2.2.1`  与 `2.2.9` 之间版本，包括头尾。

