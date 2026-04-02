import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import lazyPlugin from 'vue3-lazyload'

import './styles/Element/index.scss'



import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus) 
app.use(createPinia())
app.use(router)
app.use(lazyPlugin)


app.mount('#app')
