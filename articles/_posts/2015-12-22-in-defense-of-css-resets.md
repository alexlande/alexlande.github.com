---
layout: article
category: articles
title: In Defense of CSS Resets
published: true
timestamp: true
---

I love [normalize.css](https://necolas.github.io/normalize.css/). The moment that I learned about it, I tossed traditional CSS resets aside with glee, convinced that it was vastly superior. Now, I’m not so sure.

## History Lesson

In the beginning, browsers had a lot of opinions on how elements should be styled by default, and they rarely shared them with each other. Font sizes, margins, line heights, and more had different baselines depending on the browser. This made it relatively common to build a site in one browser and find that it looked quite different in another because you inadvertently depended on some default styles that only the first browser provided.

In response to this challenge, crafty web developers created CSS resets. These stylesheets struck deep at the tyranny of cross-browser compatibility by erasing browser defaults wherever they could. The reset was a blank slate for styling, with default margins, padding, font sizes, and more removed. With default styles out of the way, you could build your site as you saw fit. The most popular of these by far was and remains [Eric Meyer’s CSS Reset](http://meyerweb.com/eric/tools/css/reset/), a classic of the genre.

After years of productive reset usage, a challenger entered the fray in the form of normalize.css. Normalize took a different tack than traditional resets: what if, instead of destroying default styles, you normalized them across browsers so that you started with a consistent slate rather than a blank one? This idea was very appealing, and caught on quickly. How wasteful, to throw away all of our default styles with a reset? Especially because you were probably going to add a lot of them back anyway.

## Targeted resets

As I mentioned before, I’ve used normalize happily for years. That said, I’ve often found cases where I wanted additional style resets on top of it:

### Buttons

I can’t remember a single time that I’ve actually wanted to use default button styles in a real project. Any time I style one, I have to remember to override both the border and background rules, and probably padding, all so that the charming browser defaults don’t shine through.

Beyond that, in most projects I find myself creating a class that styles buttons so that they look like links. This is helpful for building accessible interfaces, as UI elements often look like links but behave like buttons (that is, they don’t have an `href`, but are used for form submissions or JavaScript interactions). The alternative is a scourge of `<a href="#">` in your code base. I discussed this issue previously in [Anchors, Buttons, and Accessibility](http://www.alexlande.com/articles/anchors-buttons-and-accessibility/).

After repeating this process for the nth time, I realized that it makes a lot of sense to reset default button styles entirely from the start:

```css
button {
  background: transparent;
  border: 0;
  padding: 0;
}
```

With this targeted reset in place, there’s no need to account for borders and backgrounds every time you style a button, and there’s no need to use an additional class to make buttons look like anchors.

### Headings

As I wrote in [Abandoning Global Heading Styles](http://www.alexlande.com/articles/abandoning-global-heading-styles/), headings are an excellent candidate for a targeted reset. By resetting all of your heading elements to match your normal text and using classes to visually distinguish them, you can easily build a correct document outline without default styles getting in the way.

```css
h1, h2, h3, h4, h5, h6 {
  font-size: 1em;
  font-weight: 400;
}
```

### List Styles

List elements like `ul` and `ol` are common choices for marking up UI patterns like menus. Unless the site you’re working on has a large amount of a prose, there’s a good chance that you’ll have more lists that shouldn’t include default list indicators like bullets, or padding on the left, than the opposite.

Removing list styles globally and applying them when necessary can save you more code than you might expect. Try searching your code base to see how many `list-style: none` declarations are in there.

```css
ol, ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

### Opt-in Typography

A final targeted reset that I find myself using is typographic spacing. In many cases, when building an interface you won’t want margins on elements like `p` or `ul` to apply. I used to solve this problem by creating utility classes to remove margins and applying them liberally. I’ve found that by working in the opposite direction and only enabling margins when I want them, you can save a lot of code and effort.

This pairs extremely well with a technique like [single direction margins](http://csswizardry.com/2012/06/single-direction-margin-declarations/).

```css
@custom-selector :--type h1,h2,h3,h4,h5,h6,ul,ol,p,figure,pre,table,fieldset,hr;

:--type {
  margin: 0;
}

.Prose :--type {
  margin-bottom: 1.5rem;
}
```

The above example uses the [Custom Selectors](https://drafts.csswg.org/css-extensions/#custom-selector) CSS Extension specification syntax, which you can use today with the [PostCSS Custom Selectors](https://github.com/postcss/postcss-custom-selectors) plugin. You can get a similar effect in most preprocessors, or you can laboriously type out `.Prose h1, .Prose h2, etc…`.

## In Practice

If you’re itching to return to simpler times and use an old school reset again, make sure to take a look through normalize first. There are a lot of excellent fixes in there that you’re not going to want to lose, and it’s all well commented, so you’ll learn a thing or two while you’re at it.

If you want to stick with normalize but think that certain targeted resets like these ones might be helpful, I highly recommend [SUIT CSS’s base styles](https://github.com/suitcss/base), a slim stylesheet designed for use in addition to normalize that includes button, typographic margin, and list style resets, among some other niceties.
