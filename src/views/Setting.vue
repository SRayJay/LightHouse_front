<template>
  <div class="container">
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
              action="http://localhost:5000/uploadavatar"
              @change="handleChange"
            >
              <img class="avatar" v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div class="avatar" v-else>
                <img class="defaultAvatar" src="@/assets/default_avatar.jpg" alt="" />
              </div>
            </a-upload>
          </div>
        </div>
        <div class="nameBar flex flex-row mb20 flex-vcenter">
          <div class="mtitle">用户名</div>
          <a-input
            style="width: 20%"
            size="large"
            v-model.value="userName"
            class="nameInput"
            :maxlength="10"
            @blur="checkName"
          />
        </div>
        <div class="sexBar mb20 flex flex-row flex-vcenter">
          <div class="mtitle">性别</div>
          <div class="sex_radio">
            <a-radio-group v-model:value="sex" :options="userSex"> </a-radio-group>
          </div>
        </div>
        <div class="selflabelBar mb20 flex flex-row flex-vcenter">
          <div class="mtitle">个性签名</div>
          <a-input
            style="width: 20%"
            size="large"
            v-model.value="signature"
            class="selfLabelInput"
          />
        </div>
        <div class="cityBar flex flex-row mb20 flex-vcenter">
          <div class="mtitle">城市</div>
          <a-input style="width: 20%" size="large" v-model.value="userCity" class="city" />
        </div>
        <div>
          <a-button @click="saveInfo">保存</a-button>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
// import { UploadOutlined } from '@ant-design/icons-vue';
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export default defineComponent({
  name: "Setting",
  components: {
    PlusOutlined,
    LoadingOutlined,
  },

  setup() {
    const current = ref<string[]>(["mail"]);

    // const loading = ref<boolean>(false);

    // const userSex: Array<string> = ["女", "男"];
    const userName: string = "";
    const signature: string = "";
    const userCity: string = "";

    const checkName = () => {};

    // 性别
    const userSex = [
      { label: "女", value: 0 },
      { label: "男", value: 1 },
    ];
    const sex = ref<number>(1);

    // 上传图片模块
    const fileList = ref([]);
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

    // 保存信息
    const saveInfo = () => {
      let params = [];
    };

    return {
      activeKey: ref("1"),
      imageUrl,
      handleChange,
      beforeUpload,
      userSex,
      sex,
      userName,
      checkName,
      signature,
      userCity,
      saveInfo,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  margin: 2% 3%;
  background: #e6e6e6;
  padding: 1% 2%;
  border-radius: 0.5rem;
  text-align: left;
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

.mtitle {
  text-align: left;
  font-size: 1em;
  width: 10%;
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
