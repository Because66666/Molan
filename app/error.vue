<script setup lang="ts">
import BottomBar from "./layouts/bottom_bar.vue"
import TopBar from "./layouts/top_bar.vue"
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
</script>
<template>
  <TopBar />
  <h1>{{ error.status }}</h1>
  <NuxtLink to="/">返回主页</NuxtLink>
  <BottomBar />
</template>