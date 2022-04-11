<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <main class="col-main">
                <div class="authorInfoBar flex">
                    <img :src="BASEURL + excerpt.writer.avatar" class="userAvatar" />
                    <div class="flex flex-column ml15">
                        <div class="userName">{{ excerpt.writer.userName }}</div>
                        <div class="signature">{{ excerpt.writer.signature }}</div>
                    </div>
                    <div class="flex flex-column ml15">
                        <div class="bookName">{{ excerpt.related_book.name }}</div>
                        <div class="publishTime">{{ excerpt.publish_time }}</div>
                    </div>
                </div>
                <div class="excerptContent">
                    <div class="content_shown" v-html="excerpt.content"></div>
                </div>
                <div class="page">——引自第{{excerpt.page}}页</div>
                <div class="actionBar flex flex-vcenter">
                    <div class="mr10" @click="addLike">
                        <!-- <img :src="isLiked ? likedPic : likePic" class="smallPic" /> -->
                        <LikeOutlined />
                        {{ excerpt.likes.length }}
                    </div>
                    <div class="comment mr10">
                        <!-- <img src="src/assets/icon/comment.png" class="smallPic" /> -->
                        <MessageOutlined />
                        {{ excerpt.comments.length }}条评论
                    </div>
                    <div class="share">
                        <share-alt-outlined class="mr5" />转发
                    </div>
                    <div class="report mlauto">
                        <AlertOutlined class="mr5" />举报
                    </div>
                </div>
                <div class="submitBar">
                    <div v-if="store.state.user.token">
                        <img
                            :src="BASEURL + JSON.parse(store.state.user.userInfo).avatar"
                            class="userAvatar"
                        />
                        <input type="text" class="commentInput" v-model="commentInput" />
                        <button class="commentBtn" @click="submitComment">发表</button>
                    </div>
                    <div v-else>请登录后发表评论</div>
                </div>
                <div class="commentBar">
                    <div
                        v-if="excerpt.comments.length === 0"
                        style="margin-top: 50px;color: #7f7f7f;"
                    >暂无评论</div>
                    <div v-else>
                        <a-list
                            :data-source="excerpt.comments"
                            item-layout="horizontal"
                            :header="`${excerpt.comments.length} 条评论`"
                        >
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <a-comment
                                        :author="item.creator.userName"
                                        :avatar="BASEURL + item.creator.avatar"
                                    >
                                        <template #content>
                                            <p
                                                style="text-align: left;margin-top: 10px;"
                                            >{{ item.content }}</p>
                                        </template>
                                        <template #datetime>
                                            <!-- <a-tooltip
                                                :title="item.create_time.format('YYYY-MM-DD HH:mm:ss')"
                                            >-->
                                            <span>{{ item.create_time }}</span>
                                            <!-- </a-tooltip> -->
                                        </template>
                                    </a-comment>
                                </a-list-item>
                            </template>
                        </a-list>
                    </div>
                </div>
            </main>
            <aside class="col-aside">
                <div class="bookInfoContainer">
                    <BookThumb
                        :book-title="excerpt.related_book.name"
                        :book-pic="excerpt.related_book.cover"
                        :book-author="excerpt.related_book.author.name"
                        :book-id="excerpt.related_book._id"
                        :book-intro="excerpt.related_book.intro"
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
import { Excerpt } from '@/types';
import editorApi from '@/api/editor.js';
import BookThumb from '@C/BookThumb.vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { MessageOutlined, LikeOutlined, AlertOutlined, ShareAltOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
const router = useRouter()
const route = useRoute()
const store = useStore()
const likedPic = 'src/assets/icon/liked.png'
const likePic = 'src/assets/icon/like.png'
const isLiked = ref<Boolean>(false);
const token = ref<Boolean>(false)

if (store.state.user.token) {
    token.value = true
    console.log(token.value)
}
console.log(route.params.id)
let excerpt = ref<Excerpt>({ page: 0, _id: '', content: '', text: '', writer: { _id: '', signature: '', userName: '', avatar: '' }, related_book: { name: '', _id: '', cover: '', intro: '', author: { name: '', _id: '' } }, publish_time: '', likes: [], comments: [] })
const getExcerpt = () => {
    editorApi.getExcerpt(route.params.id).then(res => {
        console.log(res)
        excerpt.value = res;
    })
}
getExcerpt()

const addLike = () => {

}

let commentInput = ref<string>('')
const submitComment = () => {
    console.log(commentInput.value)
    let param = {
        content: commentInput.value,
        creator: JSON.parse(store.state.user.userInfo)._id,
        depth: 0,
        type: 1,
        base_excerpt: excerpt.value._id
    }
    editorApi.publishComment(param).then(res => {
        console.log(res)
        message.success('发布成功', 1.5)
        getExcerpt()
    })
}

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
    .excerptContent {
        width: 750px;
        font-size: 1rem;
        margin-top: 30px;
        text-align: left;
    }
    .page{
        text-align:right;
        width:750px;
        color:#7f7f7f;
        font-size:1rem;
    }
    .actionBar {
        margin-top: 50px;
        width: 730px;
        height: 32px;
    }
    .submitBar {
        margin-top: 40px;
        width: 730px;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        .userAvatar {
            width: 32px;
            height: 32px;
        }
        .commentInput {
            margin-left: 20px;
            margin-top: 5px;
            height: 32px;
            text-indent: 0.5em;
            width: 580px;
            line-height: 32px;
            margin-right: 10px;
        }
        .commentBtn {
            height: 32px;
            // margin-top: 9px;
            background: @soft_blue;
            border-radius: 5px;
            color: #fff;
            width: 80px;
            border: none;
            cursor: pointer;
        }
    }
}
.smallPic {
    width: 20px;
    height: 20px;
    margin-right: 3px;
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