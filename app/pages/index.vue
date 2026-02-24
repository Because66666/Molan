<template>
  <div>
    <section class="relative h-64 md:h-96 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-brick/20 to-paper" />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center px-4">
          <h1 class="font-xuansong text-4xl md:text-6xl text-brick mb-4">
            方圆
          </h1>
          <p class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            观方寸之间，知天地之圆
          </p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brick/50 to-transparent" />
    </section>

    <section class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <h2 class="section-title">新闻动态</h2>
          <div class="space-y-4">
            <article 
              v-for="news in newsList" 
              :key="news.id" 
              class="card group cursor-pointer"
              @click="navigateTo(`/news/${news.stem}`)"
            >
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
              <span class="text-brick font-xuansong text-xl">第 {{ latestIssue.vol_number }} 期</span>
            </div>
            <h3 class="font-xuansong text-lg text-gray-700 mb-4">本期目录</h3>
            <ul v-if="latestIssue.toc?.length" class="space-y-3">
              <li 
                v-for="(item, index) in latestIssue.toc.slice(0, 5)" 
                :key="index"
                class="text-gray-600 text-sm border-l-2 border-brick/30 pl-3"
              >
                <span class="font-medium">{{ item.title }}</span>
                <span v-if="item.author" class="text-gray-400 ml-2">/ {{ item.author }}</span>
              </li>
            </ul>
            <p v-else class="text-gray-400 text-sm">暂无目录</p>
            <NuxtLink 
              :to="`/issues/${latestIssue.stem?.replace('issues/', '')}`" 
              class="btn-brick inline-block mt-6 text-sm"
            >
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

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

useHead({
  title: '抹岚报社 - 方圆'
})
</script>
