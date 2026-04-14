<script setup>
    import { getProductList } from '@/apis/home'
    import { ref , onMounted } from 'vue'
    import { ShoppingBag } from '@element-plus/icons-vue'

    const list = ref([])
    const loading = ref(false)

    // 获取商品数据
    const getData = async () => {
        loading.value = true
        const res = await getProductList()
        
        //console.log(res)
        list.value = res.list || []
        loading.value = false
    }
    //页面滚动到底加载更多数据
    const handleScroll = () => {
        const scrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
        if (scrollBottom < 200 && !loading.value) {
            loading.value = true
            setTimeout(() => {
                list.value.push(...list.value.slice(0, 10))
                loading.value = false
            }, 500);
        }
    }

    onMounted(() => {
        getData()
        window.addEventListener('scroll', handleScroll)
    })
</script>
<template>
    <div>
        <div class="Product">
            <div class="ProductTitle">
                <el-icon><ShoppingBag /></el-icon>
                <div>为你推荐</div>
            </div>
            <div class="salelist" v-if="list.length">
                <div class="card" v-for="item in list" :key="item.id + Math.random()">
                    <RouterLink :to="`/details/${item.id}`">
                        <img class="product-img" v-lazy="item.main_image"  alt="">
                        <div class="product-info">
                            <div class="title">{{ item.subtitle }}</div>
                            <div class="price">￥ {{ item.price }}</div>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div v-if="loading" class="loading">加载中...</div>
                
        </div>
    </div>
</template>

<style scoped>
    .Product {
        width: 100%;
    }
    .salelist {
        
        width: 100%;
        margin: 20px auto;


        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
    }
    .card {
        border-radius: 10px;
        padding: 4px;
    }
    .card:hover {
        border: 1px solid #FF5000;
    }
    .product-img {
        width: 100%;
        border-radius: 10px;
    }
    
    .price {
        margin-top: 25px;
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 500;
        color: #FF5000;
    }
    .title {
        color: #333333;
    }
    .ProductTitle {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 25px;
        color: #FF0F23;
    }

    .loading {
        width: 100%;
        text-align: center;
        margin: 20px auto;
        color: gray;
    }
</style>