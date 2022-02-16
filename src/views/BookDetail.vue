<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="book_info">
                <div class="booktitle">{{ bookData.name }}</div>
                <div class="book_brief flex">
                    <a-image :width="150" :src="cfg.BASEURL + bookData.cover"></a-image>
                    <div class="flex details">
                        <div
                            class="author"
                        >作者：{{ (bookData.author.country !== '中国' ? '[' + bookData.author.country + ']' : '') + bookData.author.name }}</div>
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
                        <div class="btn_bar_btn">想读</div>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" title="加入在读书单">
                        <div class="btn_bar_btn">在读</div>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" title="加入已读书单">
                        <div class="btn_bar_btn">已读</div>
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
            </div>
            <div class="flex flex-column">
                <div class="book_rate">
                    <div class="mtitle">书籍评分</div>
                    <div class="flex flex-vcenter mt5">
                        <a-rate class="rate mr10" :value="2" disabled />
                        <div class="rate_num">{{ bookData.rate }}</div>
                    </div>
                    <div class="flex flex-column readercnt">
                        <div>100人想读</div>
                        <div>1000人在读</div>
                        <div>1000人在读</div>
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
import { useRouter, useRoute } from 'vue-router'
import { Book } from '../types/global'
import api from '../api/book'
import cfg from '../config'

const route = useRoute()
let bookData = ref<Book>({
    _id: '',
    name: '',
    author: {
        name: '',
        country: '',
        intro: ''
    },
    publisher: '',
    producer: '',
    publishTime: '',
    intro: '',
    cover: '',
    ISBN: '',
    translator: '',
    series: '',
    rate: 0
})
api.getBook(route.params.id).then((res) => {
    console.log(res)
    bookData.value = res
    // bookData.name = res.name
    console.log(bookData)
})


</script>
<style lang="less" scoped>
.wrap {
    width: 1024px;
    margin: 40px auto 0;
    display: flex;
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
            // justify-content: ;
            text-align: left;
            font-size: 0.95em;
            color: @deep_blue;
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