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
      },
    getReview(id){
      return request({
        url:'/editor/getReview',
        method:'get',
        data:id
      })
    },
    publishComment(data){
      return request({
        url:'/editor/publishComment',
        method:'post',
        data:data
      })
    }
}

export default api;