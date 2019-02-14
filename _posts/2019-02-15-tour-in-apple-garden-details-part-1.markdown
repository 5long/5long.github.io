---
title: 苹果园之旅Ⅳ - Nitty Gritties
---

Devil's in the details.

## Virtual Desktop Part 2

[上一篇 blog][mac-tour-3] 里有读者留言，
提供了 Keyboard Maestro
的方案来实现“把当前窗口移动到第 N 个虚拟桌面”的功能。
但其背后的实现机制，
是自动地执行录制好的键盘 / 鼠标操作。
并不是用操作系统提供的 API 来完成集成。

[mac-tour-3]: tour-in-apple-garden-software-part-1.html

回想一下我买这台 Mac 的初衷：
是想要体验 macOS 到底有什么优势，
然后把这种优势移植回自己的工作习惯里。
比如说，把 Alt 和 WinKey 这两个键交换位置。
再比如在 Linux 系统上也启用三指划动触摸板切换虚拟桌面。
但我并没有必要强行把自己的工作习惯完整地移植到 Mac 上来。
如果 macOS 对虚拟桌面的支持如此之差，
只能靠键盘 / 鼠标 macro 的形式来实现那个功能，
那么这并不是 macOS 的独特优势。
我最好还是把注意力放到 Mac 的特色或优势上去，
这样我在这台 Mac 上花费的时间才更有价值。

当然话说回来，
为了把我自己的感受完整地描述出来，
并且享受抨击 Mac 的快感，
只写 Mac 的优势这种事，
我肯定是做不到的。

回到重点：
macOS 和 Windows 管理虚拟桌面的方式，
都还停留在按照空间关系来管理虚拟桌面的水平：
靠鼠标拖拽把窗口分配到指定的虚拟桌面，
允许用键盘快捷键切换到位置临近的虚拟桌面上去，
用鼠标点击来 randomly access[^ra] 虚拟桌面。
仅此而已。
而不是允许用户按照工作任务来 assign 虚拟桌面，
然后不论当前活动桌面在哪，
直接切换到想要执行的任务所在的桌面。

[^ra]: 如果你对 randomly access 这个词组理解有困难，
    想一下硬盘的访问方式：随机存取与顺序存取。
    但愿这能帮你理解我的意思。

## Unnecessary Key Symbols

除去自然语言中会出现的字母 / 数字 / 标点符号，
Mac 键盘上的其它按键，
都有一个独特的图标符号作为标识：`⌘ ⌫ ⌥ ⏎`。
同时，这些按键还有自己的英文名称。
比如 Command，Delete，Option 等。

如果你要在口头表达时描述这些按键，
或者在打字的时候用某种自然语言表述这些符号，
而不是去 Unicode 字符表里找这些符号[^charmap]，
那么就只能用它们的英文名字。
也就是说，
这些按键的英文名字是你必须要熟悉的。
除非你总也不和别人交流电脑的使用，
或者永远有机会使用图形符号，
或者你所处的小圈子给这些符号都发明了一套发音，
Effectively 发明了新的语言。

但是对我来说，
在 macOS 的界面上，
凡是需要表达键盘快捷键的地方，
都在用图形符号，而非英文名字。
我每次看到 `⌃⇧⇥` 这样的标识，
我都要花很长时间才能反应过来这几个按键分别是什么，
在键盘上的哪个位置能按得到。

目前我学习 macOS 上的快捷键的思维过程，
是在大脑里把图形符号翻译成英文名字，
然后就知道该按什么键了。
虽然很低效，
但我至少把一个新问题转化成了熟悉的问题。
可以在 macOS 的世界里活下来了。

当然，你可以说这些组合键“看一眼键盘就能找到了”。
但低头在键盘上按照图形符号找按键，
让我感觉自己的智商受到了羞辱。
而且输入效率也明显降低。
况且我还把了 Fn 和左 Control 键互换了映射，
根据符号找的按键位置还要再自己在脑内转换一次。

另外，你也可以说这是我用 macOS 的时间还不够长，
不够熟悉这些符号而已。
但如果我们可以砍掉这些符号，
只用它们的英文名称，
既能减少记忆负担，
又可以和其它操作系统的约定保持一致，
对跨平台电脑用户更为友好。

## Global Menu Shortcut

Mac 默认没有让窗口最大化的快捷键，
有的只是菜单栏 -> Window -> Zoom 这个选项。
而且有些应用还会自作聪明，
在 Zoom 之后只会在垂直方向最大化，
在水平方向则不会。

但 macOS 这里显示出较强的整合性：
在系统的 keyboard shortcuts 设置里，
可以给 App Menu 项目绑定快捷键。
而且所有 App Menu 里的“最大化”都称作 `Zoom`。
这倒也可以实现为最大化功能绑定快捷键。

如果你想要绑定快捷键的功能在所有的应用里的名字都一样，
那么这倒可以实现跨越应用的全局快捷键。
这点在 Windows 上似乎还做不到 ——
或者说仅靠系统原生的支持还做不到。

在 Linux 上则是连想都不敢想。

## Glittering Prizes[^g-prize]

[^g-prize]: 这是 Warcraft II 的 cheat code。

* 如前文所述，
  我把键盘上的 Win Key 和 Alt key 功能互换了。
  把 XPS 15 上的触摸板配置成了支持三指 swipe 来切换虚拟桌面，
  把双指 swipe 手势换成了和 Mac 触摸板一样的，
  或者说和智能手机一样的滚动方向。

* 使用 macOS 让我意识到：
  Ctrl + Space 并不是切换输入法的固定按键。
  于是我现在在 Windows / Linux 上用左 Shift 键来切换输入法。
  把 Ctrl + Space 腾出来了。
  目前我还没给这个非常容易摸到的组合键找到固定的功能，
  只有 VS Code 默认会用这个组合键来提供输入补全建议。

* 给 Linux CLI 定义了 `open`, `pbcopy`, `pbpaste` 这些命令。
  一方面与 macOS 保持一致，
  另一方面可以不再去记 Linux 的三个 X server 剪贴板有什么区别，
  不用去记 `xsel` 命令需要加 `-b` 这个参数。
  反正平时用到的就只有 `CLIPBOARD`。

* 用 Miller columns 显示文件系统树的 GUI 文件管理器。
  在 Linux 上唯一实现了这个功能的是
  [Elementry OS] 的 Pantheon Files。

[Elementry OS]: https://elementary.io

* Spotlight 式的全局搜索：
  目前我还不知道是否有必要使用 Linux 系统级的全局搜索。
  因为搜索的范围太广了。
  平时大多数情况下，
  我只用 Spotlight 搜索来启动程序。
  这样只要用 [rofi] 内置的 run mode 就足够。
  如果要用这个搜索来打开文档的话，
  有良好的文档组织习惯（a.k.a 用目录）+ 正确的文件命名就够了。
  但是在 [VS Code] / [Vivaldi] 这样功能复杂的软件里[^vivaldi]，
  有个内置的全局模糊搜索，
  可以减少从层层嵌套的菜单里寻找想要的功能的麻烦。

[^vivaldi]: 在写这篇文章的草稿时，
    我还在尝试用 Vivaldi 作为自己的主力浏览器。
    但现在我已经换回了 Chrome。

* Again，搜索：
  macOS 全局菜单栏的 Help 菜单下面，
  肯定有一个搜索框，
  用来搜索当前应用的所有菜单项目，
  还会把搜索结果所处的菜单层级位置显示出来。
  这在 Linux 系统上恐怕也是很难实现的。

  而且话说回来，
  Linux 上的应用软件往往会要求用户提前阅读文档，
  去学会软件的使用方法。
  所以这个功能估计很难排到更高的开发优先级上。
  But still，
  这可以有效减少用户接触新软件时的学习成本。

[rofi]: https://github.com/DaveDavenport/rofi/

## Pet-Peeves

接下来是无尽的琐碎吐槽：

* 切换虚拟桌面的动画，
  可以从平移改成淡入淡出，
  但不能彻底关闭。
  其它的 UI 动画也都是如此：
  可以换成不同的动画特效，
  但就是不能为了效率而彻底关闭。

* 若要删除文件，
  只能在 Finder 里把文件拖拽到 Trash 里去。
  或者在右键菜单里选择 Move to Trash。
  但选中文件，直接按键盘上的 Delete 键，
  并不能删除文件。

  顺便，
  如果要删除 Application，
  只能在 Finder 里操作，
  而不能在 Launchpad 上操作。

* 如果你像我一样把触摸版配置成双指点击 → 鼠标右键单击，
  那么你会发现：
  系统托盘里的图标可以用 Option + 单击，
  来显示选项更多的“高级版”菜单。
  但用双指点击却没有任何反应。
  回到 Finder 里来，
  双指点击文件可以显示菜单，
  但 Option + 单击不会有反应。
  看来 macOS 的不同 UI 组件对“鼠标右键点击”事件的响应不太一致。

* F1-F12 这些传统的功能键，
  本来是供应用使用的自定义功能键，
  现在默认变成了全局级的功能键。
  默认功能都写在了图标上。
  但如果你所使用的应用（如 VS Code，Vivaldi）
  设计上非常地 hotkey-heavy，
  需要用到 F1-F12 这些功能键，
  你就得额外按住 `Fn` 键来实现这些功能。
  还好这可以在系统设置里修改。
  但我肯定不会将其称作“[Sensible Defaults]”

* 在 Terminal 里，
  按 `Option + B` 组合键会输入 `∫` 这个字符，
  而不能输入 `Alt + B` 组合键，
  来实现 readline EMACS 模式的“将光标向左移动一个 word”的功能。
  Option 组合键的行为可以在 Terminal App 的设置里修改。
  也可以忍受。
  Again，这不是 Sensible Defaults。

[sensible defaults]: https://www.google.com/search?q=sensible+defaults

* 在 Windows / Linux 系统上都可以用
  double-tap-then-hold 的方式，
  来开始拖拽。
  但在 Mac 上只能用 click-then-hold 这一种方式。
  虽然 Mac 的触摸板是同行里最好的，
  但缺少了一种较为省力的拖拽方式。

* 三指点击触摸板，
  要么可以配置成“Look up & data detectors”,
  要么就只能是个 no-op。
  不像 Linux / Windows 系统上都可以配置成三指点击 → 鼠标中键。
  这样在浏览器里，
  没法用三指点击链接来在新 tab 打开链接，
  没法用三指点击标签来关闭 tab。
  But hey, [there's an App for that][middleclick]。

[middleclick]: https://github.com/cl3m/MiddleClick

* 为了拿抹布把键盘擦干净，
  我希望 macOS 可以进入一种“无论按键盘上的什么键都不会触发误操作”的状态。
  然而目前好像不那么容易做到。

  2018 年款的 MacBook Air / Pro 关机之后，
  [按键盘上的任意键 / 触摸板都会开机][turnon]。
  即使这台 MacBook 已经设计了专门的开机键（Touch ID 键）。
  换句话说，
  Mac 的键盘永远在接收可能的输入动作，
  并且会消耗电池电量，
  潜在地降低了电池的使用寿命。
  这种“不能彻底关机”的状态，
  总让我觉得缺少 peace of mind。

  再有，
  如果 MacBook 意外地被液体泼溅，
  那么为了避免液体对电脑造成损害，
  你肯定会想要把电脑彻底关机，
  尽量避免液体接触到正在通电的元件而意外短路。
  然而按照 MacBook 现在的设计，
  整个键盘会一直通电，
  而且可能会因为擦干液体时误触键盘而意外开机。

[turnon]: https://support.apple.com/en-us/HT201150#notebooks

## Activity-Centered -vs- Human-Centered Design

前阵子我刚好读到这篇文章：
[Human-Centered Design Considered Harmful][hcd-harmful]。
作者是 [Design of Everyday Things][doet] 系列书籍的作者 Don Norman。
文章探讨了以活动为中心的设计与以人为中心的设计这两种设计思路的不同。

[hcd-harmful]: https://jnd.org/human-centered_design_considered_harmful/
[doet]: https://read.douban.com/bundle/33383668/

现下流行的科技产品设计，
似乎都在朝着以人为中心设计的方向前进：
“连老一辈人都会用”似乎成了检验产品好用的 gold standard，
所有公司的产品 / 设计博客上，
都会写文章尝试解释改版后的新设计是如何地 human-friendly。
哪怕用户们对新设计有再高声音的抱怨，
也不及设计师的专业意见更有决定性。

目前为止，macOS 的 UI 给我留下的印象是：
为了做到较好的易学习性，
在人本设计方向上做了很多努力。
但在 Activity-centered 方向上没感觉到帮助：
管理虚拟桌面与窗口要依赖空间位置关系；
各种 UI 动画不能彻底关闭；
连快捷键也要在英文名称之外，
再用图形来标识。
这些设计都向我传达出“用户不识字，必须用图形”的气味。
即使用户愿意花时间去让自己更适应 activity，
也会因为 UI 的限制，而无法提升效率。

这种设计像是[电子游戏的教学关][video-game-tut]：
虽然对新手来说是必要的，
但随着玩家熟悉了游戏的操作，
就应该不再持续地提示玩家“按空格键跳跃”，
而是相信玩家能学会并记住这个基础操作，
去应对更有难度的挑战。

## 结语

我想我对这台 Mac 的吐槽还不会结束。
也许未来我还会表达琐碎的意见，
但这一系列 blog 应该可以告一段落了。

[video-game-tut]: https://tvtropes.org/pmwiki/pmwiki.php/Main/VideoGameTutorial

[vs code]: https://code.visualstudio.com
[vivaldi]: https://vivaldi.com

[^charmap]: 我在 Mac 的 Control + Command + Space 呼出的字符表里用
    `command` 作为关键字，并不能搜到 `⌘` 这个符号。这个符号的
    Unicode 名字是“Place of Interest Sign”，
    并不包括 command 字样。
    在 Windows 10 自带的 Character Map 里也搜不到。
    但在 [gucharmap] 里搜索时勾选“Search in character details”之后能搜得到。
    原因是 gucharmap 把 ISO 9995-7 的信息也纳入了搜索。
    Linux 终于在易用性细节上拿了一分（

[gucharmap]: https://wiki.gnome.org/Apps/Gucharmap

