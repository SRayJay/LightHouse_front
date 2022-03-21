<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="background_pic">
                <img class="background_pic_image" />
            </div>
            <div class="userinfo_container flex flex-row">
                <img class="user_avatar" :src="BASEURL + userInfo.avatar" />
                <div class="flex flex-column ml30">
                    <div class="username">{{ userInfo.userName }}</div>
                    <div class="signature">{{ userInfo.signature }}</div>
                    <div class="followAndFan">
                        <span class="num">{{ userInfo.focus.length }}</span>关注
                        <span class="num">{{ userInfo.followers.length }}</span>粉丝
                    </div>
                </div>
            </div>
            <div class="barContainer">
                <div class="mtitle">我的动态</div>
            </div>
            <div class="barContainer">
                <div class="mtitle">我的书摘</div>
            </div>
            <div class="barContainer">
                <div class="mtitle">我的书评</div>
            </div>
            <div class="barContainer">
                <div class="mtitle">我的书单</div>
                <!-- btnmore -->
                <BookListLine title="想读"></BookListLine>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/api/user'
import Header from '@C/Header.vue'
import { useStore } from 'vuex'
import { BASEURL } from '@/config'
import BookListLine from '@C/BookListLine.vue'
const store = useStore()
const userInfo = JSON.parse(store.state.user.userInfo)
console.log('userInfo', userInfo)

</script>
<style lang="less" scoped>
.wrap {
    width: 1024px;
    margin: 0 auto;
    padding-bottom: 30px;
}
.background_pic_image {
    width: 1024px;
    height: 465px;
}
.userinfo_container {
    height: 240px;
    margin-top: 40px;
    .user_avatar {
        width: 180px;
        height: 180px;
    }
    .username {
        font-size: 1.5rem;
        text-align: left;
    }
    .signature {
        font-size: 0.95rem;
        text-align: left;
        margin-top: 30px;
    }
    .followAndFan {
        font-size: 0.95rem;
        text-align: left;
        margin-top: 70px;
    }
    .num {
        color: #d81e06;
        font-size: 18px;
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;
    }
}
.barContainer {
    margin-top: 40px;
    width: 100%;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
}
.mtitle {
    font-size: 18px;
    position: relative;
    text-align: left;
    margin-left: 0px;
    margin-top: 0px;
    /* color: #03B615; */
    color: #0a7101;
}
</style>