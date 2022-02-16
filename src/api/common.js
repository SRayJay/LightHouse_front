import request from '@/utils/request';

const api = {

  // 上传头像
  uploadavatar(data){
    return request.post('/api/uploadavatar', data)
  },

}

export default api;
