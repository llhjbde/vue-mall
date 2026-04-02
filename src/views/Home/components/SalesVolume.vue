<script setup>
    import { getHotProduct } from '@/apis/home'
    import { ref , onMounted } from 'vue'

    const list=ref([])

    // 获取商品数据
    const getData = async () => {
        const res = await getHotProduct()
        
        console.log(res)
        list.value = res.list || []
    }
    onMounted(() => {
        getData()
    })
</script>
<template>
    <div class="ProductContainer">
        <div class="saleProduct">
            <div class="ProductTitle">
                <div class="ImgDiv">
                    <img src="https://gw.alicdn.com/imgextra/i2/O1CN011E0R1J23w9lJDeJXk_!!6000000007319-2-tps-192-192.png" class="ImgTitle">
                </div>
                <div>
                    <div class="one">猜你喜欢</div>
                    <div class="two">精选销量领先</div>
                </div>
            </div>
            <div class="salelist">
                <div class="card" v-for="item in list" :key="item.id">
                    <img class="product-img" src="https://asearch.alicdn.com/bao/uploaded/O1CN01IFBGyV1ZMwmzSaJbT_!!4145993181.jpg" alt="">
                    <div class="product-info">
                        <div class="title">【独立包装】不多言芋泥牛奶泡芙雪媚娘</div>
                        <span class="sold">评分 {{ item.rating }}</span>
                        <div class="price">￥ 36.00</div>
                    </div>
                </div>
            </div>
                
        </div>
    </div>
</template>
<style scoped>
    .saleProduct {
        width: 100%;
        
        
    }
    .ProductContainer {
        margin-top: 25px;
        width: 100%;
    }


    .salelist {
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #FF5000;
        width: 100%;
        margin: 20px auto;
        border-radius: 13px;
        background-color: #FDF7F7;
        

        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        overflow: hidden;
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
    .product-img {
        width: 100%;
        border-radius: 10px;
    }
    .sold {
        background-color: #FBF1E7;
        color: #D98329;
        font-size: 13px;
    }
    .price {
        margin-top: 15px;
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 500;
        color: #FF5000;
    }


    .ProductTitle {
        display: flex;
        gap: 15px;
        align-items: center;
    }
    .ImgTitle {
        width: 52px;
        
    }
    .ImgDiv {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background-color: #FFF1EB;
    }
    .one {
        color: #FF5000;
    }
    .two {
        font-size: 13px;
        color: #FF5000;
    }
</style>