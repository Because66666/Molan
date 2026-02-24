import { generatePdfThumbnails } from './scripts/generate-pdf-thumbnails'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    watch: { ws: false }
  },
  tailwindcss: {
    cssPath: './app/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts'
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false
    }
  },
  hooks: {
    'build:before': async () => {
      await generatePdfThumbnails()
    },
    'dev:before': async () => {
      await generatePdfThumbnails()
    },
    'generate:before': async () => {
      await generatePdfThumbnails()
    }
  }
})
