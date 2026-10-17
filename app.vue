<template>
  <div class="shell">
    <AppHeader />
    <main class="shell__main container">
      <div class="shell__card">
        <NuxtPage />
      </div>
    </main>
    <footer class="shell__footer container">
      <span>{{ profile?.name }} — built with Nuxt</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { data: profile } = usePortfolioProfile()
</script>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(1200px 500px at 50% -10%, rgba(193, 80, 43, 0.12), transparent 60%),
    var(--bg);
}

.shell__main {
  flex: 1;
  width: 100%;
}

.shell__card {
  margin-top: calc(var(--avatar-size) / -2);
  padding: calc(var(--avatar-size) / 2 + var(--sp-6)) var(--shell-gutter) var(--sp-8);
  border-radius: var(--radius-xl);
  background: var(--surface);
  box-shadow: var(--shadow-card);
  animation: fadeUp var(--dur-slow) ease both;
}

.shell__footer {
  padding: var(--sp-6) 0;
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--muted);
  text-align: center;
}

@media (max-width: 767px) {
  .shell__card {
    padding-top: calc(var(--avatar-size) / 2 + var(--sp-5));
    padding-bottom: var(--sp-7);
  }

  .shell__footer {
    padding: var(--sp-5) var(--page-gutter);
  }
}

</style>
