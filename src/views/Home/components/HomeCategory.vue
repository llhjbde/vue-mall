<script setup>
    import { getCategoryList } from '@/apis/home'
    import { ref, onMounted } from 'vue'
    import * as Icons from '@element-plus/icons-vue'

    const list = ref([])
    const activeIndex = ref(null)

    // 获取分类
    const getData = async () => {
        try{
            const res = await getCategoryList()
        
            //console.log(res)
            list.value = res.list || []
        }catch(e) {
            console.log(e.msg);
            list.value = [
                {
                    id: 1,
                    name: '分类1',
                    icon: 'House',
                    children: [
                        { id: 11, name: '子分类1' },
                        { id: 12, name: '子分类2' }
                    ]
                },
                {
                    id: 2,
                    name: '分类2',
                    icon: 'User',
                    children: [
                        { id: 21, name: '子分类A' }
                    ]
                }
        ]
        }
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
            <li 
                v-for="( item ) in list" :key="item.id"
                @mouseenter="activeIndex = item.id"
                @mouseleave="activeIndex = null"
            >
                <el-icon class="icon">
                    <component :is="getIcon(item.icon)|| Icons.Menu" />
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
                        <router-link :to="`/category/${sub.id}`">{{ sub.name }}</router-link>
                    </div>
                </div>
            </li>
        </ul>


    </div>
</template>
<style scoped>
    .category {
        /* width: 200px; */
        width: 100%;
        max-width: 200px;
        min-width: 160px;  
        background-color: white;
        border-radius: 8px;
        padding: 15px;
        padding-left: 10px;
        
    }
    .list li {
        position: relative;   
    }
    .sub-menu {
        position: absolute;
        left: 100%;
        top: 0;
        background: white;
        border-radius: 6px;
        padding: 10px 5px;
        min-width: 120px;
        border: 2px solid #FF5000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 999; 
    }
    .sub-item {
        padding: 5px 10px;
        color: #1F1F1F;
        font-size: 15px;
        border-radius: 5px;
    }
    a {
        color: #1F1F1F;
    }
    .sub-item:hover {
        background-color: #F7F7F7;
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