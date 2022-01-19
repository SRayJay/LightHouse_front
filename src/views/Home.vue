<template>
    <div>
        <Header></Header>
        <div>
            <div class="index_bg">
                <img src="@/assets/index_bg.png" class="bg_pic" />
                <div class="welcometext">Welcome to LightHouse</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Header from '@C/Header.vue';


</script>

<style lang="less" scoped>
.bg_pic {
    width: 1024px;
    height: 352px;
    position: relative;
}
.welcometext {
    font-weight: 700;
    color: #fefefe;
    position: absolute;
    top: 216px;
    left: 538px;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: Arial Negreta;
    font-style: normal;
    font-size: 32px;
    text-shadow: 0.1em 0.1em 0.3em #000;
}
</style>