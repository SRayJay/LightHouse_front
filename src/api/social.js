import request from '@/utils/request'

const api = {
    getMoments(param){
        return request({
            url:'/social/getMoments',
            method:'get',
            data:param
        })
    }
}

export default api