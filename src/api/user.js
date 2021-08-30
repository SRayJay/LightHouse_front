import axios from '@/utils/http';

const api = {

  // 注册
  register(data){
    return axios.post('/api/user/register', data)
  },
  // 登录
  login(data){
    return axios.post('/api/user/login',data)
  }
}

export default api;
