---
layout: article
category: articles
title: Abandoning Global Heading Styles
published: true
timestamp: true
---

One of the first things I do in new projects is set up global heading styles. These CSS rules define what the site’s `h1`&ndash;`h6` elements look like when they’re used on their own&mdash; defaults to be overridden as necessary. Typically, this will involve setting font sizes, weights, margins, and maybe a `font-family` or two. Something like this:

```css
h1 {
  font-size: 2rem;
  font-weight: 700;
}

h2 {
  font-size: 1.5rem;
  font-weight: 400;
  text-transform: uppercase;
}

/* etc */
```

This seems like a good idea, but it ignores a fundamental aspect of heading elements. They aren’t meant to fit your design system, but to define the document outline of your webpages. Any alignment between the two is a happy accident.

## Document Outlines are a Thing

The HTML document outline as it’s currently implemented is a mapping of the structure of a webpage based on heading elements. It’s used by assistive technology like screen readers, and is read by search engine crawlers. The document outline for this page looks like this:

```
h1: Abandoning Global Heading Styles
  h2: Document Outlines are a Thing
  h2: Classes to the Rescue
  h2: Heading Classes Only
```

A well formed document outline starts with an `h1` with the title of the page, followed by any other heading levels. The key to building a document outline is that it should never skip heading levels: an `h3` should never follow an `h1` unless there’s an `h2` between them. Your outline can go as deep as `h6`, but it needs to have the previous five heading levels first. The [Firefox Web Developer Toolbar extension](https://addons.mozilla.org/en-us/firefox/addon/web-developer/) includes a great tool to see the outline of pages that you’re working on.

This is where setting global heading styles alone can fall short. On a blog or small publication, the outline of a given page might match up with your intended visual styles, but on complex sites that’s often not the case.

## Classes to the Rescue

A good and common approach to deal with this issue is to add class selectors to your global heading rules, like this:

```css
h1,
.h1 {
  font-size: 2rem;
  font-weight: 700;
}

h2,
.h2 {
  font-size: 1.5rem;
  font-weight: 400;
  text-transform: uppercase;
}

/* etc */
```

With this approach, you can set heading elements to be styled as if they were different levels with a class like `.h2` any time your document outline and intended styling don’t line up. You can see this pattern in use in CSS frameworks like [Bootstrap](https://github.com/twbs/bootstrap/blob/master/less/type.less#L47-L52). This technique has served me pretty well in the past&hellip; mostly.

## Heading Classes Only

The trouble that I’ve found with the global heading styles with classes approach is that it’s still easier to have an incorrect document outline than to do the right thing. You have the ability to set appropriate heading levels and style them the way that you want, but it’s not particularly obvious when you need to. It can be unclear how the classes are meant to be used (“Do I have to use the `.h1` class on `h1` elements? Are the classes meant for use on non-heading elements?”) and it’s easy to use the global defaults without noticing that your outline is wrong.

One answer for this is to add tooling like automated accessibility audits that will report when your outline is invalid. Another, which I’ve been a fan of lately, is to reset global heading styles and only use classes to style headings, like this:

```css
h1, h2, h3, h4, h5, h6 {
  font-size: 1em;
  font-weight: 400;
}

.h1 {
  font-size: 2rem;
  font-weight: 700;
}

.h2 {
  font-size: 1.5rem;
  font-weight: 400;
  text-transform: uppercase;
}

/* etc */
```

This technique encourages you to be mindful and think about the document outline by making it harder to default to the wrong heading level. Small things like this can have a big impact, and help encourage everyone on a team to think about accessibility as they work.
