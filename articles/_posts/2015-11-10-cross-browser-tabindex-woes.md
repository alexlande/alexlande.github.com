---
layout: article
category: articles
title: Cross-Browser Tabindex Woes
published: true
timestamp: true
---

The HTML [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.tabIndex) attribute is a useful tool for accessibility when used properly. Unfortunately for a11y-minded developers, most browsers don’t handle the attribute consistently. This can be challenging to deal with.

## Tabindex basics

`tabindex` is an HTML attribute that allows you manipulate the tab order of elements. By default, pressing the Tab key on a web page will set browser focus on interactive page elements in the order that they appear in the document. Once focused, you can use the keyboard to interact with elements&mdash;activating a link, submitting a button, or entering information into an input.

### Making elements focusable

Applying `tabindex="0"` to an element makes it keyboard focusable, whether it is an interactive HTML element or not. This can be useful for building custom form controls or application components. but can also be a potential accessibility hazard if these elements don’t have correct WAI-ARIA attributes to make their usage clear to people with screen readers.

### Sequential tabindex

`tabindex` values greater than 0 set elements to particular positions in the page’s tab order. `tabindex="1"` will make an element the first item to gain focus when tabbing through the page, followed by any higher numbered tab indices, followed by any other keyboard focusable elements (including those with `tabindex="0"`). If multiple elements have the same `tabindex`, those items will be ordered relative to each other. Any items with `tabindex="1"` will be first in the order that they appear in the document, followed by items with `tabindex="2"`, and so on.

This behavior is extremely powerful, but in practice isn’t as useful as you might think. It can be difficult to manage sequential tab indices on a large or dynamic page and ensure that everything stays in the order you want, and setting a custom tab order can make it difficult for keyboard users to move around your page, as their browser focus may not go where they expect.

### Removing elements from tab order

The last type of valid value for `tabindex` is negative values. Adding `tabindex="-1"` to an element removes it from the document’s tab order completely, preventing keyboard users from focusing on it. This is pretty dangerous and is usually not a good idea unless you have a good reason. An element shouldn’t have tab behavior disabled if users can interact with it.

## Good thing all browsers handle tabindex the same way

In building keyboard accessible interfaces, I’ve found that setting `tabindex="0"` on an element doesn’t always get the job done. After a few frustrating experiences trying to figure out why `tabindex` doesn’t always work the way you might expect, I put together a test suite to figure out what was going on.

My test document is a table with examples of the primary types of elements that `tabindex` is valid on, as well as a few that it is not valid on (according to the specification), with various values set. The behavior for various elements varied considerably between browsers and operating systems.

### Test details

According to the HTML specification, `tabindex` is a valid attribute on the following elements:

- `a`
- `area`
- `button`
- `input`
- `object`
- `select`
- `textarea`

Because I love and respect myself, I did not test `area` or `object`. I did, however, add examples of each of the other elements, including three types of inputs, as well as `div` and `span`. You can try the test suite out [here](http://jsbin.com/pucila).

### So what happens?

Some browsers respect `tabindex` all of the time. Others respect it for certain elements, or with certain modifier keys held down while tabbing, or with certain system preferences enabled on your computer, or for certain elements under certain conditions. Cool, right? To be fair, this situation has actually improved quite a bit since I looked at this last. Safari (as of OS X El Capitan) has shown the most improvement, going from being incomprehensible to making sense as long as you know the rules.

The good news first. Chrome, Opera, and Internet Explorer all accept their new tab orders with open arms. All interactive elements and elements with a non-negative `tabindex` can be accessed by tabbing through the document. With the exception of radio buttons. We’ll come back to that later.

Firefox works similarly, with the exception that on OS X `a` elements aren’t tab-accessible by default, with or without `tabindex`. You can access `a` elements with the keyboard in Firefox two ways. You can hold down the option key while pressing tab, or you can change your system preferences. Firefox respects an option called “Full Keyboard Access” in your keyboard preferences, which controls which types of controls can be accessed with tab on your computer. If you toggle that option to “All Controls”, Firefox will focus on links like nobody’s business.

Safari is where things get weird. In Safari, text `input` elements, `textarea`, `select`, `div`, and `span` respect `tabindex` by default, but buttons and radio and option inputs aren’t tab-accessible. If the user sets “Full Keyboard Access” to “All Controls” in their preferences or uses `option + tab`, all elements will work as expected, same as Firefox.

### The radio thing

Radio input support for `tabindex` is… quirky. As a general rule, once a radio input in a group is selected, only the selected input is tab-accessible. From there, you can use the arrow keys to activate different inputs in the group. If no radio inputs in a group are selected, behavior varies between browsers.

In Chrome and Opera, the first radio input you attempt to tab to in a group is tabbable by default, meaning the first input in the group if you’re tabbing forward, and the last one in the group if you’re tabbing backward. All inputs with sequential `tabindex` values are tab-accessible too, but setting `tabindex="0"` won’t do anything at all.

Firefox behaves similarly, except that `tabindex="0"` works as expected.

Safari behaves the same way as Chrome and Opera, except that you need to use `option + tab` or set your preferences to access all controls by default to reach radio inputs.

Internet Explorer handles radio inputs in the same way as Chrome and Opera, except for some strange behavior with negative `tabindex` values in IE8 and IE9. In those browsers, if a radio button is selected and has a negative `tabindex`, it will still be tabbable. No other browsers behave this way.

## Take It Away

The browser differences in default tabbing behavior, like depending on particular system preferences or keyboard modifiers, are annoying for developers unfamiliar with them, but shouldn’t be too big of a deal for your users in general. Hopefully, they’re familiar with their browser of choice by virtue of using it regularly, so they know how to reach various UI controls with their keyboards.

Differences in `tabindex` support are a little more difficult to deal with, particularly when building custom UI controls. As a general rule, it’s probably a good idea to try to match the tabbing behavior of your component to the type of native element that it most closely resembles. For example, if you’re building a custom `select` element replacement, you might be best served by using a `div` with `tabindex="0"`, which will behave the same way as a normal `select` element in the tab order.

If you need to work with sequential `tabindex` values, first&mdash; try not to. If you absolutely have to, be aware that particular types of elements like `a`, `button`, and non-text `input` may not fit in the tab order the way that you expect them to, depending on the browser.

When in doubt, non-interactive elements like `div` and `span` have more consistent support for `tabindex` than interactive ones like `a` and `button`, despite the fact that the attribute is technically not valid when used with them according to the specification. If an element absolutely needs to be in the document’s tab order cross-browser without requiring specific system preferences or keyboard modifiers, `div` might be your best choice. Just be sure to add appropriate ARIA attributes and keyboard event handlers so that users can tell what the element is and interact with it when they get to it.
