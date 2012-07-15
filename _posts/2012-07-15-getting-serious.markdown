---
layout: post
date: 2012/07/15 18:40:00
title: "Getting Serious"
---

写代码的生活中,
一个无可逃避的问题是修复 bug.
是的, 程序员之所以脾气暴躁,
很大程度上是因为[接收的负面反馈太多][why grumpy] --
"快把这个问题修一下!" 或者
"服务器又 down 了!"
诸如此类.
于是化解负面情绪就成了职业必备技能之一.
具体手段包括但不限于吐槽, 看 AV, 写更有意思的代码, 酗酒等等.
不然就等着若干年之后严重 burnout 然后转行吧.

### 树倒在森林里
{: #tree-falls-in-forest}

大概去年这个时候我去某电商大厂面试,
最后一轮闲聊时听了个故事:
说 CEO 正在吃自己的狗食,
恰好撞上关键功能 bug 一枚,
于是一路电话打下来叫人连夜修掉.
这大概是为了警告我:
这事不那么轻松你丫最好放老实点.
不过最后我根本没得到那个工作机会.

Anyhow, 其实这个故事教育我们:

> 如果你做错了事, [不要被抓][SP S14E01].

是的, 如果团队里所有人都用 Windows 7,
谁会在乎 IE6 下的导航栏位置正不正常?
那么你去修复了又能如何?
不外乎又一个推迟上线的因素被提前发现罢了.
如果不去修复,
所有人依然会欢心鼓舞地等待发布.
大不了在几个星期之后被愤怒的用户发现再修正就是了.

### 滥用文化
{: #abusing-culture}

文化是能救人的.

#### Blameless

[无问责的 post-mortem analysis][esty blameless] 是好事吧.
但是这篇博客太长了,
一般的管理人士没有时间读完和考虑实施.
于是我们只需不断地推荐这类东西,
把这个观念融入到"团队文化"中,
然后简单地把这个概念从字面上放大到某个极限:

> 无论出现了怎样的 bug 都不应问责.

然后你就可以心安理得地让 bug 上线了.
等到未来 bug 被发现时,
如果你们同时在使用某种假设程序员都是可互换的齿轮的流程[^scrum],
灰头土脸地去修 bug 的人都不一定是你.
*Awesome*.

#### Facebook is cool. We're cool, too
{: #break-things-move-fast}

还记得 Facebook 有句格言叫做 Move fast and break things 么,
很多人都喜欢把[这句标语][facebook moto]截图存留下来.
于是你就可以在这种文化氛围下 Break things and move fast 了.
这些人不知道 Facebook 的[具体工作方式][Facebook push]其实是:

* 上线前有充分的测试:
  - 有多段 Staging
  - 在办公室访问的是 Staging
* 用 Bootcamp 来推广测试文化, 工程师自己做 QA
* 每天固定时间上线, 不会按需上线
* 缺少测试和 code review 中争议太大的提交会被推迟上线
* 有 Karma 机制
* 即使 transfer 到其他团队也会被 releng 抓去修理在之前团队留下的 bug

但是, 但是, 这些不利的细节才没有心情去了解呢.
有那句口号打掩护就够了.

### 主动技能
{: #active-skills}

修复 bug 的能力就像[被动技能][cold mastery],
虽说有用,
但不懂的人只会看到
"加了技能点上去但不能释放出来".
所以说掌握并提升主动技能的实用性不言而喻.
还要挑选有绚丽视觉效果的优先,
用以吸引习惯性"不明觉厉"人群的注意力.
类似 [API 设计][api design]这种事情,
做不好也只会被(很少的)直接协作者吐槽,
做得再好也不会有很多人理解的啊.

你看本文并没有充满消极厌世的态度,
这一段是建设性意见没错.

[why grumpy]: http://www.nczonline.net/blog/2012/06/12/the-care-and-feeding-of-software-engineers-or-why-engineers-are-grumpy/
[SP S14E01]: http://v.pptv.com/show/1fe3NZ0Dc7EUkl4.html
[esty blameless]: http://codeascraft.etsy.com/2012/05/22/blameless-postmortems/
[Facebook push]: http://www.facebook.com/notes/facebook-engineering/release-engineering-and-push-karma-chuck-rossi/10150660826788920
[cold mastery]: http://classic.battle.net/diablo2exp/skills/sorceress-cold.shtml#coldmastery
[api design]: http://www.youtube.com/watch?v=aAb7hSCtvGw
[facebook moto]: http://media.tumblr.com/tumblr_lrlw2wXKHY1qzr07n.jpg

[^scrum]: 事实上更为常见的情况是: 可以决定流程的人只选取对自己有利的 practice 来实施. 所以"齿轮说"未必属实, 但如果你尽快在 issue tracker 里建立 ticket, 自己却不马上去修复, 这种"只吐槽不做事"的态度会被认为是 non-team player 哟.
