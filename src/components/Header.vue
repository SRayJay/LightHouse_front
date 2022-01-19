<template>
    <div class="header">
        <div class="content">
            <ul class="nav_line">
                <li class="nav">
                    <a href="#">主页</a>
                </li>
                <li class="nav">
                    <a href="#">主页</a>
                </li>
                <li class="nav">
                    <a href="#">主页</a>
                </li>
                <li class="nav">
                    <a href="#">主页</a>
                </li>
                <li class="nav">
                    <a href="#">主页</a>
                </li>
                <li class="nav">
                    <a href="#">主页</a>
                </li>
                <li class="nav">
                    <a href="#">主页</a>
                </li>
                <li class="search-bar">
                    <input ref="search_word" type="text" placeholder="搜索" @keyup.enter="search" />
                    <div class="search-icon" @click="search">
                        <img src="@/assets/icon/search.png" />
                    </div>
                </li>
                <li class="person">
                    <!-- <div v-if="isLogin"> -->
                    <!-- <el-dropdown class="dropdown">
              <div class="userInfoArea">
                <el-avatar
                  class="userAvatar"
                  :src="userAvatar"
                  fit="fill"
                />
                <div class="nametext"><span>{{ $store.state.user.userInfo.userName }}</span></div>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><div @click="toMySpace">个人主页</div></el-dropdown-item>
                  <el-dropdown-item> <div @click="toMoments">我的动态</div> </el-dropdown-item>
                  <el-dropdown-item><div @click="toBookLists">我的书单</div></el-dropdown-item>
                  <el-dropdown-item> <div @click="toReviews">我的书评</div> </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="toSetting">设置中心</div></el-dropdown-item>
                  <el-dropdown-item divided><div @click="logout">退出登录</div></el-dropdown-item>
                </el-dropdown-menu>
              </template>  
             
                    </el-dropdown>-->
                    <!-- </div> -->
                    <div>
                        <router-link to="/login">
                            <!-- <a-button>
                                <template #icon>
                                    <UserOutlined />
                                </template>登录/注册
                            </a-button>-->
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
import { defineComponent } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
export default defineComponent({
    name: 'Header',
    components: {
        UserOutlined,
    },
    setup() {
        const search = () => {

        }
        return {
            search,
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
            padding: 0.5em 0;
            .nav {
                line-height: 2.5em;
                * + * {
                    margin-left: 1.5rem;
                }
                a {
                    display: block;
                    color: #000;
                    padding: 0.5em 1em;
                }
                a:hover {
                    color: $light_blue;
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
                    padding: 0.3em 0;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
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
                .loginbtn {
                    height: 2.5rem;
                    padding: 0 0.6em;
                    line-height: 2.5rem;
                    border-radius: 25px;
                    border: none;
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
</style>