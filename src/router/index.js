import { createRouter, createWebHistory } from 'vue-router'

import login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

import register from '@/views/register/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'category/id:',
          component:Category
        }
      ]
      
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/register',
      component: register,
    },
  ],
})

export default router
