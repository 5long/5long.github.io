---
layout: post
title: "Python VS Ruby"
---
身在一个 Python shop，
无法不怀念 Ruby 的种种优越。

考虑到现在两个语言都各自发展到了相对平稳的时期
-- Python 不会出官方2.8版，
Ruby 即使发布 2.0 也不会有很大改动
-- 但愿我这次能一劳永逸地完成两种语言的个人偏见下的对比。
尽管这种吐槽并不能带来什么建设性成果，
一时口舌之快而已。

## Type Less

Ruby 有一些可以让你少打字的语言特性：
裸 hash，
方法调用/定义免括号，
`%w` 数组字面量，
隐式返回值，
隐式 `self` 等等。
还有什么比少打字更美好的事情么。

相比之下 Python 里很少有这种福利。
Tuple 可以省略括号，但习惯上还是显式地写好括号，
更不要说三元操作符：
`A if P else B` 这顺序很反直觉，
打字又多。
现实世界里经常有人用 `P and A or B` 替代之。
是谁说 Python 推崇只用一种最好的解决方案来着。

虽然现代编辑器/IDE可以用 snippet 等功能帮你快速打字，
但阅读代码时视觉上的信噪比还是逃不掉的。
少打字的编程语言总是有市场。[^end]

## 对象系统

Python 定义属性 getter/setter 时要写很多 boilerplate，
而 Ruby 实现了一个纯粹的 Smalltalk 式的消息传递，
用语法糖来提供 getter/setter。

Python 还有两套 MRO 并存，
`super()` 用起来也是打字超多。
另外这个我完全无法理解：

    o = object()
    o.foo = 42 # 会抛 AttributeError

    class C(object): pass
    C().foo = 42 # 不抛异常。与其超类行为大不一样

Python 的对象系统总给我感觉是个 afterthought。

## Code Block

Python 的 lambda 只能写一个表达式，
使得语言表达能力大大落后。
需要 contextual execution
的时候偶尔可以拿 `with` 语句凑合一下，
再就只能先 `def` 定义再拿去用。

而 Ruby 有 proc 支持，
解决了 JavaScript 要忍受的 `this` 绑定问题。
结合前面提到的隐式 `self`，
Ruby 社区中随处可见内部 DSL。

## Switch-case

Ruby 的 `case-when` 语句可以不必写类似 C 的 `break`，
默认就不会 fall-through。
而 Python 在某个 PEP 中明确地表示不支持。
当然你可以用奇怪的 hack 来[伪造一个][python switch case]。

你可以说“switch-case往往应该重构成多态”
，
但是我希望保留自己选择的权利。

## 正则表达式字面量

属于不需要的时候无所谓，
需要的时候才会想起来的东西。

## Bonus：别喊口号

仅仅因为语言包含了一个 `import this` 的彩蛋，
不代表这门语言一定适合自己。
好比任何人都可以在简历上写“热爱技术”几个字。
喊口号毕竟不需要成本。

## 就这些

其实这并不会影响我使用 supervisor 等 standalone 的 python 工具，
但如果我可以不受限制地选取下一个 webapp 的技术栈，
必然是 Ruby > Python.

[^end]: Ruby 经常要打 `end` 这种事我会到处说嘛。

[python switch case]: http://code.activestate.com/recipes/410692/
[Bundler]: http://gembundler.com/
