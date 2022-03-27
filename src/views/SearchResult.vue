<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="search_back flex flex-center">
                <input v-model="searchContent" class="search_input" />
                <div class="right_back" @click="search">
                    <img id="search_icon" src="@/assets/icon/search.png" />
                </div>
            </div>
            <div class="flex">
                <div class="leftBar flex flex-column">
                    <button
                        class="leftBtn"
                        :class="nowBar === 0 ? 'leftBtn_focus' : 'leftBtn_nofocus'"
                    >全部</button>
                    <button
                        class="leftBtn"
                        :class="nowBar === 1 ? 'leftBtn_focus' : 'leftBtn_nofocus'"
                    >书籍</button>
                    <button
                        class="leftBtn"
                        :class="nowBar === 2 ? 'leftBtn_focus' : 'leftBtn_nofocus'"
                    >作家</button>
                    <button
                        class="leftBtn"
                        :class="nowBar === 3 ? 'leftBtn_focus' : 'leftBtn_nofocus'"
                    >用户</button>
                </div>
                <div class="middleBar">
                    <span class="search_title">
                        搜索
                        <span style="color:#0171B0">{{ searchContent }}</span>
                    </span>
                    <a-divider />
                    <div v-if="nowBar === 0">
                        <div v-if="authors.length > 0">
                            <div class="result_title">作家：</div>
                            <div v-for="author in authors" :key="author._id">
                                <SearchAuthor :author="author"></SearchAuthor>
                            </div>
                        </div>
                        <div v-if="books.length > 0">
                            <div class="result_title">书籍：</div>
                            <div v-for="book in books" :key="book._id">
                                <SearchBook :book="book"></SearchBook>
                            </div>
                        </div>
                        <div v-if="users.length > 0">
                            <div class="result_title">用户：</div>
                            <div v-for="user in users" :key="user._id">
                                <SearchUser :user="user" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightBar"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Header from '@C/Header.vue'
import api from '@/api/common';
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Author, User, Book } from '@/types'
import SearchAuthor from '@C/SearchAuthor.vue'
import SearchBook from '@C/SearchBook.vue';
import SearchUser from '@C/SearchUser.vue'
const router = useRouter()
const route = useRoute()
let searchContent = ref<string>('')
console.log(route.params.key)
searchContent.value = route.params.key as string;
let authors = ref<Author[]>([])
let users = ref<User[]>([])
let books = ref<Book[]>([])
api.search(searchContent.value).then((res) => {
    authors.value = res[1]
    books.value = res[0];
    users.value = res[2];
    console.log(users.value)
})
const search = () => {
    console.log(searchContent.value)
    api.search(searchContent.value).then((res) => {
        authors.value = res[1]
        books.value = res[0];
        users.value = res[2];

    })
}

let nowBar = ref<number>(0)

</script>
<style lang="less" scoped>
.wrap {
    width: 1024px;
    // min-height: 600px;
    padding-bottom: 30px;
    margin: 0 auto;
}
.search_back {
    border-radius: 8px;
    border: none;
    height: 75px;
    width: 592px;
    margin: 0 auto;
    margin-top: 17px;
    #search_icon {
        width: 24px;
        height: 24px;
        margin-top: 8px;
    }
    .search_input {
        width: 442px;
        height: 40px;
        border: 1px solid #797979;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;

        // left: 30px;
        // top: 17px;
        box-sizing: border-box;
        align-self: center;
        padding: 2px;
        color: #000;
        font-size: 15px;
        text-align: left;
        z-index: 2;
        text-indent: 22px;
    }
    .right_back {
        width: 90px;
        height: 40px;
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        cursor: pointer;
    }
}
.leftBar {
    width: 88px;
    margin-top: 80px;
    .leftBtn {
        width: 88px;
        height: 33px;
        font-size: 14px;
        outline: none;
        cursor: pointer;
        border-radius: 5px;
        border: none;
        margin-bottom: 2px;
    }
    .leftBtn_nofocus {
        color: #000;
        background: #fff;
    }
    .leftBtn_focus {
        color: #ffffff;
        background: #3379cc;
    }
}
.middleBar {
    margin-top: 30px;
    margin-left: 30px;
    width: 480px;
    text-align: left;
    .search_title {
        font-weight: bold;
        font-size: 1.5rem;
    }
    .result_title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }
}
</style>