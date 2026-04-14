import request from "@/utils/http"

export const getDetails = (id) => {
    return request({
        url:'/api/index/product/detail',
        params: {
            id
        }
    })
}