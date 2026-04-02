<script setup>
    import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
    import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
    import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
    import { Top } from '@element-plus/icons-vue'
    import { ref, onMounted, onBeforeUnmount } from 'vue'

    const showBackTop = ref(false) 

    const handleScroll = () => {
  showBackTop.value = window.scrollY > 500  // 滚动超过 500px 显示按钮
}

// 点击回到顶部
    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 平滑滚动
        })
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })
</script>
<template>
    <div>
        
        <LayoutNav />
        <LayoutHeader/>
        <RouterView />
        <LayoutFooter />
    </div>
    <div>
        <button 
            v-show="showBackTop" 
            class="back-top" 
            @click="backToTop">
                <el-icon class="backTop"><Top /></el-icon>
        </button>
    </div>
</template>
<style scoped>
    .back-top {
        position: fixed;       /* 固定在页面右下角 */
        right: 100px;
        bottom: 100px;
        width: 45px;
        height: 45px;
        background-color: #F7F7F7;
        color: #717171;
        
      
        border: none;
        border-radius: 50%;
        cursor: pointer;
        
        align-items: center;
        
        z-index: 999;   
        display: flex;             
        justify-content: center;  
        align-items: center;    

    }
    .back-top:hover {
       
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .backTop {
        font-size: 40px;
    }
</style>