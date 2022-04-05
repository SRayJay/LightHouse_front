<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="book_info">
                <div class="booktitle">{{ bookData.name }}</div>
                <div class="book_brief flex">
                    <a-image :width="150" :src="BASEURL + bookData.cover"></a-image>
                    <div class="flex details">
                        <div class="author">
                            作者：
                            <a
                                class="pointable_text_color"
                                @click="toAuthorDetail"
                            >{{ simplifyCountry(bookData.author.country) + bookData.author.name }}</a>
                        </div>
                        <div class="publisher">出版社：{{ bookData.publisher }}</div>
                        <div class="producer" v-if="bookData.producer">出品方：{{ bookData.producer }}</div>
                        <div class="publish_time">出版年：{{ bookData.publishTime }}</div>
                        <div
                            class="translator"
                            v-if="bookData.author.country !== '中国'"
                        >译者：{{ bookData.translator }}</div>
                        <div class="series" v-if="bookData.series">丛书：{{ bookData.series }}</div>
                        <div class="ISBNcode">ISBN：{{ bookData.ISBN }}</div>
                    </div>
                </div>
                <div class="btn_bar">
                    <a-tooltip placement="topLeft" title="加入想读书单">
                        <div
                            class="btn_bar_btn"
                            :class="{ btn_bar_click: isWantRead === true, btn_bar_noclick: isWantRead === false }"
                            @click="bookAct(1)"
                        >想读</div>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" title="加入在读书单">
                        <div
                            class="btn_bar_btn"
                            :class="{ btn_bar_click: isReading === true, btn_bar_noclick: isReading === false }"
                            @click="bookAct(2)"
                        >在读</div>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" title="加入已读书单">
                        <div
                            class="btn_bar_btn"
                            :class="{ btn_bar_click: isHaveRead === true, btn_bar_noclick: isHaveRead === false }"
                            @click="bookAct(3)"
                        >已读</div>
                    </a-tooltip>
                </div>
                <div class="intro">
                    <div class="subtitle">内容简介</div>
                    <div class="cutline"></div>
                    <div class="intro_content">{{ bookData.intro }}</div>
                </div>
                <div class="intro">
                    <div class="subtitle">作者简介</div>
                    <div class="cutline"></div>
                    <div class="intro_content">{{ bookData.author.intro }}</div>
                </div>
                <div class="intro">
                    <div class="flex">
                        <div class="subtitle">书摘</div>
                        <div class="write_btn mlauto" @click="toWriteExcerpts">
                            <edit-outlined />&nbsp;写书摘
                        </div>
                    </div>
                    <div class="cutline"></div>
                </div>
                <div class="intro">
                    <div class="flex">
                        <div class="subtitle">书评</div>
                        <div class="write_btn mlauto" @click="toWriteReview">
                            <edit-outlined />&nbsp;写书评
                        </div>
                    </div>
                    <div class="cutline"></div>
                    <div
                        v-for="review in bookData.reviews.slice(0, 2)"
                        :key="review._id"
                        class="review_item"
                    >
                        <div
                            class="review_title"
                            @click="toReviewContent(review._id)"
                        >{{ review.title }}</div>
                        <div
                            class="review_content"
                            @click="toReviewContent(review._id)"
                        >{{ review.text }}</div>
                        <div class="likes">
                            <div class="likes_icon">
                                <img src="@/assets/icon/like.png" />
                            </div>
                            <div class="likes_num">{{ review.likes ? review.likes.length : 0 }}</div>
                        </div>
                    </div>
                    <div class="review_more">
                        <RightOutlined :style="{ fontSize: '14px', color: '#3379cc' }" />
                        所有书评（{{ bookData.reviews.length }}篇）
                    </div>
                </div>
            </div>
            <div class="flex flex-column">
                <div class="book_rate">
                    <div class="mtitle">书籍评分</div>
                    <div class="flex flex-vcenter mt5">
                        <a-rate class="rate mr10" :value="2" disabled />
                        <div class="rate_num">{{ bookData.rate }}</div>
                    </div>
                    <div class="flex flex-column readercnt">
                        <div>{{ bookData.wantRead.length }}人想读</div>
                        <div>{{ bookData.reading.length }}人在读</div>
                        <div>{{ bookData.haveRead.length }}人已读</div>
                    </div>
                </div>
                <div class="relatedBook">
                    <div class="mtitle">相关书籍</div>
                    <div class="booklist"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Header from '@C/Header.vue';
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { simplifyCountry } from '@/utils/utils';
import { Book } from '../types'
import bookapi from '../api/book'
import editorApi from '../api/editor'
import { BASEURL } from '../config'
import { EditOutlined, RightOutlined, StopTwoTone } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue';
const route = useRoute()
const router = useRouter()
const store = useStore()
let bookData = ref<Book>({
    _id: '',
    name: '',
    author: {
        name: '',
        country: '',
        intro: '',
        _id: ''
    },
    publisher: '',
    producer: '',
    publishTime: '',
    intro: '',
    cover: '',
    ISBN: '',
    translator: '',
    series: '',
    rate: 0,
    reviews: [{ _id: '', text: '', title: '', content: '', likes: [] }],
    wantRead: [],
    reading: [],
    haveRead: []
})

let isWantRead = ref<boolean>(false)
let isReading = ref<boolean>(false)
let isHaveRead = ref<boolean>(false)

const getBookData = () => {
    bookapi.getBook(route.params.id).then((res) => {
        console.log(res)
        bookData.value = res.book
        if (res.result) {
            isWantRead.value = res.result.isWantRead;
            isReading.value = res.result.isReading;
            isHaveRead.value = res.result.isHaveRead;
        }
        // console.log(actState)
        console.log(bookData)
    })
}
getBookData()
const toAuthorDetail = () => {
    router.push({ name: 'AuthorDetail', params: { id: bookData.value.author._id } })
}

const toWriteExcerpts = () => {

}
const toWriteReview = () => {
    if (store.state.user.token) {
        editorApi.checkReview({ userid: JSON.parse(store.state.user.userInfo)._id, bookid: bookData.value._id }).then(res => {

            if (res._id) {
                message.warning('您已发表过该书的书评')
            } else {
                router.push({ name: 'ReviewEdit', params: { book: JSON.stringify(bookData.value) } })
            }
        })
    } else {
        message.warning('登录后才能发表书评')
    }
}
const toReviewContent = (id) => {
    router.push({ name: 'ReviewContent', params: { id: id } })
}

const bookAct = (type) => {
    if (!store.state.user.token) message.error('当前未登录或登录状态过期，请重新登录', 1.5)
    let param = {
        type,
        bookid: bookData.value._id
    }
    bookapi.bookListAct(param).then(res => {
        console.log(res)
        getBookData()
    })
}
</script>
<style lang="less" scoped>
.wrap {
    width: 1024px;
    margin: 40px auto 0;
    display: flex;
    padding-bottom: 30px;
}
.book_info {
    width: 700px;
    padding: 1.5em;

    padding-bottom: 40px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    .booktitle {
        font-size: 2em;
        padding-bottom: 0.5em;
        font-weight: bold;
        text-align: left;
    }

    .book_brief {
        .details {
            margin-left: 2em;
            flex-direction: column;
            text-align: left;
            font-size: 0.95em;
            // color: @deep_blue;
            color: @text_black;
            & > * + * {
                margin-top: 3px;
            }
        }
    }
    .btn_bar {
        display: flex;
        margin-top: 2em;
        align-items: center;
        .btn_bar_btn {
            color: #fff;
            font-size: 0.875em;
            width: 4em;
            height: 2em;
            line-height: 2em;
            cursor: pointer;
            text-align: center;
            margin-right: 10px;
            border-radius: 5px;
            // background: rgba(85, 85, 85, 1);
        }
        .btn_bar_click {
            background: #03b615;
        }
        .btn_bar_noclick {
            background: rgba(85, 85, 85, 1);
        }
    }

    .intro {
        text-align: left;
        font-size: 0.95em;
    }
    .intro_content {
        text-indent: 2em;
    }
    .write_btn {
        background: #fff;
        margin-top: 2em;
        cursor: pointer;
        border-radius: 8px;
        font-size: 14px;
        width: 80px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        color: @deep_blue;
    }
}
.book_rate {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    height: 216px;
    width: 284px;
    margin-left: 40px;
    padding-left: 1em;
    padding-top: 1em;
    .rate_num {
        font-size: 20px;
        text-align: left;
        color: #f59a23;
    }

    .readercnt {
        margin-top: 20px;
        text-align: left;
        & > * + * {
            margin-top: 5px;
        }
    }
}

.review_item {
    margin: 1em 0;
    cursor: pointer;
    height: 120px;
    width: 585px;
    .review_title {
        color: @soft_blue;
        text-align: left;
        margin-bottom: 0.5em;
        font-size: 1rem;
    }
    .review_content {
        //去掉rate
        font-size: 0.875rem;
        text-align: left;
        overflow: hidden;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .likes {
        display: flex;
        align-items: center;
        .likes_icon img {
            width: 16px;
            height: 16px;
        }
        .likes_num {
            font-size: 0.8rem;
            margin-left: 5px;
        }
    }
}
.review_more {
    font-size: 0.8rem;
    color: @soft_blue;
    width: 120px;
    text-align: left;
    cursor: pointer;
    margin-top: 5px;
}
.relatedBook {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    width: 284px;
    margin-top: 3em;
    margin-left: 40px;
    padding-left: 1em;
    padding-top: 1em;
    min-height: 500px;
}
.subtitle {
    color: @light_green;
    margin-top: 2em;
    // color: @soft_green;
    font-size: 18px;
    text-align: left;
}
.cutline {
    width: 200px;
    height: 1px;
    background: #ccc;
    margin-top: 10px;
    margin-bottom: 10px;
}
.mtitle {
    font-size: 18px;
    text-align: left;
}
</style>