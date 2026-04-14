<script setup>
    import { ref,watch } from 'vue'
    import { getCategoryAPI } from '@/apis/category'

   


    // 接收父组件传值
    const props = defineProps({
        categoryId: {
            type: Number,
            required: true
        },
        currentId: Number
    })

    const simList = ref([])


    // 获取数据
    const getSimList = async () => {
        const res = await getCategoryAPI(props.categoryId)
        console.log(res);
        
        const list = res.product_list || []

        // 过滤当前商品
        simList.value = list.filter(item => item.id !== props.currentId)
    }

  

    watch(
        () => props.categoryId,
        () => {
            getSimList()
        },
        { immediate: true }
    )
</script>
<template>
    <div>
        <div class="sim-good">
            <div class="product_like_title">
                <div class="product_like_left"></div>
                <div class="title_block">相似商品</div>
            </div>
            <ul class="sim-list">
                <li v-for="item in simList" :key="item.id">
                    <RouterLink :to="`/details/${item.id}`">
                        <img :src="item.main_image" />
                        <div>
                            <p class="name">{{ item.subtitle }}</p>
                            <p class="price">￥{{ item.price }}</p>
                        </div>
                    </RouterLink>
                </li>
                
            </ul>
            <div v-if="simList.length<=0" class="noGood">
                暂无相似商品
            </div>
        </div>
    </div>
</template>
<style scoped>
    .noGood {
        font-size: 14px;
        color: #434343;
        margin: 20px 20px;
    }
    .sim-good {
        width: 300px;
    }
    .product_like_title {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .product_like_left {
        background-color: #E93323;
        width: 5px;
        height: 25px;
        border-radius: 0px 4px 4px 0px;
    }
    .title_block {
        font-size: 21px;
        font-weight: 500;
        color: #434343;
    }
    .sim-list li a {
        display: flex;
        gap: 15px;
        margin-top: 25px;
        color: #434343;
        font-size: 17px;
        img {
            height: 90px;
            width: 90px;
        }
        .price {
            color: #E73F30;
            margin-top: 38px;
            font-weight: 500;
        }
    }
    .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>