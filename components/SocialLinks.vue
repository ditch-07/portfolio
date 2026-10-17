<template>
  <nav class="socials" aria-label="Social links">
    <span v-for="(s, i) in socials" :key="s.name" v-reveal="{ delay: 150 + i * 90 }" class="socials__slot">
      <a
        class="socials__dot"
        :href="s.url"
        :title="s.name"
        :aria-label="s.name"
        target="_blank"
        rel="noopener"
      >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path v-if="s.icon === 'github'" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        <path v-else-if="s.icon === 'twitter'" d="M17.53 3H20.5l-6.49 7.42L21.75 21h-6l-4.7-6.14L5.7 21H2.73l6.94-7.94L2.25 3h6.16l4.25 5.62L17.53 3Zm-1.05 16.2h1.66L7.6 4.71H5.82l10.66 14.49Z" />
        <path v-else-if="s.icon === 'linkedin'" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.75V21h-4v-5.9c0-1.4-.03-3.22-2.02-3.22-2.02 0-2.33 1.54-2.33 3.13V21h-3.99V9Z" />
        <path v-else d="M21.58 7.19a2.53 2.53 0 0 0-1.78-1.79C18.25 5 12 5 12 5s-6.25 0-7.8.4a2.53 2.53 0 0 0-1.78 1.79A26.6 26.6 0 0 0 2 12a26.6 26.6 0 0 0 .42 4.81 2.53 2.53 0 0 0 1.78 1.79c1.55.4 7.8.4 7.8.4s6.25 0 7.8-.4a2.53 2.53 0 0 0 1.78-1.79A26.6 26.6 0 0 0 22 12a26.6 26.6 0 0 0-.42-4.81ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z" />
      </svg>
      </a>
    </span>
  </nav>
</template>

<script setup lang="ts">
const { data: profile } = usePortfolioProfile()
const socials = computed(() => profile.value?.socials ?? [])
</script>

<style scoped>
.socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  gap: clamp(var(--sp-2), 2.5vw, var(--sp-3));
}

.socials__slot {
  display: inline-flex;
}

.socials__dot {
  display: grid;
  place-items: center;
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: var(--radius-full);
  background: var(--text);
  color: var(--bg-page);
  transition: transform var(--dur-fast) ease, background var(--dur-fast) ease;
}

.socials__dot:hover {
  background: var(--accent-soft);
  transform: translateY(var(--lift-sm)) scale(1.08);
}

@media (min-width: 768px) {
  .socials__dot {
    width: var(--dot-size-desktop);
    height: var(--dot-size-desktop);
  }

  .socials__dot svg {
    width: var(--sp-4);
    height: var(--sp-4);
  }
}
</style>
