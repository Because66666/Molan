<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      ICP: "https://icp.gov.moe/?keyword=20246111",
      CC4: "https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans",
      NuxtLink: "https://nuxtjs.org.cn/",
      fixed: false,
    }
  }
  ,
  mounted() {
    this.checkFooterPosition();
    window.addEventListener('resize', this.checkFooterPosition);
    // Observe DOM changes that may affect document height (do NOT observe attributes on body to avoid style-change feedback loops)
    this._observer = new MutationObserver(() => this.checkFooterPosition());
    this._observer.observe(document.body, { childList: true, subtree: true });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkFooterPosition);
    if (this._observer) this._observer.disconnect();
    // restore any body padding we set
    document.body.style.paddingBottom = '';
    // restore container min-height if we changed it
    if (this.$el) this.$el.style.minHeight = '';
    // no global layout mutations to restore
  },
  methods: {
    checkFooterPosition() {
      this.$nextTick(() => {
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const footerEl = this.$el && this.$el.querySelector('.footer');
        if (!footerEl) return;

        const containerEl = this.$el; // .app-container

        if (docHeight <= winHeight) {
          if (!this.fixed) {
            this.fixed = true;
            footerEl.classList.add('is-fixed');
            const h = footerEl.offsetHeight || 0;
            const newPadding = h + 'px';
            if (document.body.style.paddingBottom !== newPadding) {
              document.body.style.paddingBottom = newPadding;
            }
            if (containerEl) containerEl.style.minHeight = 'auto';
            // no global layout mutations — rely on flex layout instead
          }
        } else {
          if (this.fixed) {
            this.fixed = false;
            footerEl.classList.remove('is-fixed');
            if (document.body.style.paddingBottom) document.body.style.paddingBottom = '';
            if (containerEl) containerEl.style.minHeight = '';
            // rely on flex layout; nothing global to restore
          }
        }
      });
    }
  }
}
</script>

<template>
  <div class="app-footer-container">
    <footer class="footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-left">
          <p class="site-info">© 2021-{{ currentYear }} 抹岚报社</p>
          <p class="license"><a :href="CC4" target="_blank" rel="noopener">CC BY-NC 4.0</a> | <a :href="ICP" target="_blank" rel="noopener">萌ICP备20246111号</a></p>
        </div>

        <div class="footer-right">
          <p class="theme">Theme 2026 Spring By 书黎</p>
          <p class="powered">Powered By <a :href="NuxtLink" target="_blank" rel="noopener">Nuxt.js</a> | Lastest 2025.11.13</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  --footer-bg: #f8f9fa;
  --footer-border: #e9ecef;
  background-color: var(--footer-bg);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  padding: 14px 12px;
  margin-top: auto;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 6%;
  right: 6%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--footer-border) 20%, var(--footer-border) 80%, transparent 100%);
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

.footer-left,
.footer-right {
  color: #6c757d;
  font-size: 13px;
  line-height: 1.4;
  text-align: center;
}

.footer-left a,
.footer-right a {
  color: #6c757d;
  text-decoration: none;
}

.footer-left a:hover,
.footer-right a:hover {
  text-decoration: underline;
  color: #495057;
}

.site-info {
  font-weight: 600;
}

.license,
.powered {
  font-size: 12px;
  color: #6c757d;
}

@media (min-width: 640px) {
  .footer-inner {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .footer-left {
    text-align: right;
    margin-right: 8px;
  }

  .footer-right {
    text-align: left;
    margin-left: 8px;
  }
}

@media (min-width: 1024px) {
  .footer {
    padding: 18px 12px;
  }

  .footer-left, .footer-right {
    font-size: 14px;
  }
}

.app-footer-container {
  display: block;
}

.footer.is-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
</style>