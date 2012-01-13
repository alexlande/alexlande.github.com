---
layout: article
category: articles
title: Conditional Stylesheets Revisited
style: /css/articles/conditionalstylesheets.css
---
<h2 class="entry-title">{{ page.title }}</h2>

I firmly believe that the proper way to build a responsive design is mobile first. The approach makes sense from a design perspective, in that it allows you to easily focus on what really matters in your project. It makes sense for development too, but there are a few issues. One of the most glaring is the lack of media query support in a few prominent versions of a certain prominent browser.

IE has always been a problem, and versions prior to the fairly decent IE9 are a problem for responsive design too. If you were to build a website desktop-first, the fact that IE6-8 don't support media queries wouldn't be much of a problem. The issue arises when you design mobile-first, as those browsers are stuck by default with the small-screen version of the website. This is not ideal.

So far, I've solved this problem with [Respond.js](https://github.com/scottjehl/Respond), a lovely, lightweight polyfill that makes media queries work in those *other* browsers.

<pre>
<code>&lt;--[if lt IE 7]&gt; &lt;html class="no-js ie6 oldie" lang="en"&gt; &lt;![endif]--&gt;
&lt;!--[if IE 7]&gt;    &lt;html class="no-js ie7 oldie" lang="en"&gt; &lt;![endif]--&gt;
&lt;!--[if IE 8]&gt;    &lt;html class="no-js ie8 oldie" lang="en"&gt; &lt;![endif]--&gt;
&lt;!--[if gt IE 8]&gt;&lt;!--&gt; &lt;html class="no-js" lang="en"&gt; &lt;!--&lt;![endif]--&gt;</code>
</pre>