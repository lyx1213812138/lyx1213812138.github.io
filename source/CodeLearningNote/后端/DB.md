---
title: DB
data: 2024-11-10
hidden: false
tags:
  - 后端
  - 数据库
---

## 启动mysql
 `mysqld --standalone`
## 主键

用 自增id 或 GUID

全局唯一GUID类型：也称UUID，使用一种全局唯一的字符串作为主键，类似`8f55d96b-8acc-4636-8cb8-76bf8abc2f57`。GUID算法通过网卡MAC地址、时间戳和随机数保证任意计算机在任意时间生成的字符串都是不同的，大部分编程语言都内置了GUID算法，可以自己预算出主键。

`alter table last_view_ats add primary key (`value`);`

## 多对一: 外键

在`students`表中，通过`class_id`的字段，可以把数据与另一张表关联起来，这种列称为`外键`。

## 多对多: 中间表

相当于存储所有的边

## 索引

通过对数据库表创建索引，可以提高查询速度；

# 命令

## 进入db

USE db;

## 查看一个表的所有信息

select * from table;

## CREATE TABLE

```sql
DROP TABLE IF EXISTS `user_accounts`;
CREATE TABLE `user_accounts` (
  `id`             int(100) unsigned NOT NULL AUTO_INCREMENT primary key,
  `password`       varchar(32)       NOT NULL DEFAULT '' COMMENT '用户密码',
  `reset_password` tinyint(32)       NOT NULL DEFAULT 0 COMMENT '用户类型：0－不需要重置密码；1-需要重置密码',
  `mobile`         varchar(20)       NOT NULL DEFAULT '' COMMENT '手机',
  `create_at`      timestamp(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at`      timestamp(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  -- 创建唯一索引，不允许重复
  UNIQUE INDEX idx_user_mobile(`mobile`)
)
```


## 条件

```sql
SELECT * FROM <表名> WHERE <条件表达式>
```

AND OR NOT

不等于 <>

使用LIKE判断相似 : `key LIKE %bc%' ( '%表示任意字符，例如'ab%'将匹配'ab'，'abc'，'abcd' )

SELECT 列1, 列2, 列3 FROM ...

## 排序

SELECT id, name, gender, score FROM students ORDER BY score;

SELECT id, name, gender, score FROM students ORDER BY score DESC;

SELECT id, name, gender, score FROM students ORDER BY score DESC, gender; 先按`score`列倒序，如果有相同分数的，再按`gender`列排序

## 计数

把 * 变成 count(*)

SUM AVG MAX MIN

## 分组

CROUP BY

## 修改列信息

ALTER TABLE name
ADD PRIMARY KEY (columnName);

ALTER TABLE name
DROP COLUMN aaa;

## 删除

DELETE FROM tablename
WHERE ...