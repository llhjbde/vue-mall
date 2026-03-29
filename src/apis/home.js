import request from '@/utils/http'

// 分类列表接口
export const getCategoryList = () => {
  return request.get('/api/index/categories')
}

//轮播图接口
export const getBanner = () => {
  return request.get('/api/index/banners')
}