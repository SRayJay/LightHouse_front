<template>
    <div>
        <Header></Header>
        <div>
            <div class="index_bg">
                <img src="@/assets/index_bg.png" class="bg_pic" />
                <div class="welcometext">Welcome to LightHouse</div>
            </div>
            <div class="search_back">
                <input
                    ref="search_word"
                    class="search_input"
                    placeholder="搜索"
                    @keyup.enter="search"
                />
                <div class="right_back" @click="search">
                    <img id="search_icon" src="@/assets/icon/search.png" />
                </div>
            </div>
        </div>
        <HotBooks :hotBooks="hotBooks"></HotBooks>
    </div>
</template>
<script setup lang="ts">
import Header from '@C/Header.vue';
import HotBooks from '@C/HotBooks.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, } from 'vue'
import { Book } from '../types'
import api from '../api/book'

const router = useRouter()
const store = useStore()

let search_word = ref(null)
const search = () => {
    console.log(search_word.value.value)
    router.push({ name: 'SearchResult', params: { key: search_word.value.value } })
}

let loadHotBooks = ref<Boolean>(true)
let hotBooks = reactive<Array<Book>>([])
api.getHotBooks().then((res) => {
    res.forEach(e => {
        hotBooks.push(e)
    });
    loadHotBooks.value = false
    console.log(hotBooks)
})

onMounted(() => {

})
</script>

<style lang="less" scoped>
.bg_pic {
    width: 1024px;
    height: 352px;
    position: relative;
}
.welcometext {
    font-weight: 700;
    color: #fefefe;
    position: absolute;
    top: 216px;
    left: 538px;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: Arial Negreta;
    font-style: normal;
    font-size: 32px;
    text-shadow: 0.1em 0.1em 0.3em #000;
}
.search_back {
    border-radius: 8px;
    border: none;
    background-color: rgba(242, 242, 242, 0.5);
    /* opacity: 0.5; */
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 391px;
    height: 75px;
    width: 592px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
    z-index: 1;
    .search_input {
        position: absolute;
        width: 442px;
        height: 41px;
        border: 1px solid #797979;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        /* left: 494px; */
        left: 30px;
        top: 17px;
        /* top: 408px; */
        font-weight: 400;
        box-sizing: border-box;
        align-self: center;
        padding: 2px;
        color: #797979;
        background-color: rgb(242, 242, 242);
        font-size: 15px;
        text-align: left;
        z-index: 2;
        text-indent: 22px;
    }
    .search_input:focus {
        outline: none;
    }
    .right_back {
        width: 89px;
        height: 41px;
        left: 470px;
        top: 17px;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        cursor: pointer;
    }
    #search_icon {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 8px;
        left: 33px;
    }
}
</style>