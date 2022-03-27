<template>
    <div class="l_wrap">
        <img :src="BASEURL + moment.creator.avatar" class="avatar" />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'
import { Moment } from '@/types'
import { BASEURL } from '@/config'
export default defineComponent({
    name: 'SpaceMomentItem',
    props: {
        moment: {
            type: Object,
            default: () => { }
        }
    },
    setup() {
        return {
            BASEURL
        }
    }
})

</script>
<style lang="less" scoped>
</style>