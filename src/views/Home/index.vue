<script setup>
    import HomeBanner from './components/HomeBanner.vue'
    import HomeCategory from './components/HomeCategory.vue'
    import HomeProductList from './components/HomeProductList.vue'
    import HomeRight from './components/HomeRight.vue'
    import SalesVolume from './components/SalesVolume.vue'
</script>
<template>
    <div class="homePage">
        <div class="Home-container">
            <HomeCategory />
            <HomeBanner />
            <HomeRight />
        </div>
        <div class="SalesVolume">
            <SalesVolume />
        </div>
        <HomeProductList />
    </div>
</template>
<style scoped>
    .homePage {
        width: 1200px;
        
        margin: 0 auto;
        
    }
    
    .Home-container {
        display: flex;
        gap: 15px;
        /* justify-content: space-between; */
        background-color: #F7F7F7;
        padding: 16px;
        border-radius: 8px;
        
    }
  
</style>