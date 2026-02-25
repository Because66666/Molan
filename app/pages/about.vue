<template>
    <section class="max-w-7xl mx-auto px-4 py-12">
        <h1 class="section-title">关于我们</h1>

        <div class="card mt-6">
            <p class="text-gray-600">抹岚报社是RIA、审判之锤社群的非盈利社团，发行有社群内部月刊杂志《方圆》、不定期刊物《莉亚晚报》。该网站亦为非盈利用途。</p>
            <p class="text-gray-600">本网站由30266使用Github Copilot、OpenCode等AI工具构建。Because使用了Trae CN代码平台进行界面优化和维护，并致谢国产大模型GLM-4.7，Doubao-Seed-2.0-Code。</p>
            <p class="text-gray-600">网站框架为Nuxt.js 4，内容管理系统为@nuxt/content，使用vue-pdf-embed进行pdf嵌入式渲染。网站代码仓库位于<NuxtLink
                    to="https://github.com/30266-Official/Molan" target="_blank">https://github.com/30266-Official/Molan
                </NuxtLink>。</p>
            <p class="text-gray-600">本网站使用字体为汉仪玄宋，这是专有字体，但可以免费用作非商业用途。</p>
        </div>
    </section>
</template>

<script setup lang="ts">
useHead({ title: '关于我们 - 抹岚报社' })
</script>
