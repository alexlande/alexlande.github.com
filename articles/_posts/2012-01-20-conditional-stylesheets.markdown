---
layout: article
category: articles
title: Conditional Stylesheets Revisited
published: true
timestamp: true
---

If you're writing CSS in 2012, there's a good chance that you've tried pre-processing through Sass or LESS. [Nicolas Gallagher](http://nicolasgallagher.com/) recently described a Sass technique for mobile first development that allows you to easily deliver large screen styles to outdated browsers. After experimenting with the technique, I've found some ways to push it even further.

## Pre-processing to the Rescue

[Nicolas' technique](http://nicolasgallagher.com/mobile-first-css-sass-and-ie/) uses Sass imports to create a media query-laden style sheet for capable browsers and an IE-specific style sheet that delivers the same styles in a conditional comment.

It feels sort of odd to use an IE style sheet in a world of [conditional classes](http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/), but if we're going to we might as well make the most of it. Even if you aren't much of a pre-processor, you've likely realized that modularizing your CSS in this way doesn't have to stop with media queries. Since we're already creating an IE-specific style sheet, we might as well import our IE-specific styles (written with the aforementioned conditional classes) into that file and leave them out of the other, like so:

```scss
@import "480.scss";
@import "768.scss";
@import "992.scss";
@import "ie.scss";
```

Easy as that, your main styles are free of <code>.ie7</code> and <code>.oldie</code>. Feels good, right?

## html5shiv Optimizations

One of the little-discussed benefits of media query polyfills like [Respond.js](https://github.com/scottjehl/Respond) is that they make excellent companions to html5shiv. If you're using both, and a user visits your site on a legacy browser without JavaScript, they'll only receive your base styles. If you've planned for this, that means they'll see a functional but basic page, one that isn't crippled by the lack of styled HTML5 elements and media queried layout.

The same thing is possible with the Sass importing method. It's easiest if you're using [Modernizr](https://github.com/Modernizr/Modernizr), which has both html5shiv and a conditional loader called yepnope built in. Using yepnope, we can ensure that the legacy style sheet only loads when html5shiv is in use:

```html
<!--[if (lt IE 9) & (!IEMobile)]>
  <script>yepnope('/css/legacy.css')</script>
<![endif]-->
```

You can toss a script like [Selectivizr](https://github.com/keithclark/selectivizr) in at the same time, if you're so inclined.

## Be Not Afraid

Although I've been talking about Sass here, this style of modular CSS isn't dependent on it. It [works with LESS](https://gist.github.com/1407227), with a build script a la HTML5 Boilerplate, and if you're really masochistic you could do it by hand with copy and paste. (Don't do that.)

If your design is fully responsive and is built on a fluid grid, IE users will still enjoy an experience that meets them halfway.

My only concern is that the technique is IE specific. In the last week, multiple people have visited this site using Firefox 3. That's pretty strange, but it's worth noting that there are still people using legacy browsers other than IE. As always, take a look at your statistics before you do anything rash.
