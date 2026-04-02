<script setup>
    import { getBanner } from '@/apis/home'
    import { ref, onMounted } from 'vue'

    const BannerList = ref([])

    //获取数据
    const getData = async () => {
        const res = await getBanner()
        //console.log(res);
        BannerList.value = res.list || []
    }

    onMounted(() => {
        getData()
    })
</script>
<template>
    <div class="banner">
        <el-carousel height="450px" autoplay :interval="3000" :pause-on-hover="true">
            <el-carousel-item v-for="item in BannerList" :key="item.id">
                <img :src="`http://192.168.0.133:8080${item.image}`" class="banner-img">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<style scoped>
    .banner {
        flex: 1;
        border-radius: 12px;
        
        background-color: white;
        
    }
    .banner-img {
        width: 100%;
        height: 450px;
         
        
    }
    .el-carousel-item {
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
</style>