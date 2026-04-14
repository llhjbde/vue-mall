<script setup>
    import { ref, watch } from 'vue'
    import { useMouseInElement } from '@vueuse/core'


    //props适配图片列表

    defineProps({
        imageList:{
            type: Array,
            default: () => {

            }
        }
    })


    //const imageList = [
    //    "https://asearch.alicdn.com/bao/uploaded/O1CN01J0s0vz22zX9bAYMKl_!!34907191.jpg",
    //    "https://asearch.alicdn.com/bao/uploaded/O1CN011fuf5x1vullLv0UGU_!!2215176136233.jpg"
    //]
    //1.小图切换大图显示
    const activeIndex = ref(0)

    const enterhandle = (i) => {
        activeIndex.value = i
    }

    //2.获取鼠标相对位置
    const left = ref(0)
    const top = ref(0)
    const show = ref(false)
    const target = ref(null)

    const positionX = ref(0)
    const positionY = ref(0)

    const { elementX, elementY, isOutside} = useMouseInElement(target)
    watch([elementX, elementY, isOutside],() => {
        if (isOutside.value) {
            show.value = false
            return
        }

        show.value = true
        const size = 120   // 滑块大小
        const max = 400 - size // 最大移动范围

        let x = elementX.value - size / 2
        let y = elementY.value - size / 2

        // 边界控制
        x = Math.max(0, Math.min(x, max))
        y = Math.max(0, Math.min(y, max))

        left.value = x
        top.value = y

        //控制大图的显示
        const maxMove = 800 - 400  // 大图 - 小图

        positionX.value = -(elementX.value / 400) * maxMove
        positionY.value = -(elementY.value / 400) * maxMove
    })

</script>
<template>
    <div class="goods-image">
        <!--左侧大图-->
        <div class="middle" ref="target">
            <img :src="imageList[activeIndex].image" alt="">
            <!--蒙层小滑块-->
            <div class="layer" v-show="!isOutside" :style="{left:`${left}px`,top:`${top}px`}"></div>
        </div>
        <!--小图列表-->
        <ul class="small">
            <li v-for="(item , i) in imageList" :key="i" @mouseenter="enterhandle(i)" :class="{active:i===activeIndex}">
                <img :src="item.image" alt="">
            </li>
        </ul>

        <!--放大镜大图-->
        <div class="large" :style="{
            backgroundImage: `url(${imageList[activeIndex].image})`,
            backgroundPositionX: `${positionX}px`,
            backgroundPositionY: `${positionY}px`
        }" v-show="show">

        </div>
    </div>
</template>
<style scoped lang="scss">
    .goods-image {
        position: relative;
        width: 500px;
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
    }

    /* 👉 大图区域 */
    .middle {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid #eee;
        overflow: hidden;
        cursor: crosshair;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    

    /* 👉 滑块 */
    .layer {
        position: absolute;
        width: 120px;
        height: 120px;
        background-color: rgba(255, 165, 0, 0.2);
        
        pointer-events: none; // 不影响鼠标
    }

    /* 👉 小图列表 */
    .small {
        margin-bottom: 15px;
        li {
            width: 70px;
            height: 70px;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            margin-bottom: 15px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            &:hover {
                border-color: #ff5000;
            }

            &.active {
                border-color: #ff5000;
            }
        }

    }

    
    
    

    /* 👉 放大图 */
    .large {
        position: absolute;
        left: 420px;
        top: 0;
        width: 400px;
        height: 400px;
        border: 1px solid #eee;

        background-repeat: no-repeat;
        background-size: 800px 800px; // 放大2倍

        z-index: 10;
    }
</style>