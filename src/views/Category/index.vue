<script setup>
    import { getCategoryAPI } from '@/apis/category'
    import { ref , onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    //获取数据
    const categoryData = ref({
        current_category: {}
    })
    const route = useRoute()
    const getCategory = async () => {
        const res = await getCategoryAPI(route.params.id)
        //console.log(res);
        
        categoryData.value = res
    }
    onMounted(()=>getCategory())
</script>
<template>
    <div class="category">
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }" class="layout">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryData.current_category.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="categoryProduct">
            <template v-if="categoryData.product_list?.length">
                <div
                    class="card"
                    v-for="item in categoryData.product_list"
                    :key="item.id"
                >
                    <RouterLink :to="`/details/${item.id}`">
                        <img :src="item.main_image" class="card-img">
                        <div class="name">{{ item.subtitle }}</div>
                        <div class="price">￥{{ item.price }}</div>
                    </RouterLink>
                </div>
            </template>
            <!-- 没数据 -->
            <div v-else class="empty">
                暂无商品
            </div>
        </div>
    </div>
</template>
<style scoped>
    .category {
        width: 100%;
        min-height: 500px;
        overflow: hidden;
        background-color: #F6F6F6;
    }
    .bread-container {
        width: 1200px;
        margin: 0px auto;
        padding: 20px 10px;
        
    }
    .categoryProduct {
        width: 1200px;
        
        margin: 0px auto;
        background-color: white;
        
        box-sizing: border-box;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(5, 1fr);
        padding: 10px;
        margin-bottom: 70px;
        border-radius: 13px;
    }
    .card {
        border-radius: 10px;
        padding: 4px;
        user-select: none;
        border: 1px solid transparent; 
        
    }
    .card:hover {
        border: 1px solid #FF5000;
    }
    .card-img {
        width: 100%;
        
        border-radius: 10px;
    }
    .price {
        margin-top: 20px;
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 500;
        color: #FF5000;
    }
    .name {
        color: #333333;
    }
    .empty {
        grid-column: 1 / -1; 
        text-align: center;
        padding: 60px 0;
        color: #999;
        font-size: 14px;
        user-select: none;
    }
</style>