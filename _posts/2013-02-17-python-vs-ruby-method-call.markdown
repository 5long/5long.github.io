---
layout: post
date: 2013/02/17 23:17:00
title: "Python VS Ruby: Method Call"
---

已经变成了纯粹是为了维持大约每月一篇的凑数文。

## 方法调用

按照 Alan Kay 的描述，
[消息传递][message passing]才是 OO 的重要部分。
在 Python 与 Ruby 里的实现形式就是方法调用。

在这两个语言中，
一次方法调用包含三个阶段：解析，绑定，执行。
下面<del>就来分阶段对比。</del>不得不先大致描述下二者在
method 模型定义上的差异。

## Property -vs- Method

在 Python 的世界观里，
对象被当作属性的容器，
调用方可以在其上 get/set 属性。
get/set 的逻辑可能是简单的取值赋值，
也可能是通过 descriptor 实现的复杂逻辑。
所谓的 method 只是在查找 property 时返回了某种特殊的
callable object 而已。

Ruby 则遵从了 Smalltalk 的设计原则：
消息传递是对象与外界交流的唯一方式，
属性赋值与取值都是语法糖伪装下的方法调用。
仅此。

## 方法解析

解析一词译自 Resolution，
方法解析有时也称作方法查找（Lookup）。
解析过程所要解决的问题是
“在接受方法调用时找到实际需要执行的代码”。

由于 Python 对“属性”及其 descriptor 概念的强调，
方法解析在 Python 里其实更应该称作属性解析。

### 从实例自身开始解析

Ruby 设计了 [eigenclass]，
使得每个实例都可以拥有一个只属于自己的 class，
在其中定义属于自己的方法，
在方法解析的过程中，
eigenclass 的优先级也最高。
毕竟，
从消息传递的角度来看，
对象自主决定如何响应消息并不过分。

日常的应用开发中，
使用 eigenclass 最多的时候就是定义类方法。
还有一个常用技巧是把动态生成的方法缓存在里面。
Test double 库更是会充分利用它定义每个实例的行为。

反观 Python，
对于 Per-instance Polymorphism
的支持仅停留在[实例属性][instance attributes]的基础上。
或者说，实例自身只是单纯的属性容器。
如果你真心想玩，
把对象的 [`__class__` 属性改掉就可以啦][stub attr]。[^replace-class]

### 沿继承结构解析

按照类的继承结构查找方法是最为主要的方法查找路径，
在学习这两种语言的对象模型时，
都是重点需要理解的知识。

虽然 Ruby 使用 mixin，
Python 用的是多继承。
但两种机制在功用上并没有因此产生很大的差异。

当然特殊情况还是存在的：
Python 允许开发者通过自定义
一个 class 的 metaclass 的 `.mro()`
方法来修改这个 class 的实例的方法解析路径。
不清楚这个明显改变方法查找顺序的接口实际有多少应用。

此外，
Python 对象实例的属性查找顺序与其
class 的属性查找顺序有明显的交叉。
语义上仅属于 class 的 staticmethod 与 classmethod
都会出现在实例的属性查找路径上。
也许这是为了方便使用多半以
utility function 身份存在的 staticmethod，
但也意味着你不能让 class method 与
instance method/property 重名。
Seriously，在实例上能取到 class method
不管怎么解释也实在是太奇怪了啊。

### 解析失败时的 fallback

Python 有 `__getattr__`
这个机会在解析失败时由开发者自行返回一个属性。
相应地 Ruby 有 `method_missing`，
但需要返回方法调用的结果而不是单纯的查找。
这明显是 message passing 模式下的产物：
你需要对 message 做出响应，
而不是关注属性/方法这些概念。

此外 Python 还可以在查找前就调用
`__getattribute__` / `__setattr__`，
这也是一个 catch-all 的机会。
哦对了，`__getattribute__`
能够截获所谓"special attributes"（如`__dict__`）的查找，
而 `__getattr__` 则不能。

这方面单纯从语言能力上来看，Ruby 似乎要更弱一些的样子。
但只提供查找失败的 catch-all 就已经足够实现“响应任意方法调用”。
以及，有人记住 Python 那些个 special attributes 了么？
这种语法上没有区别但背后逻辑隐隐地不同的设计，
要么去死记记住，
要么就等着掉坑吧。

[^replace-class]:
    stub 这个库这样做我觉得可以接受，
    但我在日常的应用开发中断然不敢如此。

## 方法绑定与调用

终于说完了方法解析，
接下来的过程就变得简单了。
所谓绑定只是让未绑定的方法确定调用时 `self` 的指向。
印象中有时也称作 context。

在 Python 的方法定义语法看来，
绑定 `self` 很像是为函数绑定了首个参数。
不知道和所谓的 currify 是不是一回事。
乃至，调用的时候如果传入参数的数量不对，
Python 抛出的异常的信息里还会把 `self` 的占位算进去，
有效地扰乱你的 debugging。
Ruby 当然不存在这种问题。

以及，
由于对“消息传递”的强调，
Ruby 不像 Python
可以省略调用时的括号直接返回一个已绑定的 method，
而是必须要用另一个方法 `Object#method` 来实现。

换个角度来看，
Python 在这里让语法-语义变得复杂，
Ruby 则选择把这种底层逻辑塞进一个貌似无辜的方法里。
于是 Ruby 才能够做到“方法调用时可以省略括号”。
就是因为 Ruby 不依赖复杂的语法来表达语义，
才可以给更多的语法糖让出空间。

下一篇严肃地考虑先去写别的。

[eigenclass]: http://blog.madebydna.com/all/code/2011/06/24/eigenclasses-demystified.html
[message passing]: http://en.wikipedia.org/wiki/Message_passing
[stub attr]: https://bitbucket.org/ilowe/stub/src/6e974c9c986fe00d96cf139165a8d75c72912de7/stub.py?at=default#cl-255
[instance attributes]: {% post_url 2013-01-14-python-vs-ruby-object-attributes %}
