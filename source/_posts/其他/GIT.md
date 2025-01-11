---
title: GIT
date: 2024-02-23 00:00:00
tags:
  - GIT
---
## git rm 会删除工作区文件！
## 创建仓库

```
$ mkdir learngit //在此处建立一个文件夹
$ cd learngit //到文件夹里面
$ pwd //看看我在哪个文件夹
/Users/michael/learngit
$ git init //把这个目录变成Git可以管理的仓库
```

## 注意记事本

千万不要使用Windows自带的**记事本**编辑任何文本文件。

## `git add a.txt`

把修改添加到暂存区

Git管理的是修改，不是文件

## `git commit -m "提交说明" `

把暂存区的修改提交到仓库

## `ls`

查看此文件夹下的文件

## `git status`

### 查看的状态

- 没有add的修改
- 没有commit留在暂存区的修改

### 简单方式

```console
$ git status -s
 M README
MM Rakefile
A  lib/git.rb
M  lib/simplegit.rb
?? LICENSE.txt
```

新添加的未跟踪文件前面有 `??` 标记，新添加到暂存区中的文件前面有 `A` 标记，修改过的文件前面有 `M` 标记。 输出中有两栏，左栏指明了暂存区的状态，右栏指明了工作区的状态。例如，上面的状态报告显示： `README` 文件在工作区已修改但尚未暂存，而 `lib/simplegit.rb` 文件已修改且已暂存。 `Rakefile` 文件已修改，暂存后又作了修改，因此该文件的修改中既有已暂存的部分，又有未暂存的部分。

## `git diff a.txt`

查看改变后的和在仓库里的版本的差别

git diff：工作区和暂存区

git diff --staged： 暂存区和仓库

## `git log`

查看历史记录

`--pretty=oneline`

查看版本号

## 版本表示

用`HEAD`表示当前版本，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，往上100个版本`HEAD~100`。

## Reset
1. 使用 `--soft` 选项，你可以重置HEAD到指定的提交，但不会影响工作目录或暂存区。
2. 使用 `--hard`，你可以重置HEAD到指定的提交，并且清除工作目录和暂存区的所有更改。

## 撤回版本回退

找到那个`append GPL`的`commit id`是`1094adb...`，于是就可以指定回到未来的某个版本：

```
$ git reset --hard 1094a
HEAD is now at 83b0afe append GPL
```

版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。

## `git reflog`

记录你的每一次命令（commit，reset……）

和那个命令的版本号

## `git checkout -- a.txt`

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

删除之后也可以

## `cat a.txt`

查看文件内容

## 撤销修改

1.没有`git add`时（在工作区），用`git checkout -- file`

2.已经`git add`时（在暂存区），先`git reset HEAD <file>`回退到1.，再按1.操作

3.已经`git commit`时，用`git reset`回退版本

## 删除

`git rm`删掉，并且`git commit`

没git rm之前可以checkout恢复

`$ git rm --cached README` 在仓库里删除但是工作区保留

## 分支

- git switch -c dev 创建`dev`分支，然后切换到`dev`分支
- git switch dev 切换到`dev`分支
- git branch dev 创建
- git branch -d dev 删除dev分支

- git merge dev 合并指定分支到当前分支。

- git merge dev 合并冲突时会把当前分支的工作区的此文件变成这个样子

  ```
  Git is a distributed version control system.
  Git is free software distributed under the GPL.
  Git has a mutable index called stage.
  Git tracks changes of files.
  <<<<<<< HEAD
  Creating a new branch is quick & simple.
  =======
  Creating a new branch is quick AND simple.
  >>>>>>> feature1
  ```

  可以手动修改之后再提交

  注意merge的是修改，不是文件

## merge报错

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5effe96b58ea4ad6a6dbdbde8d50009a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

不写原因直接3，4步骤，写原因则1，2，3，4步骤

1. 按键盘字母 i 进入insert模式
2. 修改最上面那行黄色合并信息,可以不修改
3. 按键盘左上角"Esc"
4. 输入":wq",注意是冒号+wq,按回车键即可

## 改变分支策略

```
git merge --no-ff -m "commit describtion" dev
```

merge的同时commit 

## 临时储藏分支

把工作区存起来，不用commit，直接switch到另一个分支

存入：`$ git stash `

查看stash：`git stash list`

恢复：一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

另一种方式是用`git stash pop`，恢复的同时把stash内容也删了：

## 在另一个分支上重复一个提交（修改）

```
$ git cherry-pick 4c805e2
```

把另一分支上的4c805e2提交重复，注意是重复内容，但commit号是另一个

## 别名 alias

`git config --global alias.ch checkout`

以后就可以用ch代表checkout

## 给提交弄上标签

### 轻量标签

`$ git tag v1.0` 给HEAD（lastest commit）打上标签
`$ git tag` 看有什么标签

`$ git tag v1.0 f52c633` 给commit id为f52...的提交打上标签

### 附注标签

`$ git tag -a v1.4 -m "my version 1.4"`

`git show <tagname>` 查看标签信息，这个标签有哪些提交

### 共享标签

`git push` 命令并不会传送标签到远程仓库服务器上，在创建完标签后你必须显式地推送标签到共享服务器上

`$ git push origin v1.5`

### 删除标签

`$ git tag -d v1.4-lw`

`$ git push origin --delete <tagname>` 还需删除远程标签

## 远程库 remote
- [把本地仓库推送到github上（添加远程库）](https://www.liaoxuefeng.com/wiki/896043488029600/898732864121440)

- 名字即简写，代替整个 URL

- git remote add origin2 http...

- `$ git push origin dev` 把本地dev分支推送到远程库里

- `$ git remote -v` 需要读写远程仓库使用的 Git 保存的简写与其对应的 URL。

- 克隆仓库

  ```console
  $ git clone https://github.com/libgit2/libgit2 mylibgit
  ```

  在当前目录下创建一个名为 “mylibgit” 的目录作为仓库
  
  要只克隆一个特定分支，你可以使用 `--single-branch` 选项来限制克隆的分支。以下是使用 `git clone` 命令只克隆一个分支的示例：

```
git clone --single-branch --branch <branch-name> <repository-url>
```
  
- `$git fetch <remote>` 访问远程仓库，从中拉取所有你还没有的数据

- 他们先推送到上游然后你再推送到上游，你的推送就会毫无疑问地被拒绝。 你必须先抓取他们的工作并将其合并进你的工作后才能推送。

- `$ git remote remove paul` 移除远程库

- Git中的"upstream branch"（上游分支）是指本地分支所跟踪的远程分支。当你执行`git push`命令时，Git会将本地分支的更改推送到相应的远程分支。错误消息中提供了一个解决方案，即使用`git push --set-upstream origin master`命令。这个命令将推送当前分支的更改到远程仓库的"master"分支，并将其设置为当前分支的上游分支（也就是将本地分支与远程分支进行关联）。

## 多人协作的工作模式

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

（如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。）

## rebase

- `git rebase <branch>`：将当前分支上的提交应用到 `<branch>` 分支上。
- rebase操作可以把本地未push的分叉提交历史整理成直线；
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

## 图形界面工具

[Source Tree](https://www.sourcetreeapp.com/)


## 重命名

```console
$ git mv README.md README
```

其实，运行 `git mv` 就相当于运行了下面三条命令：

```console
$ mv README.md README
$ git rm README.md
$ git add README
```

## .gitignore

*Github上传*项目时，可能会遇到文件*上传*不*上去*，可以检查.gitignore用记事本打开看看文件的名字是否在里面，然后删除保存即可。

## to be learned

https://www.jianshu.com/p/098d85a58bf1

## Pull Request
https://juejin.cn/post/6844903821521469448
