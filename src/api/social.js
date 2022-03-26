import request from '@/utils/request'

const api = {
    getMoments(param){
        return request({
            url:'/social/getMoments',
            method:'get',
            data:param
        })
    },
    getMomentById(param){
        return request({
            url:'/social/getMomentById',
            method:'get',
            data:param
        })
    },
    like(param){
        return request({
            url:'/social/like',
            method:'post',
            data:param
        })
    }
}

export default api