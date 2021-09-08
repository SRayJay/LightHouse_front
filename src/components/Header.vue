<template>
  <div class="header_wrap">
    <nav>
      <ul class="flex fs-big flex-row nav_ul">
        <li @click="navTo(1)">首页</li>
        <li>分类</li>
        <li @click="navTo(3)">群岛</li>
        <li>书籍</li>
        <li>广场</li>
        <div>
          <SearchOutlined class="searchIcon" :style="{ color: '#111317', fontSize: '1.5rem' }" />
          <input type="text" class="searchInput" placeholder="去发现" />
        </div>
      </ul>
      <div class="drawerBox">
        <UserDrawer></UserDrawer>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { SearchOutlined } from "@ant-design/icons-vue";
import UserDrawer from "@C/UserDrawer.vue";

interface ColorStyle {
  backColor: string;
  fontColor: string;
}

const lightStyle: ColorStyle = {
  backColor: "#fff",
  fontColor: "#111317",
};
const darkStyle: ColorStyle = {
  backColor: "#111317",
  fontColor: "#fff",
};
export default defineComponent({
  name: "Header",
  components: {
    UserDrawer,
    SearchOutlined,
  },
  props: {
    dark: Boolean,
    width: String,
  },

  setup(props) {
    let router = useRouter();

    // 处理动态样式
    let theme: ColorStyle = reactive({ backColor: "", fontColor: "" });
    if (props.dark === true) {
      theme = darkStyle;
    } else {
      theme = lightStyle;
    }
    let navwidth = ref("calc(41% - 83px)");
    if (props.width === "75%") {
      navwidth.value = "calc(100% - 83px)";
    }

    // 导航跳转
    function navTo(path: number): void {
      console.log(path);
      switch (path) {
        case 1:
          router.push("/");
          break;
        case 3:
          router.push("/islands");
          break;
      }
    }

    return {
      theme,
      navwidth,
      navTo,
    };
  },
});
</script>

<style lang="less" scoped>
.header_wrap {
  height: 74px;
  width: v-bind(width);
  min-width: 1000px;
  position: absolute;
  z-index: 999;
  top: 0;
  .nav_ul {
    width: v-bind(navwidth);
    height: 100%;
    position: absolute;
    color: v-bind("theme.fontColor");
    right: 83px;
    padding: 24px 40px;
    box-sizing: border-box;
    border-right: 1px solid v-bind("theme.fontColor");
    border-left: 1px solid v-bind("theme.fontColor");
    border-bottom: 1px solid v-bind("theme.fontColor");
    li {
      margin-right: 1.5rem;
      cursor: pointer;
    }
    div {
      position: relative;
      margin: 0 5px;
      height: 25px;
      line-height: 25px;
      .searchIcon {
        position: absolute;
        left: 10px;
        top: 5px;
      }
      .searchInput {
        border-radius: 10px;
        border: none;
        width: auto;
        // max-width: 200px;
        font-size: 1rem;
        color: v-bind("theme.backColor");
        padding: 5px 0 5px 40px;
      }
    }
  }
  .drawerBox {
    position: absolute;
    right: 0;
    top: 0;
    width: 84px;
    height: 74px;
    color: v-bind("theme.fontColor");
    // background:#fff;
    border-bottom: 1px solid v-bind("theme.fontColor");
    padding-top: 21px;
    .drawer {
      margin-left: auto;
      margin-right: auto;
      margin-top: 21px;
      margin-bottom: auto;
    }
  }
}
</style>
