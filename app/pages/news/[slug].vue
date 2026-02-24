<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <article v-if="news" class="bg-white rounded-sm shadow-sm p-8">
      <header class="mb-8 pb-6 border-b border-gray-200">
        <h1 class="font-xuansong text-3xl text-gray-800 mb-4">{{ news.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span>{{ news.author }}</span>
          <span>{{ formatDate(news.date) }}</span>
        </div>
      </header>
      <ContentRenderer :value="news" class="prose prose-stone max-w-none" />
    </article>
  </div>
</template>

<script setup lang="ts">
import { useSlug } from '../../../composables/useSlug'
const { slug } = useSlug()

const { data: news } = await useAsyncData(`news-${slug}`, () =>
  queryCollection('news')
    .where('stem', '=', `news/${slug}`)
    .first()
)

if (!news.value) {
  throw createError({ statusCode: 404, statusMessage: '新闻不存在' })
}

import { formatDateYMD } from '../../../composables/useFormatDate'
const formatDate = formatDateYMD

useHead({
  title: `${news.value?.title} - 抹岚报社`
})
</script>

<style>
.prose h1, .prose h2, .prose h3, .prose h4 {
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif;
}
</style>
