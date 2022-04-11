<template>
    <div class="content">
        <div class="title">{{title}}</div>
        <div class="subtitle">{{subTitle}}</div>
        <div class="flex wrap">
            <BookThumb
                v-for="book in books"
                :key="book._id"
                :book-title="book.name"
                :book-author="book.author.name"
                :book-intro="book.intro"
                :book-pic="book.cover"
                :book-id="book._id"
                class="bookthumb_list"
            ></BookThumb>
        </div>
    </div>
</template>
<script lang="ts">
import BookThumb from '@C/BookThumb.vue';
import { ref, reactive, defineComponent, PropType, } from 'vue'
import { Book } from '../types'

export default defineComponent({
    name: 'BooksModule',
    components: {
        BookThumb,
    },
    props: {
        'books': {
            type: Array as PropType<Book[]>,
            default: () => {
                return []
            }
        },
        'title':{
            type: String,
            default:''
        },
        'subTitle':{
            type:String,
            default:''
        }
    },

    setup(prop) {
        console.log('prp', prop.books)

    }
})
</script>
<style lang="less" scoped>
.content {
    position: relative;
    width: 1024px;
    margin: 80px auto;
    border: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 750px;
    /* border: 1px solid red; */
    .wrap {
        flex-wrap: wrap;
        margin: 1em 58px;
    }
}
.title {
    font-size: 30px;
    font-weight: 700;
    color: #333333;
    padding-top: 25px;
    font-family: PingFang SC Bold, PingFang SC Regular, PingFang SC, sans-serif;
    font-style: normal;
}
.subtitle {
    padding-top: 12px;
    font-size: 14px;
    color: #797979;
}
</style>