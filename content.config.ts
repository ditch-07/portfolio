import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const aboutLine = z.object({
  type: z.enum(['cmd', 'out']),
  text: z.string(),
})

const social = z.object({
  name: z.string(),
  url: z.string().describe('Use mailto:you@gmail.com, https://t.me/username, https://wa.me/countrycodenumber, https://x.com/username'),
  icon: z.enum(['gmail', 'telegram', 'whatsapp', 'x']),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().describe('Publication date (YYYY-MM-DD)'),
      }),
    }),
    profile: defineCollection({
      type: 'data',
      source: 'profile.yml',
      schema: z.object({
        name: z.string(),
        role: z.string(),
        about: z.object({
          filename: z.string(),
          lines: z.array(aboutLine),
        }),
        socials: z.array(social),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string(),
        category: z.string(),
        description: z.string(),
        year: z.string(),
        order: z.string().describe('Position in the carousel (lowest first)'),
        image: z
          .string()
          .optional()
          .describe('Thumbnail from the media library (SVG, PNG or JPG). Falls back to the first letter of the title when empty.')
          .editor({ input: 'media' }),
        link: z
          .string()
          .optional()
          .describe('Where the card links to — https://… for an external site, or /path for a page of this site.'),
      }),
    }),
    music: defineCollection({
      type: 'data',
      source: 'music/*.yml',
      schema: z.object({
        title: z.string(),
        artist: z.string(),
        order: z.string().describe('Position in the list (lowest first)'),
      }),
    }),
  },
})
