<template>
  <UserOutlined style="font-size: 2rem" @click="showDrawer" />

  <a-drawer
    width="15%"
    placement="right"
    :closable="false"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
  >
    <template #title>
      <div class="drawerTitle flex">
        <a-avatar :size="64">
          <template #icon>
            <UserOutlined style="font-size: 32px" />
          </template>
        </a-avatar>
        <div v-if="hasInfo" class="flex flex-column ml15">
          <div class="userName fs-bigger mb15">{{ userName }}</div>
          <div class="signature fs-small">{{ signature }}</div>
        </div>
        <div v-else class="flex-column flex buttonGroup">
          <a-button class="mb5" @click="registerModalVisible = true">注册</a-button>
          <a-button @click="loginModalVisible = true">登录</a-button>
        </div>
      </div>
    </template>

    <div v-if="hasInfo">
      <a href="/#/myspace" class="link">个人主页</a>
    </div>
    <div v-else>
      <p>到灯塔去..</p>
    </div>
    <div class="logout">
      <LogoutOutlined @click="logout" style="font-size: 32px" />
    </div>
  </a-drawer>
  <a-modal
    :centered="true"
    v-model:visible="registerModalVisible"
    width="20%"
    :footer="null"
    title="注册"
  >
    <a-spin :spinning="regLoading">
      <a-input v-model:value="regUserName" size="large" placeholder="username">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input>
      <div class="mt20"></div>
      <a-input v-model:value="regPassword" size="large" placeholder="password">
        <template #prefix>
          <LockOutlined />
        </template>
      </a-input>
      <div class="mt20"></div>
      <a-button :block="true" size="large" shape="round" @click="userRegister">注册</a-button>
    </a-spin>
  </a-modal>
  <a-modal
    :centered="true"
    v-model:visible="loginModalVisible"
    width="20%"
    :footer="null"
    title="登录"
  >
    <a-spin :spinning="logLoading">
      <a-input v-model:value="logUserName" size="large" placeholder="username">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input>
      <div class="mt20"></div>
      <a-input v-model:value="logPassword" size="large" placeholder="password">
        <template #prefix>
          <LockOutlined />
        </template>
      </a-input>
      <div class="mt20"></div>
      <a-button :block="true" size="large" shape="round" @click="userLogin">登录</a-button>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent, ref, reactive, onMounted } from "vue";
import { UserOutlined, LogoutOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserDrawer",
  components: {
    UserOutlined,
    LogoutOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter();
    const visible = ref<boolean>(false);
    const hasInfo = ref<boolean>(false);
    const userName = ref<string>("");
    const signature = ref<string>("");

    const global = getCurrentInstance().appContext.config.globalProperties;
    let userInfo = reactive({});

    // 获取用户基本信息
    const getUserInfo = () => {
      if (global.$store.state.user.userInfo) {
        userInfo = reactive(JSON.parse(global.$store.state.user.userInfo));
        if ((userInfo as any).userName) {
          hasInfo.value = true;
          userName.value = (userInfo as any).userName;
          signature.value = (userInfo as any).signature;
        }
      }
    };

    getUserInfo();

    const afterVisibleChange = (bool: boolean) => {
      // console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    // 注册模块
    const registerModalVisible = ref<boolean>(false);
    const regUserName = ref<string>("");
    const regPassword = ref<string>("");
    const regLoading = ref<boolean>(false);

    const userRegister = () => {
      let registerForm = {
        userName: regUserName.value,
        password: regPassword.value,
      };
      regLoading.value = true;
      global.$store
        .dispatch("user/register", registerForm)
        .then(
          () => {
            regLoading.value = false;
            global.$message.success("注册成功");
            registerModalVisible.value = false;
            getUserInfo();
          },
          () => {
            global.$message.error("用户已存在");
          }
        )
        .catch((err) => {
          console.log(err);
        });
    };

    // 登录模块
    const loginModalVisible = ref<boolean>(false);
    const logUserName = ref<string>("");
    const logPassword = ref<string>("");
    const logLoading = ref<boolean>(false);

    const userLogin = () => {
      let loginForm = {
        userName: logUserName.value,
        password: logPassword.value,
      };
      logLoading.value = true;
      global.$store
        .dispatch("user/login", loginForm)
        .then(
          () => {
            global.$message.success("登录成功");
            loginModalVisible.value = false;
            logLoading.value = false;
            getUserInfo();
          },
          (msg) => {
            global.$message.error(msg);
            logLoading.value = false;
          }
        )
        .catch((err) => {
          console.log(err);
        });
    };

    const logout = () => {
      global.$store.dispatch("user/logout").then(() => {
        global.$message.success("注销成功");
        getUserInfo();
        hasInfo.value = false;
        logUserName.value = "";
        regUserName.value = "";
        logPassword.value = "";
        regPassword.value = "";
      });
    };

    return {
      visible,
      afterVisibleChange,
      showDrawer,
      registerModalVisible,
      loginModalVisible,
      regUserName,
      regPassword,
      userRegister,
      regLoading,
      userInfo,
      hasInfo,
      logLoading,
      logUserName,
      logPassword,
      logout,
      userLogin,
      userName,
      signature,
    };
  },
});
</script>

<style scoped lang="scss">
.drawerTitle {
  .userName {
    // color: #3B4152;
    color: #111317;
  }
  .signature {
    color: #4b6376;
  }
  .buttonGroup {
    margin-left: auto;
  }
}
.link {
  font-size: 1rem;
  color: #4b6376;
}
.logout {
  position: absolute;
  bottom: 1vh;
  right: 1vw;
  cursor: pointer;
}
</style>
