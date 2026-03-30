import axios from 'axios'
import {ElMessage} from 'element-plus'

//创建axios实例
const request=axios.create({
    baseURL:"http://192.168.0.133:8080",
    timeout:5000
})

//请求拦截器
request.interceptors.request.use(
    config=>{
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error=>Promise.reject(error)
)

//响应拦截器
request.interceptors.response.use(
  res => {
    const data = res.data

        // 根据后端返回结构判断
        if (data.code === 200) {
            return data.data
        } else {
            ElMessage.error(data.message || '请求失败')
            return Promise.reject(data)
        }
    },
    error => {
        ElMessage.error('网络错误')
        return Promise.reject(error)
    }
)

export default request