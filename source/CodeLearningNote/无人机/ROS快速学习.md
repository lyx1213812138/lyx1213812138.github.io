---
title: ROS快速学习
date: 2024-02-23 00:00:00
tags:
  - 无人机
  - 嵌入式
---

Node节点：完成一个功能的一个模块

Package包：多个相关节点组成。节点不能独立于包存在

头文件 `#include <ros/ros.h>`

初始化 `ros::init(argc, argv, "px4_pos_controller");`

NodeHandle对象 `ros::NodeHandle nh("~");` 相当于一个管家，与ros通讯的关键

## 循环及控制循环频率

`while(ros::ok()){}` 才能响应外部信息（ctrl+c）

ros::Rate loop_rate(10);//括号内为每秒执行的次数

```cpp
while(ros::ok()){
	...
    loop_rate.sleep();
}
```

## ros节点通讯方式 Topic+Message
### 定义
- 创建一个话题Topic，在这个话题中进行持续通讯

- 发布消息的是话题的发布者Publisher，接收消息的是话题的订阅者Subscriber

- 通常按照一定频率持续不断发出，以保证消息的实时性

- 就跟聊天群一样，一个话题可以同时有多个发布者和订阅者
  - 传感器消息的话题一般只有一个发布者
  
  - 指令话题可能有多个发布者

### 消息类型

可以嵌套，相当于class

用std_msgs包获得一些标准消息类型

### 创建发布者及发布消息

`ros::Publisher pub = nh.advertise<std_msgs::String>("test", 10);`

泛型函数，<>中定义参数（消息）的类型，第一个参数是话题名称，第二个参数是消息缓存长度（缓存里可以容纳的消息个数），之后用pub来往这个话题发布消息

```cpp
while (ros::ok()) {
    std_msgs::String msg;
    msg.data = "hello world";
    pub.publish(msg);
}
```

### rostopic查看话题信息

`rostopic list` 列出活跃话题名称

`rostopic echo /话题名称` 列出话题下的消息

### 创建接收者及接收消息

`ros::Subscriber pub = nh.subscribe<std_msgs::String>("test", 10, func);`

func为回调函数，是接收到消息后需要做的事情

`void func(std_msgs::Sting msg){}`

在订阅之后保持在运行状态:

```cpp
while (ros::ok()) {
	ros::spinOnce();// 查看是否有消息包需要接收
}
```

通讯网络的图形化显示

rqt_graph

