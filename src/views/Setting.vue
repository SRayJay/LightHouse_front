<template>
  <Header></Header>
  <div class="wrap">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="个人信息" class="flex flex-column">
        <div class="flex flex-row flex-vcenter mb20">
          <div class="mtitle">头像</div>
          <div>
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :beforeUpload="beforeUpload"
              action="http://localhost:5000/upload/avatar"
              @change="handleChangeAvatar"
            >
              <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
              <img
                class="avatar"
                v-else-if="userInfo.avatar"
                :src="BASEURL + userInfo.avatar"
                alt="avatar"
              />
              <div class="avatar" v-else>
                <img class="defaultAvatar" src="@/assets/default_avatar.jpg" />
              </div>
            </a-upload>
          </div>
        </div>
        <div class="nameBar flex flex-row mb20 flex-vcenter">
          <div class="mtitle">用户名</div>
          <a-input
            style="width: 20%"
            size="large"
            v-model:value="userName"
            class="nameInput"
            :maxlength="10"
            @blur="checkName"
          />
        </div>
        <div class="sexBar mb20 flex flex-row flex-vcenter">
          <div class="mtitle">性别</div>
          <div class="sex_radio">
            <a-radio-group v-model:value="sex" :options="userSex"></a-radio-group>
          </div>
        </div>
        <div class="selflabelBar mb20 flex flex-row flex-vcenter">
          <div class="mtitle">个性签名</div>
          <a-input
            style="width: 30%;font-size: .8rem;"
            size="large"
            v-model:value="signature"
            class="selfLabelInput"
          />
        </div>
        <div class="cityBar flex flex-row mb20 flex-vcenter">
          <div class="mtitle">城市</div>
          <a-input
            style="width: 20%;font-size: .8rem;"
            size="large"
            v-model:value="city"
            class="city"
          />
        </div>
        <div class="backgroundBar flex flex-row mb20 flex-vcenter">
          <div class="mtitle">背景图片</div>
          <a-upload
            name="background"
            list-type="picture-card"
            class="backgroundUpload"
            :show-upload-list="false"
            :beforeUpload="beforeUpload"
            action="http://localhost:5000/upload/background"
            @change="handleChangeBack"
          >
            <img v-if="backUrl" :src="backUrl" class="backgroundUpload" />
            <img
              class="backgroundUpload"
              v-else-if="userInfo.background"
              :src="BASEURL + userInfo.background"
              alt="avatar"
            />
            <div class="avatar" v-else>
              <img class="defaultAvatar" src="@/assets/default_avatar.jpg" />
            </div>
          </a-upload>
        </div>
        <div class="save">
          <button class="saveBtn" @click="saveInfo">保存</button>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="安全设置">Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from "vue";
// import { UploadOutlined } from '@ant-design/icons-vue';
import Header from '@C/Header.vue'
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useStore } from 'vuex';
import { User } from '@/types'
import userApi from '@/api/user'
import { BASEURL } from '@/config'
function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

let activeKey = ref('1')

const current = ref<string[]>(["mail"]);
const store = useStore()
// const loading = ref<boolean>(false);

// const userSex: Array<string> = ["女", "男"];
let userName = ref<string>('');
let signature = ref<string>('');
let city = ref<string>('');
let userInfo = reactive<User>({ userName: '', signature: '', city: '', avatar: '', background: '', gender: 0, province: '' })
const getUserInfo = () => {
  userInfo = JSON.parse(store.state.user.userInfo)
  console.log(userInfo)
  userName.value = userInfo.userName;
  signature.value = userInfo.signature;
  city.value = userInfo.city
}
getUserInfo()
const checkName = () => { };

// 性别
const userSex = [
  { label: "女", value: 0 },
  { label: "男", value: 1 },
  { label: '保密', value: 2 }
];
const sex = ref<number>(2);

// 上传图片模块
const fileList = ref([]);
const avatarUrl = ref<string>("");
const trueAvatarUrl = ref<string>("");
const backUrl = ref<string>("");
const trueBackUrl = ref<string>("");
// 图片上传状态改变时
const handleChangeAvatar = (info) => {
  if (info.file.status === "done") {
    // 上传成功时拿到真正头像的url
    getBase64(info.file.originFileObj, (base64Url: string) => {
      avatarUrl.value = base64Url;
      // loading.value = false;
      console.log(info.file.response.url);
      trueAvatarUrl.value = info.file.response.data;
    });
  }
  if (info.file.status === "error") {
    message.error("upload error");
  }
};
const handleChangeBack = (info) => {
  if (info.file.status === "done") {
    // 上传成功时拿到真正头像的url
    getBase64(info.file.originFileObj, (base64Url: string) => {
      backUrl.value = base64Url;
      // loading.value = false;
      console.log(info.file.response.url);
      trueBackUrl.value = info.file.response.data;
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
  const isLt4M = file.size / 1024 / 1024 < 4;
  if (!isLt4M) {
    message.error("图片必须小于2MB");
  }
  return isJpgOrPng && isLt4M;
};

// 保存信息
const saveInfo = () => {
  let params = {
    userName: userName.value,
    city: city.value,
    signature: signature.value,
    gender: sex.value,
    avatar: trueAvatarUrl.value,
    background: trueBackUrl.value
  };
  store.dispatch("user/saveInfo", params).then(
    message.success('保存成功', 1.5)
  )
};



</script>

<style scoped lang="less">
.wrap {
  width: 1024px;
  margin: 30px auto 30px;
  min-height: 800px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding-bottom: 30px;
  border-radius: 10px;
  padding: 0 20px;
}
.avatar-uploader {
  display: block;
}
.avatar {
  border-radius: 50%;
  width: 128px;
  height: 128px;
  .defaultAvatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.backgroundUpload {
  width: 512px;
  height: 232px;
  text-align: left;

  cursor: pointer;
}

.save {
  margin: 40px 130px 60px 0px;
  text-align: right;
  .saveBtn {
    width: 100px;
    height: 40px;
    background: @soft_blue;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
  }
}

.mtitle {
  text-align: left;
  font-size: 1em;
  width: 100px;
  // flex: 1;
  margin-left: 10px;
  margin-right: 20px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
