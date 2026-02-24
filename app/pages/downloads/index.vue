<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="font-xuansong text-3xl text-brick mb-8">资料下载</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article 
        v-for="download in downloads" 
        :key="download.id" 
        class="card"
      >
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-sm bg-paper-dark flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-brick/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="font-xuansong text-lg text-gray-800 mb-1">
              {{ download.title }}
            </h2>
            <p v-if="download.description" class="text-gray-500 text-sm mb-3 line-clamp-2">
              {{ download.description }}
            </p>
            <p v-if="download.size" class="text-gray-400 text-xs mb-3">
              {{ download.size }}
            </p>
            <a 
              :href="download.github_url" 
              target="_blank"
              rel="noopener"
              class="btn-brick text-sm inline-block"
            >
              下载
            </a>
          </div>
        </div>
      </article>
    </div>

    <div v-if="!downloads?.length" class="text-center py-16 text-gray-400">
      暂无资料
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: downloads } = await useAsyncData('downloads', () =>
  queryCollection('downloads')
    .order('title', 'ASC')
    .all()
)

useHead({
  title: '资料下载 - 抹岚报社'
})
</script>
