<template>
    <div id="container" class="flex">
        <div class="leftTitle">{{ title }}</div>
        <div v-if="bookList.length > 0" class="flex" style="margin-left:53px;height: 200px;">
            <BookThumb
                v-for="book in bookList.slice(0, 5)"
                :key="book._id"
                :book-id="book._id"
                :book-pic="book.cover"
                :book-title="book.name"
            ></BookThumb>
        </div>
    </div>
</template>
<script lang="ts">
import BookThumb from '@C/BookThumb.vue';
import { defineComponent, PropType } from 'vue';
import { Book } from '@/types';
export default defineComponent({
    name: 'BookListLine',
    components: {
        BookThumb
    },
    props: {
        title: String,
        bookList: {
            type: Array as PropType<Book[]>,
            default: () => {
                return []
            }
        }
    },
    setup() {

        return {

        }
    }
})

</script>
<style lang="less" scoped>
#container {
    height: 250px;
    width: 100%;
    margin-top: 15px;
    .leftTitle {
        margin-left: 5px;
        line-height: 200px;
        text-align: left;
    }
}
</style>
