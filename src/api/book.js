import axios from '@/utils/http';

const api = {
    getHotBooks(){
        return axios.get("/api/book/hotBooks")
    }
}
export default api;