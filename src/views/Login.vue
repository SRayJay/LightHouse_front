<template>
    <div class="login">
        <div class="content">
            <div class="header">
                <div class="bar">
                    <router-link to="/">
                        <!-- <div class="logo">
                            <img class="logo_pic" src="@/assets/logo.png" />
                        </div> -->
                        <div class="logo_txt">LightHouse</div>
                    </router-link>
                </div>
            </div>
            <img src="@/assets/background.jpg" class="bgpic" />
            <login-form class="form"></login-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import LoginForm from '@C/LoginForm.vue'

</script>
<style lang="less" scoped>
.login {
    line-height: 0 !important;
    overflow: hidden;

    position: relative;
}
.bgpic {
    // height: 100%;
    height: calc(100vh - 123px);
    width: 100%;
}
.form {
    position: absolute;
    right: 20%;
    transform: translate(50%, 0);
    top: 25%;
}
.header {
    background: #f2f2f2;
    width: 100%;
    height: 80px;
}
.bar {
    height: 80px;
    width: 1024px;
    margin: 0 auto;
}
.logo {
    width: 55px;
    height: 55px;
    float: left;
    margin-top: 12px;
}
.logo_pic {
    width: 55px;
    height: 55px;
}
.logo_txt {
    height: 80px;
    width: 121px;
    margin-left: 40px;
    font-size: 20px;
    line-height: 80px;
    vertical-align: middle;
    float: left;
}
</style>