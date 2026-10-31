<template>
  <section class="projects" aria-label="Recent projects">
    <span v-reveal class="section-label">Recent Projects</span>

    <div
      ref="viewport"
      class="projects__viewport"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
      @wheel="onWheel"
    >
      <div ref="track" class="projects__track" :style="{ transform: `translateX(${offset}px)` }">
        <div
          v-for="(p, i) in projects"
          :key="p.title"
          v-reveal="{ delay: i * 90 }"
          class="projects__cell"
        >
          <component
            :is="p.link ? 'a' : 'article'"
            class="projects__card"
            :href="p.link || undefined"
            :target="isExternalLink(p.link) ? '_blank' : undefined"
            :rel="isExternalLink(p.link) ? 'noopener noreferrer' : undefined"
          >
            <div class="projects__thumb">
              <img
                v-if="p.image"
                :src="p.image"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span v-else aria-hidden="true">{{ projectInitial(p.title) }}</span>
            </div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.description }}</p>
            <footer>
              <span class="projects__category">{{ p.category }}</span>
              <span class="projects__year">{{ p.year }}</span>
            </footer>
          </component>
        </div>
      </div>
    </div>

    <div v-reveal="{ delay: 250 }" class="projects__dots" role="tablist" aria-label="Project pages">
      <button
        v-for="(p, i) in projects"
        :key="p.title"
        role="tab"
        :aria-selected="i === page"
        :aria-label="`Show ${p.title}`"
        :class="{ 'projects__dot--active': i === page }"
        class="projects__dot"
        @click="go(i)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const { data } = await usePortfolioProjects()
const projects = computed(() => data.value ?? [])

function isExternalLink(link?: string) {
  return !!link && /^https?:\/\//i.test(link)
}

function projectInitial(title: string) {
  return title.trim().charAt(0).toUpperCase()
}

const viewport = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const page = ref(0)
const offset = ref(0)
let resizeObserver: ResizeObserver | undefined

function centerProject() {
  const cell = track.value?.children[page.value] as HTMLElement | undefined
  const lastCell = track.value?.lastElementChild as HTMLElement | undefined
  if (!viewport.value || !cell || !lastCell) return
  const width = viewport.value.clientWidth
  const centeredOffset = width / 2 - cell.offsetLeft - cell.offsetWidth / 2
  const minOffset = Math.min(0, width - lastCell.offsetLeft - lastCell.offsetWidth)
  offset.value = Math.max(minOffset, Math.min(0, centeredOffset))
}

function go(i: number) {
  page.value = i
  centerProject()
}

function step(delta: number) {
  const next = page.value + delta
  if (next < 0 || next >= projects.value.length) return
  go(next)
}

let wheelDelta = 0
let wheelReset: ReturnType<typeof setTimeout> | undefined
let wheelLockedUntil = 0

function onWheel(event: WheelEvent) {
  if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
  event.preventDefault()
  if (Date.now() < wheelLockedUntil) return

  wheelDelta += event.deltaX
  clearTimeout(wheelReset)
  wheelReset = setTimeout(() => {
    wheelDelta = 0
  }, 160)

  if (Math.abs(wheelDelta) < 30) return
  const direction = wheelDelta > 0 ? 1 : -1
  wheelDelta = 0
  wheelLockedUntil = Date.now() + 320
  step(direction)
}

let touchOrigin: { x: number; y: number } | null = null

function onTouchStart(event: TouchEvent) {
  touchOrigin = event.touches.length === 1
    ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
    : null
}

function onTouchEnd(event: TouchEvent) {
  if (!touchOrigin) return
  const touch = event.changedTouches[0]
  const dx = touch.clientX - touchOrigin.x
  const dy = touch.clientY - touchOrigin.y
  touchOrigin = null
  if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return
  step(dx < 0 ? 1 : -1)
}

onMounted(() => {
  centerProject()
  resizeObserver = new ResizeObserver(centerProject)
  resizeObserver.observe(viewport.value!)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  clearTimeout(wheelReset)
})
</script>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-6);
  margin-top: var(--sp-8);
}

.projects__viewport {
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
}

.projects__track {
  position: relative;
  display: flex;
  gap: var(--sp-5);
  transition: transform var(--dur-med) var(--ease-spring);
}

.projects__cell {
  flex: 0 0 calc((100% - var(--sp-5)) / 2);
  min-width: 0;
}

@media (max-width: 767px) {
  .projects__cell {
    flex-basis: 100%;
  }
}

.projects__card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  height: 100%;
  padding: var(--card-padding);
  border-radius: var(--radius-md);
  background: var(--panel);
  transition: background var(--dur-fast) ease, transform var(--dur-fast) ease;
}

.projects__card:hover {
  background: var(--panel-hover);
  transform: translateY(var(--lift-md));
}

.projects__card:focus-visible {
  outline: 2px solid var(--accent-soft);
  outline-offset: 3px;
}

a.projects__card {
  color: inherit;
  text-decoration: none;
}

.projects__thumb {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #22272e, #454c56);
}

.projects__thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projects__thumb span {
  font-family: var(--font-display);
  font-size: var(--fs-thumb);
  font-weight: 700;
  color: var(--accent);
}

.projects__card h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  font-weight: 600;
  line-height: var(--lh-tight);
  letter-spacing: -0.01em;
}

.projects__card p {
  margin: 0;
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--muted);
}

.projects__card footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.projects__category {
  color: var(--accent-soft);
}

.projects__year {
  color: var(--muted);
}

.projects__dots {
  display: flex;
  gap: var(--sp-3);
}

.projects__dot {
  width: 9px;
  height: 9px;
  border-radius: var(--radius-full);
  background: var(--muted);
  opacity: 0.5;
  transition: opacity var(--dur-fast) ease, background var(--dur-fast) ease;
}

.projects__dot--active {
  background: var(--accent);
  opacity: 1;
}
</style>
