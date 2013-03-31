---
layout: post
date: 2013/04/01 03:54:00
title: "Python VS Ruby: Class Definition"
---

为什么要把类定义拿出来单写一篇？
Well, 如果你的程序高度 OO 化，
几乎所有的代码自然都会用 class / module 组织起来。
Python 在这方面的语言能力很大程度上限制着我的生产力。

## The Class Scope

Ruby class 的作用域有以下几个作用：

* 定义方法。在其实例（或其子类的实例）[查找方法][method lookup]时提供方法定义
* 存放常量的容器。可以通过 `ClassName::CONST` 的语法访问常量
* 作为一个普通的作用域，其中也可以存放局部变量什么的。但无法被外界直接访问到。

从这些功用来看，
Ruby 与 Python 的 class scope 似乎没什么区别。
只是 Python 对于常量不做特别对待而已。
但是，
下面的这些差异才是重点：

## Before -vs- After

当你可以在 Ruby 的 class scope 里写代码时，
这个 class 自身就已经被实例化了。
你可以在定义 class 的过程中调用这个 class 的方法。
或者用 Smalltalk 的方式来说：向 class 发送消息。
所以我们才能看到 Sinatra、Rails Model 这些简单优雅的 DSL。

相比之下，
Python 的 class scope 存在于 class 被实例化之前，
定义结束时，
scope 这个字典连同声明超类的 tuple 一起传入给 metaclass 用以完成类的构建。

Python 要想做到 `attr_accessor :foo, :bar` 这么简单的事情，
充其量只能在 model 层面引入特殊的 [property descriptor constructor][field cons]，
而且为了填充作用域还不得不 repeat yourself。
自省 call stack 修改作用域这种糟糕的方案我还是不太敢用。
每次显式地把 `locals()` 传出去打字又太多。
所以有生之年真的不要指望 Python
以 OO 为基础设计出优雅且实用的 internal DSL 了。

## Reopening Class

Ruby class 的又一个巨大优势：
可以随时再度打开并加以修改。
因此你可以为旧有的 class 增减方法，
可以为其补充 mixin。
这里有个小小的 caveat 是：
Class scope 里定义的局部变量在每次 reopen 时是独立的，
无法互访。

这里 Python 就只能悲剧了：
多继承关系与初始 class scope 是由 metaclass 一次性定义完成的，
没有正当的修改机会。
删除旧有的方法定义倒是简单：`del cls.method` 即可。
添加方法就很费劲：
没有 code block 语法，
`lambda` 表达式不能写多条语句，
别忘了还得留第一个参数的位置作为 `self`。

因此大体上可以断言：
Python 的 class 在定义之后基本上是静态的。
不方便也不推荐用黑魔法修改其定义。

## Decorator -vs- Redefining Method

Decorator 是 Python 语法中强大的存在，
很多现代的 library 都充分地使用它。
在类定义中也时常可见。
比如内置的 `property()`。

然而，
在定义类的时候，
decorator 的作用非常之小，
并没有比 property descriptor constructor 强多少。
毕竟 decorator 只是为 function composition 而非 OOP 设计的。

内置的 decorator 里，
无法取代但又非常恼人的当属 `staticmethod` / `classmethod`。
定义出来的方法同时会出现在实例和类的属性查找路线上。

Ruby 没有 decorator，
但可以利用前面提到的 class scope 持久化的特点，
把旧的方法定义取出来，
加以包装后再重新定义。
参见 Rails Controller 中 [filter] 的声明方式。

另外，
事实上有人已经在 Ruby
中实现了缩水版的 [decorator]。
不过似乎也没有得到广泛应用就是了。

## Class of Class

Python 里有专门的 metaclass
用来表达“实例化后可以产出 class 的 class”。
Ruby 则没有这种特别的概念。
但实际使用起来，
Python 的 metaclass 更像是 decorator：
预处理一下超类 tuple 和 class scope 里的内容，
最终把处理后的东西传给 `type()` 而已。

还有一个值得注意的问题是，
Metaclass 构建生成的 class，
其[属性查找的过程][metaclass attr lookup]可能会较为迷茫。

相比之下，
这种语言能力在 Ruby 里[也存在][ruby struct]但很少用得到。
Metaclass 的实用场景多半在于“按照库 / 框架的要求定义模板式的 class”。
这种需求用 `inherited` / `included` hook
加上前面提到的 reopening class 的能力就可以轻易地做到了。
不多谈。

## Now What?

下一篇再收集下琐碎但重要的 syntax sugar 好了。
这个系列应该就可以完结了吧。

[field cons]: http://doc.scrapy.org/en/0.16/intro/tutorial.html#defining-our-item
[filter]: http://guides.rubyonrails.org/action_controller_overview.html#after-filters-and-around-filters
[decorator]: https://github.com/michaelfairley/method_decorators
[metaclass attr lookup]: http://docs.python.org/2/reference/datamodel.html#special-method-lookup-for-new-style-classes
[ruby struct]: http://ruby-doc.org/core-1.9.3/Struct.html
[method lookup]: /post/python-vs-ruby-method-call.html#section-1
