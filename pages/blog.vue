<template>
  <div class="blog">
    <span v-reveal class="section-label">Blog</span>
    <article
      v-for="(post, i) in posts"
      :key="post.title"
      v-reveal="{ delay: i * 120 }"
      class="blog__post"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
      <span class="blog__date">{{ post.date }}</span>
    </article>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Blog — Portfolio' })

const posts = [
  { title: 'Why dark themes deserve better contrast', date: 'OCT 2026', excerpt: 'Off-white on charcoal is not just an aesthetic choice — it is a legibility one.' },
  { title: 'Shipping a Nuxt site in a weekend', date: 'SEP 2026', excerpt: 'What I kept, what I cut, and what surprised me about file-based routing.' },
]
</script>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-6);
}

.blog__post {
  width: 100%;
  max-width: var(--content-width);
  padding: var(--card-padding);
  border-radius: var(--radius-md);
  background: var(--panel);
}

.blog__post h2 {
  margin: 0 0 var(--sp-2);
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  font-weight: 600;
  line-height: var(--lh-tight);
  letter-spacing: -0.02em;
}

.blog__post p {
  margin: 0 0 var(--sp-3);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--muted);
}

.blog__date {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--accent-soft);
}
</style>
