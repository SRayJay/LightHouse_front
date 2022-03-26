<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="momentBar">
                <a-tabs v-model:activeKey="activeKey" type="card" size="large">
                    <a-tab-pane key="1" style="min-height: 800px;" tab="动态">
                        <!--TODO：后续做适量加载，而不是一次性全加载-->
                        <div v-for="moment in momentList" :key="moment._id">
                            <CommunityMoment
                                @refresh-moment="refreshMoment"
                                :moment="moment"
                                class="mb20"
                            />
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" style="min-height: 800px;" tab="关注">
                        <div v-if="!store.state.user.token">当前未登录，请登录后查看</div>
                        <div v-else>lll</div>
                    </a-tab-pane>
                </a-tabs>
            </div>
            <div class="actionBar">
                <div class="actionBarContainer">
                    <div class="iconBar">
                        <div class="actSingle" @click="toWriteReview">
                            <img src="src/assets/icon/review.png" />
                            <div class="act_text">写书评</div>
                        </div>
                        <div class="actSingle" @click="showMomentEdit = true">
                            <img src="src/assets/icon/moment.png" />
                            <div class="act_text">发动态</div>
                        </div>
                    </div>
                    <div class="threeEntry">
                        <div class="entrySingle" @click="toMoments">
                            <img src="src/assets/icon/shoucang.svg" /> 我的动态
                        </div>
                        <div class="entrySingle" @click="toBookLists">
                            <img src="src/assets/icon/shudan.svg" /> 我的书单
                        </div>
                        <div class="entrySingle" @click="toReviews">
                            <img src="src/assets/icon/xiaoxi.svg" /> 我的书评
                        </div>
                    </div>
                </div>
            </div>
            <a-modal v-model:visible="showMomentEdit" title="发布动态" width="30%">
                <a-textarea
                    v-model:value="momentContent"
                    placeholder="在此输入动态内容"
                    allow-clear
                    show-count
                    :max-length="200"
                    :rows="6"
                ></a-textarea>
                <a-upload
                    v-model:file-list="fileList"
                    action="http://localhost:5000/upload/moment"
                    list-type="picture-card"
                    @preview="handlePreview"
                    :beforeUpload="beforeUpload"
                    @change="handleChange"
                >
                    <div v-if="fileList.length < 9">
                        <plus-outlined />
                        <div style="margin-top: 8px">上传图片</div>
                    </div>
                </a-upload>
                <a-modal
                    :visible="previewVisible"
                    :title="previewTitle"
                    :footer="null"
                    @cancel="handleCancel"
                >
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
                <template #footer>
                    <a-button
                        key="submit"
                        type="primary"
                        :loading="handleloading"
                        @click="handlePublish"
                    >发布</a-button>
                </template>
            </a-modal>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Header from '@C/Header.vue'
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getBase64 } from '@/utils/utils'
import { message } from 'ant-design-vue'
import editorApi from '@/api/editor'
import socialApi from '@/api/social'
import { Moment } from '@/types'
import CommunityMoment from '@C/CommunityMoment.vue'
const router = useRouter()
const store = useStore()
let activeKey = ref('1')


const toWriteReview = () => {

}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
let fileList = ref([])
let picList = ref<Array<string>>([])
function getBase64Preview(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};
const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
        file.preview = (await getBase64Preview(file.originFileObj));
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
// 上传图片模块
const imageUrl = ref<string>("");
const trueImageUrl = ref<string>("");
// 图片上传状态改变时
const handleChange = (info) => {
    if (info.file.status === "done") {
        // 上传成功时拿到真正头像的url
        getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            // loading.value = false;
            console.log(info.file.response.url);
            trueImageUrl.value = info.file.response.url;
            // fileList.value.push({ url: info.file.response.data })
            // console.log(fileList.value)
            console.log(fileList.value[0].response.url)
            picList.value.push(info.file.response.url)
        });
    }
    if (info.file.status === "error") {
        message.error("upload error");
    }
};
// 校验文件
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("只能上传jpg或png格式的图片");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("图片必须小于2MB");
    }
    return isJpgOrPng && isLt2M;
};

let showMomentEdit = ref<Boolean>(false)
let momentContent = ref<string>('')
let handleloading = ref<boolean>(false)

let momentList = reactive<Moment[]>([])

const getMoments = () => {
    momentList.length = 0
    socialApi.getMoments().then(res => {
        res = res.reverse()
        res.forEach(i => {
            momentList.push(i)
        });
        console.log(momentList)
    })
}
const handlePublish = () => {
    // 发布动态
    let content = momentContent.value;
    let pics = picList.value;
    editorApi.publishMoment({
        content,
        pics
    }).then(res => {
        console.log(res)
        showMomentEdit.value = false;
        message.success('发布成功', 1.5)
        picList.value = []
        getMoments()
    })
}

getMoments()


const refreshMoment = (id) => {
    socialApi.getMomentById(id).then(res => {
        momentList[momentList.findIndex((i) => i._id === id)] = res
        console.log(momentList)
    })
}
const toMoments = () => {

}
const toBookLists = () => {

}
const toReviews = () => {

}
</script>
<style lang="less" scoped>
.wrap {
    width: 1024px;
    margin: 0 auto;
    margin-bottom: 30px;
    display: flex;
}
.momentBar {
    width: 66%;
    margin-top: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.actionBar {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-left: auto;
    width: 30%;
    height: 250px;
    .actionBarContainer {
        padding-top: 30px;
        width: 280px;
        height: 254px;
        .iconBar {
            margin-bottom: 30px;
            display: flex;
            .actSingle {
                margin-left: 66px;
                cursor: pointer;
                .act_text {
                    font-size: 0.875rem;
                    margin-top: 10px;
                }
            }
        }
        .threeEntry {
            margin-left: 66px;
            .entrySingle {
                font-size: 0.875rem;
                text-align: left;
                height: 32px;
                line-height: 32px;
                cursor: pointer;
                img {
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>