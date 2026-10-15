export function usePortfolio() {
  const profile = {
    name: 'Your Name',
    role: 'Developer & Designer',
  }

  const socials = [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'X / Twitter', url: 'https://x.com', icon: 'twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
  ]

  const about = {
    filename: 'about_me.md',
    lines: [
      { type: 'cmd', text: 'whoami' },
      { type: 'out', text: 'Your Name — developer & designer' },
      { type: 'cmd', text: 'cat focus.txt' },
      { type: 'out', text: 'clean interfaces · dark themes · shipping fast' },
      { type: 'cmd', text: 'now building' },
      { type: 'out', text: 'Nuxt, design systems, audio-reactive visuals' },
    ],
  }

  const projects = [
    { title: 'Midnight Oil', category: 'AUDIO TOOL', description: 'A tiny browser synth with tape-saturated presets.', year: '2026' },
    { title: 'Black Pearl', category: 'CLI', description: 'Terminal dashboard for watching deploy pipelines.', year: '2025' },
    { title: 'Glucophobia', category: 'GAME', description: 'A sugar-rush arcade game built with Vue and canvas.', year: '2025' },
    { title: 'Net Worker', category: 'LIBRARY', description: 'Typed WebSocket client with automatic reconnect.', year: '2024' },
  ]

  return { profile, socials, about, projects }
}
