/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
// import router from '@/router';
import store from '@/store/index';
// import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie'
import { message } from 'ant-design-vue';
import {BASEURL} from '../config'


const TOKEN_INVALID = '请重新登录'

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    $message.info(msg)
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//     router.replace({
//         path: '/login',
//         query: {
//             redirect: router.currentRoute.fullPath
//         }
//     });
// }

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
// const errorHandle = (status, other) => {
//     // 状态码判断
//     switch (status) {
//         // 401: 未登录状态，跳转登录页
//         case 401:
//             toLogin();
//             break;
//         // 403 token过期
//         // 清除token并跳转登录页
//         case 403:
//             tip('登录过期，请重新登录');
//             // localStorage.removeItem('token');
//             // store.commit('loginSuccess', null);
//             setTimeout(() => {
//                 toLogin();
//             }, 1000);
//             break;
//         // 404请求不存在
//         case 404:
//             tip('请求的资源不存在');
//             break;
//         default:
//             console.log(other);
//     }
// }

// 创建axios实例
var service = axios.create({ timeout: 1000 * 12,baseURL:BASEURL });
// 设置post请求头
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
service.defaults.headers.post['Content-Type'] = 'application/json';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
 service.interceptors.request.use(
    config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
        const token = store.state.user.token||Cookies.get('Token');
        token && (config.headers.Authorization = token);
        if(token){
            config.headers.token = token
        }
    
        return config;
    },
    error => Promise.error(error))

// 响应拦截器
service.interceptors.response.use((res)=>{
    const {code,msg,data} =res.data;
    if(code===200){
        return data;
    }else if(code===40001){
        message.error('接口错误',2)
        return Promise.reject('接口错误')
        // setTimeout()
    }else if(code===40002){
        // 身份错误
        message.error(TOKEN_INVALID,2)
        setTimeout({},1500)
        return Promise.reject(TOKEN_INVALID)
    }
})
function request(options){
    options.method = options.method || 'get';
    if(options.method.toLowerCase()==='get'){
        options.params = options.data
    }
    service.defaults.baseURL = BASEURL
    return service(options)
}
['get','post','put','delete','patch','options'].forEach((item)=>{
    request[item] = (url,data,params)=>{
        return request({
            url,
            data,
            method:item,
            // ...options
        })
    }
})   
    

export default request;
