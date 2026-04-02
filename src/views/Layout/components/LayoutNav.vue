<script setup>
    import { PhoneFilled } from '@element-plus/icons-vue'
    import { ArrowDownBold } from '@element-plus/icons-vue'
    import { useUserStore } from '@/stores/user'
    import { useRouter } from 'vue-router'
    import { ElMessageBox, ElMessage } from 'element-plus'


    const router = useRouter()
    const userStore = useUserStore()
    
    const handleLogout = () => {
    // 弹窗确认
        ElMessageBox.confirm(
            '确定要退出登录吗？', 
            '提示', 
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            // 确认退出
            userStore.logout()
            ElMessage.success('已退出登录')
            router.push('/login')
        }).catch(() => {
            // 取消操作
            ElMessage.info('已取消退出')
        })
    }
</script>
<template>
    <nav class="app-topNav">
        <div class="container">
            <!-- 左侧导航栏 -->
            <ul class="left-Nav">
                
                <li><router-link to="/">返回首页</router-link></li>
                <li><a href="#">
                    <el-icon><PhoneFilled /></el-icon>客服电话：4000-538-999
                </a></li>
                <li><a href="#">全部商品</a></li>
            </ul>
            <!--右侧导航栏-->
            <ul class="right-Nav">
                <!--用户状态-->
                <!--未登录-->
                <template v-if="!userStore.token">
                    <li>
                        <router-link to="/login">你好，请登录！</router-link>
                    </li>
                    <li>
                        <RouterLink to="/register">注册</RouterLink>
                    </li>
                </template>

                <!--已登录状态-->
                <template v-else>
                    <li class="user-box">
                        <a href="#">
                            <div class="username">
                                <el-icon><ArrowDownBold /></el-icon>
                                <div>{{ userStore.userInfo.username }}</div>
                            </div>
                        </a>
                        <!-- 下拉菜单 -->
                        <ul class="dropdown">
                            <li><a href="#">个人中心</a></li>
                            <li><a href="#" @click.prevent="handleLogout">退出登录</a></li>
                        </ul>
                    </li>
                    <li><a href="#">我的订单</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
    .app-topNav {
        background-color: #E93323;
        /* background-color: #E3E4E5; */
        height: 40px;
        display: flex;
        align-items: center;
    }
    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        
        align-items: center;
        justify-content: space-between;
    }
    ul {
        display: flex;
        align-items: center;
        
    }
    .el-icon {
        vertical-align: middle;
        margin-right: 4px;
    }
    .username {
        display: flex;
        align-items: center;
    }
    a {
        color: white;
        /* color: #868883; */
        font-size: 14.5px;
    }
    a:hover {
        color: #fff;
        opacity: 0.8;
    }
    li {
        margin: auto 10px;
        
        
    }
    .user-box {
  position: relative;
}

/* 下拉菜单默认隐藏 */
.dropdown {
  position: absolute;
  top: 100%; 

  background: #E93323;

  width: 120px;
  border-radius: 4px;

  display: none;   /* 默认隐藏 */
  flex-direction: column;
}
.dropdown li {
    margin: 0;
}
/* 每一项 */

.dropdown li a:hover {
    background-color: #973333;
    
}
.dropdown li a {
    /* width: 100%; */
    display: block;
    padding: 8px 12px;
}
/* hover 显示 */
.user-box:hover .dropdown {
  display: block;  
  
}
    
</style>