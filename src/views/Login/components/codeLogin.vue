<script setup>
    import { ref } from 'vue'
    import { sendLoginCode , LoginCode } from '@/apis/user'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user'

    const router = useRouter()
    const userStore = useUserStore()
    
    const LoginForm=ref({
        email:'',
        code:''
    })
    const formRef=ref()

    //规则校验
    const rules = {
        email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式错误', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { len: 6, message: '验证码必须为6位', trigger: 'blur' }
        ],
    }

    const count = ref(0)

    const getCode = async () => {
        //邮箱号
        await formRef.value.validateField('email')

            if (count.value > 0) return
            try{
                await sendLoginCode({
                    email: LoginForm.value.email
                })
              
                ElMessage.success('验证码已发送')

                count.value = 60
                const timer = setInterval(() => {
                    count.value--
                    if (count.value <= 0) clearInterval(timer)
                }, 1000)
            }catch(e) {
                
                    ElMessage.error(e.msg)
                
            }


    }
    //验证码登录
    const Login = async () => {
        try{
            await formRef.value.validate()
            const res = await LoginCode({
                email: LoginForm.value.email,
                code: LoginForm.value.code
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
                e?.msg|| 
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
                        <h2>验证码登录</h2>
                        
                        <router-link to="/register">立即注册</router-link>
                        
                    </div>
                    <el-form :model="LoginForm" size="large" ref="formRef" :rules="rules">
                        <el-form-item prop="email">
                            <div class="getCode">
                                <el-input v-model="LoginForm.email" placeholder="请输入邮箱"></el-input>
                                <el-button :disabled="count > 0" @click="getCode" class="codeBtn">
                                {{ count > 0 ? count + 's' : '获取验证码' }}
                                </el-button>
                            </div>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input class="codeIpt" v-model="LoginForm.code" placeholder="请输入验证码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button  class="code-Login" @click="Login">登录</el-button>
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
    .getCode {
        display: flex;
        width: 100%;
        height: 45px;
        
    }
    .codeBtn {
        height: 45px;
    }
    .account {
        width: 100%;
        
    }
    .LoginTop {
        margin-bottom: 30px;
    }

    .code-Login {
        width: 100%;
        font-size: 18px;
        background-color: #E93323;
        color: white;
        height: 45px;
        border: none;
        transition: all 0.1s ease;
    }
    .codeIpt {
        height: 45px;
    }
    
    .codeBtn:active {
        background-color: #0939d4;
        
    }
</style>