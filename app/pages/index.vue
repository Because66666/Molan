<template>
  <div>
    <section class="relative h-64 md:h-96 overflow-visible">
      <div class="absolute inset-0 bg-gradient-to-r from-brick/20 to-paper" />
      <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-full h-full relative overflow-hidden"
            @touchstart.passive="onTouchStart"
            @touchmove.passive="onTouchMove"
            @touchend="onTouchEnd"
            @pointerdown.passive="onPointerDown"
            @pointerup="onPointerUp">
          <div v-if="slides?.length" class="w-full h-full">
            <div v-for="(slide, i) in slides" :key="slide.name" class="absolute inset-0 transition-opacity duration-700"
              :class="i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'">
              <template v-if="slide.link && slide.link.startsWith('/')">
                <NuxtLink :to="slide.link" class="block w-full h-full">
                  <img :src="slide.url" alt="" loading="lazy" class="w-full h-full object-cover" />
                </NuxtLink>
              </template>
              <template v-else-if="slide.link">
                <a :href="slide.link" target="_blank" rel="noopener noreferrer" class="block w-full h-full">
                  <img :src="slide.url" alt="" loading="lazy" class="w-full h-full object-cover" />
                </a>
              </template>
              <template v-else>
                <img :src="slide.url" alt="" loading="lazy" class="w-full h-full object-cover" />
              </template>
            </div>

            <button @click="prev"
              class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-2">‹</button>
            <button @click="next"
              class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-2">›</button>

            <!-- indicators removed from here; persistent bar added below the hero section -->
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brick/50 to-transparent" />

      <!-- persistent indicator bar -->
      <div v-if="slides?.length"
        class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white/80 dark:bg-gray-800/60 rounded-full px-3 py-1 flex gap-2 z-50 shadow-none">
        <button v-for="(s, idx) in slides" :key="idx" @click="current = idx"
          :class="['w-6 h-1 rounded-full transition-all duration-200', current === idx ? 'bg-brick' : 'bg-white/60']"
          :aria-label="`Slide ${idx + 1}`" />
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <h2 class="section-title">新闻动态</h2>
          <div class="space-y-4">
            <article v-for="news in newsList" :key="news.id" class="card group cursor-pointer"
              @click="navigateTo(`/${news.stem}`)">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 class="font-xuansong text-lg text-gray-800 group-hover:text-brick transition-colors">
                  {{ news.title }}
                </h3>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span>{{ news.author }}</span>
                  <span>{{ formatDate(news.date) }}</span>
                </div>
              </div>
            </article>
            <div v-if="!newsList?.length" class="text-center py-8 text-gray-400">
              暂无新闻
            </div>
          </div>
          <NuxtLink to="/news" class="inline-block mt-6 text-brick hover:text-brick/80 text-sm">
            查看全部新闻 →
          </NuxtLink>
        </div>

        <div>
          <h2 class="section-title">最新期刊</h2>
          <div v-if="latestIssue" class="card">
            <div class="flex items-center gap-2 mb-4">
              <span class="text-brick font-xuansong text-xl">{{ latestIssue.title }} 总第 {{ latestIssue.vol_number }}
                期</span>
            </div>
            <h3 class="font-xuansong text-lg text-gray-700 mb-4">本期目录</h3>
            <ul v-if="latestIssue.toc?.length" class="space-y-3">
              <li v-for="(item, index) in latestIssue.toc.slice(0, 5)" :key="index"
                class="text-gray-600 text-sm border-l-2 border-brick/30 pl-3">
                <span class="font-medium">{{ item.title }}</span>
                <span v-if="item.author" class="text-gray-400 ml-2">/ {{ item.author }}</span>
              </li>
            </ul>
            <p v-else class="text-gray-400 text-sm">暂无目录</p>
            <NuxtLink :to="`/issues/${latestIssue.stem?.replace('issues/', '')}`"
              class="btn-brick inline-block mt-6 text-sm">
              阅读本期
            </NuxtLink>
          </div>
          <div v-else class="card text-center py-8 text-gray-400">
            暂无期刊
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { carouselItems } from '../../config/carousel'

const { data: newsList } = await useAsyncData('news-home', () =>
  queryCollection('news')
    .order('date', 'DESC')
    .limit(5)
    .all()
)

const { data: latestIssue } = await useAsyncData('latest-issue', () =>
  queryCollection('issues')
    .order('vol_number', 'DESC')
    .limit(1)
    .first()
)

const slides = ref(carouselItems)

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const touchStartX = ref<number | null>(null)
const touchCurrentX = ref<number | null>(null)
const swipeThreshold = 50 // px

const startTimer = () => {
  if (timer) clearInterval(timer)
  if (slides.value?.length) {
    timer = setInterval(next, 4000)
  }
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const onTouchStart = (e: TouchEvent) => {
  stopTimer()
  touchStartX.value = e.touches[0]?.clientX ?? null
  touchCurrentX.value = touchStartX.value
}

const onTouchMove = (e: TouchEvent) => {
  touchCurrentX.value = e.touches[0]?.clientX ?? touchCurrentX.value
}

const onTouchEnd = () => {
  if (touchStartX.value == null || touchCurrentX.value == null) {
    startTimer()
    return
  }
  const delta = (touchCurrentX.value || 0) - (touchStartX.value || 0)
  if (Math.abs(delta) > swipeThreshold) {
    if (delta < 0) next()
    else prev()
  }
  touchStartX.value = null
  touchCurrentX.value = null
  startTimer()
}

// pointer fallback for some devices (desktop touchpads / stylus)
const onPointerDown = (e: PointerEvent) => {
  // only handle touch pointers here
  if (e.pointerType !== 'touch') return
  stopTimer()
  touchStartX.value = e.clientX
  touchCurrentX.value = touchStartX.value
}

const onPointerUp = (e: PointerEvent) => {
  if (touchStartX.value == null) {
    startTimer()
    return
  }
  touchCurrentX.value = e.clientX
  const delta = (touchCurrentX.value || 0) - (touchStartX.value || 0)
  if (Math.abs(delta) > swipeThreshold) {
    if (delta < 0) next()
    else prev()
  }
  touchStartX.value = null
  touchCurrentX.value = null
  startTimer()
}

const next = () => {
  if (!slides.value?.length) return
  current.value = (current.value + 1) % slides.value.length
}
const prev = () => {
  if (!slides.value?.length) return
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
}

onMounted(() => {
  startTimer()
})

watch(slides, (v) => {
  // restart timer when slides change
  startTimer()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

import { formatDateYMD } from '../../composables/useFormatDate'
const formatDate = formatDateYMD

useHead({
  title: '抹岚报社 - 方圆'
})
</script>
