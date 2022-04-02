<template>
    <Header></Header>
    <div class="wrap">
        <a-collapse
            class="leftBar"
            expandIconPosition="right"
            accordion
            v-model:activeKey="activeKey"
            @change="changeActiveKey"
        >
            <a-collapse-panel key="1" header="中国现当代文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="中国古典文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="海外华语文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="美国文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="5" header="日本文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="6" header="英国文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="7" header="法国文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="8" header="拉美文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="9" header="俄国文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="10" header="德国文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
            <a-collapse-panel key="11" header="其他文学" class="title">
                <div
                    v-for="(item, index) in classification"
                    :key="index"
                    class="single"
                    :class="{ focus: select === index }"
                    @click="filterToItem(item, index)"
                >{{ item }}</div>
            </a-collapse-panel>
        </a-collapse>
        <div class="rightBar">
            <a-spin :spinning="loading"></a-spin>
            <div v-if="showList.length === 0" style="margin-top: 40px;">暂无书籍</div>
            <div v-else class="flex content-box">
                <BookThumb
                    v-for="book in showList"
                    :key="book._id"
                    :book-title="book.name"
                    :book-author="book.author.name"
                    :book-pic="book.cover"
                    :book-intro="book.intro"
                    :book-id="book._id"
                    class="booklist"
                ></BookThumb>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import bookApi from '@/api/book'
import Header from '@C/Header.vue';
import BookThumb from '@C/BookThumb.vue';
const selection = ref<string>('')
let select = ref<number>(0)
const classification = ['小说', '诗歌', '随笔', '散文', '人文', '社科', '传记']
const activeKey = ref(['1'])
const bookList = ref([])
const showList = ref([])

const getBooks = (key) => {
    bookApi.getBooksByBelong(key).then(res => {
        bookList.value = res;
        filterToItem('小说', 0)
    })
}

const filterToItem = (type, index) => {
    select.value = index
    showList.value = bookList.value.filter((item) => item.classify === type)
}
const changeActiveKey = (key: string) => {
    getBooks(key)
}
bookApi.getBooksByBelong('中国现当代文学').then(res => {
    bookList.value = res;
    filterToItem('小说', 0)
})


let loading = ref<boolean>(false)

</script>
<style lang="less" scoped>
.wrap {
    width: 1024px;
    margin: 0 auto;
    padding-bottom: 30px;
    margin-top: 40px;
    display: flex;
    .leftBar {
        width: 228px;
        height: 950px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
        .title {
            text-align: left;
        }
        .single {
            text-align: left;
            font-size: 15px;
            text-indent: 2em;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
        }
        .single + .single {
            border-top: 1px solid #eee;
        }
    }
    .rightBar {
        margin-left: 30px;
        width: 765px;
        height: 950px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
        .content-box {
            height: 860px;
            flex-wrap: wrap;
            align-content: flex-start;
            padding-left: 20px;
            padding-top: 20px;
        }
    }
}
.focus {
    color: #3379cc;
    background: #f2f2f2;
}
:deep(.ant-collapse-content > .ant-collapse-content-box) {
    padding: 0;
}
:deep(.ant-collapse-header) {
    font-size: 16px;
    font-weight: 700;
    font-family: "PingFang SC Bold", "PingFang SC Regular", "PingFang SC",
        sans-serif;
    /* color: #fff; */
    text-indent: 1em;
}
</style>