---
layout: post
title: "Python VS Ruby: Syntactic Sugar"
---

## Implicit `self

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

[^end]: Ruby 经常要打 `end` 这种事我会到处说嘛。

[python switch case]: http://code.activestate.com/recipes/410692/
