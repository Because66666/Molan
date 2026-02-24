<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <article v-if="issue">
      <header class="mb-8 pb-8 border-b border-gray-200">
        <div class="flex items-center gap-4 mb-4">
          <span class="text-brick font-xuansong text-3xl">第 {{ issue.vol_number }} 期</span>
          <span v-if="issue.date" class="text-gray-500">{{ formatDate(issue.date) }}</span>
        </div>
      </header>

      <section class="mb-8">
        <h2 class="font-xuansong text-xl text-gray-800 mb-4">本期目录</h2>
        <ul v-if="issue.toc?.length" class="space-y-3">
          <li 
            v-for="(item, index) in issue.toc" 
            :key="index"
            class="flex items-start gap-4 py-2 border-b border-gray-100"
          >
            <span class="text-brick/50 font-medium w-6">{{ index + 1 }}</span>
            <div class="flex-1">
              <span class="font-medium text-gray-800">{{ item.title }}</span>
              <span v-if="item.author" class="text-gray-500 ml-2">/ {{ item.author }}</span>
            </div>
          </li>
        </ul>
        <p v-else class="text-gray-400">暂无目录</p>
      </section>

      <section v-if="issue.pdf_url">
        <h2 class="font-xuansong text-xl text-gray-800 mb-4">PDF 阅读</h2>
        <div class="bg-white rounded-sm border border-gray-200 p-4">
          <div v-if="pdfLoading" class="text-center py-12 text-gray-500">
            <div class="inline-block animate-spin mr-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            正在调取资源...
          </div>
          <iframe
            v-show="!pdfLoading"
            :src="issue.pdf_url"
            class="w-full h-[800px] rounded-sm"
            @load="pdfLoading = false"
          />
        </div>
        <a 
          :href="issue.pdf_url" 
          target="_blank" 
          rel="noopener"
          class="btn-brick inline-block mt-4 text-sm"
        >
          新窗口打开 PDF
        </a>
      </section>

      <section v-else class="text-center py-12 text-gray-400">
        暂无 PDF 文件
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const pdfLoading = ref(true)

const { data: issue } = await useAsyncData(`issue-${route.params.slug}`, () =>
  queryCollection('issues')
    .where('stem', '=', `issues/${route.params.slug}` as string)
    .first()
)

if (!issue.value) {
  throw createError({ statusCode: 404, statusMessage: '期刊不存在' })
}

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

useHead({
  title: `第 ${issue.value?.vol_number} 期 - 抹岚报社`
})
</script>
