<template>
  <div class="wrap">
    <div style="border-top:1px dashed #cccccc;height: 1px;overflow:hidden" />
    <div class="text">© 2022 LightHouse, all rights reserved </div>
    <div class="placeholder" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style lang="less" scoped>
@import "../assets/styles/theme.less";
.wrap {
  // background: $back_black;
  // min-height: 60px;
  // padding: 1em 1em;
  width: 100%;
  // color: $soft_white;
  // color: #7a7a7a;
}
.text {
  margin-top: 10px;
  font-size: 14px;
  color: #7a7a7a;
}
.placeholder {
  height: 10px;
  width: 100%;
}
</style>
