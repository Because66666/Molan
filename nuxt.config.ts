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
  }
})
