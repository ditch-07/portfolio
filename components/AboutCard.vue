<template>
  <section v-reveal="{ delay: 300, onReveal: startTyping }" class="terminal" :aria-label="about.filename">
    <div class="terminal__bar">
      <span class="terminal__dot terminal__dot--r" />
      <span class="terminal__dot terminal__dot--y" />
      <span class="terminal__dot terminal__dot--g" />
      <span class="terminal__name">{{ about.filename }}</span>
    </div>

    <div class="terminal__body">
      <p
        v-for="(line, i) in about.lines"
        :key="i"
        class="terminal__line"
        :class="`terminal__line--${line.type}`"
      >
        <span class="terminal__reserve" aria-hidden="true"><span v-if="line.type === 'cmd'" class="terminal__prompt">$</span>{{ line.text }}<span class="terminal__cursor">▋</span></span>
        <span class="terminal__content"><span v-if="line.type === 'cmd'" class="terminal__prompt">$</span><span class="terminal__text">{{ display[i] }}</span><span
          v-if="i === active || (finished && i === about.lines.length - 1)"
          class="terminal__cursor"
          :class="{ 'terminal__cursor--blink': finished }"
          >▋</span></span>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: profile } = await usePortfolioAbout()
const about = computed(() => profile.value?.about ?? { filename: 'about_me.md', lines: [] })

const SPEED = 26
const LINE_PAUSE = 460
const START_DELAY = 500

const display = ref(about.value.lines.map(() => ''))
const active = ref(0)
const finished = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function type() {
  if (active.value >= about.value.lines.length) {
    finished.value = true
    return
  }
  const target = about.value.lines[active.value].text
  const shown = display.value[active.value]
  if (shown.length < target.length) {
    display.value[active.value] = target.slice(0, shown.length + 1)
    timer = setTimeout(type, SPEED)
  } else {
    timer = setTimeout(() => {
      active.value += 1
      type()
    }, LINE_PAUSE)
  }
}

let started = false
function startTyping() {
  if (started) return
  started = true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = about.value.lines.map(line => line.text)
    active.value = about.value.lines.length
    finished.value = true
    return
  }
  timer = setTimeout(type, START_DELAY)
}

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.terminal {
  max-width: var(--content-width);
  margin: 0 auto;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #0a0c10;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow-md);
  font-family: var(--font-mono);
}

.terminal__bar {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-4);
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.terminal__dot {
  flex-shrink: 0;
  width: var(--sp-3);
  height: var(--sp-3);
  border-radius: var(--radius-full);
}

.terminal__dot--r {
  background: #ff5f56;
}

.terminal__dot--y {
  background: #ffbd2e;
}

.terminal__dot--g {
  background: #27c93f;
}

.terminal__name {
  margin-left: var(--sp-2);
  font-size: var(--fs-sm);
  color: var(--muted);
}

.terminal__body {
  padding: var(--sp-4) var(--sp-5) var(--sp-5);
  min-height: 190px;
  text-align: left;
}

.terminal__line {
  display: grid;
  margin: 0 0 var(--sp-2);
  font-size: var(--fs-md);
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
}

.terminal__reserve,
.terminal__content {
  grid-area: 1 / 1;
  min-width: 0;
}

.terminal__reserve {
  visibility: hidden;
}

.terminal__line--cmd {
  color: var(--text);
}

.terminal__line--out {
  color: var(--muted);
  padding-left: var(--sp-5);
}

.terminal__prompt {
  margin-right: var(--sp-3);
  font-weight: 700;
  color: var(--accent);
}

.terminal__cursor {
  display: inline-block;
  margin-left: 1px;
  color: var(--accent-soft);
}

.terminal__cursor--blink {
  animation: blink 1.05s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (max-width: 767px) {
  .terminal__bar {
    gap: var(--sp-1);
    padding: var(--sp-3) var(--card-padding);
  }

  .terminal__name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--fs-meta);
  }

  .terminal__body {
    padding: var(--sp-4) var(--card-padding);
  }

  .terminal__line {
    font-size: clamp(var(--fs-sm), 3.8vw, var(--fs-md));
  }

  .terminal__line--out {
    padding-left: var(--sp-3);
  }

  .terminal__prompt {
    margin-right: var(--sp-2);
  }
}
</style>
