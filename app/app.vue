<template>
  <TopBar />
  <NuxtPage />
  <BottomBar />
</template>

<script setup>
import TopBar from "./layouts/top_bar.vue"
import BottomBar from "./layouts/bottom_bar.vue"
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

#__nuxt {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>