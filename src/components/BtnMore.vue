<template>
    <button @click="toMore" class="btn">
        更多
        <right-outlined />
    </button>
</template>
<script lang="ts" setup>
import { RightOutlined } from '@ant-design/icons-vue'
const emit = defineEmits(['toMore'])
const toMore = () => {
    emit('toMore')
}
</script>
<style lang="less" scoped>
.btn {
    height: 30px;
    width: 64px;
    color: @soft_blue;
    background-color: #fff;
    border-color: rgba(0, 0, 0, 0.3);
    font-size: 0.8rem;
    border-radius: 5px;
    cursor: pointer;
    // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>