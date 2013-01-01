---
layout: post
date: 2013/01/02 02:00:00
title: XY Problem
---

初次听说 XY Problem 这个概念,
是在[某介绍 Bash 为主的 Wiki][greg wiki] 上.
看到专门有设 CategoryRant
就觉得"啊果然也是个有观点的人".
读过之后也深感:
<del>嗯最后一个例子黑 Gentoo 黑得真是深得我心</del>
啊果然是个需要注意又经常出现的问题.

在经典吐槽 & 教育之作
[How to Ask Questions the Smart Way][ask smart questions]
里面也有针对这一问题的建议,
如:

* [Describe the problem's symptoms, not your guesses][not guesses]
* [Questions Not To Ask: How can I use X to do Y?][use x to do y]

只是没有把这个概念单独提出来而已.

## 定义

前面提到的 [Wiki][greg wiki] 中已经有描述.
一个不严格但便捷的简化是:
人们喜欢提前提出解决方案,
而不是认真分析最初所要解决的问题[^yy-problem].

这样,
接收信息的一方在缺少确切 context 的情况下,
很容易把交流引导到糟糕的结论上去.
这恐怕也是很多"求改变现状智囊团会议"的宿命.

抑或,
其他人暂时不直接回应那个半成品解决方案,
主动地去探索原始问题的定义,
这样也还是制造了不少沟通成本.
还会让人觉得"[啊这人讲话真是拐弯抹角][obvious answers]".
但最终的结果还是相对好些的.

## 现象

在论坛, 邮件列表, 乃至 IM 群,
观察一下日常的技术问题求助/交流,
鲜活的例子到处都是.
这里只记录两种看上去也夹杂了这种因素的:

### What Users Actually Want

在各种现代 Web Startup 生意经里,
有这么个说法,
其常见的表述是[^what-users-want]:

> Don't give your customers what they ask for; give them what they want.

亦即,
用户在提出 feature request 的时候,
由于 XY Problem 的存在,
提出来的需求往往是自己设想的解决方案.
然而一般用户并不擅长产品/UI设计,
这个方案的质量就很是堪忧.

这样,
匆忙按照字面需求满足了个别用户的设计,
恐怕是会被多数人讨厌的.

### (Some) NIH Syndrome

以提升生产效率为理由的
"我们应该自己写一个 X 工具!"
弄不好也是 XY Problem 的体现.

绝大多数情况下,
你所面临的问题并不特殊,
可能你正在用的东西加上些插件就够了.
或者看看市面上现成的方案是否已经足够好,
可能免费, 也可能需要收费,
但恐怕都比自己从头写起的东西在时效和质量上好很多吧.

当然啦,
我们总是会给自己找到这样那样的借口,
比如现成的方案缺少自定制性,
实现语言不在自己所喜欢的前三.
或者配置文件用了 XML 格式而非 YAML 什么的.

再者,
新建项目的激情,
暂时脱离日常的 CRUD 工作,
Presentation Driven Development 的上等材料,
这些福利对多数人而言,
即使明知是在挖坑,
也还是不愿意拒绝的吧.

## 后记

近期越发觉得记忆力减退,
所以连这种简单的道理也用 blog 写一写好了.
毕竟并非每篇都要写新的 lessons learned 才有意义.
说不定还会有意外的温故知新的作用吧.
况且 blog 这件事,
缺少练习就真的会绝望了吧.

[^what-users-want]:
    出自 <http://tom.preston-werner.com/2011/03/29/ten-lessons-from-githubs-first-year.html>

[^yy-problem]:
    更糟糕的情况则是为了做事而做事,
    完全没有原始需求来驱动,
    这种不妨称之为 YY Problem.
    当然这个不是本文的重点.

[greg wiki]: http://mywiki.wooledge.org/XyProblem
[ask smart questions]: http://www.catb.org/esr/faqs/smart-questions.html
[not guesses]: http://www.catb.org/esr/faqs/smart-questions.html#symptoms
[use x to do y]: http://www.catb.org/esr/faqs/smart-questions.html#idp29958640
[obvious answers]: http://blog.izs.me/post/7857355317/obvious-answers-to-simple-questions
