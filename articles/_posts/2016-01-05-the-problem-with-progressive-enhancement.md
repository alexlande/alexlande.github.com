---
layout: article
category: articles
title: The Problem with Progressive Enhancement
published: true
timestamp: true
---

I’ve built my fair share of websites without progressive enhancement. I’m not proud, nor am I ashamed. It’s just a fact.

Typically, this has meant that the site wasn’t functional without JavaScript, either because certain critical behavior depends on JS or the entire thing is a client-rendered <abbr title="Single Page Application">SPA</abbr>. On rare occasion, I’ve built sites this way because JS was critical for the application’s core functionality. This isn’t usually the case, because the vast majority of websites are places where you read and write text, and text works pretty well without rich client-side interactions. Most of the time, websites are built without progressive enhancement because the project has a deadline and a limited budget, and there aren’t enough users without JS to justify the cost.

I think it’s fair to not optimize for (or even support) users who disable JavaScript. JS is one of the three pillars of the front-end. Browsers have made it increasingly difficult to turn it off. By any measure, the number of users willfully disabling JS is low. That said, I think that “Do we want to support users without JS?” is the wrong question. Progressive enhancement has benefits that reach far beyond that user group.

## Performance

Progressively enhanced websites are often able to perform better on initial page load than their JS-required counterparts, because content is available as it loads, which in a well optimized site occurs before the JS loads. This is most obvious in comparison to client-rendered apps, which must download an often large bundle of JavaScript before the user can see any content. Traditional server-rendered sites can present their content immediately while JavaScript is still loading. JS application frameworks like React and Ember have made great strides in solving this problem over the past couple of years by allowing for relatively easy [universal rendering](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) in which the initial render occurs on the server followed by fast client-side renders when the user interacts with the app. This is an extremely powerful pattern.

Even among server-rendered or universal apps, waiting for JS to load before the page is interactive can have a negative impact on users, especially those with slow connection speeds. Progressively enhanced behaviors like using links that point to real URLs, or server-side form submission handling, allow users to perform important actions before JavaScript loads.

## Resilience

One of the biggest benefits of progressive enhancement is the ability to make an application more bulletproof. It’s uncommon for JS to be unavailable on a page, but it’s much more common for things to go wrong and for script execution to stop. <abbr title="Content Delivery Network">CDN</abbr>s crash, files 404, ads explode, and every once in a while some JavaScript that you yourself wrote will hit an edge case and throw, and the app will break for some unlucky user.

Progressive enhancement is a backup plan for when things go wrong. If users can perform critical tasks when your JS breaks, it’s a minor inconvenience instead of a show stopper. This is no different than any other process or tool we use to make our applications more reliable. For the same reason that we lint and test code, and perform QA with many devices and in adverse conditions, progressive enhancement can help make web apps robust.

## Business, Business, Business

I don’t think that progressive enhancement for the sake of it is a worthy goal. I often hear the process described in sentimental terms&mdash; fundamental to the web as an open, universal tool for the global distribution of knowledge. I love that idea, but I think that if you want to sell progressive enhancement in your organization you’ll be better off with cold hard facts.

Progressive enhancement is a tool that will help you build faster, tougher sites. It is an investment in the strength and quality of your application. It will make your users happy because the app will still work, if imperfectly. It might just save you when disaster strikes, and if you’re interested in building the best websites possible, you should give it some thought.
