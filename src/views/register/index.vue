<script setup>
    import Nav from '@/views/Layout/components/LayoutNav.vue'
    import Footer from '@/views/Layout/components/LayoutFooter.vue'
    import PhoneReg from '@/views/register/components/registerPhone.vue'
    import StepTwo from './components/stepTwo.vue';

    import {ref} from 'vue'

    const step = ref(1)
    //email+code
    const registerData = ref({})
    //接收第一步的数据
    const handleNext = (data) => {
        registerData.value = data
        step.value = 2
    }
    
</script>

<template>
    <Nav />
    <div class="register-page">
        <!--logo-->
        <div class="logo">
            <img src="@/assets/images/33971f5e8288417e90fcce72fc2cb0ba.jpg" alt="">
        </div>
        <!--主体部分-->
        <div class="register-container">

            <!--左边图片-->
            <div class="left">
                <img src="@/assets/images/login.jpg" alt="">
            </div>
            <!--右侧注册-->
            <div>
                          
                <PhoneReg v-if="step===1" @next="handleNext" /> 
                <StepTwo v-else :registerData="registerData" />            
            </div>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
    .register-page {
        margin: 0 auto;
        width: 1200px;
    }
    .register-container {
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
    .logo  img{
        height: 52px;
        margin-top: 35px;
        margin-left: 150px;
    }

    
   
    
    
    
</style>