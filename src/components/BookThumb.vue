<template>
    <div class="bookthumb" @click="toBookDetail">
        <a-popover placement="right" :title="bookTitle">
            <template class="popcontent" #content>
                <p>{{ bookIntro.slice(0, 100) + '...' }}</p>
            </template>
            <div class="book_card">
                <img v-if="shadeBook" class="overpic" :src="BASEURL + '/img/more.png'" />
                <a-image v-else :preview="false" :src="BASEURL + bookPic" class="pic" />
                <div class="bookname">{{ bookTitle }}</div>
                <div v-if="bookAuthor" class="author">{{ bookAuthor }}</div>
            </div>
        </a-popover>
    </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent } from 'vue';
import { BASEURL } from '../config/index.js';
import { useRouter } from 'vue-router'
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
        },
        'shadeBook': {
            type: Boolean,
            default: false
        },
    },
    setup(props) {
        const router = useRouter()
        function toBookDetail() {
            router.push({ name: 'BookDetail', params: { id: props.bookId } })
        }
        return {
            BASEURL,
            toBookDetail
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
    .overpic {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
    }
}
</style>