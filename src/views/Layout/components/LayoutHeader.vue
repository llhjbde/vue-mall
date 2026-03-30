<script setup>

    import { Search } from '@element-plus/icons-vue'
    import { ShoppingCart } from '@element-plus/icons-vue'
</script>
<template>
    <header class="app-Header">
        <div class="container">
            <div class="logo">
                <img src="@/assets/images/33971f5e8288417e90fcce72fc2cb0ba.jpg" alt="logo">
            </div>
            <!--搜索栏-->
            <div class="search-box">
                <!--搜索框+按钮-->
                <div class="search-bar">
                    <input type="text" placeholder="请输入搜索关键词">
                    <button><el-icon><Search /></el-icon></button>
                </div>
                <!--热门词汇-->
                <div class="search-hot">
                    <a href="#">鞋子</a>
                    <a href="#">电脑</a>
                    <a href="#">数码办公</a>
                    <a href="#">衬衫</a>
                    <a href="#">香水</a>
                    <a href="#">手机</a>
                    <a href="#">夏装</a>
                </div>
            </div>
            <!--我的购物车-->
            <div class="shopping-cart">
                <a href="#"><el-icon><ShoppingCart /></el-icon>我的购物车</a>
            </div>
        </div>
    </header>
</template>
<style scoped>
    .app-Header {
        width: 100%;
        /*background-color: #fcfbfb;*/
        background-color: white;
    }
    .container {
        display: flex;
        /* gap: 120px; */
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        height: 140px;
        width: 1200px;
    }
    .logo img {
        height: 54px;
    }
    .search-box {
        flex: 1;
        margin-left: 120px;
        
    }
    .search-hot {
        display: flex;
        gap: 22px;
        font-size: 14px;
        
    }
    .search-hot a {
        color: #666666;
        margin-top: 10px;
    }
    .search-bar input {
        height: 38px;
        width: 480px;
        border: none;
       
        padding: 0 14px;
        outline: none;
    }
    .search-bar button {
        height: 38px;
        width: 60px;
        border: none;
        background-color: #E93323;

        cursor: pointer;
      
    }
    .search-bar .el-icon {
        color:white;
        font-size: 20px;
    }
    .search-bar {
        width: 540px;
        display: flex;
        border: 2px solid #E93323;
        border-radius: 6px;
        overflow: hidden; 
    }
    .shopping-cart {
        border:1px solid #DDDDDD;
        border-radius: 5px;
        padding: 9px 22px;
        font-size: 14px;
        color: #E93323;
    }
    .shopping-cart .el-icon {
        color: #E93323;
        font-size: 18px;
    }
    .shopping-cart a {
        color: #E93323;
        display: flex;
        align-items: center;
        gap: 6px;
    }
</style>