<template>
  <div class="content">
    <img :src="props.islands.pic" />
    <div class="mtitle">{{ props.islands.name }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  islands: Object,
});
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IslandThumb",
});
</script>

<style lang="less" scoped>
.content {
  width: 160px;
  height: 200px;
  background: #fff;
  border-radius: 10px;
  // box-shadow: 0px 2px 4px #fff;
  img {
    width: 160px;
    height: 160px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
  }
  .mtitle {
    // margin-top: auto;
    line-height: 40px;
    font-size: 1.2em;
    font-weight: 700;
  }
}
</style>
