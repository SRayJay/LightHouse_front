<script setup lang="ts">
// import UserDrawer from "@/components/UserDrawer.vue"
import Header from "@/components/Header.vue";
import { defineComponent, ref } from "vue";
defineComponent({
  // UserDrawer,
  Header,
});
</script>

<template>
  <Header width="100%" :dark="true"></Header>
  <main class="main flex flex-row">
    <!-- <p>LightHouse</p> -->
    <div class="part1 flex flex-row">
      <div class="flex flex-column title">
        <a-image :preview="false" width="100%" src="src/assets/logo.png"></a-image>
        <div>To The Moon</div>
      </div>
    </div>
    <div class="part2">
      <a-image :preview="false" src="src/assets/lighthouse.jpg"></a-image>
    </div>
    <!-- <a-button type="primary" @click="showLoginDlg">Login in</a-button> -->
    <!-- <user-drawer></user-drawer> -->
  </main>
</template>

<style lang="less" scoped>
.main {
  background: #111317;
  opacity: 0.9;
  .part1 {
    width: 59%;
    height: auto;
    box-sizing: border-box;
    border-right: 1px solid #fff;
    padding: 4% 4% 3%;
    .title {
      color: #fff;
    }
  }
  .part2 {
    margin-top: 7.6%;
    width: 41%;
    height: auto;
    box-sizing: border-box;
    padding: 4% 4% 3%;
    // margin-top: 76px;
    text-align: center;
  }
}
</style>
