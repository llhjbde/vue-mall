<template>
    <div class="container">
        
        <ul class="rightlist">
            <li v-for="i in 4" :key="i" class="oneli">
                <img src="https://img.alicdn.com/imgextra/i2/O1CN01qceCje1JrbZc8E0Qi_!!6000000001082-2-tps-512-176.png" alt="">
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .container {
        width: 260px;
        height: 448px;
        
    }
    .rightlist {
        display: flex;
        flex-direction: column; 
        gap: 20px;
        height: 100%;
        
    }
    .oneli {
        flex: 1;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }
</style>