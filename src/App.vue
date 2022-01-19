<script setup lang="ts">
import Footer from "@C/Footer.vue";
</script>

<template>
  <div class="app-content">
    <router-view></router-view>
  </div>

  <Footer class="footer"></Footer>
</template>

<style lang="less">
@import "./assets/styles/index.less";
@import "./assets/styles/theme.less";
#app {
  font-family: "PingFang SC", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
.app-content {
  flex: 1;
}
.footer {
  flex: 0;
  /* position: absolute; */
  /* bottom: 0; */
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
  margin-bottom: 0;
}
input,
button {
  outline: none;
}
a {
  text-decoration: none;
  color: #000;
}
</style>
