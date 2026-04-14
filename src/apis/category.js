import request from "@/utils/http"

export function getCategoryAPI(category_id) {
    return request({
        url: '/api/index/category/display',
        params: {
            category_id
        }
    })
}

//分类商品
export function getCategoryProduct() {

}