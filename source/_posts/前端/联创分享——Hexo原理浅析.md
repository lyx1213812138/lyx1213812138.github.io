---
title: 联创分享——Hexo原理浅析
data: 2024-03-26
tags:
  - 前端
---
## 什么是Hexo
快速、简洁且高效的博客框架
- Node.js 所带来的超快生成速度，让上百个页面在几秒内瞬间完成渲染。
- Hexo 支持 GitHub Flavored Markdown 的所有功能，甚至可以整合 Octopress 的大多数插件。
- 只需一条指令即可部署到 GitHub Pages, Heroku 或其他平台。
- 强大的 API 带来无限的可能，与数种模板引擎（EJS，Pug，Nunjucks）和工具（Babel，PostCSS，Less/Sass）轻易集成

## 总体文件夹结构
.  
├── \_config.yml  
├── db.json  
├── node_modules  
├── package.json  
├── public  
├── scaffolds  
├── source 所有文章文件放在这里  
└── themes 主题文件夹

**_config.yml**  站点的配置文件。  
**db.json**   缓存文件   
**public**  最终所见网页的所有内容  
**scaffolds**   模板文件夹。当新建一个文章时，会默认包含对应模板的内容。  
**source**  资源文件夹是存放用户资源的地方。所有的源文件都会被保存在_post文件夹中。除 _posts 文件夹之外，开头命名为_ (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 public 文件夹，而其他文件会被拷贝过去。  
**themes**  存放主题文件，hexo会根据主题来生成静态页面。
## hexo的模板引擎
模板引擎的作用，就是将界面与数据分离。最简单的原理是将模板内容中指定的地方替换成数据，实现业务代码与逻辑代码分离。

hexo默认的是使用ejs，同类型的东西还有很多，比如jade，swig。
### EJS
EJS是一种模板引擎，是用于生成包含动态数据的Web页面的工具，可以通过客户端JavaScript在客户端上生成HTML，但更常见的是由后端使用它来根据某个URL请求生成Web页面。
```
 <h1><%= title %></h1> // 输出变量title的值

 <% if (isAdmin) { %> // 条件判断
  <p>Welcome, admin!</p>
 <% } else { %>
  <p>Welcome, guest!</p>
 <% } %>

<ul>
 <% for (let i = 0; i < items.length; i++) { %> // 循环
  <li><%= items[i] %></li>
 <% } %>
</ul>
```

### Jade
jade采用缩进语法格式。
```
- var users = [{name: 'foo', role: 'admin'}, {name: 'bar', role: 'manager'}, {name: 'baz', role: 'technician'}]

h2 Users

// Neat! There's another construct called `each`
// Also there is `unless` which is equivalent to if (!expr)
// Let's use that and swap a bit of code

each user, index in users
    unless user.role === 'admin'
        p #{user.name} is not an "admin"
    else
        p #{user.name} is an "admin"

// Let's take a look at `case` statements now

h3 case

case users[2].name
    when 'admin'
        p User is an admin
    when 'manager'
        p User is a manager
    when 'technician'
        p User is a technician
    default
        p User is a customer!
```

## 基本命令
```
$ hexo init <folder>
$ hexo new [layout] <title>
$ hexo generate #生成静态文件
$ hexo server
$ hexo deploy
$ hexo clean
```
`hexo-cli` 启动 hexo 命令进程和参数解析机制。每次我们输入 `hexo init` 命令后，都会通过 node 调用 hexo-cli 中的 entry 函数 (比如，可以把 `hexo init` 视为 `node hexo-cli/entry.js init)`，
## 部署流程

1. 每次执行hexo g命令时，hexo都会遍历主题文件中的source目录，这里的source主要包括css，fonts，js等文件，建立索引。
2. 根据索引会把主题文件生成到public文件中，此时public文件是一个由html，js，css等内容制作的博客，也就是网页的根目录。
3. 通过部署，hexo d 将 public 文件夹的内容以 git 方式 push 到 github 的指定项目的指定分支，由 github 进行显示。当然，也可以部署到自己的域名上。将 `public` 目录中的文件和目录推送至指定目录，并**完全覆盖**该分支下的已有内容。

## 局部缓存优化
如果主题太过于复杂，或是需要生成的文件量太过于庞大，可能会大幅降低性能，可以考虑局部缓存（Fragment Caching） 功能。它储存局部内容，下次便能直接使用缓存内容，可以减少文件夹查询并使生成速度更快。

它可用于页首、页脚、侧边栏等文件不常变动的位置，举例来说：
```html
<%- fragment_cache('header', function(){  
  return '<header></header>';  
}); -%>
```
## hexo-server
`hexo-server` 是 Hexo 的一个插件，它的作用是启动一个本地服务器，可以实时预览博客的修改效果。它主要是通过监听文件变化和重新渲染静态页面来实现实时预览博客的修改效果。

其监听文件变化的实现方式如下：

在 `Hexo-server` 启动时，它会创建一个 `chokidar` 的实例，监听 Hexo 博客目录下的文件变化。当文件发生变化时，`chokidar` 会触发相应的事件，例如 add、change 和 unlink 等。`Hexo-server` 在接收到这些事件后，会重新渲染对应的页面，并将结果发送给客户端。

下面是 `Hexo-server` 使用 `chokidar` 监听文件的代码片段：

```js
const chokidar = require('chokidar');  
  
// Watch files  
const watcher = chokidar.watch(sourceDir, {  
  ignored: config.ignore,  
  persistent: true,  
});  
  
// Listen for file events  
watcher  
  .on('add', file => { /* handle add event */ })  
  .on('change', file => { /* handle change event */ })  
  .on('unlink', file => { /* handle unlink event */ });
```

上述代码中，`chokidar.watch()` 方法用于创建一个 `chokidar` 的实例，该实例会监听 `sourceDir` 目录下的文件变化。配置项 `ignored` 用于指定忽略的文件，`persistent` 为 `true` 表示持续监听文件变化。

接下来，使用 `on()` 方法监听 `add`、`change` 和 `unlink` 事件，并在相应的回调函数中处理文件变化事件。例如，在 add 事件中，可以调用 `Hexo` 的 `generate()` 方法重新生成对应的页面。

总的来说，`Hexo-server` 通过 `chokidar` 实现了监听文件变化并重新渲染页面的功能，提供了实时预览和自动刷新等便利特性。

---

以下是凑时间的。
# [Educational Codeforces Round 163 (Rated for Div. 2)](https://codeforces.com/contest/1948)D. Tandem Repeats? [[优化处理]]
## 题意
有一行由小写字母和？组成的字符串，？可以代表任何小写字母。求重复子串的最大长度，重复子串指满足 $s[l,l+len-1]=s[l+len,l+len*2-1]$ 的连续子串。
$n<=5e3$
## 题解
就是要找到处理的相同量，这里是判断 $s[i]==s[i+len]$ ，当len固定时左端点l和l+1只有端点需要处理。在每次记一个cnt，记录满足相等的个数。因为len固定时判断的永远时s[i]和s[i+len]，所以 $？$ 可以直接贪心处理。