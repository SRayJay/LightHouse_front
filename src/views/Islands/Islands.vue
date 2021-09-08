<template>
  <Header width="100%"></Header>
  <div class="container">
    <div class="title">Islands</div>

    <div class="searchBar">
      <a-input-search
        size="large"
        v-model:value="searchContent"
        placeholder="input search text"
      ></a-input-search>
    </div>

    <div class="islandsContainer">
      <AddBtn class="addBtn" @ClickAddBtn="toCreateIsland"></AddBtn>
      <IslandThumb :islands="island1"></IslandThumb>
      <IslandThumb :islands="island2"></IslandThumb>
      <IslandThumb :islands="island3"></IslandThumb>
      <IslandThumb :islands="island2"></IslandThumb>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IslandThumb from "@C/IslandThumb.vue";
import Header from "@C/Header.vue";
import { defineComponent, ref } from "vue";
import AddBtn from "@C/AddBtn.vue";
import { useRouter } from "vue-router";

defineComponent({
  IslandThumb,
  Header,
  AddBtn,
});

const island1: object = {
  pic: "@/assets/camus.jpg",
  name: "加缪",
};
const island2: object = {
  pic: "@/assets/William_Faulkner.jpg",
  name: "福克纳",
};
const island3: object = {
  pic: "@/assets/Kafka.jpg",
  name: "卡夫卡",
};
const island4: object = {
  pic: "@/assets/William_Faulkner.jpg",
  name: "福克纳",
};

let router = useRouter();
function toCreateIsland(): void {
  console.log(123);

  router.push({ name: "CreateIsland" });
}

let searchContent = ref<string>("");
</script>

<style lang="less" scoped>
.container {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  .title {
    font-size: 2rem;
    margin-top: 5rem;
    margin-bottom: 2rem;
  }

  .islandsContainer {
    width: 100%;
    margin-top: 2rem;
    padding: 4em;
    position: relative;
    height: 600px;
    background: @back;
    border-radius: 20px;
    display: grid;
    grid-auto-rows: 1fr;
    grid-auto-columns: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-flow: dense;
    grid-gap: 1.5em;
    .addBtn {
      position: absolute;
      right: 2em;
      top: 1em;
    }
  }
}
</style>
