---
title: Shipping a Nuxt site in a weekend
date: '2026-09-22'
description: What I kept, what I cut, and what surprised me about file-based routing.
---

The brief was simple: a personal site that loads fast, feels alive, and does not turn into a second job. I gave myself a weekend. Here is the short version.

## What I kept

- File-based routing, because naming a file is faster than configuring a router.
- A tiny set of CSS custom properties instead of a full design system.
- Motion in one place: a reveal directive that respects `prefers-reduced-motion`.

## What I cut

No CMS on day one. No analytics dashboard. No custom icon pipeline. Every one of those would have been reasonable, and every one would have pushed the launch to next week.

## The surprise

The most useful decision was not a library. It was deciding what the homepage should *not* contain. Constraints made the design sharper than any additional feature would have.

Ship the smallest version that still feels like yours. Then let real use tell you what to add.
