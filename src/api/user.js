import request from '@/utils/request';

const api = {

  // 注册
  register(data){
    return request({
      url:'/user/register',
      method:'post',
      data
    })
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
  },
  getSpaceInfo(id){
    return request({
      url:'/user/getSpaceInfo',
      method:'get',
      data:id
    })
  },
  getHaveRead(id){
    return request({
      url:'/user/getHaveRead',
      method:'get',
      data:id
    })
  },
 

  
}

export default api;
