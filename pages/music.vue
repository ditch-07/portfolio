<template>
  <div class="music">
    <h1 v-reveal class="section-label music__heading">Music Taste</h1>
    <ul class="music__list">
      <li v-for="(track, i) in tracks" :key="track.title" v-reveal="{ delay: i * 80 }" class="music__row">
        <span class="music__index">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="music__title">{{ track.title }}</span>
        <span class="music__artist">{{ track.artist }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Music Taste — Portfolio' })

const tracks = [
  { title: 'Midnight City', artist: 'M83' },
  { title: 'Teardrop', artist: 'Massive Attack' },
  { title: 'Nightcall', artist: 'Kavinsky' },
  { title: 'Sunset Lover', artist: 'Petit Biscuit' },
  { title: 'Breathe', artist: 'Télépopmusik' },
]
</script>

<style scoped>
.music {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-6);
}

.music__heading {
  margin: 0;
  font-family: var(--font-handwritten);
  font-size: var(--fs-thumb);
  font-weight: 600;
  line-height: var(--lh-tight);
  letter-spacing: normal;
  text-transform: none;
  color: var(--text);
}

.music__list {
  width: 100%;
  max-width: var(--content-width);
  margin: 0;
  padding: var(--sp-2) var(--card-padding);
  list-style: none;
  border-radius: var(--radius-md);
  background: var(--panel);
}

.music__row {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: var(--sp-4);
  align-items: baseline;
  padding: var(--sp-4) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.music__row:last-child {
  border-bottom: none;
}

.music__index {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 700;
  color: var(--accent-soft);
}

.music__title {
  font-family: var(--font-display);
  font-size: var(--fs-md);
  font-weight: 600;
}

.music__artist {
  font-size: var(--fs-sm);
  color: var(--muted);
}

@media (max-width: 479px) {
  .music__row {
    grid-template-columns: var(--sp-5) minmax(0, 1fr);
    gap: var(--sp-1) var(--sp-3);
  }

  .music__artist {
    grid-column: 2;
  }
}
</style>
