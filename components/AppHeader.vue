<template>
  <header class="header">
    <div class="header__row container">
      <div class="header__side header__side--left">
        <SocialLinks />
      </div>

      <NuxtLink v-reveal to="/" class="header__center" aria-label="Home">
        <ProfileAvatar />
      </NuxtLink>

      <div class="header__side header__side--right">
        <nav v-reveal="{ delay: 150 }" class="header__nav">
          <NuxtLink to="/" class="header__link" exact-active-class="header__link--active">Home</NuxtLink>
          <NuxtLink to="/blog" class="header__link" active-class="header__link--active">Blog</NuxtLink>
          <NuxtLink to="/music" class="header__link header__link--music" active-class="header__link--active">Music Taste</NuxtLink>
        </nav>
        <div v-reveal="{ delay: 150 }" class="header__burger-slot">
          <button
            class="header__burger"
            :class="{ 'header__burger--open': menuOpen }"
            :aria-expanded="menuOpen"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            aria-controls="mobile-navigation"
            @click="menuOpen = !menuOpen"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </div>

    <nav v-if="menuOpen" id="mobile-navigation" v-reveal class="header__mobile-nav">
      <NuxtLink to="/" @click="menuOpen = false">Home</NuxtLink>
      <NuxtLink to="/blog" @click="menuOpen = false">Blog</NuxtLink>
      <NuxtLink to="/music" class="header__link--music" @click="menuOpen = false">Music Taste</NuxtLink>
      <SocialLinks />
    </nav>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
let mobileQuery: MediaQueryList | undefined

function onBreakpointChange() {
  if (!mobileQuery?.matches) menuOpen.value = false
}

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 767px)')
  mobileQuery.addEventListener('change', onBreakpointChange)
})

onBeforeUnmount(() => {
  mobileQuery?.removeEventListener('change', onBreakpointChange)
})
</script>

<style scoped>
.header {
  position: relative;
  z-index: 2;
}

.header__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: start;
  gap: var(--sp-5);
  padding: var(--sp-6) calc(var(--page-gutter) + var(--shell-gutter)) 0;
}

.header__side {
  display: flex;
  align-items: center;
  height: calc(var(--avatar-size) / 2 - var(--sp-2));
}

.header__side--right {
  justify-content: flex-end;
}

.header__center {
  justify-self: center;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: clamp(var(--sp-4), 2.5vw, var(--sp-6));
}

.header__link {
  font-family: var(--font-mono);
  font-size: var(--fs-md);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color var(--dur-fast) ease;
}

.header__link:hover,
.header__link--active {
  color: var(--accent);
}

.header__burger-slot {
  display: none;
}

.header__burger {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  transition: background var(--dur-fast) ease;
}

.header__burger:hover,
.header__burger:focus-visible {
  background: var(--panel);
}

.header__burger:focus-visible {
  outline: 2px solid var(--accent-soft);
  outline-offset: var(--sp-1);
}

.header__burger span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28px;
  height: 3px;
  border-radius: var(--radius-xs);
  background: var(--text);
  transform: translate(-50%, -50%);
  transition:
    transform var(--dur-med) var(--ease-spring),
    opacity var(--dur-fast) ease,
    background var(--dur-fast) ease;
}

.header__burger span:first-child {
  transform: translate(-50%, -50%) translateY(calc(-1 * var(--sp-2)));
}

.header__burger span:last-child {
  transform: translate(-50%, -50%) translateY(var(--sp-2));
}

.header__burger:hover span,
.header__burger:focus-visible span {
  background: var(--accent-soft);
}

.header__burger--open span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.header__burger--open span:nth-child(2) {
  opacity: 0;
}

.header__burger--open span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.header__mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-5);
  margin: var(--sp-5) var(--page-gutter);
  padding: var(--card-padding);
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.header__mobile-nav a {
  font-family: var(--font-mono);
  font-size: var(--fs-md);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color var(--dur-fast) ease;
}

.header__mobile-nav a:hover {
  color: var(--accent);
}

.header__link--music,
.header__mobile-nav .header__link--music {
  font-family: var(--font-handwritten);
  font-size: var(--fs-handwritten-nav);
  font-weight: 600;
  line-height: var(--lh-tight);
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
}

@media (max-width: 767px) {
  .header__row {
    gap: var(--sp-2);
  }

  .header__side--left > *,
  .header__nav {
    display: none;
  }

  .header__burger-slot {
    display: flex;
  }
}
</style>
