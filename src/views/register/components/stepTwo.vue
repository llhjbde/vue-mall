<script setup>
    import { ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { register } from '@/apis/user'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const props = defineProps({
        registerData: Object
    })
    const formRef = ref()
    const message = ref({
        username: '',
        password: '',
        passwordAgain: ''
    })
    const rules = {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '用户名长度2-10位', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' },
        ],
        passwordAgain: [
            {
            validator: (_, value, callback) => {
                if (value !== message.value.password) {
                callback(new Error('两次密码不一致'))
                } else {
                callback()
                }
            },
            trigger: 'blur'
            }
        ]
    }

    const submit = async () => {
        try {
            await formRef.value.validate()

            await register({
                email: props.registerData.email,   
                code: props.registerData.code,     
                username: message.value.username,
                password: message.value.password,
                confirm:message.value.passwordAgain
            })

            ElMessage.success('注册成功')
            router.push('/login')

        } catch (e) {
            
            ElMessage.error(e?.response?.data?.message)
            
        }
    }
</script>
<template>
    <div class="right">
        <div class="hello">欢迎注册</div>
        <el-form :model="message" size="large" ref="formRef" :rules="rules">
            <el-form-item prop="username">
                <el-input v-model="message.username" placeholder="用户名"></el-input>
            </el-form-item>
            

            <el-form-item prop="password">
                <el-input v-model="message.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="passwordAgain">
                <el-input v-model="message.passwordAgain" placeholder="请重新输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="agreeBtn" @click="submit">注册</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>
<style scoped>
    .getCode {
        display: flex;
        width: 100%;
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
        margin-bottom: 30px;
    }
</style>