<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="authorInfoBar flex">
                <img :src="BASEURL + author.photo" class="authorphoto" />
                <div class="flex flex-column ml30">
                    <div class="authorname">{{ author.name }}</div>
                    <div class="info">
                        <div class="authorCountry">国籍：{{ author.country }}</div>
                        <div
                            v-if="author.deathday"
                            class="date"
                        >生卒日期：{{ author.birthday }} 至 {{ author.deathday }}</div>
                        <div v-else class="date">出生日期：{{ author.birthday }}</div>
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
                <div></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, } from 'vue'
import Header from '@C/Header.vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/common';
import { Author } from '@/types'
import { BASEURL } from '@/config'
const route = useRoute()
const router = useRouter()

let author = ref<Author>({ name: '', photo: '', intro: '', birthday: '', deathday: '', books: [], nobel: 0, country: '', _id: '' })
api.getAuthorById(route.params.id).then((res) => {
    console.log(res)
    author.value = res
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
    .bookBar {
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