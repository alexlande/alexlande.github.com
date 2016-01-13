---
layout: article
category: articles
title: The Mouse is an Enhancement
published: true
timestamp: true
---

There is likely no more common symbol of personal computing (and the web, as an extension) than the mouse. This clever tool is an intuitive, accessible harness for the power of the computer. Most people would be completely lost trying to navigate the web without it. If you’re one of those people, it’s easy to overlook the large numbers of people who use the web without a mouse. It’s time that we start prioritizing these too-often ignored users.

Due to its ubiquity, we’ve become quite good at building mouse-friendly user interfaces. Hover states, dropdown menus, and click handlers are second nature to any web worker. This is a good thing, but it leaves us with some catching up to do for other input types. I propose that we start treating the mouse as an enhancement to web experiences rather than assuming it will be available by default. Realistically, the mouse is an optional peripheral used in desktop computers. Among that group, it’s used by people who don’t have disabilities or injuries affecting the hands and wrists. For everyone else, it’s not available. We should support these use cases first before we bother with the well-understood and well-covered mouse.

## Touch

If current trends continue, the majority of web browsing will soon occur on touch devices like phones and tablets. Outside of certain tablet/laptop hybrids, these devices don’t allow for mouse usage.

This territory has been well traveled thanks to the explosion in popularity of the mobile web. Touch screens have a lot in common with mice (particularly the ability to click or tap anywhere on the screen at will), which makes supporting touch inputs relatively easy, at least for basic use cases. The most common considerations are not hiding content behind hover states and using device-appropriate event listeners. If you’re building your website mobile-first, you’re well on your way to treating the mouse as an enhancement.

## Keyboard

Many desktop users have a mouse but are unable to effectively use it due to motor control disabilities, repetitive strain injuries, and other conditions of the hands and wrists. Other users are visually impaired and use a screen reader to browse the web. These users navigate the web with the keyboard, perhaps the most often overlooked mode of web interaction.

At the most basic level, all content in a site should be navigable with a keyboard. Making a website keyboard navigable is fairly straightforward. Use real links, buttons, and form elements rather than non-interactive HTML elements for UI controls, so that you can reach them by pressing the tab key. Use `tabindex` [when appropriate](http://www.alexlande.com/articles/cross-browser-tabindex-woes/) to adjust tab behavior beyond browser defaults. Avoid focus traps that a keyboard user can enter but not exit so that they don’t get stuck while trying to move through the page. It’s also a good idea to make your tab order as logical as possible, so that users have a good idea of where their next keypress will take them. Visually moving elements so that they don’t follow their logical DOM order can be confusing when you try to tab through them.

Nearly as important as making content navigable is making that navigation perceivable. If a user can reach content with a keyboard but can’t see which element they have selected, the navigation is useless. The key to perceivable keyboard navigation is providing clear focus states. Focus states are often ignored, tacked on to the end of a project, or worse, removed entirely. Instead of haphazardly throwing focus styles together, we should treat these states as an important part of the interface, and design with them in mind from the beginning. A focus state is the user’s only indication that they have a given element selected, so they must be clear. Hover states, in comparison, can be more subtle, and are arguably less important, because the user can see where the mouse is. If we make focus states a priority early and build interfaces with them in mind, we can easily handle hover styling later.

## No-Mouse-First?

I hate to suggest another "-first” development ideology, so instead I’ll say that we should work “mouse-last.” By focusing on touch and keyboard support early, we can ensure that these experiences aren’t overlooked and receive the attention that they deserve.
