---
layout: post
title: "Python VS Ruby: Syntactic Sugar"
---

这个系列应该可以结束了：

* [Object Attributes]({% post_url 2013-01-14-python-vs-ruby-object-attributes %})
* [Method Call]({% post_url 2013-02-17-python-vs-ruby-method-call %})
* [Class Definition]({% post_url 2013-04-01-python-vs-ruby-class-definition %})
* Syntax Sugar - 就是本文

看这篇的主题，
就知道 Python 要被全面碾压了。

## Implicit `self`

Ruby 在调用 attribute setter 之外的情况下都可以省略 `self.`
结合前面几篇，
Ruby 在书写 OO 代码时优势巨大。
Meanwhile, Python is selfish。
连方法定义里都必须把 `self` 作为第一个参数写上去。

顺便，
如果你在调用 Python 的方法时传错参数数目，
Stacktrace 里会把 N 元方法说成是 N+1 元函数。
故意迷惑你。
Python 3 的 Stacktrace 里换了种说法，
终于没有这个问题了。

## Code Block

Python 的 lambda / list comprehension 只能写一个表达式用于计算，
使得语言表达能力大大落后。
需要 contextual execution
的时候偶尔可以拿 `with` 语句凑合一下，
再就只能先 `def` 定义再拿去用。

而 Ruby 有 proc 支持，
应用范围更广泛，
还解决了 JavaScript 要忍受的 `this` 绑定问题。

结合前面提到的隐式 `self` 与 `instance_exec` 等物，
这几乎在一个 Static Scoping 的语言中实现了 Dynamic Scoping，
导致 Ruby 社区中随处可见 Internal DSL。

## Switch-case

Ruby 的 `case-when` 语句可以不必写类似 C 的 `break`，
默认就不会 fall-through。
而 Python 在某个 PEP 中明确地表示不支持。
当然你可以用奇怪的 hack 来[伪造一个][python switch case]。

你可以说“ switch-case 往往应该重构成多态”
但是我希望保留自己选择的权利。
在 one-off 的代码里用用，
或者觉得重构反而收益不大时暂时用一下，
都没什么大问题。

## So Many More

Ruby 还有大把可以让你少打字的语言特性：

正则表达式字面量有人记得么，
这种属于不需要的时候无所谓，
需要的时候才会想起来的东西。

方法调用和定义可以免去参数两侧的括号，
在 [CQS pattern] 中，
无参数的 query 和所有 command 方法都可以受益。

`%w` 数组字面量在表意上完胜 `"foo bar".split()`。

List comprehension 在表意上不比 Enumerable#map/select 明确，
同时使用 map 与 filter 时，代码的阅读顺序与执行顺序完全不匹配。

Ruby 很多语句可以当表达式来用，
方法定义隐式返回最后一个表达式值。
可以少写很多变量赋值或 `return`。

`rescue` 可以直接在 `def ... end` 的代码块里使用，
不必写 `begin` 开头。

字符串内插。
Python 则有 `%` 与 `str.format()` 两种半吊子方案来凑合。
是谁说 Python 推崇只用一种最好的解决方案来着？

三元操作符，
对于 C 系语言用户来说都不陌生。
Python 偏要搞出 `A if P else B` 这种反直觉的东西来替代。
要求开发者多打很多字。
现实世界里经常有人用 `P and A or B` 这种有漏洞的方式替代之。

`super` 在 Ruby 中是关键字，
支持直接 pass through，
也支持显示地从继承链往上传递参数。

比如

```python
class Foo(namedtuple("Foo", "bar baz")):
    def __init__(self, *a, **kw):
        super(Foo, self).__init__(*a, **kw)
```

反观 Ruby 的写法...
前面这个代码块的最后一行只需写 `super` 即可。
不需要显示地写当前类的名字，
不需要传入 `self`，
不需要记忆 `self` 和 class 两个参数的顺序，
不需要把方法的名字重复一遍，
也不需要把参数一个个传进去。
差距实在是太大。

你可以说现代编辑器 / IDE 都提供 snippet 之类的方式让你少打字，
但别忘了阅读代码时还是要被迫面对这些降低信噪比的 boilerplate。
而我们都知道维护代码时面对难读的代码是何等的残念。

## 结束语

其实写到这里，
相信本系列的琐碎程度已经足以让人觉得无聊犯困了。

更常见的编程语言之争往往是高喊简短有力的口号，
比如 "Ruby 使程序员快乐"，
或者 "Python 着眼于简单优雅"之类的。
而具体的，日常用到的特性差异说起来就十分啰嗦（比如本文），
往往会被 TL;DR。
再加上不少程序员其实还停留在编程爱好者的水准上，
“Ruby 的 implicit self 允许平滑地用 query method 代替 local variable”
或者
“Python 写 attribute lazy initialization 较为困难”
这些话说了恐怕只能是对牛弹琴。

总之。如果你能坚持看到这里，
但愿也能觉得稍有收获就好。

[python switch case]: http://code.activestate.com/recipes/410692/
[CQS pattern]: http://en.wikipedia.org/wiki/Command%E2%80%93query_separation
