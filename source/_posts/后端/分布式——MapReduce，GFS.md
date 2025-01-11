---
title: 分布式——MapReduce，GFS
data: 2024-09-10
tags:
  - 后端
---
## MapReduce

### 概念
专门为并行处理大规模数据量而设计的简单模型。
自定义 Map 和 Reduce 函数，进行分布式运算和基于 key 的检索
![](aaaa.png)

- `map(key: string, value: string): (key: string, value:string)` 
- `reduce(key: string, values: []string): any`
### 执行流程
![](aaa.png)
- master 分配 map 任务到 worker。（master 负责分配任务和传输数据地址）
- worker 挨个执行 map 函数，将中间数据分为 nReduce 组存储。分的方式是按照 hash(key) mod R 的方式。nReduce 即为 reduce 任务的数量。执行完后再在 master 处领取新的 map 任务。
- 所有 map 任务完成后，master 开始分配 reduce 任务。
- worker 收集中间数据，按 key 进行排序，对每个 key 找到所有对应的 value，然后挨个执行 reduce 函数。存储输出数据。

### 用处
词频统计
倒排索引。每个文档里有什么词语 -> 每个词语在哪些文档里
分布式排序。

## GFS
### 前提
- 需要能够运行在经常故障的物理机环境上。使得能采用相对便宜的服务器硬件。
- 大文件居多。几个GB这样的级别
- 大多数写是append写，即在文件末尾追加。（应该没有顺序要求）

### 概念
GFS由一个Master节点、ChunkServer和提供给用户的client组成。
所有的数据，被切分成固定大小的”chunk”，写入ChunkServer所在的物理机的磁盘上。
master节点管理好所有的元信息，包括表示文件系统目录结构的namespace、文件所属的chunk所在位置等
用户需要读写文件的时候，通过GFS的client，首先从master查到文件所在的chunk相关信息，而后直接与对应的chunkserver通讯。

- master通过检查点+重放（replay）操作日志来恢复其文件系统的状态。
- master在启动时从chunkserver获取chunk信息，存在内存中。随后master控制着所有chunk的分配并通过周期性的心跳消息监控chunkserver状态。

### 一致性
弱一致性：从不同chunk副本（一个文件大概有3份，保证不会被损坏）中获得的数据可能会有一点差距。chunkserver 在返回数据之前检查 校验和 ，如果校验和不匹配，让client请求其他副本，并会新建一个副本并删除损坏的。
非确定：并发写（不是 append）导致结果不确定。
![](bbb.png)


### Primary 和租约
- master 找到 Primary 或 选择 Primary 并给定租约
- client 把变更传给所有副本的chunkserver，server缓存变更（变更：write，append……）
- 所有副本server都确认收到了数据后，primary为变更选取顺序，所有副本应用变更。

租约 -> 防止部分网络问题导致的脑裂



