---
layout: article
category: articles
title: "Anchors, Buttons, and Accessibility"
published: true
timestamp: true
isCrosspost: true
crosspostTitle: the Formidable Labs Blog
crosspostUrl: http://formidablelabs.com/blog/2014/05/08/anchors-buttons-and-accessibility/
---

Accessibility is a foundational feature of the web. It is a direct reflection of a key tenet of the platform: the free and universal sharing of knowledge, unfettered by language, location, or disability. This is why it's disappointing that accessibility is so often (and so easily) overlooked.

To build an accessible website or application, it's best to start with the foundations: semantic markup. Using the correct markup is an easy win as it does the vast majority of the accessibility work for you. As rich client-side JavaScript applications have grown in popularity, a particular markup misuse has become common: `<a href="#">`.

## What's wrong with `href="#"`?

If you're not familiar with this pattern, take a look at the source of your favorite web app, and weep. There are some other similar examples like `<a>`, `<a href="">`, and `<a onclick="return false;">`.

HTML anchor elements in this form don't do what anchors do: act as a link. (While anchors *can* act as placeholder links or target link destinations, these uses are much less common.) These links are actually working as user interface controls&mdash; clicking on them affects the UI in some way, rather than taking the user to a destination.

The thing is, we *already have* an HTML element specifically meant for controlling a user interface: `<button>`. The distinction isn't just semantic. `<button>` and `<a>` respond to different keyboard events, and screen readers treat them differently.

By using an `<a>`, we tell screen readers that the standard behavior should apply. Pressing the `enter` key should navigate to the URL of the link. Visually disabled users shouldn't have to deal with confusing interactions just because sighted users can't tell the difference.

## So I should use a `<button>`?

The non-meaningful `href` anti-pattern most likely comes up as often as it does because the  UI element **looks** like a link, not a button. Fortunately, HTML elements are designed to describe semantics and behavior, not appearance. Making a button look like a link is pretty straightforward with a bit of CSS:

```css
.link {
  margin: 0;
  padding: 0;
  border: 0;

  background: transparent;
  font-size: inherit;
}
```

There are some edge cases that these styles don't cover, but for most basic usage that's all that you need. You can then add other styles as you'd like to fit your design needs.

In this way, we use `<button>` as it was meant to be used and save `<a>` for things that navigate the user to a new page or page fragment. From there, you can use JavaScript to enhance the experience of clicking a link by displaying partial content, opening a panel or modal corresponding to the link, or whatever else you can imagine.

As an added benefit, users who prefer to open links in a new tab or window will be able to use your controls without accidentally opening a tab pointing to the current page plus `#`. Command- or shift-clicking on a `<button>` will control the UI of the page you're on, rather than trying to open a non-existent URL.

Spotting a link that should be a button is easy. Just look for an anchor that doesn't have a meaningful `href`.

## An Aside on ARIA

For people who really want to stick with `<a>`, the ARIA [`role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role) attribute looks like an attractive option. If you add the attribute, the element is pretty much a button, right?

Unfortunately, using an ARIA role will get you part of the way there, but it isn't a complete solution. While screen readers will interpret the link as a button, the element still responds to keyboard input as if it were a link. Pressing the `enter` key will fire a `click` event on the button, but pressing `space` as you would expect for a button will do nothing. Confusing! If you go this route, you'll need to write custom JavaScript event handlers to listen for the `space` key and react appropriately.

If you use a `<button>`, it just works.

## Push some buttons

An argument can be made that this is a UX design issue. If something is a button, it should look like a button instead of a link. Given the shifting definitions of what exactly a button [looks like](https://www.apple.com/ios/design/) (for better or worse), it is not always going to be that simple.

The good news is that it's not difficult to provide the correct user experience to all users. Using elements as they're intended will give visually disabled users the context they need to understand your content, allow keyboard users to control the page in a consistent way, and prevent all users from making frustrating mistakes attempting to open false links.

The web is for **everyone**&mdash; let's make it accessible.

## Recommended Reading

- [The little button that could](http://www.karlgroves.com/2014/05/02/the-little-button-that-could/) - Karl Groves
- [When To Use The Button Element](http://css-tricks.com/use-button-element/) - CSS Tricks
- [You can't create a button](http://www.nczonline.net/blog/2013/01/29/you-cant-create-a-button/) - NCZOnline
- [`<a>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) - Mozilla Developer Network
- [`<button>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) - Mozilla Developer Network
- [Using the button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role) - Mozilla Developer Network
