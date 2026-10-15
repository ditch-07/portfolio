<template>
  <div class="avatar" role="img" aria-label="Profile picture">
    <img
      src="/images/avatar-256.webp"
      srcset="/images/avatar-256.webp 256w, /images/avatar-384.webp 384w"
      sizes="128px"
      width="256"
      height="256"
      fetchpriority="high"
      decoding="async"
      alt=""
    />
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  isolation: isolate;
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: var(--radius-full);
  padding: 5px;
  background: var(--surface);
  box-shadow: 0 0 0 var(--avatar-ring) var(--accent), var(--shadow-sm);
}

.avatar::before {
  content: '';
  position: absolute;
  inset: -6px;
  z-index: -1;
  border: 6px solid rgba(193, 80, 43, 0.18);
  border-radius: inherit;
  pointer-events: none;
  animation: ringPulse 3.4s ease-in-out 0.8s infinite;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  object-fit: cover;
  display: block;
}

@keyframes ringPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0;
    transform: scale(1.15);
  }
}
</style>
