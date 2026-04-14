<script setup>
    import { getDetails } from '@/apis/details'
    import { ref , onMounted , watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { LocationFilled , Flag } from '@element-plus/icons-vue'
    import ImageView from '@/components/ImageView/index.vue'
    import similarity from './components/similarity.vue'
    
    
    const route = useRoute()
    const goods = ref({})
    const count = ref(1)
    const activeTab = ref('detail')
    const selectedSku = ref(null)

    const mockData = {
        category_id: 1,
        sku_category: '数码产品',
        sku_list: [
            {
                sku_name: '黑色',
                image: 'https://asearch.alicdn.com/bao/uploaded/O1CN01J0s0vz22zX9bAYMKl_!!34907191.jpg',
                img: 'https://asearch.alicdn.com/bao/uploaded/O1CN01J0s0vz22zX9bAYMKl_!!34907191.jpg'
            },
            {
                sku_name: '白色',
                image: 'https://asearch.alicdn.com/bao/uploaded/O1CN011fuf5x1vullLv0UGU_!!2215176136233.jpg',
                img: 'https://asearch.alicdn.com/bao/uploaded/O1CN011fuf5x1vullLv0UGU_!!2215176136233.jpg'
            }
        ],
        detail: {
            subtitle: '高性能蓝牙耳机',
            description: '降噪 / 长续航 / 高音质',
            price: 299,
            click_count: 1234,
            rating_count: 56,
            rating: 4.8
        }
    }
    const getGood = async () => {
        try{
            const res = await getDetails(route.params.id)
            goods.value = res|| {}
            console.log(res);
        } catch {
             goods.value = mockData
        
        }
        
    }
    const getDetail = async (id) => {
        try {
            const res = await getDetails(id)
            goods.value = res || {}
         
        } catch {
            goods.value = mockData
        }
    }
    const increase = () => {
        count.value++
    }
    const decrease = () => {
        if(count.value>1) {
            count.value--
        }
    }


    watch(
        () => route.params.id,
        (newId) => {
            getDetail(newId)
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            })
        },
        { immediate: true }
    )
    onMounted(() => getGood())
</script>
<template>
    <div class="good-page">
        <div class="container">
            <!--面包屑导航-->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path:'/' }" class="location"><el-icon><LocationFilled /></el-icon><span>首页</span></el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/category/${goods.category_id}`}">{{ goods.sku_category }}</el-breadcrumb-item>
                    
                </el-breadcrumb>
            </div>
            <!--商品信息-->
            <div class="good-detail" v-if="goods.detail">
                <div>
                    <div class="good-info">
                        <div class="media">
                            <!--图片预览区-->
                            <ImageView :image-list="goods.sku_list" />
                            <!--统计数量-->
                            <ul class="good-sales">
                                <li>
                                    <p class="sales-title">点击量</p>
                                    <p class="sales-contain"> {{ goods.detail.click_count }} </p>
                                    <p class="sales-footer"><el-icon><Flag /></el-icon> <span>点击量</span></p>
                                </li>
                                <el-divider direction="vertical" style="height: 60px;margin:0 5px;" />
                                <li>
                                    <p class="sales-title">商品评价</p>
                                    <p class="sales-contain"> {{ goods.detail.rating_count }} </p>
                                    <p class="sales-footer"> 评分 {{ goods.detail.rating }} </p>
                                </li>
                                <el-divider direction="vertical" style="height: 60px;margin:0 5px;" />
                                <li>
                                    <p class="sales-title">商品分类</p>
                                    <p class="sales-contain">{{ goods.sku_category }}</p>
                                    <p class="sales-footer">分类主页</p>
                                </li>
                            </ul>
                        </div>
                        <!--商品信息区-->
                        <div class="spec">
                            <p class="g-name">{{ goods.detail.subtitle }}</p>
                            <p class="g-desc">{{ goods.detail.description }}</p>
                            <p class="g-price">
                                ￥<span>{{ goods.detail.price }}</span>
                            </p>
                            <div class="g-service">
                                <div>
                                    <span class="ser-title">服务</span>
                                </div>
                                <div class="ser-contain">
                                    <span>无忧退货</span>
                                    <span>快速退款</span>
                                    <span>免费包邮</span>
                                </div>
                            </div>
                            <!--商品规格-->
                            <div class="specification">
                                <div class="spec-title">
                                    规格
                                </div>
                                <div class="spec-contain">
                                    <ul>
                                        <li
                                            v-for="(item , index) in goods.sku_list" :key="index"
                                            @click="selectedSku = item.sku_name"
                                            :class="{ activeSku: selectedSku === item.sku_name }"
                                        >
                                            {{ item.sku_name }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!--数量选择-->
                            <div class="specification">
                                <div class="spec-title">数量</div>
                                <div class="count-control">
                                    <button @click="decrease">-</button>
                                    <span>{{ count }}</span>
                                    <button @click="increase">+</button>
                                </div>
                            </div>

                            <!--操作按钮-->
                            <div class="action">
                                <button class="buy">立即购买</button>
                                <button class="cart">加入购物车</button>
                            </div>
                        </div>
                    </div>

                    <div class="good-footer">
                        <!--同类商品-->
                        <div class="good-left">
                            <similarity :category-id="goods.category_id"
                                :current-id="goods.detail.id"
                            />
                        </div>
                        <!--Tab栏-->
                        <div class="good-tabs">
                            <ul class="tab-header">
                                <li
                                    :class="{ active: activeTab === 'detail' }"
                                    @click="activeTab = 'detail'"
                                >商品详情</li>
                                <li
                                    :class="{ active: activeTab === 'comment' }"
                                    @click="activeTab = 'comment'"
                                >评价晒单</li>
                            </ul>
                            <!--tab内容-->
                            <div class="tab-content">
                                <div v-if="activeTab === 'detail'">
                                    <div v-for="item in goods.sku_list" :key="item.id" class="img-detail">
                                        <img :src="item.image" alt="">
                                    </div>
                                </div>
                                <div v-if="activeTab === 'comment'">
                                    <p>这里是评价列表</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    body {
        margin: 0;
    }
    .good-page {
        width: 100%;
        margin: 0 auto;
        background-color: #F6F6F6;
        overflow: hidden;
    }
    .container {
        width: 1200px;
        margin: 0px auto;
    }
    .bread-container {
        margin: 26px auto;
    }
    .good-detail {
        background-color: white;
        width: 100%;
        padding: 40px 60px;
        margin-bottom: 20px;
    }
    .good-info {
        display: flex;
        gap: 40px;
    }
    .bread-container :deep(.el-breadcrumb__inner) {
        color: gray;
    }
    .el-breadcrumb {
        display: flex;
        align-items: center;
        
    }
    .bread-container :deep(.location .el-breadcrumb__inner) {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .good-sales {
        display: flex;
        gap: 40px;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    
    .good-sales li {
        text-align: center;
    }
    .sales-title {
        font-size: 14px;
        color: #999999;
    }
    .sales-contain {
        color: #CF4444;
        font-size: 14px;
    }
    .sales-footer {
        color: #666666;
        font-size: 14px;
    }


    .count-control {
        display: flex;
        align-items: center;
        border: 1px solid #ddd;
    }

    .count-control button {
        width: 30px;
        height: 28px;
        border: none;
        background: #f5f5f5;
        cursor: pointer;
        font-size: 16px;
        color: #666666;
        text-align: center;
    }

    .count-control span {
        width: 60px;
        font-size: 14px;
        text-align: center;
    }

    .media {
        width: 500px;
    }
    .spec {
        margin-left: 60px;
    }
    /* 商品标题 */
    .g-name {
        font-size: 22px;
        font-weight: 600;
        color: #333;
    }
    /* 描述 */
    .g-desc {
        margin: 10px 0;
        color: #999;
        font-size: 14px;
    }
    /* 价格 */
    .g-price {
        margin: 20px 0;
        color: #E73F30;
    }
    .g-price span {
        font-size: 28px;
        color: #E73F30;
        font-weight: bold;
    }
    /* 服务 */
    .g-service {
        display: flex;
        gap: 25px;
        color: #666;
        font-size: 14px;
        background-color: #F5F5F5;
        padding: 15px 20px;
        width: 450px;
        margin-top: 40px;
    }
    
    .ser-contain {
        display: flex;
        gap: 20px;
    }

    .specification {
        margin-top: 25px;
        display: flex;
        gap: 25px;
        align-items: center;
    }
    .ser-title,
    .spec-title {
        color: #999999;
        font-size: 14px;
    }
    .spec-contain ul {
        display: flex;
        gap: 10px;
        cursor: pointer;
    }
    .spec-contain li {
        color: #666666;
        padding: 3px 15px;
        border: 1px solid #E4E4E4;
        font-size: 15px;
    }

    /* 按钮 */
    .action {
        margin-top: 60px;
        display: flex;
        gap: 20px;
    }

    .action button {
        width: 150px;
        height: 40px;
        border: none;
        cursor: pointer;
        font-size: 16px;
    }

    .buy {
        background-color: #ff5000;
        color: white;
        border-radius: 5px;
    }

    .cart {
        background-color: #FFBA3D;
        color: white;
        border-radius: 5px;
    }
    .good-footer {
        display: flex;
        gap: 60px;
        margin-top: 60px;
    }
    .spec-contain ul .activeSku {
        border-color: #E93323;
        
    }
    /*tab*/ 
    
    .tab-header {
        display: flex;
        background-color: #F8F8FA;
        color: #434343;
        width: 850px;
    }
    .tab-header li {
        padding: 11px 21px;
        font-size: 15px;
        font-weight: 500;
        border-radius: 6px;
        cursor: pointer;
        
    }
    .active {
        background-color: #E93323;
        color: white;
    }
    .tab-content {
        padding: 65px 25px;
    }
</style>