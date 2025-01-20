---
title: 高三暑假集训总结
date: 2024-02-23 00:00:00
tags:
  - 前端
  - Vue3
---
# Vue3学习笔记

## 开始

https://cn.vuejs.org/guide/quick-start.html
`pnpm create vite FrontEndTs --template vue-ts`

## 应用与组件

一个vue应用里有很多组件，组成组件树，

```js
import { createApp } from 'vue'
// 从一个单文件组件(.vue)中导入根组件(App)
import App from './App.vue'

const app = createApp(App)
app.mount('#app') // 应用根组件(app)的内容将会被渲染在容器元素(#app)里面。//不包括此容器(#app)
```

## 数据绑定

### 文本插值

{{ aaa + 1 }} (内部支持js语法，但必须是一个表达式，if不行，三元表达式可以，可以是一个函数)

### 指令

指令是带有 `v-` 前缀的特殊 attribute。

#### v-html

这里看到的 `v-html` attribute 被称为一个**指令**。简单来说就是：在当前组件实例上，将此元素的 innerHTML 与 `rawHtml` 属性保持同步。其中rawHtml是script中的变量

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

#### v-bind

`v-bind` 指令指示 Vue 将元素的 `id` attribute 与组件的 `dynamicId` 属性保持一致。如果绑定的值是 `null` 或者 `undefined`，那么该 attribute 将会从渲染的元素上移除。

```html
<div v-bind:id="dynamicId"></div>
```

简写（更常见） 去掉v-bind 

```
<div :id="dynamicId"></div>
```

另一种方法（绑定多个值）：绑定一个对象，对象的键值是属性名

#### v-if v-else-if v-else

```vue
<div v-if="condition1">
  <!-- 在条件1为真时渲染的内容 -->
</div>
<div v-else-if="condition2">
  <!-- 在条件1为假且条件2为真时渲染的内容 -->
</div>
<div v-else>
  <!-- 在前面的条件都不满足时渲染的内容 -->
</div>
```

#### v-on 监听事件

```vue
<a v-on:click="doSomething"> ... </a>
<!-- 简写 --> <a @click="doSomething"> ... </a>
```

`:` 后的属性也是可以

#### v-model 双向绑定

`<input v-model="text"> <p>{{ text }}</p>` （把text的值和输入框的value双向绑定）

跟踪某个dom节点的值时（如input的value）经常使用

#### v-for 

```vue
<script setup>
import { ref } from 'vue'

// 给每个 todo 对象一个唯一的 id
let id = 0

const newTodo = ref('')
const todos = ref([
  { id: id++, text: 'Learn HTML' },
  { id: id++, text: 'Learn JavaScript' },
  { id: id++, text: 'Learn Vue' }
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>    
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
```

## 响应式

在Vue.js中，响应式是指当数据发生变化时，相关的视图会自动更新以保持与数据的同步。

只有添加了响应式才能改变

### rep()

int a = 0; => int a = rep(0);

a++; => a.value++; !!!记得加value

reactive 数组或对象，不用加value

记得import { ref } from 'vue' 

### computed()

跟踪其他东西，其他东西变得时候它变

```vue
const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})
```

### watch()

当观察的变量变了的时候执行回调函数

```vue
watch(count, (newCount) => {
	console.log(`new count is: ${newCount}`) 
})
```


只要hideCompleted.value或者todos.value变得时候就会变

## 模板引用

`<p ref="pElementRef">hello</p>`

`const pElementRef = ref(null);`

pElementRef.value就是那个dom节点

## 生命周期钩子

- onMounted （组件都挂载（mount）之后调用回调函数）
	- `onMounted(() => {  // component is now mounted. })`
- onUpdated


## 组件嵌套

`import ChildComp from './ChildComp.vue'`

`<ChildComp />`

### 数据下放

#### props

A child component can accept input data from the parent via **props**.

in 父组件：` <ChildComp :msg="greeting" />` （msg是子组件里的名字，相当于子组件的一个属性。greeting是父组件的一个变量）

in 子组件：

```vue
const props = defineProps({ msg: String })
```

注意在template可以直接用msg（也可以用props.msg（建议）），但在script中只能是props.msg

可以动态改变
#### v-model
双向绑定
https://vuejs.org/guide/components/v-model.html

#### slot

```vue
<ChildComp>
  This is some slot content!
</ChildComp>
// or <ChildComp /> means no slot
```

```vue
<slot>Fallback content</slot>
// or <slot /> (means no fallback)
```



### 数据上传

```vue
<script setup>
// declare emitted events //自定义上传函数名
const emit = defineEmits(['response'])

// emit with argument, 第二个参数到最后一个参数是下面那个回调函数的参数
emit('response', 'hello from child')
</script>
```

```vue
<ChildComp @response="(msg) => childMsg = msg" />
```

## Pinia

它有点像一个永远存在的组件，每个组件都可以读取和写入它。它有**三个概念**，[state](https://pinia.vuejs.org/zh/core-concepts/state.html)、[getter](https://pinia.vuejs.org/zh/core-concepts/getters.html) 和 [action](https://pinia.vuejs.org/zh/core-concepts/actions.html)，我们可以假设这些概念相当于组件中的 `data`、 `computed` 和 `methods`。

store 应该用于在许多地方使用的数据
## 杂记

### 文件信息

`import.meta.glob` 是 Vite 提供的一个特性，它可以在 JavaScript 或 Vue 文件中使用。这个函数会匹配文件系统中的所有特定模式的文件，并将它们作为 JavaScript 模块导入。

例如，如果你想要导入目录中的所有 `.js` 文件，你可以这样做：

const modules = import.meta.glob('./*.js');

这将返回一个对象，其中的每个键都是匹配的文件路径，每个值都是导入这个模块的函数，返回值是这个模块（组件）。

这个特性在你需要动态导入目录中的所有模块时非常有用，例如，自动注册 Vue 组件或 Vuex 模块。

（这里debug了好久，因为copilot一开始给的函数名就有错（globEager已弃用），还是不要轻信AI，去网上查一查即时信息）(同步函数 import.meta.glob('xxx', {eagger:true}))

```vue
async function initialModule() {
    const modulesImport = import.meta.glob('./components/*.vue');
    const modules = {};
    for (const path in modulesImport) {
      const name = path.match(/\.\/components\/(.*)\.vue$/)[1];
      console.log('Import a module: ', name);
      modules[name] = await modulesImport[path]();
      // console.log('module', module);
    }
    return modules;
  }
```

### Object.keys(), Array.map()	

前者返回所有键组成的数组

后者可以应用于数组，并返回一个新的数组，其中包含对原始数组中的每个元素应用某个函数的结果。

### 动态绑定class

`class="['tab-button', { active: currentTab === tab }]"` 是一个动态绑定的 `class` 属性，用于设置元素的 CSS 类名。

在这个绑定中，`['tab-button', { active: currentTab === tab }]` 是一个数组，数组的第一个元素是字符串 `'tab-button'`，表示一个静态的 CSS 类名 `'tab-button'`。数组的第二个元素是一个对象 `{ active: currentTab === tab }`，表示一个动态的 CSS 类名。

对象中的 `active: currentTab === tab` 表示当 `currentTab` 和 `tab` 相等时，该类名 `active` 将被应用，否则不会应用。

例如，如果 `currentTab` 和 `tab` 相等，那么 `active` 类名将被应用于元素，使其具有相应的样式。如果它们不相等，则不会应用 `active` 类名。

这样可以根据条件来动态地切换元素的样式，例如在实现选项卡时，可以通过切换 `active` 类名来标记当前活动的选项卡。

### for (a, b) in arr

是的，你理解得很对！在 `v-for="(_, tab) in tabs"` 中，`_` 是一个占位符，表示当前遍历的元素的值，而 `tab` 则表示当前元素的键或索引。

### `<component :is="view" />`

动态渲染组件

要渲染的实际组件由 `is` prop 决定。

- 当 `is` 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。
- 或者，`is` 也可以直接绑定到组件的定义。

（如果不会注册的话还是直接绑定义(import)）

[tab标签功能展示](https://play.vuejs.org/#eNqNVdFu2jAU/RUrfaCVCLRj2kMG1bqp0raHrdr61kxTcBxwSezIdhgI8e87thMT1FIBErLvPT4+5+bmsovu6nq0bliURFNNFa8N0cw09W0qeFVLZchXWTFSKFmRwWhsNxY+COkHqY0Oebc7BtwpuuTrA0W7PwbtiGIF2bcgnyKpoFJoQ2ijFBPmMZuTmcVdDqyMwVUqOoTJ5hq5HQ45vUO7cFrcqr0yFftUTMfeJgxiY1hVl5lh2BEyzfma0DLTepZGOatkGrk4MvPGGIkDdoPPOi6kAujy79DefUW4cBrSKECSFdsCgWg/2LE/DZCIPetgCPsZNVCYHHmdzSwp2f/pMXyiJacrMBwVpX9LK5mQ3c4fh2nnYeyvs8YNtlSi9AIUJOFWktX/dGDFpaEWjv52Og5HfLnGqBdW03Gvithqsy3tcmRL6J9JIYWJi6zi5TYhOhM61kzx4qPNzaXKmUrITb0hWpY8JxeMsV4qVlnOG52Qd/XGhessz7lYIHCNMxP8uHCVqQUXsZE1yFjVj80lnFcJed9hG9wPDSWjJiECnlxUrpkqSvkv3iQka4xEEMWDk8PD8n6Cgg8QcNORtnIhIC5ZYYLuycu84ovlKcBRKSilLoUHoyVSteTCMOXhGV0tlGxEnpCL4tp+XzMdg64fd3eHMAz27CVLWwNv8oieXdvvC/zI9+0ZB1rIaYehpm09/bvqeikaRt3gsXPq9EvrG9X3u5tboWNPNCyYw8g6n9rPvDO4e7PufPZuYJ7BbzTmX8EXo2ctBW5wNcZswEleMvWzNhzzMY0SX32by0o0+HcXM6rxk9KdWTK6eiX+rDc2lkYPiuGlwRSNQs6goZjx6fvfP9gG65CsZN6UQL+R/MXQA43V6GGf0TqQ3cM5td/cfwR641HfbwwTujNlhVrk3uHTCGX+8ob1g9zJaOLOocui/X90F1hu)

### 如何打包

搞了半天，发现简单问题chatgpt还是可以，网上都太高端了

直接 pnpm run build，然后就在disk文件夹里。注意要把所有直接路径改为间接路径，好奇怪的东西（比如 `/assets/a.png -> assets/a.png`）。然后不能直接用浏览器打开html文件，有啥限制。

### 引入txt文件
`import proverb from '../assets/proverb.txt?raw';`
`?raw` 代表以字符串的形式引入

### 引入tailwind
https://tailwindcss.com/docs/guides/vite#vue
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx,vue}" // 注意导入vue
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
