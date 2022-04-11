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
    },

    bookListAct(param){
        return request({
            url:'/book/bookListAct',
            method:'post',
            data:param
        })
    },
    getBooksByBelong(key){
        return request({
            url:'/book/getBooksByBelong',
            method:'get',
            data:key
        })
    },
    getRecommendBooks(data){
        return request({
          url:'/book/getRecommendBooks',
          method:'get',
          data
        })
      },
    getRelatedBooks(bookid){
        return request({
            url:'/book/getRelatedBooks',
            method:'get',
            data:bookid
        })
    }
}
export default api;