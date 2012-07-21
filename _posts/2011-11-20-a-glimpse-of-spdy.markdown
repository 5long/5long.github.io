---
layout: post
date: 2011/11/20 20:24:00
title: "SPDY 一瞥"
---
稍微看了一下 SPDY 协议的工作方式。随手记一点罢。

## 原则

SPDY 的设计主要为了解决以下问题：

* 建立 TCP 连接的开销太大(三次握手)
* HTTP 1.1 可以复用 TCP 连接，但 HTTP 是个同步协议，一对请求-响应必须保持时序临近。假如一个请求没能及时得到响应，那么这个 TCP 连接的利用率就被大大降低。
* HTTP Pipelining 未被广泛实现，且未能解决同步传输的问题。
* TCP 的慢开始机制限制了传输效率，多个 TCP 连接并发传输尤甚。
* 合并 CSS/JS 虽然可以减少 HTTP 请求次数，但不可避免地带来更多维护成本，而且丧失了细粒度的缓存控制能力。而且现代 WebApp 在初始化时发起的多个 Ajax 请求无法被合并。

## Multiplexing

这应该是 SPDY 带来的最大改进：允许在单个 TCP 连接上异步且交错地返回多个 HTTP
响应。一并解决了连接开销，慢开始和利用率低的问题。

## Server Push & Server Hint

在实现了 Multiplexing
的基础上，服务器端可以主动向客户端推送内容而不是等客户端主动发起请求。可以在客户端发现所需的外部资源之前就开始并发传输，这就是所谓
Server
Push。不仅可以提前向客户端推送静态资源，还可以节省发送请求所消耗的时间。

Server Push
存在这么个问题：假如客户端已有未失效的缓存，服务器端还是会盲目地主动推送内容。一个简单粗暴的方案是客户端发送
RST\_STREAM 告知服务器端中止传输，但初始几个 packet 还是会浪费掉。于是
[Server Hint](www.chromium.org/spdy/link-headers-and-server-hint)
不失为一个可靠的折中方案。

印象中 Yahoo
前端团队有应用这样的方案：对于首次访问页面的用户把静态资源内联在网页里，然后再把内联的静态资源重新
lazy load 一遍并通过设定 cookie
的方式来告知服务器在以后的请求中不再内联内容而是直接用 URL
引用外部资源。Server Push 应该也可以这么搞，虽然 cookie
多少有些不保险，而且还是存在流量浪费。

我个人觉得更合适的 Server Push 应用是把动态的数据也提前推下去。如果 WebApp
采用客户端渲染，这一机制可以有效减少初始加载时间[^content-loaded]，也不必在服务器端把初始化数据组合成单个响应。当数据来自于多个响应时间变化显著的服务时这点尤其重要。

## Header 压缩

旧的 Web 性能优化方案中，有很重要的一条是把静态资源放在无 cookie
域名下从而减少传输浪费。而这似乎与 SPDY 的单一 TCP
连接设计合不来。当然我们可以采取折中的办法 -- 向 app server 和静态文件
server 分别发起一个 SPDY session。SPDY 针对这一问题的正面解决方案则是提供
HTTP 头部的压缩。于是我们也可以利用 cookie 做防盗链了么？

## Final Thoughts[^final-thoughts]

假使现代浏览器都能很快发布实现 SPDY 协议的版本，使得开发者开始考虑实现 SPDY
的实际收益，现今最大的问题还是在于服务器端的跟进实现和旧有 WebApp
的迁移。Server Push/Hint
都需要提前确定页面和静态资源间的依赖关系，这是目前大多数前端模块系统所没有考虑到的，更不要谈
Web 应用开发框架。当然如果不奢求明显的性能改善，找个稳定实现的 HTTP+SPDY
Server 就是了。是的，我感觉在这个[内联装饰图][inline-image]还没能大规模应用开来的时代，SPDY
的普及瓶颈恐怕在应用开发者而不是最终用户。

[^content-loaded]: 客户端依然在 DOMContentLoaded 之后才发起 Ajax 请求，但此时数据已经开始传输/在缓存里
[inline-image]: http://www.phpied.com/the-proper-mhtml-syntax/
[^final-thoughts]: 翻译成中文实在是太矫情了所以使用了英文
