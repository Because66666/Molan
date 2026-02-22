<template>
	<header class="top-bar">
		<div class="left">
			<span class="brand-global">抹岚报社</span>
			<span class="brand-zf"> | 方圆</span>
		</div>
		<nav class="right-nav" aria-label="主导航">
			<a href="#" class="nav-item">电子期刊阅览</a>
			<a href="#" class="nav-item">杂志新闻</a>
			<a href="#" class="nav-item">作者主页</a>
			<a href="#" class="nav-item">资料下载</a>
		</nav>
	</header>
</template>
<style scoped>
.top-bar {
	background-color: #920202;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	height: 80px;
	position: relative;
}

.left {
	display: flex;
	align-items: baseline;
	gap: 6px;
	position: absolute;
	left: 15%;
	transform: translateX(-50%);
}

.brand-global {
	font-family: inherit;
	font-weight: 550;
	font-size: 24px;
}

.brand-zf {
	font-family: 'ZhunSong', inherit;
	font-weight: 550;
	font-size: 24px;
	letter-spacing: 0.5px;
}

.right-nav {
	display: flex;
	gap: 12px;
	align-items: center;
	margin-left: auto;
}

.nav-item {
	color: #fff;
	text-decoration: none;
	padding: 8px 12px;
	border-radius: 4px;
	font-family: inherit;
	font-weight: 500;
    font-size: 18px;
	transition: background-color 0.15s ease, transform 0.08s ease;
}

.nav-item:hover {
	background-color: rgba(0,0,0,0.12);
	transform: translateY(-1px);
}

@media (max-width: 600px) {
	.top-bar { padding: 0 12px; height: 48px; }
	.brand-global, .brand-zf { font-size: 16px; }
	.nav-item { padding: 6px 8px; }
	.left { left: 12.5%; transform: translateX(-50%); }
}

</style>

<style>
@font-face {
	font-family: 'ZhunSong';
	src: url('/fonts/ZhunSong.otf') format('opentype'),
			 url('/fonts/%E5%87%86%E5%AE%8B.otf') format('opentype');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}
</style>