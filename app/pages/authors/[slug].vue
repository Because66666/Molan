<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <article v-if="author" class="bg-white rounded-sm shadow-sm p-8">
      <header class="text-center mb-8 pb-8 border-b border-gray-200">
        <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-paper-dark flex items-center justify-center overflow-hidden">
          <img v-if="authorAvatar" :src="authorAvatar" :alt="author.name" loading="lazy" class="w-full h-full object-cover">
          <span v-else class="font-xuansong text-4xl text-brick/50">
            {{ author.name?.charAt(0) }}
          </span>
        </div>
        <h1 class="font-xuansong text-3xl text-gray-800 mb-2">{{ author.name }}</h1>
        <p v-if="author.bio" class="text-gray-500">{{ author.bio }}</p>
        <p v-if="author.position" class="text-gray-500">{{ author.position }}</p>
        <div v-if="author.socials" class="flex flex-col justify-center items-center gap-2 mt-4">
          <a v-if="author.socials.QQ" class="text-gray-400 hover:text-brick transition-colors">
            QQ：{{ author.socials.QQ }}
          </a>
          <div v-if="authorBlog" class="text-gray-400 hover:text-brick transition-colors">
            个人博客：
            <template v-if="isExternalBlog">
              <a :href="authorBlog" target="_blank" rel="noopener noreferrer">{{ authorBlog }}</a>
            </template>
            <template v-else>
              <NuxtLink :to="authorBlog">{{ authorBlog }}</NuxtLink>
            </template>
          </div>
        </div>
      </header>
      <ContentRenderer :value="author" class="prose prose-stone max-w-none" />
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlug } from '../../../composables/useSlug'
import { isSafeUrl, isExternalUrl } from '../../../composables/useSafeUrl'

const { slug } = useSlug()

const { data: author } = await useAsyncData(`author-${slug}`, () =>
  queryCollection('authors')
    .where('stem', '=', `authors/${slug}`)
    .first()
)

if (!author.value) {
  throw createError({ statusCode: 404, statusMessage: '作者不存在' })
}

// Normalize blog value and avatar; validate before use to avoid XSS via URLs.
const rawBlog = computed(() => (author.value as any)?.socials?.Blog)
const authorBlog = computed(() => (typeof rawBlog.value === 'string' && isSafeUrl(rawBlog.value)) ? rawBlog.value : '')
const isExternalBlog = computed(() => isExternalUrl(authorBlog.value))

const rawAvatar = computed(() => (author.value as any)?.avatar)
const authorAvatar = computed(() => isSafeUrl(rawAvatar.value) ? rawAvatar.value : '/pictures/default-avatar.png')

useHead({
  title: `${author.value?.name} - 抹岚报社`
})
</script>
