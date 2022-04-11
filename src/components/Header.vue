<template>
    <div class="header">
        <div class="content">
            <ul class="nav_line">
                <!-- <li class="logo">
                    <img class="logo_pic" alt="Vue logo" src="@/assets/logo.png" />
                </li> -->
                <li class="logo_txt">LightHouse</li>
                <li class="nav">
                    <div @click="router.push('/')">主页</div>
                </li>
                <li class="nav">
                    <div @click="router.push('/community')">社区</div>
                </li>
                <li class="nav">
                    <div>排行榜</div>
                </li>
                <li class="nav">
                    <div @click="router.push('/category')">分类</div>
                </li>
                <li class="nav">
                    <div>专栏</div>
                </li>
                <li class="search-bar">
                    <input ref="search_word" type="text" placeholder="搜索" @keyup.enter="search" />
                    <div class="search-icon" @click="search">
                        <img src="@/assets/icon/search.png" />
                    </div>
                </li>
                <li class="person">
                    <div v-if="isLogin">
                        <a-dropdown class="dropdown">
                            <div class="userInfoArea">
                                <a-avatar
                                    class="userAvatar"
                                    :src="BASEURL + userAvatar"
                                    fit="fill"
                                />
                                <div class="nametext">
                                    <span>{{ userName }}</span>
                                </div>
                            </div>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>
                                        <div @click="toMySpace">个人主页</div>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <div @click="toMoments">我的动态</div>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <div @click="toBookLists">我的书单</div>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <div @click="toReviews">我的书评</div>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <div @click="router.push('/setting')">设置中心</div>
                                    </a-menu-item>
                                    <a-menu-item divided>
                                        <div @click="logout">退出登录</div>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                    <div v-else>
                        <router-link to="/login">
                            <button class="loginbtn">
                                <user-outlined />
                                <span id="btnword">登录/注册</span>
                            </button>
                        </router-link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" >
import { UserOutlined } from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, reactive, defineComponent } from 'vue'
import { message } from "ant-design-vue";
import { BASEURL } from '@/config'

export default defineComponent({
    name: 'Header',
    components: {
        UserOutlined,
    },
    setup() {
        const router = useRouter()
        const store = useStore()
        let search_word = ref(null)
        const search = () => {
            console.log(search_word.value.value)
            router.push({ name: 'SearchResult', params: { key: search_word.value.value } })
        }


        // 获取用户登录状态和基本信息
        let isLogin = ref<boolean>(false)
        let userAvatar = ref<string>('')
        let userName = ref<string>('')
        const getUserInfo = () => {
            if (store.state.user.userInfo) {
                isLogin.value = true
                console.log(JSON.parse(store.state.user.userInfo))
                let userInfo = JSON.parse(store.state.user.userInfo)
                userName.value = userInfo.userName
                userAvatar.value = userInfo.avatar

            }
        };

        getUserInfo();
        const toMySpace = () => {
            router.push('/myspace')
        }
        const toMoments = () => {

        }
        const toBookLists = () => {

        }
        const toReviews = () => {

        }
        const toSetting = () => {

        }
        const logout = () => {
            store.dispatch("user/logout").then(() => {
                message.success('注销成功')
                getUserInfo();
                isLogin.value = false
                userName.value = ''
                userAvatar.value = ''
            })



        }
        return {
            search,
            search_word,
            isLogin,
            BASEURL,
            toMySpace,
            toMoments,
            toBookLists,
            toReviews,
            toSetting,
            logout,
            userName,
            userAvatar,
            router,
        }
    }

})
</script>
<style lang="less" scoped>
.header {
    height: 4.75em;
    width: 100%;
    background: #f2f2f2;
    .content {
        width: 1024px;
        height: 100%;
        margin: 0 auto;
        .nav_line {
            display: flex;
            align-items: center;
            padding: 0.5em 0;
            .logo {
                .logo_pic {
                    width: 55px;
                    height: 55px;
                }
            }
            .nav {
                line-height: 2.5em;
                * + * {
                    margin-left: 1.5rem;
                }
                div {
                    color: #000;
                    padding: 0.5em 1em;
                    cursor: pointer;
                }
                div:hover {
                    color: @light_blue;
                }
            }
            .search-bar {
                margin-left: 2em;
                width: 14em;
                display: flex;
                align-items: center;
                input {
                    color: #444;
                    border: 1px solid #797979;
                    text-indent: 0.5em;
                    padding: 0.125em;
                    width: 181px;
                    height: 2rem;
                    border-top-left-radius: 0.5em;
                    border-bottom-left-radius: 0.5em;
                    border-color: rgba(121, 121, 121, 1);
                }
                .search-icon {
                    width: 43px;
                    height: 2rem;
                    padding: 0.2em 0;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                    cursor: pointer;
                    background: rgba(122, 122, 122, 1);
                    img {
                        width: 20px;
                        height: 20px;
                        text-align: center;
                    }
                }
            }
            .person {
                display: flex;
                margin-top: auto;
                margin-bottom: auto;
                margin-left: auto;
                .userInfoArea {
                    cursor: pointer;
                    padding-left: 5px;
                    display: flex;
                    position: relative;
                    align-items: center;
                    .userAvatar {
                        width: 36px;
                        height: 36px;
                        margin-right: 1em;
                    }
                    .nametext {
                        margin: auto;
                        overflow: hidden;
                        padding-right: 1em;
                        font-size: 1rem;
                        span {
                            display: inline-block;
                            margin: auto;
                            white-space: nowrap;
                            max-width: 98px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                    .nametext::after {
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0.8em;
                        border: 0.3em solid;
                        border-color: black transparent transparent;
                    }
                }
                .loginbtn {
                    height: 2.5rem;
                    padding: 0 0.6em;
                    line-height: 2.5rem;
                    border-radius: 25px;
                    border: none;
                    font-size: 1rem;
                    #btnword {
                        font-size: 12px;
                        padding-left: 5px;
                    }
                }
                .loginbtn:hover {
                    background: #fff;
                    color: #444;
                }
            }
        }
    }
}

.logo_txt {
    margin-left: 1em;
    font-size: 1.2em;
    line-height: 2.5em;

    // margin-right: 1.5em;
}
</style>