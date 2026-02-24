import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue'
  ],
  theme: {
    extend: {
      colors: {
        'brick': '#920303',
        'paper': '#F9F7F2',
        'paper-dark': '#EDE9E0'
      },
      fontFamily: {
        'xuansong': ['HYXuanSong', 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', 'serif'],
        'body': ['Noto Serif SC', 'Source Han Serif SC', 'Georgia', 'serif']
      },
      backgroundImage: {
        'paper-texture': 'linear-gradient(to bottom, #F9F7F2, #F9F7F2)'
      }
    }
  },
  plugins: []
}
