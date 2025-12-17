import pluginWebc from "@11ty/eleventy-plugin-webc"
import { feedPlugin } from "@11ty/eleventy-plugin-rss"
import footnote from 'markdown-it-footnote'

export default function(c) {
  const site = {
    name: "Random Bugs",
    desc: "A blog by @5long",
    base: "https://5long.github.io",
  }

  c.addPlugin(pluginWebc)
  c.addGlobalData("RB.siteName", site.name)
  c.addGlobalData("RB.desc", site.desc)

  c.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "atom.xml",
    collection: {
      name: "post",
      limit: 0,
    },
    base: site.base,
    author: {
      name: "Whyme Lyu",
      email: "callme5long@gmail.com",
    },
  })

  c.amendLibrary("md", (mdLib) => mdLib.use(footnote))
}
