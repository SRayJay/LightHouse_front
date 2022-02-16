import request from '@/utils/request';

const api = {
    getHotBooks(){
        return request.get("/api/book/hotBooks")
    },
    getBook(id){
        return request({
            url:'/book/getBook',
            method:'get',
            data:id
        })
    }
}
export default api;