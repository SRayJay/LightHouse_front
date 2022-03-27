<template>
    <div class="content flex" @click="toUserSpace">
        <img :src="BASEURL + user.avatar" class="avatar" />
        <div class="container flex flex-column">
            <div class="userName">{{ user.userName }}</div>
            <div class="signature">{{ user.signature }}</div>
        </div>
    </div>
    <div class="divider"></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from '@/types'
import { useRouter } from 'vue-router'
import { BASEURL } from '@/config'
import { userInfo } from "os";
export default defineComponent({
    name: 'SearchUser',
    props: {
        user: {
            type: Object as PropType<User>,
            default: () => { }
        }
    },
    setup(props) {
        const router = useRouter()
        console.log(props.user)

        const toUserSpace = () => {
            router.push({ name: 'Space', params: { id: props.user._id, userInfo: JSON.stringify(props.user) } })
        }
        return {
            router,
            BASEURL,
            toUserSpace
        }
    }
})

</script>
<style lang="less" scoped>
.content {
    transition: all 0.4s;
    width: 100%;
    height: 64px;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
        background-color: #eee;
    }
    .avatar {
        width: 64px;
        height: 64px;
    }
    .container {
        margin-left: 20px;
        .userName {
            font-size: 1.2rem;
            color: @soft_blue;
            text-align: left;
        }
        .signature {
            font-size: 0.875rem;
            color: #7f7f7f;
            text-align: left;
            margin-top: auto;
        }
    }
}
.divider {
    border-bottom: 1px solid #ddd;
    width: 100%;
    margin-top: 20px;
    // height: 1px;
}
</style>