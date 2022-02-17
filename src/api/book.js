import request from '@/utils/request';

const api = {
    getHotBooks(params){
        return request({
            url:'/book/hotBooks',
            method:'get',
            data:params
        })
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