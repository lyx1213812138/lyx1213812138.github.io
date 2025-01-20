---
title: SSE 流式传输——组会分享
data: 2024-09-09
tags:
  - 前端
  - 后端
---
SSE 全称为 **Server-sent events** , 是一种基于 HTTP 协议的通信技术，允许服务器主动向客户端（通常是Web浏览器）发送更新。**这种服务端实时向客户端发送数据的传输方式，其实就是流式传输。**

SSE 与 WebSocket 区别：
- SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
- SSE 默认支持断线重连，WebSocket 需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。

三种状态（`EventSource.readyState`）
- EventSource.CONNECTING -> message 事件
- EventSource.OPEN -> open
- EventSource.CLOSED -> close