<template>
    <div class="content flex" @click="toBookDetail">
        <img :src="BASEURL + book.cover" class="bookcover" />
        <div class="container flex flex-column">
            <div class="bookName">{{ book.name }}</div>
            <a-rate :value="2" disabled></a-rate>
            <div class="rate_num">{{ book.rate.toFixed(1) }}</div>
            <div class="bookInfo">{{ simplifyCountry(book.author.country) }}</div>
        </div>
    </div>
    <div class="divider"></div>
</template>
<script lang="ts" >
import { ref, defineComponent, PropType } from 'vue'
import { BASEURL } from '@/config'
import { simplifyCountry } from '@/utils/utils'
import { useRouter } from 'vue-router'
import { Book } from '@/types'

export default defineComponent({
    name: 'SearchBook',
    props: {
        'book': {
            type: Object as PropType<Book>,
            default: () => { }
        }
    },
    setup(props) {
        const router = useRouter()
        console.log(simplifyCountry(props.book.author.country))
        const toBookDetail = () => {
            router.push({ name: 'BookDetail', params: { id: props.book._id } })
        }
        return {
            BASEURL,
            toBookDetail,
            simplifyCountry
        }
    }
})

</script>
<style lang="less" scoped>
.content {
    height: 120px;
    margin-top: 20px;

    .bookcover {
        width: 86px;
        height: 120px;
    }
    .container {
        margin-left: 20px;
        .bookName {
            color: #3379cc;
            font-size: 16px;
            // text-align: left;
        }
        .rate {
            margin-top: 20px;
            text-align: left;
        }
        .rate_num {
            font-size: 18px;
            margin-top: 10px;
            margin-left: 3px;
            text-align: left;
            color: #f59a23;
        }
        .bookInfo {
            text-align: left;
            font-size: 14px;
            margin-top: 15px;
        }
    }
}
.divider {
    position: relative;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    width: 400px;
    margin-top: 10px;
}
</style>