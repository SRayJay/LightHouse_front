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
                <div v-if="moments.length===0" style="margin:20px 0;color:#7f7f7f">暂无动态</div>
                <CommunityMoment v-if="moments.length > 0" :actable="false" :moment="moments[0]"></CommunityMoment>
                <div v-if="moments.length>1" class="cutline"></div>
                <CommunityMoment v-if="moments.length > 1" :actable="false" :moment="moments[1]"></CommunityMoment>
                
            </div>
            <div class="barContainer">
                <div class="mtitle">我的书摘</div>
                <BtnMore class="btnMore" @to-more='toExcerpts'></BtnMore>
                <div v-if="excerpts.length===0" style="margin:20px 0;color:#7f7f7f">暂无书摘</div>
                 <div class="excerpt_item"
                    v-for="excerpt in excerpts.slice(0,2)"
                    :key="excerpt._id">
                    <div>
                        <img :src="BASEURL+excerpt.related_book.cover" width="67" height="100" />
                    </div>
                        <div class="excerpt_content">
                            {{excerpt.text}}
                        </div>
                    </div>
            </div>
            <div class="barContainer">
                <div class="mtitle">我的书评</div>
                <BtnMore class="btnMore" @to-more="toReviews"></BtnMore>
                <div v-if="reviews.length===0" style="margin:20px 0;color:#7f7f7f">暂无书评</div>
                <ReviewItem v-if="reviews.length > 0" :review="reviews[0]"></ReviewItem>
                <div v-if="reviews.length>1" class="cutline"></div>
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
import {useRouter} from 'vue-router'
import { BASEURL } from '@/config'
import BookListLine from '@C/BookListLine.vue'
import CommunityMoment from '@C/CommunityMoment.vue'
import ReviewItem from '@C/ReviewItem.vue'
import BtnMore from '@C/BtnMore.vue'
import { Moment, Book, Review, Excerpt } from '@/types'
const store = useStore()
const router = useRouter()
const userInfo = JSON.parse(store.state.user.userInfo)
console.log('userInfo', userInfo)
let excerpts = ref<Excerpt[]>([])
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
    excerpts.value = res.excerpts.reverse()
})
const toBookList = () => {
    router.push({name:'SpaceBookLists',params:{userName:'我',userId:userInfo._id}})
}
const toReviews = () => {

}
const toMoments = () => {

}
const toExcerpts = () => {

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
.excerpt_item{
    display:flex;
    margin:20px 0;
    .excerpt_content{
        cursor:pointer;
        margin-left:20px;
        width:800px;
        // font-size: 0.875rem;
        color:#7f7f7f;
        text-align: left;
        overflow: hidden;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
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
    color: @title_green;
}
.cutline {
    width: 100%;
    height: 1px;
    background: #e2e2e2;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>