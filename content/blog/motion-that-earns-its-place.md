---
title: Motion that earns its place
date: '2026-10-15'
description: Animation should explain what changed. If it only decorates, it is noise with a frame rate.
---

Every interface moves now. Cards lift, buttons bounce, sections slide in from the edge of the screen. Most of that motion is pleasant on the first visit and invisible by the third. Some of it is actively in the way.

The question I ask before adding any animation is simple: **what does this tell the user that a static frame would not?**

## Motion as explanation

The best transitions answer a question. Where did that panel come from? Where did my item go? Is the thing I clicked actually doing something?

- A drawer that slides from the side tells you where to find it again.
- A card that lifts on hover tells you it is clickable before you commit.
- A progress ring tells you how far you are without making you read a number.

None of these are decoration. They are information delivered through time instead of space.

## Timing is the whole craft

Most bad animation is not the wrong idea — it is the wrong duration. Anything the user triggers should respond in under 200ms. Anything that rearranges layout can take a little longer, around 300–400ms, because the eye needs time to track the change.

Springy easing curves feel alive because they front-load the movement: the element reacts immediately, then settles. Linear easing feels mechanical. Ease-in on an entrance feels sluggish, because the user waits for the motion to start.

## Respect the opt-out

`prefers-reduced-motion` is not an edge case. Some people get physically ill from parallax and large movements. Honouring the setting costs a media query. Ignoring it costs someone their afternoon.

> Good motion feels inevitable. You notice it only when it is missing.
