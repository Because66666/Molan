<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <article v-if="author" class="bg-white rounded-sm shadow-sm p-8">
      <header class="text-center mb-8 pb-8 border-b border-gray-200">
        <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-paper-dark flex items-center justify-center overflow-hidden">
          <img v-if="author.avatar" :src="author.avatar" :alt="author.name" class="w-full h-full object-cover">
          <span v-else class="font-xuansong text-4xl text-brick/50">
            {{ author.name?.charAt(0) }}
          </span>
        </div>
        <h1 class="font-xuansong text-3xl text-gray-800 mb-2">{{ author.name }}</h1>
        <p v-if="author.bio" class="text-gray-500">{{ author.bio }}</p>
        <p v-if="author.position" class="text-gray-500">{{ author.position }}</p>
        <div v-if="author.socials" class="flex justify-center gap-4 mt-4">
          <a v-if="author.socials.QQ" class="text-gray-400 hover:text-brick transition-colors">
            QQ：{{ author.socials.QQ }}
          </a>
        </div>
      </header>
      <!-- 调试：显示 author 对象的 JSON，方便定位字段 -->
      <pre class="mt-4 p-4 bg-gray-50 text-sm overflow-auto">{{ JSON.stringify(author, null, 2) }}</pre>

      <ContentRenderer :value="author" class="prose prose-stone max-w-none" />
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: author } = await useAsyncData(`author-${route.params.slug}`, () =>
  queryCollection('authors')
    .where('stem', '=', `authors/${route.params.slug}` as string)
    .first()
)

if (!author.value) {
  throw createError({ statusCode: 404, statusMessage: '作者不存在' })
}

useHead({
  title: `${author.value?.name} - 抹岚报社`
})
</script>
