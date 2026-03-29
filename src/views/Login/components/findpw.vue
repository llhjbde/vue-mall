<script setup>
    import { ref } from 'vue'
    import { sentResetCode } from '@/apis/user'
    import { resetPassword } from '@/apis/user'
    import { ElMessage } from 'element-plus'
    //import { useRouter } from 'vue-router'

    //const router = useRouter()

    const count = ref(0)

    const find=ref({
        email:'',
        code:'',
        new_password:'',
        confirm_password:''
    })
    const formRef=ref()

    const rules = {
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式错误', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { len: 6, message: '验证码必须为6位', trigger: 'blur' }
        ],
        new_password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' },
        ],
        confirm_password: [
            {
                required: true,
                trigger: 'blur',
                validator: (_, value, callback) => {
                    if (!value) {
                        callback(new Error('请再次输入密码'))
                    } else if (value !== find.value.new_password) {
                        callback(new Error('两次密码不一致'))
                    } else {
                        callback()
                    }
                }
            }
        ]
    }

    //子组件通知父组件
    const emit = defineEmits(['success'])


    //获取验证码
    const getCode = async () => {
        await formRef.value.validateField('email')
        if (count.value > 0) return
        try{
                await sentResetCode({
                    email: find.value.email
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

    //重置密码
    const reset = async () => {
        await formRef.value.validate()
        try{
            await resetPassword({
                email: find.value.email,
                code:find.value.code,
                new_password:find.value.confirm_password,
                confirm_password:find.value.confirm_password
            })
            ElMessage.success('重置密码成功')
            emit('success')

        }catch(e) {
            ElMessage.error(e.msg)
        }
    }
</script>
<template>
    <div>
        <el-form :model="find" size="large" ref="formRef" :rules="rules">
            <el-form-item prop="email">
                <div class="getCode">
                    <el-input v-model="find.email" placeholder="请输入邮箱"></el-input>
                    <el-button :disabled="count > 0" @click="getCode" class="codeBtn">
                    {{ count > 0 ? count + 's' : '获取验证码' }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item prop="code">
                <el-input class="codeIpt" v-model="find.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item prop="new_password">
                <el-input class="codeIpt" v-model="find.new_password" placeholder="请输入新密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="confirm_password">
                <el-input class="codeIpt" v-model="find.confirm_password" placeholder="再次输入新密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  class="resetpw" @click="reset">重置密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
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

    .resetpw {
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