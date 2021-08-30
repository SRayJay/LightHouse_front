<template>
  <div class="header_wrap">
    <nav>
      <ul class="flex fs-big flex-row nav_ul">
        <li>首页</li>
        <li>分类</li>
        <li>群岛</li>
        <li>书籍</li>
        <li>广场</li>
        <div>
          <SearchOutlined class="searchIcon" :style="{color:'#111317',fontSize:'1.5rem'}" />
          <input type="text" class="searchInput" placeholder="去发现">
          
          <!-- <a-input placeholder="去发现">
            <template #prefix>
              <SearchOutlined :style="{color:'#111317',fontSize:'1rem'}" />
            </template>
          </a-input> -->
        </div>
      </ul>
      <div class="drawerBox">
        <UserDrawer></UserDrawer>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {SearchOutlined} from '@ant-design/icons-vue'
import UserDrawer from "@C/UserDrawer.vue"
export default defineComponent({
  name:'Header',
  components:{
    UserDrawer,
    SearchOutlined
  },
  setup(){




    return{
      
    }

  }

  
})
</script>

<style lang="less" scoped>
.header_wrap{
  height: 74px;
  width: 100%;
  min-width: 1000px;
  position: absolute;
  z-index:999;
  top: 0;
  .nav_ul{
    width: calc(41% - 83px);
    height: 100%;
    position: absolute;
    // background:#fff;
    color: @softwhite;
    right: 83px;
    padding: 24px 40px;
    box-sizing: border-box;
    border-right: 1px solid @softwhite;
    border-bottom: 1px solid @softwhite;
    li{
      margin-right: 1.5rem;
    }
    div{
      position: relative;
      margin:0 5px;
      height: 25px;
      line-height: 25px;
      .searchIcon{
        position: absolute;
        left: 10px;
        top: 5px;
      }
      .searchInput{
        border-radius:10px;
        border:none;
        width: auto;
        // max-width: 200px;
        font-size: 1rem;
        color: #111317;
        padding: 5px 0 5px 40px;
      }
    }
    
  }
  .drawerBox{
    position: absolute;
    right: 0;
    top: 0;
    width: 84px;
    height: 74px;
    color:@softwhite;
    // background:#fff;
    border-bottom: 1px solid @softwhite;
    padding-top: 21px;
    .drawer{
      margin-left: auto;
      margin-right: auto;
      margin-top: 21px;
      margin-bottom: auto;
    }
  }
}
</style>
