import request from '@/utils/request';

const api = {

  // 注册
  register(data){
    return request.post('/api/user/register', data)
  },
  // 登录
  login(data){
    return request.post('/api/user/login',data)
  },

  
}

export default api;
