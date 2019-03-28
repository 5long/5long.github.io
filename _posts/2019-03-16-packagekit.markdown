---
title: 无用的知识：PackageKit
---

因为前阵子自己开始尝试 Distro Hoppin，
也就额外地重视各个 Linux Distro 间的细微差异。
为了让自己产生没有浪费时间的错觉，
就挑选一些无用知识，写成博客吧。

## PackageKit

[PackageKit] 这个项目想要给 Linux 上的诸多
Package Manager（下面简称 PM）提供统一的接口，
从而满足 GUI PM frontend 的需求。
它支持的 API 调用方式是 D-Bus message。
额外还提供了 CLI 命令：`pkcon`。

[PackageKit]: https://www.freedesktop.org/software/PackageKit/

PackageKit 有如下的典型用例：

* KDE Discovery - KDE 的 PM。
  KDE 上一代 PM 叫做 Apper。
  两者都依赖 PackageKit。
* 类似地，GNOME 也有自己的 PM 软件：GNOME Software。
  也用 PackageKit 作为 backend。
* Fedora 系统的 bash
  在遇到 command not found 错误时，
  默认配置了用 [PackageKit-command-not-found]
  来提示用户去装必要的软件包。

[PackageKit-command-not-found]: https://fedoraproject.org/wiki/Features/PackageKitCommandNotFound


## 与原生 PM 的异同

### 实现机理

PackageKit 必须有原生 PM 作为 backend 实现。
它自己不是 yet another package manager。
具体的 backend 可以是 libalpm 这样的库，
也可能干脆就 shell out。

### 配置文件

如何管理配置文件的变更，
是各种 Linux PM 设计上存在分歧的地方。
例如：
我在某虚拟机里的 Ubuntu 18.04 上运行 `apt upgrade` 时，
被提示说 `/etc/update-manager/release-upgrades` 文件自从上次安装之后，
被我手动修改过。
但现在这个文件所属的软件包有了更新，
于是我被 dpkg 询问：要如何 merge 新版本和硬盘上的修改过的版本。

但如果换作是在 Arch Linux 上，
更新软件时遇到类似的情况，
`pacman` 只会创建一个 `.pacnew` 文件，
同时给出 `warning` 提示。
并不会为了让用户立即给出冲突解决方案，
而暂停更新过程。
具体的文档见 [Arch Wiki: Pacnew and Pacsave](https://wiki.archlinux.org/index.php/Pacman/Pacnew_and_Pacsave#Types_explained)

PackageKit 的行为则是：
按照项目 [FAQ 文档][pk-faq]里的说法：

> Upgrading, installing or removing packages has to be 100% silent.

完全自动处理，不接受交互式的用户输入。
具体的冲突解决办法可以由 backend PM 自行决定。
但交互上是不需要显式的用户干涉的。

于是如果你在 Ubuntu 上简介地用到 PackageKit，
那么就会遇到与原生 PM 不同的行为。
需要了解，适应，并有所应对。

[pk-faq]: https://www.freedesktop.org/software/PackageKit/pk-faq.html#user-interaction

### 用户权限

由于 PackageKit 的 API 调用方式是 D-Bus message，
那么调用方的权限是由 D-Bus 的权限系统来管理的。
实际使用时，很可能不需要 root 权限。
而原生 PM 往往都需要 root 权限，
权限管理交给 sudo 来解决。

## 有什么用

从 Linux 发行版的视角来看，
有了 PackageKit 提供的兼容层，
可以向用户提供自己品牌的 PM，
隐藏底层的 PM 实现。
也不需要在选择 / 切换 base distro 时，考虑原生 PM 的兼容问题。

作为用户，
考虑到目前大多数 Linux 的文档 / 教程都会教人如何用系统原生的 PM，
例如 apt / dnf / pacman 等。
学用 GUI PM 的机会应该不多。

不过，
如果想要有个跨 Linux 发行版的 CLI PM，
那么 `pkcon` 倒是可以考虑一用（虽然命令都很长，打字输入比较累）。
虽然同类的软件还有 [pacapt] / [sysget2]，
但这两个软件只是 shell-out 到 backend PM。
不会解析 backend 的输出之后给出 normalized 输出。
`pkcon` 则是做到了输出的格式统一。

话说回来，
如果你真的在乎 PM 的输出格式的统一，
想要依照命令的输出来做些后续处理，
那么这类问题可能用专门的配置管理工具（如 Ansible）解决起来更直接一些。

[pacapt]: https://github.com/icy/pacapt
[sysget2]: https://github.com/emilengler/sysget

再考虑到 apt / pacman 等原生 PM
会在 CLI 工具的用户体验上加以积极改进，
`pkcon` 则满足于提供稳定的 D-Bus API，
而不会为了提供对人类更友好的 CLI 而持续改进 ergonomics。
看来 `pkcon` 并不是个很好的日用选择。

目前我在尝试熟悉 `pkcon` 这个命令，
可能只是为了摆脱无聊而学习新知识而已。
并没有什么实用价值。
所以本文也完全属于“无用的知识”系列。

## 删除或关停

既然 PackageKit 对最终用户没有什么直接的实用价值，
那么这也符合了文章主题：
没用的技术知识。
当然，
知道了这种没有的技术的存在，
你也可以找理由去做点什么：

* 从安全的角度来讲，
  要减少系统的被攻击面（Attack Surface）。
  就最好把这种可有可无的软件删掉。

* 删掉自己用不到的软件，
  可以避免出现预料不到的行为。
  在 Twitter / Reddit 上搜索 PackageKit，
  多半都是些糟糕的用户体验：不停地提示更新，
  硬盘资源被占用，
  与原生 PM 发生冲突 / 导致数据库不一致。

  不知道这些问题后来是否由 PackageKit 解决了。
  但如果原生 PM 功能就够用，
  再同时用 PackageKit 就没什么必要。
  还要引入额外的复杂度。

  然而这里有个问题是：
  PackageKit 之所以会安装到系统里，
  往往因为它是发行版 meta 软件包的间接依赖。
  删掉前者也会导致后者依赖不全，
  从而被删。

* 当然，即使不删除掉这个可能无用的软件，
  也可以想办法停用它。
  只要尝试读一下 [D-Bus 的文档][dbus-docs]就能找到办法。
  或者，呃，用 Google 去搜索 Stack Overflow 上的代码示例。

[dbus-docs]: https://dbus.freedesktop.org/doc/dbus-daemon.1.html

## 结语

我开始觉得，
自己这样去探求无用的知识，
只是出于 [FOMO] 的心理。
或者也可能是，
去了解更多软件的运作方式，
已经成了我不那么健康也没有实用价值的业余爱好。
谁知道呢。

[FOMO]: https://en.wikipedia.org/wiki/Fear_of_missing_out



