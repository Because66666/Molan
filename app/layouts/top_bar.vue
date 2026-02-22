<template>
    <header class="top-bar">
        <div class="left">
            <NuxtLink to="/" class="brand-link">
                <span class="brand-global">抹岚报社</span>
                <span class="brand-zf1">|</span>
                <span class="brand-zf">方圆</span>
            </NuxtLink>
        </div>
        <nav class="right-nav" aria-label="主导航">
            <NuxtLink to="/view" class="nav-item">电子期刊阅览</NuxtLink>
            <NuxtLink to="/news" class="nav-item">杂志新闻</NuxtLink>
            <NuxtLink to="/author" class="nav-item">作者主页</NuxtLink>
            <NuxtLink to="/download" class="nav-item">资料下载</NuxtLink>
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
    left: 10%;
    transform: translateX(-50%);
    max-width: 40%;
    box-sizing: border-box;
}

.brand-global {
    font-family: inherit;
    font-weight: 550;
    font-size: 24px;
}

.brand-zf,
.brand-zf1 {
    font-family: 'ZhunSong', inherit;
    font-weight: 550;
    font-size: 24px;
    letter-spacing: 0.5px;
}

.brand-zf1::before,
.brand-zf1::after {
    content: " ";
    white-space: pre;
}

.brand-link {
    text-decoration: none;
    color: inherit;
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    background-color: rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
}

@media (max-width: 600px) {
    .top-bar {
        padding: 8px 12px;
        height: auto;
        flex-direction: column;
        align-items: stretch;
        gap: 6px;
    }

    .brand-global,
    .brand-zf {
        font-size: 18px;
    }

    .nav-item {
        font-size: 16px;
        padding: 6px 8px;
    }

    .left {
        position: static;
        left: auto;
        transform: none;
        padding-left: 8px;
        justify-content: flex-start;
    }

    .right-nav {
        position: static;
        right: auto;
        top: auto;
        transform: none;
        align-self: flex-end;
        padding-right: 8px;
        display: flex;
        gap: 8px;
    }
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