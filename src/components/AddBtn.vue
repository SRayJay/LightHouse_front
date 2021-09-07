<template>
  <a-button @click="ClickAddBtn" type="primary" shape="circle">
    <template #icon><PlusOutlined /></template>
  </a-button>
</template>

<script lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    PlusOutlined,
  },
  emits: ["ClickAddBtn"],
  setup(prop, context) {
    function ClickAddBtn(): void {
      context.emit("ClickAddBtn");
    }

    return {
      ClickAddBtn,
    };
  },
});
</script>

<style lang="less" scoped>
</style>
