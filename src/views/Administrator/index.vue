<script setup>
    import Nav from '@/views/Layout/components/LayoutNav.vue'
    import Footer from '@/views/Layout/components/LayoutFooter.vue'
    import {ref} from 'vue'

    const LoginForm = ref({
        username: '',
        password: ''
    })

    const formRef = ref()

    const rules = {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
    }
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
                    <div class="right">
                        <div class="account">
                            <div class="LoginTop">
                                <h2>管理员登录</h2>
                                
                            </div>
                            <el-form :model="LoginForm" size="large" ref="formRef" :rules="rules">
                                <el-form-item prop="username">
                                    <el-input class="accountIpt" v-model="LoginForm.username" placeholder="请输入用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input class="accountIpt" v-model="LoginForm.password" placeholder="请输入密码" type="password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button  class="accountBtn" @click="Login">登录</el-button>
                                </el-form-item>
                            </el-form>
                            
                        </div>
                
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
    .right {
        width: 100%;
        display: flex;
        vertical-align: middle;
        
    }
    .LoginTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #434343;
        
    }
    a {
        color: #434343;
    }
    
    .account {
        width: 100%;
        
    }
    .LoginTop {
        margin-bottom: 30px;
    }

    .accountBtn {
        width: 100%;
        font-size: 18px;
        background-color: #E93323;
        color: white;
        height: 45px;
        border: none;
        transition: all 0.1s ease;
        margin-top: 30px;
    }
    .accountIpt {
        height: 45px;
    }
    
    .accountBtn:active {
        background-color: #0939d4;
        
    }
    .el-form {
        margin-top: 60px;
    }
</style>