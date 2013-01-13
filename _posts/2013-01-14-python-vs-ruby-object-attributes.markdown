---
layout: post
date: 2013/01/14 00:00:00
title: "Python VS Ruby: Object Attributes"
---
身在一个 Python shop，
无法不怀念 Ruby 的种种优越。
当然，
见多了编程语言之争，
哪怕后来讨论跑题到“先入为主的认知偏见”，
也比“用户只关心产品而不关心实现”要幸运些。

但实际上两种语言的差别就活生生地摆在在自己眼前，
每天影响着效率与心情。
而不是像真空架构师眼里那样
“都是现代动态多范式解释型语言所以差别不大”。
终究还是不吐不快啊。

所以，
假如你也是个一线基层码农，
也很好奇对面的草是不是纯粹在技术上更绿，
更关注语言特性对日常开发的影响而非极限条件下的对比，
不妨读下去。

考虑到现阶段的适用性，
版本以 Python 2.7 与 Ruby 1.9.3 为准。
当然也会考虑一下未来。
比如接下来要开始谈的两者的对象系统，
因为 Python 3.x 只使用 New Style Class，
那么我们就不必考虑 Old Style Class 了。

## 属性

属性的严格定义不知道去哪里找，
这里暂且用来指对象实例用来储存自身状态的方式好了。
用途自然是储存对象的协作者与数据等。
或者干脆说成是：
per-instance 的东西都叫属性[^per-instance]。

## 内部访问

一般来说，
对象的内部状态轻易不向外暴露，
读写操作主要由对象的方法完成。
这种自己默默修改自身属性的存取方式我们暂时称作内部访问。

Ruby 中为每个对象提供了单独的命名空间来存放属性，
语法上 `@foo` 是读取，`@foo = 'bar'` 是写入。
而且读写语义无法通过元编程来干扰。
也不与常量查找、方法调用、局部变量存取等寻址方式相冲突。

在 Python 中这种命名空间似乎也是存在的，
而且乍一看可以通过 `__dict__` 字典来访问[^tricky-dict]。
但由于打字太多，
实际恐怕很少有人积极使用，
更多地还是直接用外部访问的方法。
往下看。

## 外部访问

Ruby 默认禁止外部直接访问对象属性[^ruby-var-methods]，
需要我们显式地在类定义中使用
[`attr`系列方法][attr-methods]
来显式定义供外部使用的存取方法。

Python 这边就容易得多，
自定义的 New Style Class 默认有 `__dict__` 属性[^object-dict]，
读写全开，
可以直接用 `foo.bar`，`foo.bar = 'baz'` 语法存取，
内部存取时多半也用这种语法。

这里我不想谈及定义了 `__slots__` 的情况，
因为看文档里面一长串需要当心的 [notes][python slots]
可以猜测没什么人愿意用。
稍微 Google 一下的结果也基本证实如此。

## 元编程：自定义 getter/setter

两种语言都支持在语法上依然写出常规的属性取值/赋值，
而背后执行任意的代码。
常用的场景包括延迟求值，
计算属性（Calculated Attribute），
只读属性等。

在 Ruby 里由于语法糖实在太甜，
调用方法时可以省略掉括号，
能够不传参数调用的方法就是 getter，
写起来像 `foo.bar`。
以 `=` 结尾的一元方法就是 setter，
通过 `foo.bar = 'baz'` 就会调用到。
前面提到的 [attr 系列方法][attr-methods]
也只是按照这个接口来定义方法，
并非特殊的语言关键字。

至于 Python，
只需 getter 时还好说，
直接用 `@property` 装饰器就好。
但许奥允许外部只读访问属性时就有些麻烦。
读写控制要由 property descritpor 来实现，
为了自定义一个只读 descritpor 写起来像这样：

{% highlight python %}
class Foo(object):
    bar = property()
    @bar.setter
    def bar(self, value):
        raise AttributeError

Foo().bar = 'shit' # => 抛 AttributeError 异常
{% endhighlight %}

这样在内部访问中要写入属性时就要被迫改用这种伤键盘的写法：
`self.__dict__['bar'] = 'blah'`。
所以现实生活中人们往往用下划线开头表达私有属性，
然后定义一个去掉开头下划线的 getter 来提供只读访问了事。

## +1 for Ruby

到这里已经可以总结出我偏好 Ruby 的一点原因：

对属性的内部与外部存取做出明确区分，
默认不提供外部直接存取。
且两种存取方式的语法都不难写。
鼓励开发者在设计时考虑好封装问题。
而 Python 惯用的方式是下划线标识私有属性，
难免会增加代码量。

接下来如果再写下去要一并引入很多对象模型的重点问题，
恐怕就要被标记 TL;DR 了。
所以先到这吧。

[attr-methods]: http://ruby-doc.org/core-1.9.3/Module.html#method-i-attr
[python slots]: http://docs.python.org/2/reference/datamodel.html#__slots__

[^per-instance]:
    未来谈及方法解析的时候会引入 per-instance 的方法定义，
    从而毁掉这个不严格的描述。

[^tricky-dict]:
    但是你没法通过自定义 `__dict__`
    返回值来扰乱属性专有字典。
    代码实例：<https://gist.github.com/4525349>。
    是的，
    在这两种语言元编程的能力下，
    可以做出很多出格的事情来。
    本文只能在假设开发者不会积极地乱来的基调下展开讨论。

[^ruby-var-methods]:
    当然你可以用 `instance_variable_{get,set,s}` 等方法来访问。
    避而不谈的理由见[另一个脚注](#fn:tricky-dict)。

[^object-dict]:
    `object` 类自己却没有定义 `__dict__`，
    其实例也没有。
    所以尽管这样一个空的 New Style Class `class Foo(object): pass`
    是 object 的直接子类，
    两个类的实例的行为却大不相同。
