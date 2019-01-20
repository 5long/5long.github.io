---
title: 苹果园之旅Ⅲ - 软件 Pt. 1
---

如果说 [Mac 的硬件已经无法树立优势][mac-hardware]，
[价格又不那么便宜][mac-price]，
那么软件呢。

[mac-hardware]: /post/tour-in-apple-garden-hardware.html
[mac-price]: /post/tour-in-apple-garden-apple-tax.html

## Hardware Integration

还是先挑好的说：
软硬件间的整合，
这自然是 Mac 的优势。
自从微软自己出了 Surface 系列，
这优势已经不是苹果独有的了。
但依然可以胜过大多数竞争对手。

当然，
如果我不能具体地解释清楚
Hardware Integration 到底是什么意思，
以及为什么 Mac 胜过了大多数竞争对手。
这篇文章就不能符合我自己的标准了。
具体来说：

* 一台新买的 Mac 可以自称 It just works。

* 一台新买的 Windows 品牌机，
  大多数时候已经由硬件集成方做好了测试与配置。
  硬件驱动都已经通过 Windows Update 安装好，
  并且可以自动升级。
  不再像几年前那样，
  要用户自己去到处找驱动，
  或者用“驱动精灵”之类的第三方软件来实现。
  可以说和 Mac 越发接近了。

* 一台自己组装的 Windows 台式机
  需要自己测试硬件兼容性与稳定性，
  要从头安装系统，
  然后用 Windows Update 装驱动。
  然后也就差不多能用了。
  对普通用户来说，
  自己安装系统的步骤可能稍微有些吓人，
  但是我最近刚给自己的 XPS 装上了双启动，
  发现这个过程也不算费事，
  和安装应用软件一样一路点“下一步”就差不多了。

* 一台从头安装 Linux 系统的电脑，
  Well，这要看 Linux 发行版在安装流程上是否有下功夫。
  如果是 Archlinux，
  安装过程就是巨大的入门门槛。
  你需要自己准备硬盘分区，
  需要运行几个安装专用的脚本，
  需要在漆黑的 CLI 下安装 Xorg，Display Manager，WM / DE，
  自己配置时区，语言，网络连接。
  系统才能用起来。
  如果要让电池管理做得足够好，
  还得调一系列的 kernel / module options。

  如果运气不好 / 缺少调研，
  机器上有些太新 / 太小众的硬件，
  还是会遇到缺少驱动的问题。

  比如我的 XPS 15 上的指纹传感器，
  到目前为止还没有 Linux 驱动。
  所以这部分硬件的钱我算是百花了。

  再比如 2018 年年末发布的 AMD RX590 显卡，
  从硬件发布到 Linux 驱动可用，
  差不多等了一个月的时间。
  但如果用户不自己编译内核模块，
  等这个驱动进入官方软件仓库，
  就还要更久。

所以苹果自己一手掌控软件 + 硬件的优势，
可以保证从硬件到驱动，
再到 user space 软件都良好集成。
免除了用户自己安装调试操作系统的麻烦。
然后就可以偶尔发明 Touch Bar，T2 Chip 这样的专有硬件，
来让自己与竞争对手不一样。

那么微软是否也具有同样的优势？
我猜想微软为了和硬件制造商搞好关系，
避免和他们竞争得太激烈，
应该不会给自家的 Surface 设备过分开小灶。
Windows 上显著提升用户体验的硬件接口，
例如 Windows Hello，Windows Precision Trackpad，
都开放给所有厂商使用。

但是话说回来，
如果一个用户只求电脑买回来在硬件方面 “it just works”，
现在 Windows 在这方面已经有了长足进步。
只是偶尔会搞些[升级新版时自动帮用户删除文件][win-bad-update]的糗事出来。

[win-bad-update]: https://betanews.com/2018/10/04/windows-10-october-2018-update-deleting-documents-photos-and-other-user-files/

## Installing Software

完成了新系统的初始配置，
接下来往往要安装一系列的第三方软件。

对我来说，
用软件包管理器（以下简称 PM）
来安装软件可以说是必要的。
虽然 Mac 有自己的应用商店，
但我用的软件几乎都不在上面，
而且操作也不如 CLI 工具便捷，
还是只用 Homebrew & Homebrew Cask 就好。
但这和 Linux 上的 PM 相比，
又存在着 Cask 和非 Cask 的区别。
`brew install google-chrome` 这个命令并不能成功安装 Chrome，
而是需要用 `brew cask install google-chrome`。
略微有点不方便。

## Virtual Desktops

我习惯的工作方式，
是按照不同的任务目标，
把窗口放置到不同的虚拟桌面上去。
比如说 Web 浏览器，
在虚拟桌面 2 号上的浏览器窗口是搜寻信息用的，
其中的 Tab 多半寿命较短。
3 号桌面用作长期存在的监控 / 控制台界面。
4 号桌面放与工作无关的内容。
6 号桌面集中放置 Slack / Trello / Email 等通信应用，
并且单独放置在副显示器上。
当我的注意力在主显示器上面时，
可以忽略掉通信应用的干扰。

在 Linux 上用 [i3 窗口管理器][i3wm]可以不需过多的配置，
就能实现这种工作状态。
在 Windows 上面我还没有投入时间去研究，
而且我现在登录到 Windows 也只是为了玩游戏。
所以还不能下结论。
只是听说 Windows 的虚拟桌面管理还不是太好。

[i3wm]: https://i3wm.org

到了 macOS 上，情况是这样的：
假如我想把刚刚开的，
专门播放音乐的 web 浏览器窗口放到 9 号虚拟桌面去。
默认有两种办法来实现[^desktops]：

[^desktops]: 首先我要把 10 个虚拟桌面都建好，
    然后在设置 -> 键盘 -> 快捷键里，
    把 Control + 数字键切换虚拟桌面的快捷键都启用。
    还把键盘上右侧的 Option 键映射成了 Control 的功能。
    不过这种“初始化配置”的学习与配置成本，
    我都可以忽略不计。
    毕竟如果能带来长时间的效率提升，
    这点成本很快可以收回来，[大概][xkcd-cost]。

[xkcd-cost]: https://xkcd.com/1205/

1. 用三指上滑，或者按 F3 键进入 Mission Control，
    然后用拖拽的方式，把窗口拖到上方的 9 号 Desktop 上去。

2. 把鼠标箭头放在窗口标题栏，
    按住鼠标左键（或者说单指 click & hold 触摸板）
    然后按 Control + 9，
    然后松开鼠标左键，

同样的操作在 Linux - i3 上是这样实现的：

* 确保要被移动的窗口是当前活动的窗口。
  99% 的情况下，我想移动的窗口就是当前窗口。
  这一步是不需要操作的。
* 按 WinKey + Shift + 9，把当前窗口移动到 9 号桌面。

就这么简单。

如果还要拆解开来细说的话：
左手小指横着躺在左 Shift 键上，
拇指放在左侧 Alt 键（已经映射成 WinKey），
然后用某个中指 / 食指去按想按的数字键就行了。
也许说起来感觉很复杂，
但整个过程不需要寻找 / 移动鼠标箭头，
也没有制造 RSI 的感觉。

然而在 macOS 上，
这个看似并不复杂的常用操作，
在设置键盘快捷键的窗口里，
没有可用的配置项目。
听说 macOS 桌面有很好的自动化支持，
但目前我还没找到哪里有“把窗口 X 移动到桌面 Y”的方法。
如果读者能提供线索，请务必留言提醒我一下。

## Out of Control

Mac 应用里，绝大多数快捷组合键用到的 modifier 是 Command 键。
而 Linux 和 Windows 用的是 Control 键。
一开始我确实有些不习惯。

然而用过一阵子之后，我开始注意到了这个设计里的不一致性：

* 首先是切换虚拟桌面（Desktop）/ 应用内 Tab 的不一致性：

  | | Control | Command |
  | 数字键 | Desktop | Tab |
  | Tab 键 | Tab | Desktop |

* 在 Terminal 里，
  所有的应用内快捷键都只能用 Control 作为 modifier，
  例如 [Ctrl + C，Ctrl + D](https://www.douban.com/note/693893123/)。
  如果你在用 [NeoVim]，
  还可支持带 Alt / Option 的组合键，
  而旧的 Vim 则不一定支持。
  总之，Terminal 界面是完全没有 Command Key 支持的。

[NeoVim]: https://neovim.io/

* Control + Space 切换中英文输入法，
  这个操作应该算作是全局级的，还是应用级的？
  从实现上来说，肯定是全局级；
  但从用户的视角来看，
  切换输入法只是为了在当前界面输入中文，
  这样来看又是应用级的操作。
  目前我回避了这个问题，
  没有多想，只是在用默认设置。

为什么我会在乎这个？
因为在 Linux 桌面环境里，
我已经建立了
“应用级快捷键用 Control，全局级快捷键用 WinKey”
的规约。
这个规约有足够的 consistency，
CLI 工具都遵守它，
Windows 系统与应用也同样遵守它。

但是在 Mac 上，
如果你要用到虚拟桌面，
要经常用 Terminal 界面，
由于 Command + 数字键和 Control + Tab
的功能是各个应用自行实现的，
很难通过自定义按键的方式来修改。
那么你没法做到同样 consistent 的热键规约。

举个典型的例子：
macOS 从 iOS 借鉴了 Notification Center，
它的快捷键是 Command + N。
而 Safari 一直用 Command + N 来新建窗口。
双方都以为自己有资格占用这个快捷键，
都没有让步。

如果你想为自己开发的功能绑定快捷键，
这时就会发觉：
有足够多的全局级快捷键给自己随意使用，
可以轻松地避免与应用级快捷键冲突。
随着[某些软件](https://code.visualstudio.com)的功能越发地多起来，
需要占用的快捷键也越发地多。
由于缺少 scope 的划分，
很可能会与你自己定义的快捷键相冲突。

再者，
如果你常年只用 Mac，
也愿意付出额外的精力来记住
“哪些情况该用 Control，哪些情况用 Command”，
那么也还好。
但如果你想跨平台使用多个电脑，
那么 Mac 的设计是最缺少 consistency 的。
我在写这一系列博客的时候，
在 MacBook Air 上已经无数次地把 Control + Space
和 Command + Space 搞混了。
每失败一次就难受一次。

## 结语

吐槽太多，需要休息[^delete]。这篇先写到这，下一篇还会继续。

[^delete]: 而且我今天错按了太多次“向左删除一个单词”的组合键。
    本该按 Option + Backspace，
    结果按成了 Command + Backspace。
    我必须休息一下。



































































































