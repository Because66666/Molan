<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="font-xuansong text-3xl text-brick mb-8">报社新闻</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article 
        v-for="news in pagedNews" 
        :key="news.id" 
        class="card group cursor-pointer"
        @click="navigateTo(`/news/${news.stem?.replace('news/', '')}`)">
      >
        <div class="mb-4">
          <h2 class="font-xuansong text-xl text-gray-800 group-hover:text-brick transition-colors mb-2">
            {{ news.title }}
          </h2>
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span>{{ news.author }}</span>
            <span>{{ formatDate(news.date) }}</span>
          </div>
        </div>
        <p v-if="news.excerpt" class="text-gray-600 text-sm line-clamp-2">
          {{ news.excerpt }}
        </p>
      </article>
    </div>

    <div v-if="!newsList?.length" class="text-center py-16 text-gray-400">
      暂无新闻
    </div>

    <div v-else class="mt-6 flex items-center justify-center gap-2">
      <button class="btn" :disabled="page === 1" @click="page--">上一页</button>
      <span class="text-sm text-gray-600">第 {{ page }} / {{ totalPages }} 页</span>
      <button class="btn" :disabled="page >= totalPages" @click="page++">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { data: newsList } = await useAsyncData('news', () =>
  queryCollection('news')
    .order('date', 'DESC')
    .all()
)

const page = ref(1)
const pageSize = 10
const totalPages = computed(() => Math.max(1, Math.ceil((newsList.value?.length ?? 0) / pageSize)))
const pagedNews = computed(() => {
  const all = newsList.value ?? []
  const start = (page.value - 1) * pageSize
  return all.slice(start, start + pageSize)
})

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

useHead({
  title: '报社新闻 - 抹岚报社'
})
</script>
