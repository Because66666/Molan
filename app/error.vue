<script setup lang="ts">
import BottomBar from "./layouts/bottom_bar.vue"
import TopBar from "./layouts/top_bar.vue"
import type { NuxtError } from '#app'
const { error } = defineProps<{ error: NuxtError }>()
const reload = () => window.location.reload()
</script>

<template>
  <TopBar />
  <main class="error-root" role="main" aria-labelledby="error-title">
    <div class="card">
      <div class="left">
        <h1 id="error-title" class="code">{{ error?.status ?? 500 }}</h1>
        <p class="message">{{ error?.message ?? '抱歉，发生了意外错误。' }}</p>
        <div class="actions">
          <NuxtLink to="/" class="btn primary">返回主页</NuxtLink>
            <button type="button" class="btn" @click="reload">刷新页面</button>
        </div>
      </div>
    </div>
  </main>
  <BottomBar />
</template>

<style scoped>
:root {
  --bg: #f7f9fc;
  --card: #ffffff;
  --muted: #6b7280;
  --accent: #4f46e5
}

.error-root {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 32px
}

.card {
  max-width: 980px;
  width: 100%;
  background: var(--card);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  border-radius: 14px;
  display: flex;
  gap: 32px;
  padding: 40px;
  align-items: center
}

.left {
  flex: 1
}

.code {
  font-size: 96px;
  margin: 0;
  color: var(--accent);
  font-weight: 700;
  line-height: 1
}

.message {
  margin-top: 12px;
  color: var(--muted);
  font-size: 18px
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 12px
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
  border: 1px solid rgba(79, 70, 229, 0.08);
  color: var(--accent);
  background: transparent;
  font-weight: 600
}

.btn.primary {
  background: var(--accent);
  color: #000;
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.12);
}

.illustration {
  width: 220px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center
}

@media (max-width:720px) {
  .card {
    flex-direction: column;
    padding: 24px
  }

  .code {
    font-size: 64px
  }

  .illustration {
    width: 100%;
    height: 120px
  }
}
</style>