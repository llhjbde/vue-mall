<script setup>
    import { ref } from 'vue'
    import { login } from '@/apis/user'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user'

    const router = useRouter()
    const userStore = useUserStore()
    
    
    const LoginForm=ref({
        username:'',
        password:''
    })
    const formRef=ref()

    //规则校验
    const rules = {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '用户名长度3-12位', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' },
        ],
    }

    //账号登录
    const Login = async () => {
        try{
            await formRef.value.validate()
            const res = await login({
                username: LoginForm.value.username,
                password: LoginForm.value.password
            })
            ElMessage.success('登录成功')
            //保存res
            
            localStorage.setItem('token', res.token)

            localStorage.setItem('userInfo', JSON.stringify({
                user_id: res.user_id,
                username: res.username
            }))
            userStore.setUser(res)
            router.push('/')
            
        } catch(e) {
            console.log('登录失败:',e);
            ElMessage.error(
                e?.response?.data?.message || 
                e?.message || 
                '登录失败'
            )
        }
    }
</script>
<template>
    <div class="right">
                <div class="account">
                    <div class="LoginTop">
                        <h2>账号登录</h2>
                        
                        <router-link to="/register">立即注册</router-link>
                        
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
</template>
<style scoped>
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
    }
    .accountIpt {
        height: 45px;
    }
    
    .accountBtn:active {
        background-color: #0939d4;
        
    }
</style>