<template>
  <article v-if="post" class="post">
    <NuxtLink v-reveal to="/blog" class="post__back">
      <span aria-hidden="true">←</span> All posts
    </NuxtLink>

    <header v-reveal="{ delay: 80 }" class="post__header">
      <time class="post__date" :datetime="post.date">{{ formatPostDate(post.date) }}</time>
      <h1>{{ post.title }}</h1>
      <p class="post__description">{{ post.description }}</p>
    </header>

    <div v-reveal="{ delay: 160 }" class="post__body">
      <ContentRenderer :value="post" />
    </div>

    <BackToTop />
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: post } = await usePortfolioPost(`/blog/${route.params.slug}`)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: `${post.value.title} — Portfolio`,
  description: post.value.description,
})
</script>

<style scoped>
.post {
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
}

.post__back {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color var(--dur-fast) ease;
}

.post__back span {
  transition: transform var(--dur-fast) var(--ease-spring);
}

.post__back:hover {
  color: var(--accent-soft);
}

.post__back:hover span {
  transform: translateX(calc(-1 * var(--sp-1)));
}

.post__header {
  margin-top: var(--sp-6);
  padding-bottom: var(--sp-5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.post__date {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--accent-soft);
}

.post__header h1 {
  margin: var(--sp-3) 0 var(--sp-4);
  font-family: var(--font-display);
  font-size: clamp(2rem, 1.4rem + 2.4vw, 3rem);
  font-weight: 600;
  line-height: var(--lh-tight);
  letter-spacing: -0.03em;
}

.post__description {
  max-width: 52ch;
  margin: 0;
  font-size: var(--fs-md);
  line-height: var(--lh-body);
  color: var(--muted);
}

.post__body {
  padding-top: var(--sp-6);
}

.post__body :deep(h2) {
  margin: var(--sp-7) 0 var(--sp-3);
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  font-weight: 600;
  line-height: var(--lh-tight);
  letter-spacing: -0.02em;
}

.post__body :deep(h3) {
  margin: var(--sp-6) 0 var(--sp-2);
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  font-weight: 600;
  line-height: var(--lh-snug);
}

.post__body :deep(p) {
  margin: 0 0 var(--sp-4);
  font-size: var(--fs-md);
  line-height: 1.8;
  color: var(--muted);
}

.post__body :deep(strong) {
  color: var(--text);
  font-weight: 600;
}

.post__body :deep(a) {
  color: var(--accent-soft);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.post__body :deep(ul),
.post__body :deep(ol) {
  margin: 0 0 var(--sp-4);
  padding-left: var(--sp-5);
}

.post__body :deep(li) {
  margin-bottom: var(--sp-2);
  font-size: var(--fs-md);
  line-height: 1.75;
  color: var(--muted);
}

.post__body :deep(li::marker) {
  color: var(--accent);
}

.post__body :deep(blockquote) {
  margin: var(--sp-6) 0;
  padding: var(--sp-2) 0 var(--sp-2) var(--sp-5);
  border-left: 2px solid var(--accent);
}

.post__body :deep(blockquote p) {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  line-height: var(--lh-snug);
  color: var(--text);
}

.post__body :deep(code) {
  padding: 0.15em 0.4em;
  border-radius: var(--radius-xs);
  background: rgba(255, 255, 255, 0.07);
  font-family: var(--font-mono);
  font-size: 0.875em;
  color: var(--accent-soft);
}

.post__body :deep(pre) {
  margin: 0 0 var(--sp-4);
  padding: var(--sp-4);
  overflow-x: auto;
  border-radius: var(--radius-sm);
  background: var(--bg-page);
}

.post__body :deep(pre code) {
  padding: 0;
  background: none;
  color: var(--text);
}

.post__body :deep(hr) {
  margin: var(--sp-6) 0;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
