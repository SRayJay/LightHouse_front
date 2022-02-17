import request from '@/utils/request';

const api = {

  // 上传头像
  uploadavatar(data){
    return request.post('/api/uploadavatar', data)
  },
  getAuthors(key){
    return request({
      url:'/author/getAuthors',
      method:'get',
      data:key
    })
  },
  getAuthorById(params){
    return request({
      url:'/author/getAuthorById',
      method:'get',
      data:params
    })
  },
  search(key){
    return request({
      url:'/other/search',
      method:'get',
      data:key
    })
  }

}

export default api;
