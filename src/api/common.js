import axios from '@/utils/http';

const api = {

  // 上传头像
  uploadavatar(data){
    return axios.post('/api/uploadavatar', data)
  },

}

export default api;
