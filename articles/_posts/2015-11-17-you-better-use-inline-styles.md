---
layout: article
category: articles
title: You Better Use Inline Styles, If You Know What’s Good For You
published: true
timestamp: true
---

I write styles for a lot of different projects. Sometimes I use inline styling with [Radium](http://projects.formidablelabs.com/radium/). Sometimes I use [CSS Modules](https://github.com/css-modules). For most client projects I recommend [Sass](http://sass-lang.com/). Every once in a while I use plain old CSS.

There are a lot of good reasons to use any of these tools. There is no silver bullet, no “right choice.” Some projects will benefit from a specific toolset. Some teams will be more comfortable or more productive with one approach or another. When I see articles saying “please don’t use inline styles,” I think to myself: *\*fart noises\**. When I see articles saying “CSS is dead, use inline styles,” I think to myself: *\*fart noises\**.

There’s a secret about inline styles, and it goes like this: the biggest benefits are doable with plain old CSS. I’m talking specifically about specificity equalization and scoping, which I consider to be the best features. With diligence, you can ensure that most of your styles are applied with equal specificity by using class selectors whenever possible. You can avoid naming collisions by carefully managing class names, maybe with a pattern like [BEM](https://en.bem.info/).

Inline styling introduces a constraint that enforces this style of authorship: no more selectors. That’s the key difference, really. Using CSS for the same result requires diligence, and inline styling changes the toolset so that it’s the only option. In my experience, solutions requiring diligence are more difficult at scale and break down more quickly than those that are enforced through tooling constraints. CSS Modules provides a nice middle ground by enforcing unique class names through build-level tooling. The actual result is effectively the same no matter which path you take.

The other major benefit of inline styling is computed styles. This is a neat trick, and one that most applications probably don’t need. They’ve gotten along this far without it, after all. Nontrivial computed styles are impossible with CSS, and I don’t expect that to change. That’s not to say that computed styles aren’t useful. The team at [Formidable](http://formidable.com) is doing great work with them in [Victory](https://github.com/formidablelabs/victory), a new React data visualization library. Data visualization is an excellent use case for the technique. I expect that novel and interesting approaches to user interface design based on computed styling will emerge over time. [The Grid](https://thegrid.io/) is a promising early example.

## Just Tell Me What To Do

The styling mechanism you should choose will probably depend on your project and your team. If you’re writing a React application, don’t want to deal with specificity or scoping, and don’t need server-rendered media queries[^1], or if you want to do a lot of style computation, inline styles are a good option. Maybe try a library like [Radium](http://projects.formidablelabs.com/radium/) or [react-style](https://github.com/js-next/react-style) to help with some of the pain points. If you want some similar benefits but don’t want to abandon CSS, try [CSS Modules](https://github.com/css-modules). The tooling there is only viable for [Webpack](http://webpack.github.io/) and [Browserify](http://browserify.org/) projects so far (I think), but the technique revolves around a [specification](https://github.com/css-modules/icss) rather than a particular tool, so support for other languages and ecosystems is coming. If you don’t mind the global nature of CSS (or like it, even!), use your favorite preprocessor. If you want scoped styles on a standards track, check out web component styling through the [Shadow DOM](https://philipwalton.github.io/talks/2015-10-26/). There are options, is that I’m saying.

My advice? Pick the tools that will make you happy and productive. Don’t be precious about your decisions&mdash; rethink them when things change. Mentally replace all hype and FUD with fart noises. Don’t let anybody tell you what to do.

[^1]: I’ve been saying this for a long time, but support for server-rendered media queries is coming to Radium. The effort to build them is underway by the whip-smart and dedicated current maintainer of the library, [Ian Obermiller](http://ianobermiller.com/).
