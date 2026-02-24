
Molan — 基于 Nuxt 3 的内容型站点
=================================

项目简介
--------

Molan 是一个基于 `Nuxt 3` 与 `@nuxt/content` 的静态/服务端混合内容站点模板，使用 `Tailwind CSS` 做样式，目录中包含作者、期刊/期次、下载与新闻等内容页。适合作为内容发布、期刊或博客类站点的起点。

主要特性
--------

- 基于 Nuxt 4 的现代前端框架
- 使用 `@nuxt/content` 管理 Markdown 内容（`/content`）
- Tailwind CSS 快速构建样式（`tailwind.config.ts`）
- 完全支持静态导出，可部署到静态托管服务
- 已组织好的页面路由：作者、期刊、新闻、下载等

仓库结构（关键文件）
-------------------

- [nuxt.config.ts](nuxt.config.ts) — Nuxt 配置
- [content.config.ts](content.config.ts) — 内容模块配置
- [app/](app/) — Nuxt 应用入口与组件
	- [app/components/](app/components/) — 头部/页脚等组件
	- [app/pages/](app/pages/) — 页面路由（authors, issues, news, downloads）
- [content/](content/) — Markdown 内容（authors, issues, news, downloads）
- [config/](config/) — 静态配置文件（轮播图等）
- [public/](public/) — 静态资源（图片、PDF 等）

快速开始
--------

先安装依赖：

```bash
npm install
```

开发环境启动（本地热重载）：

```bash
npm run dev
```

构建用于生产环境（SSR 模式）：

```bash
npm run build
npm run preview
```

静态导出（用于静态托管服务）：

```bash
npm run generate
```

静态导出后，构建产物位于 `.output/public/` 目录，可直接部署到 GitHub Pages、Netlify、Vercel 等静态托管服务。

内容与编辑
----------

- 所有基于内容的页面数据放在 `content/` 目录下，使用 Markdown 文件（例如 `content/authors/*.md`、`content/issues/*.md`、`content/news/*.md`、`content/downloads/*.md`）。
- 如需调整内容字段或集合，编辑 [content.config.ts](content.config.ts)。

开发提示
--------

- 组件位于 [app/components/](app/components/)，页面位于 [app/pages/](app/pages/)。
- 轮播图配置位于 [config/carousel.ts](config/carousel.ts)，添加新图片需同时更新配置文件和 `public/pictures/` 目录。
- 使用 Tailwind 类快速构建响应式样式，样式入口为 [app/assets/css/tailwind.css](app/assets/css/tailwind.css)。

部署
----

本项目支持两种部署方式：

### 静态部署（推荐）

```bash
npm run generate
```

将 `.output/public/` 目录部署到静态托管服务：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- 等任何支持静态文件托管的服务

### SSR 部署

```bash
npm run build
```

将构建产物部署到支持 Node.js 的主机或 Serverless 平台。

贡献
----

欢迎提交 issue 或 PR：

- 修改或新增页面组件请放在 `app/pages` 与 `app/components`。
- 内容更新请在 `content/` 下以 Markdown 文件形式提交。

许可证
----

本项目未在仓库中明确声明许可证，请在发布前与作者确认或添加合适的 `LICENSE` 文件。

联系方式
----

如需帮助或有建议，请在仓库中打开 issue。
