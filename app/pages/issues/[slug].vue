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
        <h2 class="font-xuansong text-xl text-gray-800 mb-4">本期封面插图</h2>
        <ul v-if="covers.length" class="space-y-3">
          <li
            v-for="(c, index) in covers"
            :key="index"
            class="flex items-center gap-4 py-2 border-b border-gray-100"
          >
            <span class="text-brick/50 font-medium w-6">{{ Number(index) + 1 }}</span>
            <div class="flex-1 flex items-center">
              <span class="font-medium text-gray-800">{{ c.place }}</span>
              <span v-if="c.author" class="text-gray-500 ml-2">/ {{ c.author }}</span>
            </div>
          </li>
        </ul>
        <p v-else class="text-gray-400">暂无封面信息</p>

      </section>
      <section class="mb-8">
        <h2 class="font-xuansong text-xl text-gray-800 mb-4">本期目录</h2>
        <ul v-if="issue.toc?.length" class="space-y-3">
          <li 
            v-for="(item, index) in issue.toc" 
            :key="index"
            class="flex items-start gap-4 py-2 border-b border-gray-100"
          >
            <span class="text-brick/50 font-medium w-6">{{ Number(index) + 1 }}</span>
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
            <client-only>
              <div v-if="isPdfSafe" class="pdf-viewer flex gap-4">
                <div class="pdf-frame overflow-auto rounded-sm flex justify-center flex-1">
                  <VuePdfEmbed
                    :source="issue.pdf_url"
                    :page="currentPage"
                    class="w-full max-w-3xl "
                    @loaded="onPdfLoaded"
                    @rendered="onPdfRendered"
                    @rendering-failed="onPdfRenderingFailed"
                  />
                </div>
                <div class="pdf-controls flex flex-col items-center justify-center gap-4 w-24">
                  <button
                    @click="prevPage"
                    :disabled="currentPage <= 1"
                    class="w-20 h-20 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    上一页
                  </button>
                  <div class="flex flex-col items-center gap-2">
                    <input
                      v-model.number="pageInput"
                      @keyup.enter="goToPage"
                      type="number"
                      min="1"
                      :max="totalPages"
                      class="w-16 px-2 py-1 border border-gray-300 rounded-sm text-center text-sm"
                    />
                    <span class="text-sm text-gray-600">/ {{ totalPages }}</span>
                  </div>
                  <button
                    @click="nextPage"
                    :disabled="currentPage >= totalPages"
                    class="w-20 h-20 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    下一页
                  </button>
                </div>
              </div>
              <div v-else class="text-sm text-gray-500">
                无法安全嵌入此 PDF，您可以通过"新窗口打开 PDF"链接查看。
              </div>
            </client-only>
        </div>
        <a
          :href="issue.pdf_url"
          target="_blank"
          rel="noopener noreferrer"
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
import VuePdfEmbed from 'vue-pdf-embed'
import { computed, ref } from 'vue'
import { useSlug } from '../../../composables/useSlug'
import { formatDateYMD } from '../../../composables/useFormatDate'
import { isSafeUrl, isExternalUrl } from '../../../composables/useSafeUrl'

const { slug } = useSlug()

const { data: issue } = await useAsyncData(`issue-${slug}`, () =>
  queryCollection('issues')
    .where('stem', '=', `issues/${slug}`)
    .first()
)

if (!issue.value) {
  throw createError({ statusCode: 404, statusMessage: '期刊不存在' })
}

const formatDate = formatDateYMD

const covers = computed(() => {
  const c: any = (issue.value as any)?.cover
  if (!c) return []
  if (Array.isArray(c)) {
    const allObjects = c.every((it: any) => typeof it === 'object' && it !== null && !Array.isArray(it))
    if (allObjects) {
      const hasCombined = c.some((it: any) => Object.keys(it).length > 1)
      if (hasCombined) return c
      const merged = Object.assign({}, ...c)
      return [merged]
    }
    return c
  }
  if (typeof c === 'object' && c !== null) {
    return [c]
  }
  return [{ place: String(c) }]
})

useHead({
  title: `第 ${issue.value?.vol_number} 期 - 抹岚报社`
})

const isPdfSafe = computed(() => isSafeUrl((issue.value as any)?.pdf_url))

const currentPage = ref(1)
const totalPages = ref(0)
const pageInput = ref(1)

const onPdfLoaded = (pdf: any) => {
  if (pdf && pdf.numPages) {
    totalPages.value = pdf.numPages
  }
}

const onPdfRendered = (pdfPage: any) => {
  console.log('PDF page rendered:', currentPage.value, pdfPage)
}

const onPdfRenderingFailed = (error: any) => {
  console.error('PDF rendering failed for page:', currentPage.value, error)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    pageInput.value = currentPage.value
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    pageInput.value = currentPage.value
  }
}

const goToPage = () => {
  const page = Math.max(1, Math.min(pageInput.value, totalPages.value))
  currentPage.value = page
  pageInput.value = page
}
</script>

<style>
.pdf-frame {
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
}

.pdf-frame > * {
  max-width: 100%;
}

.pdf-frame iframe,
.pdf-frame embed,
.pdf-frame canvas {
  display: block;
  width: 100%;
  height: auto;
}
</style>
