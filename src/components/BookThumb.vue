<template>
    <div class="bookthumb">
        <a-popover placement="right" :title="bookTitle">
            <template class="popcontent" #content>
                <p>{{ bookIntro.slice(0, 100) + '...' }}</p>
            </template>
            <div class="book_card">
                <a-image :preview="false" :src="config.BASEURL + bookPic" class="pic" />
                <div class="bookname">{{ bookTitle }}</div>
                <div class="author">{{ bookAuthor }}</div>
            </div>
        </a-popover>
    </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent } from 'vue';
import config from '../config/index.js';

export default defineComponent({
    name: 'BookThumb',
    props: {
        'bookTitle': {
            type: String,
            default: ""
        },
        'bookPic': {
            type: String,
            default: ''
        },
        'bookAuthor': {
            type: String,
            default: ''
        },
        'bookIntro': {
            type: String,
            default: ''
        },
        'bookId': {
            type: String,
            default: ''
        }
    },
    setup() {
        console.log(111)

        return {
            config
        }
    }
})

</script>
<style lang="less" scoped>
.bookthumb {
    width: 131px;
    height: 237px;
    position: relative;
    margin: 20px 25px;
    cursor: pointer;
    .popcontent {
        width: 200px;
        height: 500px;
    }
    .book_card {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }
    .pic {
        width: 131px;
        height: 180px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .bookname {
        color: #009af9;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-top: 8px;
        padding-bottom: 5px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .author {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        padding-bottom: 8px;
        padding-left: 8px;
        padding-right: 8px;
        /* text-indent: 0.5em; */
    }
}
</style>