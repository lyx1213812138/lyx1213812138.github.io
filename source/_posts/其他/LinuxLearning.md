---
title: LinuxLearning
date: 2024-02-23 00:00:00
tags:
  - Linux
---
# linux
## basic order
- ls
    `-l`:详细信息 
    - 第一个属性：文件类型+属主权限+属组权限+其他用户权限（d目录，-文件，l链接文件）（权限：r可读 w可写 x可执行 -没有 'rwx' 'r-x'）

- pwd 显示目前所在的目录
- cd
    `.` is itself
- touch:create file
    mkdir:create dir
- cp A B 
    cope A to B
    可以将SOURCE文件复制为DEST文件; 如果DEST是一个目录, 则将SOURCE文件复制到该目录下.
- mv SOURCE DEST可以将SOURCE文件重命名为DEST文件; 如果DEST是一个目录, 则将SOURCE文件移动到该目录下.
- rm FILE
- man : learn the use of a order
- A | B的含义是创建两个进程A和B, 并将A进程的标准输出连接到B进程的标准输入
- find [目录路径] [expression]
    expression中:-name [pattern]（可用*和？） -type [type] -mtime [+/-n](+n：n天前，-n：n天内)
- cat 查看文件
## 文本处理
- cat tac(从最后一行倒着显示)
    -b 显示的时候，在最开始输出行号
- more/less 一页一页地翻　/string可以查找　(in less)?string 向下查找
- head/tail -n number 最前或最后几行
- grep [options] pattern [files]
    -n：显示匹配行的行号。
    -r：递归查找子目录中的文件。
    grep 'a*' x.txt　正则要加''
## 更改权限
- chown [who] [file] :change owner (更改文件目录)
- chmod [ugoa] [+-=] [rwx] (u文件所有者,g所在组,o所有其他用户,a所有用户)
    chmod [num] [file] r=4,w=2,x=1 如770就是rwxrwx---
## 进程
进程就是一个正在运行的程序
在 Linux 中，默认提供了 6 个文字界面登录窗口和一个图形界面，可以使用 alt+F{1-7}来切换不同的终端机界面
每一个进程都有一个ＰＩＤ
前景和背景(背景不能直接ctrl+c停止)
将 目前 的工作丢到背景中_暂停_：ctrl+z
### jobs
观察目前的背景工作状态：jobs [-lrs] r:run s:stop
'[2]+'里的+:the lastest job
'[1]-'里的-:the second lastest job
### fg
`fg` 取出＋的工作,即lastest
`fg num`取出[num]工作
### bg
让工作在背景下的状态变成运行中：bg
### kill
kill -9 %num强制结束[num]
kiil -9 PID
-15 正常结束
-SIGHUP 重启
-SIGINT 终止
-SIGKILL 强制终止
-SIGSTOP ctrl+z
-SIGTERM = -15  
### killall
用命令名字终止
-i:will ask you one by one
### priority nice
waiting for learning
### ps
只能查询自己 bash 进程的 ps -l
可以查询所有系统运行的进程 ps aux
Ｓ状态　R(running) S(sleep) D(sleep但不能唤醒) T(stop) Z
ppid:父进程的PID
SZ:用掉多少内存
TIME:使用掉的 CPU 时间
PRI/NI:执行的优先级，越小越快
### top
-p [pid] 指定看某些pid
在 top 执行过程中可以使用的按键指令：P(sort by %cpu),M(memory)
### pstree -A
-p：并同时列出每个 process 的 PID
看进程的相关性
## [bash (shell)]( https://juejin.cn/post/7171272222051401735)
只要能够操作应用程序的接口都能够成为壳程序
别名　alias lm='ls -al'
### 变量
echo ${aaa} 显示变量的值
aaa=lyx 赋值，字符串
name=${aaa}+12138
\${}返回变量的值，否则是字符串
cd /lib/modules/${uname -r}/kernel
用 env 观察环境变量与常见环境变量说明

## 通配符
ls -l /usr/bin/X*　所有Ｘ开头的文件
## 快捷键
ctrl+a ctrl+e　到命令行首或尾
## 端口
端口是设备与外界通讯交流的出口
`lsof -i:8080`：查看8080端口占用
## 重定向和ｐｉｐｅ
标准输入< 标准输出> 错误输出2>
单个符号是覆盖数据，2 个符号的是追加数据

## 硬链接和软链接

在Linux文件系统中，磁盘中的文件都有一个索引编号（Inode Index），在Linux中，可以多个文件名指向同一索引节点，这种就是硬链接。

软链接（soft link），也叫符号链接（symbolic link），是指向另一个文件的特殊文件，可以简单理解为一个快捷方式