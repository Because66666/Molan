<template>
  <header class="bg-paper border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <nav class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 border-2 border-brick rounded-sm flex items-center justify-center">
            <span class="font-xuansong text-brick text-lg font-bold">方</span>
          </div>
          <span class="font-xuansong text-2xl text-brick group-hover:text-brick/80 transition-colors">
            抹岚报社
          </span>
        </NuxtLink>
        
        <ul class="hidden md:flex items-center gap-8">
          <li v-for="item in navItems" :key="item.path">
            <NuxtLink 
              :to="item.path"
              class="font-body text-gray-700 hover:text-brick transition-colors relative py-2"
              :class="{ 'text-brick font-medium': isActive(item.path) }"
            >
              {{ item.label }}
              <span 
                v-if="isActive(item.path)" 
                class="absolute bottom-0 left-0 w-full h-0.5 bg-brick"
              />
            </NuxtLink>
          </li>
        </ul>

        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-gray-700 hover:text-brick"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <Transition name="slide">
        <ul v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 mt-4 space-y-3">
          <li v-for="item in navItems" :key="item.path">
            <NuxtLink 
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="block py-2 text-gray-700 hover:text-brick transition-colors"
              :class="{ 'text-brick font-medium': isActive(item.path) }"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { label: '期刊', path: '/issues' },
  { label: '新闻', path: '/news' },
  { label: '作者', path: '/authors' },
  { label: '下载', path: '/downloads' }
]

const isActive = (path: string) => {
  if (path === '/issues') return route.path.startsWith('/issues')
  if (path === '/news') return route.path.startsWith('/news')
  if (path === '/authors') return route.path.startsWith('/authors')
  if (path === '/downloads') return route.path === '/downloads'
  return route.path === path
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
