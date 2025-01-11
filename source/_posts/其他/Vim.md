---
title: Vim
data: 2024-08-24
tags:
  - Vim
  - 学习笔记
---
- 选中`(), {}, []`内的东西
	- `v/y/d + i/a + (/{/[`
	- i: inner, a: around
- 多文本替换的操作指令是 `:substitute`，一般直接用 `:s`；替换的完整指令公式是：`:[range]s[ubstitute]/{pattern}/{string}/[flags]`；
- `gb` 命令可以选中与我们光标所在的单词相同的且未被选中的第一个单词（当前往下搜索）
- **die**删除整个文件中的文字 （e: entire）
- https://www.golang-mix.com/code/58  （很全）
- https://harttle.land/2016/08/08/vim-search-in-file.html （查找和替换）

## 寄存器
Vim 有 48 个寄存器，`y`, `d`, `p` 等命令一般使用匿名寄存器 `""`， 支持剪切板的 Vim 会支持额外的选区寄存器 `"*` 和 `"+`。 更多 Vim 寄存器的信息，可以参考这篇文章：[Vim 寄存器完全手册](https://harttle.land/2016/07/25/vim-registers.html)。

`"*` 和 `"+` 在 Mac 和 Windows 中，都是指系统剪切板（clipboard），例如 `"*yy` 即可复制当前行到剪切板。 其他程序中复制的内容也会被存储到这两个寄存器中。 在 X11 系统中（绝大多数带有桌面环境的 Linux 发行版），二者是有区别的：

- `"*` 指 X11 中的 PRIMARY 选区，即鼠标选中区域。在桌面系统中可按鼠标中键粘贴。
- `"+` 指 X11 中的 CLIPBOARD 选区，即系统剪切板。在桌面系统中可按 Ctrl+V 粘贴。

上述哪个寄存器对应于你的剪切板和 Linux 发行版有关，在配置 Vim 前可以测试一下。 比如用 Vim 打开一个文件，在 normal 模式下（进入 Vim 后默认的模式）键入 `gg"*yG`， 来把当前文件内容拷贝到 `"*` 寄存器。键入 `gg"+yG` 拷贝到 `"+` 寄存器。

到目前为止，你已经可以通过命令来拷贝粘贴内容了。接下来我们希望通过 Vim 配置， 让匿名寄存器和系统剪切板同步。