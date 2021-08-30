import Cookies from 'js-cookie'
import api from '@/api/user.js'
const TokenKey = 'Token'
const UserInfo = 'UserInfo'

export function getToken() {
    return Cookies.get(TokenKey)
}
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function getUserInfo() {
    return Cookies.get(UserInfo)
}
export function setUserInfo(user) {
    return Cookies.set(UserInfo, user)
}
export function removeUserInfo() {
    return Cookies.remove(UserInfo)
}

const getDefaultState = () => {
    return {
        token: getToken(),
        userInfo: getUserInfo()
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
        setToken(token)
    },
    REMOVE_TOKEN: (state, token) => {
        removeToken()
        removeUserInfo()
        Object.assign(state, getDefaultState())
    },
    SET_USERINFO: (state, data) => {
        state.userInfo = data
        // removeUserInfo()
        setUserInfo(data)
    },
    REMOVE_USERINFO: (state) =>{
      removeUserInfo()
    },
    UPDATE_USERINFO: (state, data) => {
        Vue.set(state.userInfo, 'userPhoto', data.userPhoto)
    }
}

const actions = {
    login({ commit }, loginform) {
        return new Promise((resolve, reject) => {
            api.login(loginform).then(res=>{
                console.log(res)
                if (res.data.code === -1) {
                    reject(res.data.msg)
                } else if (res.data.code === 200) {
                    let userinfo = JSON.stringify(res.data.user)
                    commit('SET_TOKEN', res.data.token)
                    commit('SET_USERINFO', userinfo)
                }
                resolve()
            }).catch(err=>{
                reject(err)
            })
        })
    },
    register({ commit }, registerform) {
        return new Promise((resolve, reject) => {
            api.register(registerform).then(res=>{
                console.log(res)
                if (res.data.code === 400) {
                    reject(400)
                } else if (res.data.code === 200) {
                    let userinfo = JSON.stringify(res.data.user)
                    commit('SET_TOKEN', res.data.token)
                    commit('SET_USERINFO', userinfo)
                    
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit, state }) {
      removeToken()
      commit('REMOVE_USERINFO')
      commit('RESET_STATE')
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

