import request from '@/utils/request'
const baseURL = 'http://localhost:8888'

export function fecthList() {
    return request({
        url: `${baseURL}/swiper/list`,
        method: 'get'
    })
}

export function del(params) {
    return request({
        params: params,
        url: `${baseURL}/swiper/del`,
        method: 'get'
    })
}