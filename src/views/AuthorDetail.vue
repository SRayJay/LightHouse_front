<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="authorInfoBar flex">
                <img :src="BASEURL + author.photo" class="authorphoto" />
                <div class="flex flex-column ml30" style="text-align: left;">
                    <div class="authorname">{{ author.name }}</div>
                    <div class="info">
                        <div class="authorCountry">国家/地区：{{ author.country }}</div>
                        <div
                            v-if="author.death"
                            class="date"
                        >生卒日期：{{ author.birth }} 至 {{ author.death }}</div>
                        <div v-else class="date">出生日期：{{ author.birth }}</div>
                    </div>
                </div>
            </div>
            <div class="introBar">
                <div class="subtitle">作家简介</div>
                <div class="cutline"></div>
                <div class="author_intro_content">{{ author.intro }}</div>
            </div>
            <div class="bookBar">
                <div class="subtitle">主要作品</div>
                <div class="cutline"></div>
                <div class="flex">
                    <BookThumb
                        v-for="book in author.books.slice(0, 5)"
                        :key="book._id"
                        :book-title="book.name"
                        :book-pic="book.cover"
                        :book-id="book._id"
                        :book-intro="book.intro"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Header from '@C/Header.vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/common';
import { Author } from '@/types'
import { BASEURL } from '@/config'
import BookThumb from '@/components/BookThumb.vue';
const route = useRoute()
const router = useRouter()
// let booklist = reactive([])
let author = ref<Author>({ name: '', photo: '', intro: '', birth: '', death: '', books: [], nobel: 0, country: '', _id: '' })
api.getAuthorById(route.params.id).then((res) => {

    author.value = res
    console.log(author.value.books)
})


</script>
<style lang="less" scoped>
.wrap {
    width: 1024px;
    margin: 0 auto;
    margin-top: 40px;
    padding-bottom: 30px;
    .authorInfoBar {
        height: 260px;
        .authorname {
            font-size: 26px;
            font-weight: bold;
        }
        .authorphoto {
            // margin-top: 20px;
            max-height: 180px;
        }
    }
    .introBar {
        margin-bottom: 30px;
        .author_intro_content {
            // width: 635px;
            text-align: left;
            font-size: 0.875rem;
            margin-top: 15px;
        }
    }
}
.subtitle {
    color: @light_green;
    font-size: 1.125rem;
    text-align: left;
}
.cutline {
    width: 200px;
    height: 1px;
    background: #ccc;
    margin-top: 20px;
}
</style>