<script setup>

</script>
<template>
    <footer class="app-footer">
        <div class="slogan">
            <ul>
                <li>价格亲民</li>
                <li>物流快捷</li>
                <li>品质新鲜</li>
            </ul>
        </div>
        <div class="base">
            <ul>
                <li>关于我们</li>
                <li>帮助中心</li>
                <li>售后服务</li>
                <li>配送与验收</li>
                <li>商务合作</li>
                <li>搜索推荐</li>
                <li>友情链接</li>
            </ul>
        </div>
    </footer>
</template>
<style scoped>
    .slogan {
        background-color: #2C2C2C;
        height: 230px;
        
    }
    .slogan ul{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 190px;
        height: 100%;
        color: white;
        font-size: 34px;
    }
    .base {
        background-color: #201f1f;
        height: 80px;
    }
    .base ul {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
    .base ul li {
        color: #929191;
        padding: 0 12px;
        font-size: 17px;
        border-right: 1px solid #929191;
        user-select: none;
    }
    .base ul li:last-child {
        border-right: none;
    }
</style>