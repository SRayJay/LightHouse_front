<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="background_pic">
                <img class="background_pic_image" :src="BASEURL + userInfo.background" />
            </div>
            <div class="userinfo_container flex flex-row">
                <div class="flex flex-column">
                    <img class="user_avatar" :src="BASEURL + userInfo.avatar" />
                    <div class="btnBar">
                        <heart-outlined
                            v-if="!userInfo.isFollow"
                            @click="addFollow"
                            style="font-size:1.5rem;cursor: pointer;"
                            class="mr30"
                        />
                        <heart-filled
                            v-else
                            @click="addFollow"
                            style="color: #f20;font-size: 1.5rem;cursor: pointer;"
                            class="mr30"
                        />
                        <MailOutlined
                            @click="toMessage"
                            style="font-size: 1.5rem;cursor: pointer;"
                        />
                    </div>
                </div>
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
                <div class="mtitle">TA的动态</div>
            </div>
            <div class="barContainer">
                <div class="mtitle">TA的书摘</div>
            </div>
            <div class="barContainer">
                <div class="mtitle">TA的书评</div>
            </div>
            <div class="barContainer">
                <div class="mtitle">TA的书单</div>
                <!-- btnmore -->
                <BookListLine title="想读"></BookListLine>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, PropType, } from 'vue'
import userApi from '@/api/user'
import Header from '@C/Header.vue'
import { useStore } from 'vuex'
import { BASEURL } from '@/config'
import BookListLine from '@C/BookListLine.vue'
import { useRoute } from 'vue-router';
import { User } from '@/types'
import { HeartFilled, MailOutlined, HeartOutlined } from '@ant-design/icons-vue'
const route = useRoute()
const userid = route.params.id
let userInfo = ref(JSON.parse(route.params.userInfo as string))
console.log(userInfo)
const addFollow = () => {
    userApi.addFollow({ userid: userInfo.value._id }).then(res => {
        userInfo.value = res.user
        console.log(userInfo)
        userInfo.value.isFollow = res.isFollow
    })
}

const toMessage = () => {

}




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
    .btnBar {
        margin-top: 20px;
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