<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="font-xuansong text-3xl text-brick mb-8">电子期刊</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article 
        v-for="issue in pagedIssues" 
        :key="issue.id" 
        class="card group"
      >
        <div class="aspect-[3/4] bg-paper-dark rounded-sm mb-4 flex items-center justify-center">
          <div class="text-center">
            <span class="font-xuansong text-4xl text-brick/30">方圆</span>
            <p class="text-brick font-xuansong mt-2">第 {{ issue.vol_number }} 期</p>
          </div>
        </div>
        <h2 class="font-xuansong text-xl text-gray-800 group-hover:text-brick transition-colors mb-2">
          第 {{ issue.vol_number }} 期
        </h2>
        <p v-if="issue.date" class="text-sm text-gray-500 mb-4">
          {{ formatDate(issue.date) }}
        </p>
        <ul v-if="issue.toc?.length" class="text-sm text-gray-600 space-y-1 mb-4">
          <li 
            v-for="(item, index) in issue.toc.slice(0, 3)" 
            :key="index"
            class="truncate"
          >
            · {{ item.title }}
          </li>
        </ul>
        <NuxtLink :to="`/issues/${issue.stem?.replace('issues/', '')}`" class="btn-brick text-sm">
          阅读
        </NuxtLink>
      </article>
    </div>

    <div v-if="!issues?.length" class="text-center py-16 text-gray-400">
      暂无期刊
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

const { data: issues } = await useAsyncData('issues', () =>
  queryCollection('issues')
    .order('vol_number', 'DESC')
    .all()
)

const page = ref(1)
const pageSize = 9
const totalPages = computed(() => Math.max(1, Math.ceil((issues.value?.length ?? 0) / pageSize)))
const pagedIssues = computed(() => {
  const all = issues.value ?? []
  const start = (page.value - 1) * pageSize
  return all.slice(start, start + pageSize)
})

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
}

useHead({
  title: '电子期刊 - 抹岚报社'
})
</script>
