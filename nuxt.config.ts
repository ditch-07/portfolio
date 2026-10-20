export default defineNuxtConfig({
  devtools: { enabled: false },
  nitro: { compressPublicAssets: true },
  modules: ['@nuxt/content', 'nuxt-studio'],
  studio: {
    repository: {
      provider: 'github',
      owner: 'ditch-07',
      repo: 'portfolio',
      branch: 'main',
    },
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  css: [
    '@fontsource/space-grotesk/latin-600.css',
    '@fontsource/space-grotesk/latin-700.css',
    '@fontsource/inter/latin-400.css',
    '@fontsource/jetbrains-mono/latin-400.css',
    '@fontsource/jetbrains-mono/latin-700.css',
    '@fontsource/caveat/latin-600.css',
    '~/assets/css/main.css',
  ],
  app: {
    head: {
      title: 'Portfolio',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal portfolio — projects, writing, and music taste.' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon.png', sizes: '96x96' }
      ],
    },
  },
})
