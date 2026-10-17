---
title: Why my portfolio lives in Git
date: '2026-05-27'
description: Markdown files, a visual editor, and every change is a commit. No database to babysit.
---

For years my portfolio content lived in whatever the site builder of the moment wanted: a hosted CMS, a JSON blob, a spreadsheet wired up with a script I no longer understand. Each move meant an export, a migration, and at least one lost post.

Now everything is a file in the repository.

## Files outlive platforms

Projects, music, my bio, and every blog post are plain Markdown and YAML. I can open them in any editor, grep them, diff them, and move them to a different framework without asking anyone for an export button.

If the tooling disappears tomorrow, the content does not.

## A visual editor on top

Writing in a code editor is fine for me, but not always convenient. A Git-backed visual editor gives me a proper writing surface in the browser. When I hit publish, it makes a commit — the same commit I would have made by hand.

That means the editor is a convenience, not a dependency.

## History for free

Every edit has an author, a timestamp, and a diff. I can see when a project description changed and roll back a bad rewrite in one command. No CMS I have used offers revision history this complete, and none of them made it this cheap.

## The trade-off

There is no instant publish. A change goes through a build and a deploy, which takes a minute or two. For a portfolio, that is not a cost. It is a small pause that stops me from shipping typos at midnight.

Own your words. Rent the tools.
