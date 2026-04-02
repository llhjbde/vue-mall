import request from '@/utils/http'

// 分类列表接口
export const getCategoryList = () => {
  return request.get('/api/index/categories')
}

//轮播图接口
export const getBanner = () => {
  return request.get('/api/index/banners')
}

//所有商品接口
export const getProductList = () => {
  return request.get('/api/index/products')
}

//商品人气推荐
export const getHotProduct = () => {
  return request.get('/api/index/products/hot')
}