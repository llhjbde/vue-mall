import request from '@/utils/http'

// 注册验证码
export const sendCode = (data) => {
  return request.post('/api/user/send_code', data )
}

// 注册
export const register = (data) => {
  return request.post('/api/user/register', data)
}

// 密码登录
export const login = (data) => {
  return request.post('/api/user/login', data)
}

// 登录发送验证码
export const sendLoginCode = (email) => {
  return request.post('/api/user/send_login_code', email )
}

//验证码登录
export const LoginCode = (data) => {
  return request.post('/api/user/email_login', data)
}

//重置密码发送验证码
export const sentResetCode = (data) => {
  return request.post('/api/user/send_reset_password_code', data)
}

//重置密码
export const resetPassword = (data) => {
  return request.post('/api/user/reset_password', data)
}

