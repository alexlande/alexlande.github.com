---
layout: article
category: articles
title: CSS Font Sizing Blues
published: true
timestamp: true
---

I still don’t know how I feel about rems, ems, and pixels. The prevailing wisdom for some time has been that you should never use pixels to size fonts in CSS. Some of the reasons for this practice are more clear to me than others.

It used to be a best practice to always use em values because browser font resizing didn’t work with pixel values, and visually impaired users might need to resize text to use your websites. This made good sense to me. Over time, browser font sizing options crept deeper and deeper into power user territory, and browser zooming became the preferred way for users with visual impairments to enlarge content on the web. With this change, font sizing with pixels became a little more widely accepted.

There are some nice benefits to pixel font sizing. Using absolute units means that your styles will be consistent everywhere, with no need to worry about managing (or avoiding) cascading font sizing through ems. It’s also, frankly, just plain easier to work with. There’s no math involved, it’s always clear what size things should be, and designers and developers can speak the same language. I advocated for pixel-based font sizing on a lot of projects that I worked on, with great success. There were no issues that I could see, and it was one less thing for everyone on the team to worry about.

With the advent of responsive design, and later the first browser implementations of the rem unit, things began to change. For reasons that remain unclear to me, it became the prevailing wisdom that relative font sizing and responsive design were inexorably linked. I once saw a speaker at a conference talk about how sad it made them to see websites use pixels for font sizing, because such websites could “never be responsive.” I found this idea puzzling, because I had built a great number of responsive sites using pixels for font sizing, and everything seemed fine. I couldn’t figure out what I was missing.

## Are Relative Units Responsive, or What?

There were a few reasons for the “responsive must be relative” belief that I often heard. The biggest one was sort of philosophical. The idea was that responsive design is all about fluidity, adapting to the current device or browsing conditions. Relative units, by virtue of being relative, were more fluid than absolute units, and thus were more responsive. I understood the appeal, but without seeing concrete benefits in a responsive design the concept didn’t move me much.

The next reason was sort of an extension of the first. Using relative units, we could change the global font size, or the size of various page portions, with media queries. This meant that you could make the page’s font sizing adapt to the device. Maybe on mobile your base size would be `14px` instead of `16px`. Responsive! Chris Coyier made an excellent [demo](https://css-tricks.com/rems-ems/) of this technique at [CSS Tricks](https://css-tricks.com/). This made a lot of sense to me, but I had a problem: I rarely found cases where I actually wanted to resize all font sizes in a given section of a page, and I have literally never done it for a global font size. This is the definition of anecdotal evidence, but it was hard for me to convince myself that the added complexity of relative units was worth it for a behavior that I rarely used.

A third often cited reason was for use with [em-based media queries](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/). This practice had some nice benefits in that your media queries, font sizes, and zoom level were in sync, meaning that if you were to zoom in to the page, your media queries would activate as if the browser had resized. This was great for a couple of years, but then devices changed and it was no longer necessary. You could get the same behavior with good old fashioned pixels.

## What About Rems?

Font sizing with rems felt like a good general solution, given that it removed the cascading size difficulties inherent with ems, but outside of the font resizing use case, I still couldn’t see many benefits over pixels. This felt especially weird because I always had to add a pixel value as a fallback anyway. What was the point? How were these things really different from pixels if I wasn’t going to change the base size? It felt like a level of indirection that I didn’t really understand. Part of me thought that rems were just pixels for people who didn’t want to admit they were using pixels.

I’ve come around recently, and now prefer to use rems with a fallback, preferably automated by converting [rems to pixels](https://github.com/robwierzbowski/node-pixrem) or [vice versa](https://github.com/cuth/postcss-pxtorem) with a tool like [PostCSS](https://github.com/postcss/postcss). The main reason I like rems, oddly enough, is for the same reason that I originally used ems. It turns out that browser font resizing has come back in style. Mobile browsers, Chrome especially, are starting to expose easily accessible controls for resizing text as an accessibility consideration. I still don’t know if there are other good reasons to strictly adhere to relative units, but for now this pragmatic accessibility benefit is good enough for me.

## So Should I Use Rems For Everything?

The most valuable insight that I’ve gained from this flux of best practices is that there are a lot of valid reasons to choose any given sizing unit. It’s a good idea to use relative units for most text so that users can resize it, so I try to use rems most of the time. If I have a case where element sizes should be relative to the current text size, then I reach for ems. That could be for sizing heading element text in an article, or for setting `padding` and `border-radius` on a button that should scale proportionally. If I really want something to always be a static size, pixels are the way to go. It would be comforting to have a rule like “use pixels for everything," but the truth is that the right unit to use is going to depend on a whole lot of things, and you’re probably best served mixing and matching. This doesn’t just apply to font sizing, either. There are a lot of good reasons to use relative units for layouts, or for particular component styles, or for pretty much anything.

I don’t know if there’s much of a moral to this story, except that I think it’s important to reevaluate your ideas every once in a while, even the minor ones like which units to size your text with. It’s easy to find yourself engrained in a position without even knowing why. It’s even easier for slightly out of date ideas to continue to influence people-- this field changes rapidly, and it’s easy to miss things. I’m going to start thinking more about why I do things the way that I do. Who knows, maybe there’s a better way?
