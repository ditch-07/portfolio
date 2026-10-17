---
title: The case for fewer fonts
date: '2026-08-04'
description: Three typefaces, three jobs. Why I stopped auditioning new fonts for every heading.
---

Typography is the easiest place to make a site look expensive, and the easiest place to make it look confused. The difference is usually not which fonts you pick. It is how many.

## One job per typeface

This site uses three families, and each one has a single responsibility:

- **Space Grotesk** for headings. It has personality without shouting.
- **Inter** for body copy. It disappears, which is exactly what body copy should do.
- **JetBrains Mono** for labels, dates, and metadata. Monospace signals *this is data*, not prose.

When a new element appears, I do not ask which font looks best. I ask which job it is doing. The answer picks the typeface for me.

## Weight before family

When something needs more emphasis, reach for weight, size, or colour before reaching for another typeface. A second display font almost never solves a hierarchy problem — it just adds a new voice to an argument that was already unclear.

## Performance is part of the aesthetic

Every font file is a network request and a potential layout shift. A page that reflows as its fonts arrive feels cheap, no matter how beautiful the final glyphs are. Fewer families means fewer files, faster first paint, and a calmer page load.

Restraint reads as confidence. A site that uses three fonts well looks more designed than one that uses seven fonts beautifully.
