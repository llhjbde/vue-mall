<script setup>
    import HomeBanner from './components/HomeBanner.vue'
    import HomeCategory from './components/HomeCategory.vue'
    import HomeProductList from './components/HomeProductList.vue'
    import HomeRight from './components/HomeRight.vue'
</script>
<template>
    <div class="homePage">
        <div class="container">
            <HomeCategory />
            <HomeBanner />
            <HomeRight />
        </div>
        <HomeProductList />
    </div>
</template>
<style scoped>
    .homePage {
        width: 1200px;
        height: 500px;
        margin: 0 auto;
        
    }
    template {
        background-color: #FEF7F7;
    }
    .container {
        display: flex;
        justify-content: space-between;
        background-color: white;
        padding: 10px;
        border-radius: 8px;
    }
</style>