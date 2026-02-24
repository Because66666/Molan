import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    issues: defineCollection({
      type: 'page',
      source: 'issues/**/*.md',
      schema: z.object({
        title: z.string(),
        vol_number: z.number(),
        date: z.string().optional(),
        pdf_url: z.string().optional(),
        toc: z.array(z.object({
          title: z.string(),
          author: z.string().optional()
        })).optional()
      })
    }),
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md',
      schema: z.object({
        title: z.string(),
        author: z.string(),
        date: z.string(),
        excerpt: z.string().optional()
      })
    }),
    authors: defineCollection({
      type: 'page',
      source: 'authors/**/*.md',
      schema: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        bio: z.string().optional(),
        position: z.string().optional(),
        socials: z.record(z.any()).optional()
      })
    }),
    downloads: defineCollection({
      type: 'data',
      source: 'downloads/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        size: z.string().optional(),
        github_url: z.string()
      })
    })
  }
})
