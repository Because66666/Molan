<template>
  <div class="min-h-screen flex flex-col bg-paper">
    <Header />
    <main class="flex-1 flex items-center justify-center px-4">
      <div class="text-center">
        <div class="mb-8">
          <span class="font-xuansong text-8xl md:text-9xl text-brick">
            {{ error?.statusCode || 404 }}
          </span>
        </div>
        <h1 class="font-xuansong text-2xl md:text-3xl text-gray-800 mb-4">
          版面佚失
        </h1>
        <p class="text-gray-500 mb-8 max-w-md mx-auto">
          {{ error?.statusMessage || '您寻找的页面似乎已丢失' }}
        </p>
        <button 
          @click="handleError"
          class="btn-brick"
        >
          返回首页
        </button>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: `${props.error?.statusCode || '错误'} - 抹岚报社`
})
</script>
