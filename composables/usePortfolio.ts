export function usePortfolioProfile() {
  return useAsyncData('portfolio-profile', () => queryCollection('profile').first())
}

// Separate key from usePortfolioProfile: awaiting the shared key inside
// page Suspense while app.vue already fetches it deadlocks SSR.
export function usePortfolioAbout() {
  return useAsyncData('portfolio-about', () => queryCollection('profile').first())
}

export function usePortfolioProjects() {
  return useAsyncData('portfolio-projects', () =>
    queryCollection('projects').order('order', 'ASC').all(),
  )
}

export function usePortfolioTracks() {
  return useAsyncData('portfolio-tracks', () =>
    queryCollection('music').order('order', 'ASC').all(),
  )
}

export function usePortfolioPosts() {
  return useAsyncData('portfolio-posts', () =>
    queryCollection('blog').order('date', 'DESC').all(),
  )
}

export function usePortfolioPost(path: string) {
  return useAsyncData(`portfolio-post-${path}`, () =>
    queryCollection('blog').path(path).first(),
  )
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(new Date(date))
    .toUpperCase()
}
