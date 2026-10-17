<template>
  <div class="blog">
    <span v-reveal class="section-label">Blog</span>
    <div
      v-for="(post, i) in posts"
      :key="post.path"
      v-reveal="{ delay: i * 120 }"
      class="blog__item"
    >
      <NuxtLink :to="post.path" class="blog__post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <footer class="blog__footer">
          <time class="blog__date" :datetime="post.date">{{ formatPostDate(post.date) }}</time>
          <span class="blog__read">
            Read post <span aria-hidden="true">↗</span>
          </span>
        </footer>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Blog — Portfolio' })

const { data } = await usePortfolioPosts()
const posts = computed(() => data.value ?? [])
</script>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-6);
}

.blog__item {
  width: 100%;
  max-width: var(--content-width);
}

.blog__post {
  display: flex;
  flex-direction: column;
  padding: var(--card-padding);
  border-radius: var(--radius-md);
  background: var(--panel);
  transition:
    background var(--dur-fast) ease,
    transform var(--dur-fast) var(--ease-spring);
}

.blog__post:hover {
  background: var(--panel-hover);
  transform: translateY(var(--lift-md));
}

.blog__post:focus-visible {
  outline: 2px solid var(--accent-soft);
  outline-offset: var(--sp-1);
}

.blog__post h2 {
  margin: 0 0 var(--sp-2);
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  font-weight: 600;
  line-height: var(--lh-tight);
  letter-spacing: -0.02em;
  transition: color var(--dur-fast) ease;
}

.blog__post:hover h2 {
  color: var(--accent-soft);
}

.blog__post p {
  margin: 0 0 var(--sp-4);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--muted);
}

.blog__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--sp-2) var(--sp-4);
  margin-top: auto;
}

.blog__date,
.blog__read {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.blog__date {
  color: var(--accent-soft);
}

.blog__read {
  color: var(--muted);
  transition: color var(--dur-fast) ease;
}

.blog__read span {
  display: inline-block;
  margin-left: var(--sp-1);
  transition:
    transform var(--dur-fast) var(--ease-spring),
    color var(--dur-fast) ease;
}

.blog__post:hover .blog__read {
  color: var(--text);
}

.blog__post:hover .blog__read span {
  color: var(--accent-soft);
  transform: translate(2px, -2px);
}
</style>
