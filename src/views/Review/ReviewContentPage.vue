<template>
    <div></div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import editorApi from '@/api/editor.js';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
console.log(route.params.id)
editorApi.getReview(route.params.id).then(res => {
    console.log(res)
})
</script>
<style lang="less" scoped>
</style>