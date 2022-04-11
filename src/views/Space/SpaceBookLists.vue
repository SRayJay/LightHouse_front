<template>
    <Header />
    <div class="wrap">
        <div class="mtitle">{{userName}}的书单</div>
        <a-divider></a-divider>
        <a-tabs type="card" v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="想读">
                <div style="min-height:850px;padding:20px 20px;justify-content:space-around;display:flex;flex-wrap:wrap;">
                    <book-thumb
                        v-for="book in wantRead.slice((currentPageW-1)*15,currentPageW*15)"
                        :key="book._id"
                        :book-title="book.name"
                        :book-pic="book.cover"
                        :book-author="book.author.name"
                        :book-intro="book.intro"
                        :book-id="book._id"
                        class="bookthumb_list"
                    />
                </div>
                <a-pagination
                    class="pagination"
                    v-model:current="currentPageW"
                    :total="wantRead.length"
                    show-less-items
                    :defaultPageSize="15"
                />
            </a-tab-pane>
            <a-tab-pane key="2" tab="在读">
                <div style="min-height:850px;padding:20px 20px;justify-content:space-around;display:flex;flex-wrap:wrap;">
                    <book-thumb
                        v-for="book in reading.slice((currentPageR-1)*15,currentPageR*15)"
                        :key="book._id"
                        :book-title="book.name"
                        :book-pic="book.cover"
                        :book-author="book.author.name"
                        :book-intro="book.intro"
                        :book-id="book._id"
                        class="bookthumb_list"
                    />
                </div>
                <a-pagination
                    class="pagination"
                    v-model:current="currentPageR"
                    :total="reading.length"
                    show-less-items
                    :defaultPageSize="15"
                />
            </a-tab-pane>
            <a-tab-pane key="3" tab="已读">
                <div style="min-height:850px;padding:20px 20px;justify-content:space-around;display:flex;flex-wrap:wrap;">
                    <book-thumb
                        v-for="book in haveRead.slice((currentPageH-1)*15,currentPageH*15)"
                        :key="book._id"
                        :book-title="book.name"
                        :book-pic="book.cover"
                        :book-author="book.author.name"
                        :book-intro="book.intro"
                        :book-id="book._id"
                        class="bookthumb_list"
                    />
                </div>
                <a-pagination
                    class="pagination"
                    v-model:current="currentPageH"
                    :total="haveRead.length"
                    show-less-items
                    :defaultPageSize="15"
                />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import Header from '@C/Header.vue';
import BookThumb from '@C/BookThumb.vue';
import {useRoute} from 'vue-router'
import userApi from '@/api/user'
const route = useRoute()

let activeKey = ref<string>('1')
const userName = route.params.userName
const userId = route.params.userId
let currentPageW = ref<number>(1)
let currentPageR = ref<number>(1)
let currentPageH = ref<number>(1)
let wantRead = ref<Book[]>([])
let reading = ref<Book[]>([])
let haveRead = ref<Book[]>([])
userApi.getSpaceInfo(userId).then(res => {
    wantRead.value = res.wantRead.reverse()
    reading.value = res.reading.reverse()
    haveRead.value = res.haveRead.reverse()
})

</script>
<style lang="less" scoped>
.wrap{
    width:1024px;
    margin:0 auto;
    padding-bottom:30px;
    .mtitle{
        color:@title_green;
        text-align:left;
        font-size:1.25rem;
        margin-top:40px;
    }
}
</style>