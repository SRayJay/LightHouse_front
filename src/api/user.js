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

  
}

export default api;
