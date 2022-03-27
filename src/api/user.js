import request from '@/utils/request';

const api = {

  // 注册
  register(data){
    return request.post('/api/user/register', data)
  },
  // 登录
  login(body){
    return request({
      url:'/user/login',
      method:'post',
      data:body
    })
  },
  saveInfo(data){
    return request({
      url:'/user/saveInfo',
      method:'post',
      data:data
    })
  },
  getUserInfo(data){
    return request({
      url:'/user/getUserInfo',
      method:'get',
      data:data
    })
  },
  addFollow(data){
    return request({
      url:'/user/addFollow',
      method:'post',
      data
    })
  }

  
}

export default api;
