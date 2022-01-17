<template>
  <Header width="100%"></Header>

  <div class="form">
    岛名：
    <a-input></a-input>岛图：
  </div>
</template>

<script lang="ts" setup>
import Header from "@C/Header.vue";
</script>

<style scoped lang="scss">
.form {
  margin-top: 5rem;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
</style>
