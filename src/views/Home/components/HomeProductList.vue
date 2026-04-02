<script setup>
    import { getProductList } from '@/apis/home'
    import { ref , onMounted } from 'vue'
    import { ShoppingBag } from '@element-plus/icons-vue'

    const list=ref([])

    // 获取商品数据
    const getData = async () => {
        const res = await getProductList()
        
        console.log(res)
        list.value = res.list || []
    }
    onMounted(() => {
        getData()
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
                <div class="card" v-for="item in list" :key="item.id">
                    <img class="product-img" src="https://img.alicdn.com/bao/uploaded/i1/2215359255277/O1CN014QtnPs1oqv5ZQolhN_!!2215359255277.jpg" alt="">
                    <div class="product-info">
                        <div class="title">{{ item.subtitle }}</div>
                        <div class="price">￥ 36.00</div>
                    </div>
                </div>
            </div>
                
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

    .ProductTitle {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 25px;
        color: #FF0F23;
    }
</style>