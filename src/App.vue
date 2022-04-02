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
  font-size: 16px;
  color: @text_black;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
.basic-wrap {
  padding-bottom: 30px;
  width: 1024px;
  margin: 40px auto 0;
}
.app-content {
  flex: 1;
}
.footer {
  flex: 0;
  /* position: absolute; */
  /* bottom: 0; */
}
// .ant-popover-inner-content {
//   width: 200px;
// }
body,
div,
span,
header,
footer,
nav,
section,
aside,
article,
ul,
dl,
dt,
dd,
li,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
textarea,
button,
input,
select,
figure,
figcaption {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  font-style: normal;
  font-family: "PingFangSC-Regular";
  &:focus {
    outline: none;
  }
}
ul {
  list-style: none;
  margin-bottom: 0;
}
input,
button {
  outline: none;
}
</style>
