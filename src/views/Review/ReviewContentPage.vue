<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <main class="col-main">
                <div class="title">{{ review.title }}</div>
                <div class="authorInfoBar flex">
                    <img :src="BASEURL + review.writer.avatar" class="userAvatar" />
                    <div class="flex flex-column ml15">
                        <div class="userName">{{ review.writer.userName }}</div>
                        <div class="signature">{{ review.writer.signature }}</div>
                    </div>
                    <div class="flex flex-column ml15">
                        <div class="bookName">{{ review.related_book.name }}</div>
                        <div class="publishTime">{{ review.publish_time }}</div>
                    </div>
                </div>
                <div class="reviewContent">
                    <div class="content_shown" v-html="review.content"></div>
                </div>
            </main>
            <aside class="col-aside">
                <div class="bookInfoContainer">
                    <BookThumb
                        :book-title="review.related_book.name"
                        :book-pic="review.related_book.cover"
                        :book-author="review.related_book.author.name"
                        :book-id="review.related_book._id"
                        :book-intro="review.related_book.intro"
                    ></BookThumb>
                </div>
            </aside>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { BASEURL } from '@/config';
import Header from '@C/Header.vue';
import { Review } from '@/types';
import editorApi from '@/api/editor.js';
import BookThumb from '@C/BookThumb.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
console.log(route.params.id)
let review = ref<Review>({ title: '', _id: '', content: '', text: '', writer: { _id: '', signature: '', userName: '', avatar: '' }, related_book: { name: '', _id: '', cover: '', intro: '', author: { name: '', _id: '' } }, publish_time: '', likes: [] })
editorApi.getReview(route.params.id).then(res => {
    console.log(res)
    review.value = res;
})
</script>
<style lang="less" scoped>
.wrap {
    width: 1024px;
    margin: 0 auto;
    display: flex;
    min-height: 600px;
    padding-bottom: 30px;
}
.col-main {
    flex: 1 80%;
    .title {
        margin-top: 60px;
        text-align: left;
        font-size: 2rem;
        font-weight: 700;
    }
    .authorInfoBar {
        margin-top: 25px;
        height: 45px;
        text-align: left;
        .userAvatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
        }
        .userName {
            font-size: 0.875rem;
        }
        .signature {
            font-size: 0.8rem;
            color: #7f7f7f;
        }
        .bookName {
            color: @soft_blue;
            cursor: pointer;
            font-size: 0.875rem;
        }
        .publishTime {
            color: #7f7f7f;
            font-size: 0.875rem;
        }
    }
    .reviewContent {
        width: 750px;
        font-size: 1rem;
        margin-top: 30px;
        text-align: left;
    }
}
.col-aside {
    flex: 20%;
    .bookInfoContainer {
        position: sticky;
        top: 1rem;
        margin-top: 200px;
    }
}
</style>