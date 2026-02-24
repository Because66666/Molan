<template>
  <footer class="bg-paper border-t border-gray-200 mt-auto">
    <div class="gradient-line" />
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 border border-brick/50 rounded-sm flex items-center justify-center">
            <span class="font-xuansong text-brick/70 text-sm">方</span>
          </div>
          <div>
            <p class="font-xuansong text-brick">抹岚报社</p>
            <p class="text-xs text-gray-500">出版物《方圆》</p>
          </div>
        </div>

        <div class="text-center md:text-right text-sm text-gray-600 space-y-1">
          <p>&copy; {{ currentYear }} 抹岚报社 版权所有</p>
          <p class="text-xs">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="hover:text-brick">
              京ICP备XXXXXXXX号
            </a>
          </p>
          <p class="text-xs">
            本站内容采用 
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener" class="hover:text-brick">
              CC BY-NC-SA 4.0
            </a> 协议授权
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>
