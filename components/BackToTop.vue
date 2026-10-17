<template>
  <Teleport to="#teleports">
    <Transition name="backtop">
      <button
        v-show="visible"
        class="backtop"
        :class="{ 'is-launching': launching }"
        type="button"
        aria-label="Back to top"
        @click="toTop"
      >
        <span class="backtop__label" aria-hidden="true">Back to top</span>
        <span class="backtop__shadow" aria-hidden="true" />
        <span class="backtop__float">
          <span class="backtop__body">
            <svg class="backtop__ring" viewBox="0 0 60 60" aria-hidden="true">
              <circle class="backtop__track" cx="30" cy="30" r="27" />
              <circle
                class="backtop__meter"
                cx="30"
                cy="30"
                r="27"
                pathLength="100"
                :stroke-dashoffset="100 - progress * 100"
              />
            </svg>
            <svg
              class="backtop__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path class="backtop__arrow" d="M7 11.5 12 6.5l5 5" />
              <path class="backtop__smile" d="M7.5 15.5c1.3 1.7 2.8 2.5 4.5 2.5s3.2-.8 4.5-2.5" />
            </svg>
          </span>
        </span>
      </button>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const visible = ref(false)
const progress = ref(0)
const launching = ref(false)
let frame = 0
let launchTimer: ReturnType<typeof setTimeout> | undefined

function measure() {
  frame = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  visible.value = window.scrollY > 400
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(measure)
}

function toTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  launching.value = true
  clearTimeout(launchTimer)
  launchTimer = setTimeout(() => {
    launching.value = false
  }, 700)
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(frame)
  clearTimeout(launchTimer)
})
</script>

<style scoped>
.backtop {
  --size: 58px;
  position: fixed;
  right: max(var(--sp-5), env(safe-area-inset-right));
  bottom: max(var(--sp-5), env(safe-area-inset-bottom));
  z-index: 20;
  width: var(--size);
  height: var(--size);
  border-radius: var(--radius-full);
  -webkit-tap-highlight-color: transparent;
}

.backtop:focus-visible {
  outline: none;
}

.backtop__float {
  display: block;
  width: 100%;
  height: 100%;
  animation: backtop-bob 3.2s ease-in-out infinite;
}

.backtop__shadow {
  position: absolute;
  left: 50%;
  bottom: -14px;
  width: 70%;
  height: 10px;
  border-radius: var(--radius-full);
  background: radial-gradient(closest-side, rgba(0, 0, 0, 0.55), transparent);
  transform: translateX(-50%);
  animation: backtop-shadow 3.2s ease-in-out infinite;
  pointer-events: none;
}

.backtop__body {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  background:
    radial-gradient(120% 120% at 30% 20%, rgba(255, 255, 255, 0.14), transparent 55%),
    rgba(42, 47, 54, 0.78);
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    inset 0 -6px 14px rgba(0, 0, 0, 0.25),
    0 14px 30px rgba(0, 0, 0, 0.45);
  color: var(--text);
  transition:
    transform var(--dur-med) var(--ease-spring),
    background var(--dur-med) ease,
    box-shadow var(--dur-med) ease,
    color var(--dur-med) ease;
}

.backtop__ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
}

.backtop__track {
  stroke: rgba(255, 255, 255, 0.08);
}

.backtop__meter {
  stroke: var(--accent-soft);
  stroke-dasharray: 100;
  filter: drop-shadow(0 0 4px rgba(217, 122, 82, 0.55));
  transition: stroke-dashoffset 0.12s linear, stroke var(--dur-med) ease;
}

.backtop__icon {
  position: relative;
  width: 24px;
  height: 24px;
  overflow: visible;
}

.backtop__arrow {
  transition: transform var(--dur-med) var(--ease-spring);
}

.backtop__smile {
  color: var(--accent-soft);
  stroke: currentColor;
  transform-box: fill-box;
  transform-origin: 50% 0;
  transition:
    transform var(--dur-med) var(--ease-spring),
    color var(--dur-med) ease;
}

.backtop__label {
  position: absolute;
  top: 50%;
  right: calc(100% + var(--sp-3));
  padding: var(--sp-2) var(--sp-3);
  border-radius: 999px;
  background: rgba(42, 47, 54, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 10px 24px rgba(0, 0, 0, 0.4);
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--text);
  opacity: 0;
  transform: translate(8px, -50%);
  transition:
    opacity var(--dur-med) ease,
    transform var(--dur-med) var(--ease-spring);
  pointer-events: none;
}

@media (hover: hover) {
  .backtop:hover .backtop__label {
    opacity: 1;
    transform: translate(0, -50%);
  }

  .backtop:hover .backtop__body {
    transform: translateY(-4px) scale(1.06);
    background:
      radial-gradient(120% 120% at 30% 20%, rgba(255, 255, 255, 0.22), transparent 55%),
      var(--accent);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      inset 0 -6px 14px rgba(0, 0, 0, 0.2),
      0 0 0 6px rgba(193, 80, 43, 0.14),
      0 18px 36px rgba(193, 80, 43, 0.4);
    color: #fff;
  }

  .backtop:hover .backtop__meter {
    stroke: #fff;
  }

  .backtop:hover .backtop__arrow {
    transform: translateY(-2px);
  }

  .backtop:hover .backtop__smile {
    color: #fff;
    transform: scale(1.18, 1.3);
  }
}

.backtop:focus-visible .backtop__body {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 0 0 3px var(--bg-page),
    0 0 0 5px var(--accent-soft);
}

.backtop:active .backtop__body {
  transform: scale(0.94);
}

.backtop.is-launching .backtop__arrow {
  animation: backtop-launch 0.7s var(--ease-spring);
}

.backtop.is-launching .backtop__smile {
  animation: backtop-grin 0.7s var(--ease-spring);
}

.backtop.is-launching .backtop__label {
  opacity: 0;
}

.backtop-enter-active {
  transition:
    opacity var(--dur-med) ease,
    transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.backtop-leave-active {
  transition:
    opacity var(--dur-med) ease,
    transform var(--dur-med) ease-in;
}

.backtop-enter-from,
.backtop-leave-to {
  opacity: 0;
  transform: translateY(24px) scale(0.6) rotate(-14deg);
}

@keyframes backtop-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes backtop-shadow {
  0%,
  100% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1);
  }
  50% {
    opacity: 0.55;
    transform: translateX(-50%) scaleX(0.78);
  }
}

@keyframes backtop-launch {
  0% {
    transform: none;
    opacity: 1;
  }
  40% {
    transform: translateY(-16px);
    opacity: 0;
  }
  41% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}

@keyframes backtop-grin {
  0%,
  100% {
    transform: none;
  }
  45% {
    transform: scale(1.35, 1.6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .backtop__float,
  .backtop__shadow {
    animation: none;
  }
}
</style>
