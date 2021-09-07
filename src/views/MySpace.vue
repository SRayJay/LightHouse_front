<template>
  <div class="flex flex-row">
    <div class="leftBar">
      <SettingOutlined
        class="settingicon"
        @click="toSetting"
        :style="{ 'font-size': '2rem', color: '#f5f1e8' }"
      />
      <a-avatar :size="128" :src="avatarUrl">
        <template #icon><UserOutlined style="font-size: 32px" /></template>
      </a-avatar>
      <div v-if="userInfo.userName" class="flex flex-column ml15">
        <div class="userName fs-bigger mb15">{{ userInfo.userName }}</div>
        <div class="signature">{{ userInfo.signature }}</div>
      </div>
    </div>
    <div class="rightBar">
      <Header width="75%" :dark="false"></Header>
      <router-view v-slot="{ Component }" class="content">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import { SettingOutlined } from "@ant-design/icons-vue";
export default {
  name: "MySpace",
  components: {
    SettingOutlined,
    Header,
  },
  setup() {
    const router = useRouter();
    const global = getCurrentInstance().appContext.config.globalProperties;

    let userInfo = reactive(JSON.parse(global.$store.state.user.userInfo)) || {};

    const avatarUrl = computed(() => {
      if (userInfo.avatar) return "http://120.53.125.13:5000" + userInfo.avatar;
      else return "http://120.53.125.13:5000/img/default_avatar.jpg";
    });
    const toSetting = () => {
      router.push("/myspace/setting");
    };

    return {
      userInfo,
      toSetting,
      avatarUrl,
    };
  },
};
</script>

<style lang="less" scoped>
.leftBar {
  padding-top: 3rem;
  width: 25%;
  background: #111317;
  height: 1000px;
  .settingicon {
    position: absolute;
    left: 1%;
    top: 2%;
  }
  .userName {
    color: #f5f1e8;
  }
  .signature {
    color: #f5f1e8;
  }
}
.rightBar {
  width: 70%;
  .content {
    margin-top: 74px;
  }
}
</style>
