---
layout: post
title: Fiddling with Vim Quickfix
---

Most programmer should be familiar with the edit-compile-run cycle. Turns
out that Vim has this feature called [quickfix] just to speedup this cycle.
Lately I've been fiddling with it and kinda established my unit testing
workflow around it with the help of a few Vim plugins. Guess it's worth
blogging about it somehow.

## Big Picture

Essentially this is how you use Vim's quickfix feature:

* Set a compiler for the buffer you're working on
* Run `:make` command, which runs the compiler you just set
* Inspect error messages

Lemme go into details of each steps.

## Compiler

A Vim compiler is essentially 2 configurations bundled together in
a `$VIMRUNTIME/compiler/<name>.vim` file:

* `makeprg` - What command should run.
* `errorformat` - How to parse the command's output.

A compiler could be an actual compiler like `gcc`, an interpreter like
`ruby`, or even a unit test runner like `rspec`.[^syntastic] As long as the
output of the program is parse-able (or even not), you can integrate it as
a Vim compiler.

Here's how I define [a compiler for minitest][mt]:

{% highlight vim %}
" ~/.vim/compiler/minitest.vim
if exists("current_compiler")
  finish
endif
let current_compiler = "minitest"

CompilerSet makeprg=RUBYLIB=lib:test\ ruby\ -rminitest/autorun

" Magic ahead
CompilerSet errorformat=
      \%W\ %\\+%\\d%\\+)\ Failure:,
      \%C%m\ [%f:%l]:,
      \%E\ %\\+%\\d%\\+)\ Error:,
      \%C%m:,
      \%+Z%.%#,
      \\ \ \ \ %f:%l:%m,
      \%-G%.%#
{% endhighlight %}

The `makeprg` option should be self-explaining. Meanwhile, if you can't
figure out what the 'errorformat' means, just think it as "a pattern
language for parsing text, but a lot crazier than Regex".

With this file in place, you can run `:compiler minitest` to use this
compiler for the current buffer.

A typical Vim distribution ships 50+ compilers. You can roll your own if
you're seriously dedicated to learn how to compose a working `errorformat`.

## Running Compiler

The `:make` command is how you launch a compiler program you previously
set. Any command arguments for `:make` would be passed through to the
compiler program. You probably would need to pass the file name of current
buffer as an argument via `:make %`. Take the minitest compiler above as an
example, without a filename argument, it won't work at all since it
won't know which test file to run.

## Viewing Error Messages

Chances are you'll get an error or two after running the command. Vim will
parse the command output by `errorformat`, extracting a list of error
entries called "quickfix errors". Each entry could contain
a file-line-column position for you to jump to. You can open a quickfix
window viewing all of the quickfix errors by running the `:cwindow`
command.

Also, Vim gives you commands like `:cnext` and `:cprevious` for jumping
through quickfix error positions. But I'm only using key bindings `]q` and
`[q` provided by plugin [unimpaired].

## A Few More Tips

Now that you got a rough impression of quickfix, here are a few more tips to
make the whole thing goes smoothly if you've decided to give it a try:

### Set compiler automatically

Instead of typing `:compiler minitest` every single time you open a file,
you can set compiler automatically:

{% highlight vim %}
" ~/.vim/ftplugin/ruby.vim
compiler minitest
{% endhighlight %}

If you prefer to put everything in a single `.vimrc` instead of maintaining
lots of ftplugin files, there's a handy autocmd event for you:

{% highlight vim %}
" ~/.vimrc
autocmd FileType ruby compiler minitest
{% endhighlight %}

That should work well, too.

### A Red / Green Bar

I'm using a plugin called [MakeGreen], which provides a `:MakeGreen`
command. It is basically "`:make` with a red / green bar". Disclosure:
I wrote documentation for it.

### Open Quickfix Window Automatically

Just hook `:cwindow` command into the autocmd event:

{% highlight vim %}
" ~/.vimrc
autocmd QuickFixCmdPost make belowright cwindow
{% endhighlight %}

Now you've got a IDE-like stack trace dialog in your Vim without installing
any fancy plugin at all.

### Handle `%` Expansion When Switching Buffer

The `%` character in Vim command always expands to the current buffer's
filename. This might be annoying when you're running unit test while fixing
the implementation. Besides, manually expanding `%` is too much work in
a tight workflow loop like TDD. I've made myself a plugin called [ragain]
just to solve this problem. Now I can start a TDD session by `,T` and run
the same test by `,r`, even when the current buffer is not the test file
I'm working on. See [my vimrc][leader-t] for how to configure ragain like
this.

## That's It

Read more about quickfix in `:h quickfix` to strengthen your feedback loop
even more. You will thank me later.

P.S. Given how much I'm obsessed with tweaking [Vim configuration], posts
about Vim on my blog is surprisingly few. Definitely should fix this.

[Vim configuration]: http://github.com/5long/dotfiles
[quickfix]: http://vimdoc.sourceforge.net/htmldoc/quickfix.html#quickfix.txt
[mt]: https://github.com/5long/dotfiles/blob/master/vim/compiler/minitest.vim
[syntastic]: https://github.com/scrooloose/syntastic
[MakeGreen]: https://github.com/reinh/vim-makegreen
[unimpaired]: https://github.com/tpope/vim-unimpaired
[ragain]: https://github.com/5long/ragain
[leader-t]: https://github.com/5long/dotfiles/blob/42d81b64f0340cc9dcb112b5be93296e638a208c/vimrc#L163-L166

[^syntastic]: I didn't mention static analyzer since there's a dedicated Vim plugin called [syntastic], which runs on Vim's quickfix infrastructure as well.
