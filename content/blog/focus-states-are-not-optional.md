---
title: Focus states are not optional
date: '2026-07-12'
description: The outline you removed because it looked ugly was someone's only way to see where they are.
---

Somewhere in almost every stylesheet there is a line like `outline: none`. It usually arrives with good intentions — the default browser ring clashed with the design — and it quietly makes the site unusable for anyone navigating by keyboard.

## Who relies on focus

Keyboard users, switch-device users, people with tremors who find a trackpad exhausting, power users who simply prefer Tab. For all of them, the focus indicator is the cursor. Removing it is like hiding the mouse pointer and hoping people guess.

## Design it instead of deleting it

The fix is not to bring back the default ring. It is to design a focus state that belongs to your visual language.

- Use `:focus-visible` so the ring appears for keyboard navigation but not on every mouse click.
- Give it real contrast. On a dark theme, an accent-coloured ring with a small offset reads clearly against both the page and the card.
- Match the shape. A rounded button deserves a rounded outline, not a hard rectangle.

## Test with your hands off the mouse

Unplug the mouse for five minutes. Tab through your own site. Can you always tell where you are? Can you reach the menu, the links in the footer, the button that only appears on scroll?

If the answer is no anywhere, that is the most important bug on the site — even if it never shows up in a screenshot.
