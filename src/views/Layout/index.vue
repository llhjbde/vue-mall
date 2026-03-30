<script setup>
    import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
    import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
    import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
</script>
<template>
    <div>
        
        <LayoutNav />
        <LayoutHeader/>
        <RouterView />
        <LayoutFooter />
    </div>
    
</template>
<style scoped>
    /* div {
        background-color: #f1f1f1;
    } */
</style>