<template>
    <div class="l_wrap">
        <div class="flex ml10">
            <img :src="BASEURL + moment.creator.avatar" class="userAvatar" @click="toUserSpace" />
            <div class="userInfoBar" @click="toUserSpace">
                <div class="userName">{{ moment.creator.userName }}</div>
                <div class="greyText">{{ moment.creator.signature }}</div>
            </div>
        </div>

        <div class="content">{{ moment.content }}</div>
        <div v-if="moment.pics.length > 0" class="momentPics">
            <img v-for="(pic, index) in moment.pics" class="momentPic" :key="index" :src="pic" />
        </div>
        <div class="greyText mt30" style="text-align:left;margin-left:80px">{{ moment.create_time }}</div>
        <div v-if="actable" class="actionBar flex">
            <div class="act" @click="like">
                <div class="actContainer">
                    <like-outlined v-if="!moment.isLike" style="font-size: large;" />
                    <like-two-tone v-else style="font-size: large;" />
                    <span class="like_num ml5">{{ moment.likes.length }}</span>
                </div>
            </div>
            <div class="act" @click="showCommentBar">
                <div class="actContainer">
                    <message-outlined style="font-size: large;" />
                    <span class="like_num ml5">{{ moment.replys.length }}</span>
                </div>
            </div>
            <div class="act">
                <div class="actContainer">
                    <share-alt-outlined class="mr5" style="font-size: large;" />转发
                </div>
            </div>
            <div class="act">
                <div class="actContainer">
                    <alert-outlined class="mr5" style="font-size: large;" />举报
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { BASEURL } from '@/config/index'
import { useRouter } from 'vue-router';
import socialApi from '@/api/social'
import { LikeOutlined, MessageOutlined, ShareAltOutlined, AlertOutlined, LikeTwoTone } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'CommunityMoment',
    components: {
        LikeOutlined,
        MessageOutlined,
        ShareAltOutlined,
        AlertOutlined,
        LikeTwoTone
    },
    emits: [
        'refreshMoment'
    ],
    props: {
        moment: {
            type: Object,
            default: () => { }
        },
        actable: {
            type: Boolean,
            default: true
        }
    },
    setup(props, ctx) {
        const router = useRouter()

        const toUserSpace = () => {

        }
        const like = () => {
            socialApi.like({ type: 1, id: props.moment._id }).then(res => {
                console.log(res)
                ctx.emit('refreshMoment', props.moment._id)
            })
        }
        const showCommentBar = () => {

        }
        return {
            BASEURL,
            toUserSpace,
            like,
            showCommentBar
        }
    }
})

</script>
<style lang="less" scoped>
.l_wrap {
    width: 100%;
    .userAvatar {
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
    .userInfoBar {
        cursor: pointer;
        margin-left: 20px;
        .userName {
            color: @soft_blue;
            text-align: left;
            font-size: 1rem;
        }
    }
    .content {
        text-align: left;
        margin-left: 80px;
        margin-top: 10px;
        // font-size: 1rem;
    }
    .momentPics {
        text-align: left;
        margin-top: 10px;
        margin-left: 80px;
        .momentPic {
            width: 180px;
            height: 180px;
            object-fit: cover;
            margin-top: 10px;
            margin-right: 10px;
        }
    }
    .actionBar {
        height: 40px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        margin-top: 10px;
        .act {
            width: 25%;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            // .like_num {
            // font-size: 1rem;
            // color: #7f7f7f;
            // }
        }
        .act + .act {
            border-left: 1px solid rgba(0, 0, 0, 0.1);
        }
    }
}
.greyText {
    font-size: 0.8rem;
    color: #7f7f7f;
}
</style>