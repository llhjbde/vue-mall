<script setup>
    import Nav from '@/views/Layout/components/LayoutNav.vue'
    import Footer from '@/views/Layout/components/LayoutFooter.vue'
    import {ref} from 'vue'

    import accountLogin from './components/accountLogin.vue'
    import codeLogin from './components/codeLogin.vue'
    import Findpw from './components/findpw.vue'
    
    const loginType = ref('account')  //默认账号登录
</script>

<template>
    <Nav />
    <div class="Login-page">
        <!--logo-->
        <div class="logo">
            <img src="@/assets/images/33971f5e8288417e90fcce72fc2cb0ba.jpg" alt="">
        </div>
        <!--主体部分-->
        <div class="Login-container">

            <!--左边图片-->
            <div class="left">
                <img src="@/assets/images/login.jpg" alt="">
            </div>
            <!--右侧注册-->
            <div class="rightLogin">
                <div class="container">
                    <accountLogin v-if="loginType==='account'" />
                    <codeLogin v-if="loginType==='code'" />
                    <findpw v-if="loginType==='find'" @success="loginType='account' "/>
                    <div class="LoginStyle">
                        <ul>
                            <li @click="loginType='account'">账号登录</li>
                            <li @click="loginType='code'">验证码登录</li>
                            <li @click="loginType='find'">忘记密码</li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
    <Footer />
</template>

<style scoped>
    .Login-page {
        margin: 0 auto;
        width: 1200px;
    }
    .Login-container {
        display: flex;
        margin: 35px auto;
        width: 900px;
        
        border-radius: 10px;
        overflow: hidden;

        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .left img {
        height: 100%;
    }
    .container {
        width: 100%;
    }
    .logo  img{
        height: 52px;
        margin-top: 35px;
        margin-left: 150px;
    }
    .rightLogin {
        width: 100%;
        display: flex;
        vertical-align: middle;
        padding: 100px 67px;
    }
    .LoginStyle {
        margin-top: 40px;
        
    }
    .LoginStyle ul li {
        color: #666666;
        user-select: none;
    }
    .LoginStyle ul {
        display: flex;
        justify-content: space-between;
    }
</style>