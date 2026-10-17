---
title: Custom properties that age well
date: '2026-06-18'
description: Naming CSS variables for what they mean, not what they look like, saves the next redesign.
---

CSS custom properties are the closest thing the web has to a native design system. They are also very easy to name badly, and bad names compound over time.

## Name the role, not the value

`--orange` is a fine name until the brand moves to red. `--accent` survives that change. `--grey-700` tells you nothing about where it belongs; `--muted` tells you it is for secondary text.

The rule I follow: if changing the value would make the name a lie, the name is wrong.

## Two layers are enough

Large design systems often have three or four layers of tokens: raw palette, semantic aliases, component tokens, theme overrides. For a personal site, that is ceremony.

Two layers cover almost everything:

- **Primitives** like the spacing scale, radii, and durations.
- **Semantic roles** like `--panel`, `--text`, `--accent-soft`.

Components consume the semantic layer and rarely need their own variables.

## Keep motion in tokens too

Durations and easing curves belong next to colours. `--dur-fast` and `--ease-spring` mean every hover on the site moves with the same rhythm. Change one value and the whole interface tightens or relaxes together.

## Leave room to grow

Fluid values like `clamp()` work beautifully inside tokens. A single `--fs-h2` that scales between mobile and desktop removes a dozen media queries from the components that use it.

Good tokens are boring to read and a pleasure to change.
