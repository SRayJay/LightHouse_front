<template>
    <div class="l_wrap">
        <img :src="BASEURL + review.related_book.cover" class="bookCover" />
        <div class="flex flex-column">
            <div class="reviewTitle">{{ review.title }}</div>
            <!-- <div class="actionBar"></div> -->
            <div class="l_bar">
                <div class="bookName">《{{ review.related_book.name }}》</div>
                <a-rate :value="review.related_book.rate"></a-rate>
            </div>
            <div class="reviewText">{{ formatContent(review.text) }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { BASEURL } from '@/config'
import { PropType } from 'vue';
import { Review } from '@/types'
defineProps({
    review: {
        type: Object as PropType<Review>,
        default: () => { }
    }
})
function formatContent(text: string) {
    text = text.replace(/&nbsp;/g, '')
    text = text.replace(/&amp;/g, '&')
    return text
}
</script>
<style lang="less" scoped>
.l_wrap {
    width: 1024px;
    margin-top: 20px;
    height: 151px;
    display: flex;
    .bookCover {
        cursor: pointer;
        width: 110px;
        height: 151px;
        margin-right: 20px;
    }
    .reviewTitle {
        color: @soft_blue;
        font-size: 1.125rem;
        cursor: pointer;
        text-align: left;
    }
    .l_bar {
        height: 18px;
        line-height: 18px;
        margin-top: 15px;
        .bookName {
            font-size: 1rem;
            text-align: left;
        }
    }
    .reviewText {
        font-size: 0.875rem;
        text-align: left;
        overflow: hidden;
        margin-top: auto;
        width: 800px;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
}
</style>