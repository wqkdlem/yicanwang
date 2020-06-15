<template>
  <div class="purchaseWarp">
    <el-menu @close="handleClose" @open="handleOpen" :default-active="this.$route.path" router>
      <el-submenu v-for="(item,index) in navLeft" :key="index" :index="item.title">
        <template slot="title">
          <img style="width:15px;height:15px" :src="item.icon" alt />
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="purchase">首页</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  props: ["navLeft"],
  components: {},
  data() {
    return {
      purchase: "/purchase"
    };
  },
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.purchaseWarp {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
