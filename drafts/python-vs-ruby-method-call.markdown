---
layout: post
title: "Python VS Ruby: Method Call"
---

## 方法调用

按照 Alan Kay 的描述，
消息传递才是 OO 的实质。
在 Python 与 Ruby 里的实现形式就是方法调用。

一般来说，
一次方法调用包含三个阶段：解析，绑定，执行。
下面一一描述。

## 方法解析

解析一词译自 Resolution，
有时也称作方法查找（Lookup）。
要解决的问题是
“在接受方法调用时找到实际需要执行的代码”。

Ruby 与 Python
在类继承结构上查找方法的顺序几乎没有区别，
Ruby 里自称使用了 mixin，
实质上与 Python 的多继承没有实质区别。
