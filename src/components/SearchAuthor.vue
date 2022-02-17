<template>
    <div @click="toAuthorDetail" class="flex content">
        <img :src="BASEURL + author.photo" class="authorPhoto" />
        <div class="container flex flex-column">
            <div class="authorName">{{ author.name }}</div>
            <span class="detail">
                {{ author.country }}
                <span v-if="author.birthday">
                    /
                    {{ author.birthday }}
                </span>
                <span v-if="author.deathday">至{{ author.deathday }}</span>
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { ref, defineComponent, PropType } from 'vue'
import { BASEURL } from '@/config'
import { Author } from '@/types'
export default defineComponent({
    name: 'SearchAuthor',
    props: {
        'author': {
            type: Object as PropType<Author>,
            default: () => { }
        }
    },
    setup(props) {
        const router = useRouter()
        const toAuthorDetail = () => {
            router.push({ name: 'AuthorDetail', params: { id: props.author._id } })
        }
        return {
            toAuthorDetail,
            BASEURL,
        }
    }
})

</script>
<style lang="less" scoped>
.content {
    height: 120px;
    transition: all 0.4s;
    margin-bottom: 15px;
    cursor: pointer;
}
.content:hover {
    background: #eee;
    opacity: 0.6;
}
.container {
    margin-left: 20px;
    text-align: left;
    justify-content: space-between;
}
.authorName {
    color: @soft_blue;
}
.detail {
    font-size: 0.9rem;
    color: #7f7f7f;
}
</style>