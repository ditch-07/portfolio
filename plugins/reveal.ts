interface RevealOptions {
  delay?: number
  threshold?: number
  rootMargin?: string
  onReveal?: () => void
}

export default defineNuxtPlugin((nuxtApp) => {
  const observers = new Map<string, IntersectionObserver>()
  const elements = new WeakMap<HTMLElement, { observer: IntersectionObserver; onReveal?: () => void }>()

  nuxtApp.vueApp.directive<HTMLElement, RevealOptions | number>('reveal', {
    mounted(el, binding) {
      const opts: RevealOptions =
        typeof binding.value === 'number' ? { delay: binding.value } : binding.value || {}

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        opts.onReveal?.()
        return
      }

      el.classList.add('reveal')
      if (opts.delay) el.style.transitionDelay = `${opts.delay}ms`

      const threshold = opts.threshold ?? 0.15
      const rootMargin = opts.rootMargin ?? '0px 0px -8% 0px'
      const key = `${threshold}:${rootMargin}`
      let observer = observers.get(key)
      if (!observer) {
        observer = new IntersectionObserver((entries, io) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const target = entry.target as HTMLElement
            const state = elements.get(target)
            if (!state) continue
            target.classList.add('is-revealed')
            io.unobserve(target)
            elements.delete(target)
            state.onReveal?.()
          }
        }, { threshold, rootMargin })
        observers.set(key, observer)
      }
      elements.set(el, { observer, onReveal: opts.onReveal })
      observer.observe(el)
    },
    unmounted(el) {
      elements.get(el)?.observer.unobserve(el)
      elements.delete(el)
    },
  })
})
