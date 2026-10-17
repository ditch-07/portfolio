<template>
  <nav class="socials" aria-label="Social links">
    <span v-for="(s, i) in socials" :key="s.name" v-reveal="{ delay: 150 + i * 90 }" class="socials__slot">
      <a
        class="socials__dot"
        :href="s.url"
        :title="s.name"
        :aria-label="s.name"
        :target="s.url.startsWith('http') ? '_blank' : undefined"
        :rel="s.url.startsWith('http') ? 'noopener' : undefined"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path :d="icons[s.icon]" />
        </svg>
      </a>
    </span>
  </nav>
</template>

<script setup lang="ts">
const { data: profile } = usePortfolioProfile()
const socials = computed(() => profile.value?.socials ?? [])

const icons: Record<string, string> = {
  gmail: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457Z',
  telegram: 'M21.9 4.3 18.7 19.4c-.24 1.07-.87 1.33-1.76.83l-4.88-3.6-2.35 2.27c-.26.26-.48.48-.98.48l.35-4.97 9.05-8.18c.39-.35-.09-.55-.61-.2L6.33 13.07l-4.82-1.5c-1.05-.33-1.07-1.05.22-1.55L20.6 2.75c.88-.33 1.65.2 1.3 1.55Z',
  whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z',
  x: 'M17.53 3H20.5l-6.49 7.42L21.75 21h-6l-4.7-6.14L5.7 21H2.73l6.94-7.94L2.25 3h6.16l4.25 5.62L17.53 3Zm-1.05 16.2h1.66L7.6 4.71H5.82l10.66 14.49Z',
}
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
