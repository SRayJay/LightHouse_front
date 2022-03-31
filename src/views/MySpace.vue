<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="background_pic">
                <img class="background_pic_image" :src="BASEURL + userInfo.background" />
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
                <div class="mtitle mb10">我的动态</div>
                <BtnMore class="btnMore" @to-more="toMoments"></BtnMore>
                <CommunityMoment v-if="moments.length > 0" :actable="false" :moment="moments[0]"></CommunityMoment>
                <div class="cutline"></div>
                <CommunityMoment v-if="moments.length > 1" :actable="false" :moment="moments[1]"></CommunityMoment>
            </div>
            <div class="barContainer">
                <div class="mtitle">我的书摘</div>
            </div>
            <div class="barContainer">
                <div class="mtitle">我的书评</div>
                <BtnMore class="btnMore" @to-more="toReviews"></BtnMore>
                <ReviewItem v-if="reviews.length > 0" :review="reviews[0]"></ReviewItem>
                <div class="cutline"></div>
                <ReviewItem v-if="reviews.length > 1" :review="reviews[1]"></ReviewItem>
            </div>
            <div class="barContainer">
                <div class="mtitle">我的书单</div>
                <BtnMore class="btnMore" @to-more="toBookList"></BtnMore>
                <BookListLine title="想读" v-if="wantRead.length > 0" :book-list="wantRead"></BookListLine>
                <BookListLine title="在读" v-if="reading.length > 0" :book-list="reading"></BookListLine>
                <BookListLine title="已读" v-if="haveRead.length > 0" :book-list="haveRead"></BookListLine>
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
import CommunityMoment from '@C/CommunityMoment.vue'
import ReviewItem from '@C/ReviewItem.vue'
import BtnMore from '@C/BtnMore.vue'
import { Moment, Book, Review } from '@/types'
const store = useStore()
const userInfo = JSON.parse(store.state.user.userInfo)
console.log('userInfo', userInfo)
let moments = ref<Moment[]>([{ _id: '', creator: { _id: '', userName: '', avatar: '', signature: '' }, create_time: '', content: '', pics: [''], replys: [], likes: [] }])
let wantRead = ref<Book[]>([])
let reading = ref<Book[]>([])
let haveRead = ref<Book[]>([])
let reviews = ref<Review[]>([])
api.getSpaceInfo(userInfo._id).then(res => {
    moments.value = res.moments.reverse()
    wantRead.value = res.wantRead.reverse()
    reading.value = res.reading.reverse()
    haveRead.value = res.haveRead.reverse()
    reviews.value = res.reviews.reverse()

})
const toBookList = () => {
    console.log('toList')
}
const toReviews = () => {

}
const toMoments = () => {

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
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    position: relative;
}
.btnMore {
    position: absolute;
    right: 20px;
    top: 18px;
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
.cutline {
    width: 100%;
    height: 1px;
    background: #e2e2e2;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>