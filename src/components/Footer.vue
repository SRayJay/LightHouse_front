<template>
  <div class="wrap flex">
    <div>ss</div>
    <div>err</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/color.scss";
.wrap {
  background: $back_black;
  min-height: 60px;
  padding: 1em 1em;
  width: 100%;
  color: $soft_white;
}
</style>
