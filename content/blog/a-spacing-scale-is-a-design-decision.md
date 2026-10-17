---
title: A spacing scale is a design decision
date: '2026-08-30'
description: Eight numbers did more for the consistency of this site than any component library.
---

When I started this portfolio, every margin was a fresh guess. Twenty pixels here, eighteen there, a stray `1.35rem` that I could not explain a week later. Nothing looked broken. Everything looked slightly off.

The fix was not a framework. It was eight numbers.

## The scale

`4, 8, 12, 16, 24, 32, 48, 64`. Small steps at the bottom, where the eye is sensitive to tiny differences between related elements. Big jumps at the top, where you are separating whole sections.

Once the scale exists, every spacing decision becomes a choice between a handful of options instead of an infinite slider. That constraint is the point.

## Proximity does the grouping

Spacing is how a layout says *these things belong together*. A title and its description should sit closer to each other than to the next card. If they do not, no amount of borders or background colour will make the grouping feel right.

A useful rule: the space inside a group should be noticeably smaller than the space around it. One step apart on the scale is usually not enough. Two steps almost always is.

## Name the tokens, not the pixels

I name the steps `--sp-1` through `--sp-8` rather than `--sp-16px`. When the scale changes — and it will — the names stay meaningful and the whole site shifts together.

The result is not dramatic. Nobody visits a site and compliments its margins. But they feel the difference between a layout that was decided and one that was merely arranged.
