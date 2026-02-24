<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="font-xuansong text-3xl text-brick mb-8">作者</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article 
        v-for="author in authors" 
        :key="author.id" 
        class="card group cursor-pointer text-center"
        @click="navigateTo(`/authors/${author.stem?.replace('authors/', '')}`)"
      >
        <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-paper-dark flex items-center justify-center overflow-hidden">
          <img 
            v-if="author.avatar" 
            :src="author.avatar" 
            :alt="author.name"
            class="w-full h-full object-cover"
          >
          <span v-else class="font-xuansong text-3xl text-brick/50">
            {{ author.name?.charAt(0) }}
          </span>
        </div>
        <h2 class="font-xuansong text-xl text-gray-800 group-hover:text-brick transition-colors mb-2">
          {{ author.name }}
        </h2>
        <p v-if="author.bio" class="text-gray-500 text-sm line-clamp-2">
          {{ author.bio }}
        </p>
      </article>
    </div>

    <div v-if="!authors?.length" class="text-center py-16 text-gray-400">
      暂无作者
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: authors } = await useAsyncData('authors', () =>
  queryCollection('authors')
    .order('name', 'ASC')
    .all()
)

useHead({
  title: '作者 - 抹岚报社'
})
</script>
