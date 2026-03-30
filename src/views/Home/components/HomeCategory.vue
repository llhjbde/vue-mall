<script setup>
    import { getCategoryList } from '@/apis/home'
    import { ref, onMounted } from 'vue'
    import * as Icons from '@element-plus/icons-vue'

    const list = ref([])
    const activeIndex = ref(null)

    // 获取分类
    const getData = async () => {
        const res = await getCategoryList()
        
        
        list.value = res.list || []
    }
    onMounted(() => {
        getData()
    })

    //
    const getIcon = (name) => Icons[name]
</script>
<template>
    <div class="category">
        <div class="title">分类</div>
        <ul class="list">
            <li v-for="( item ) in list" :key="item.id">
                <el-icon class="icon">
                    <component :is="getIcon(item.icon)" />
                </el-icon>
                <span>{{ item.name }}</span>

                <!--二级菜单-->
                <div
                    class="sub-menu"
                    v-if="activeIndex === item.id && item.children?.length"
                >
                    <div 
                        class="sub-item" 
                        v-for="sub in item.children" 
                        :key="sub.id"
                    >
                        {{ sub.name }}
                    </div>
                </div>
            </li>
        </ul>


    </div>
</template>
<style scoped>
    .category {
        width: 200px;
        background-color: white;
        border-radius: 8px;
        padding: 15px;
        padding-left: 10px;
    }
    .title {
        font-size: 17px;
        font-weight: 500;
        margin-left: 7px;
    }
    .list li {
        padding: 7px;
        display: flex;
        gap: 15px;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 16px;
        border-radius: 5px;
        align-items: center;
    }
    .list li:hover {
        background-color: #F7F7F7;
    }
</style>