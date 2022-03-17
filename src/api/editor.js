import request from '@/utils/request';

const api = {
    publishReview(params){
        return request({
            url:'/editor/publishReview',
            method:'post',
            data:params
        })
    },
    checkReview(data){
        return request({
          url:'/editor/checkReview',
          method:'post',
          data:data
        })
      }
}

export default api;