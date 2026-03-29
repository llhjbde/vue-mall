<script setup>
    import { ref } from 'vue'
    import {ElMessage} from 'element-plus'

    //接口
    import { sendCode } from '@/apis/user'

    const formRef=ref()
    const phoneForm = ref({
        email: '',
        code:'',
        agree:false,
    })
    const count = ref(0)
    

    //子传父
    const emit = defineEmits(['next'])

    //校验规则
    const rules = {
        email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式错误', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { len: 6, message: '验证码必须为6位', trigger: 'blur' }
        ],
        agree: [
            {
            validator: (_, value, callback) => {
                if (!value) {
                callback(new Error('请先同意协议'))
                } else {
                callback()
                }
            },
            trigger: 'blur'
            }
        ]
    }


    //获取验证码
    const getCode = async () => {
        // 只校验手机号
        await formRef.value.validateField('email')

            if (count.value > 0) return
            try{
                await sendCode({
                    email: phoneForm.value.email
                })
               //await sendCode(phoneForm.value.phone)

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

    //提交表单
    const next = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                ElMessage.error('请先填写完整信息')
                return
            }

            emit('next', {
                email: phoneForm.value.email,
                code: phoneForm.value.code
            })
    })
    }
</script>
<template>
    <div class="right">
        <div class="rightTop">
            <div class="hello">欢迎注册</div>
            <router-link to="/login">立即登录</router-link>
        </div>
        <el-form :model="phoneForm" size="large" ref="formRef" :rules="rules">
            
            <el-form-item prop="email">
                <div class="getCode">
                    <el-input v-model="phoneForm.email" placeholder="请输入邮箱"></el-input>
                    <el-button :disabled="count > 0" @click="getCode">
                        {{ count > 0 ? count + 's' : '获取验证码' }}
                    </el-button>
                </div>
            </el-form-item>

            <el-form-item prop="code">
                <el-input v-model="phoneForm.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="agreeBtn" @click="next">同意并继续</el-button>
            </el-form-item>

            <!--勾选框-->
            <el-form-item prop="agree">
                <el-checkbox v-model="phoneForm.agree">
                    我已阅读并同意
                    <a href="#">《用户协议》</a>
                </el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
    .getCode {
        display: flex;
        width: 100%;
    }
    .rightTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        
    }
    a {
        color: #434343;
    }
    .right > div {
        max-width: 400px;
    }
    .right {
        flex: 1;
        padding: 0px 70px;
        margin-top: 100px;
    }
    .el-form-item {
        margin-bottom: 20px;
        
    }
    .agreeBtn {
        width: 400px;
        margin: 0 auto;
        font-size: 17px;
        border: none;
        border-radius: 5px;
        background-color: #E93323;
        color: white;
    }
    .agreeBtn:active {
        background-color: #0939d4;
    }
    .hello {
        font-size: 25px;
        font-weight: 400;
        color: #434343;
        
    }
</style>