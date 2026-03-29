// stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))

  const setUser = (res) => {
    token.value = res.token
    userInfo.value = res

    localStorage.setItem('token', res.token)
    localStorage.setItem('userInfo', JSON.stringify(res))
  }

  const logout = () => {
    token.value = ''
    userInfo.value = {}

    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  return {
    token,
    userInfo,
    setUser,
    logout
  }
})