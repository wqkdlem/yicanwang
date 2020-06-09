<template>
  <div class="generalize">
    <navTit :vid="43"></navTit>
    <div class="content">
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="245px">
          <el-menu @close="handleClose" @open="handleOpen" @select="onGetItem">
            <el-submenu v-for="(item,index) in navLeft" :key="index" :index="item.title">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(data,index) in item.grandson"
                  :key="index"
                  :index="data.title"
                  @click="onToSecondaryPage(item)"
                >{{data.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container class="content-right">
          <div class="content-right-w" v-if="currentlySelected[0]==='客户'">
            <div v-if="currentlySelected[1]==='客服管理'">
              <shoppingCart></shoppingCart>
            </div>
          </div>
          <div class="content-right-w" v-else-if="currentlySelected&&currentlySelected[0]==='营销'">
            <div v-if="currentlySelected[1]==='优惠价管理'">
              <shoppingCart></shoppingCart>
            </div>
            <div v-else-if="currentlySelected[1]==='秒杀管理'">
              <shoppingCart></shoppingCart>
            </div>
            <div v-else-if="currentlySelected[1]==='首页推荐管理'">
              <shoppingCart></shoppingCart>
            </div>
            <div v-else-if="currentlySelected[1]==='购物车推荐产品管理'">
              <shoppingCart></shoppingCart>
            </div>
            <div v-else-if="currentlySelected[1]==='汤料定制满赠活动'">
              <shoppingCart></shoppingCart>
            </div>
            <div v-else-if="currentlySelected[1]==='小程序活动推送'">
              <shoppingCart></shoppingCart>
            </div>
            <div v-else-if="currentlySelected[1]==='高端汤料定制系数'">
              <shoppingCart></shoppingCart>
            </div>
          </div>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
import navTit from "@/components/navTit";
import shoppingCart from "./components/marketing/shoppingCart"; //系统-群组管理
export default {
  components: { navTit, shoppingCart },
  name: "HelloWorld",
  data() {
    return {
      currentContent: "",
      navLeft: [],
      currentlySelected: "" //当前三级选中的页面
    };
  },
  created() {
    let { query } = this.$route;
    this.currentContent = query;
    this.initGetSecondNav();
    this.handleOpen(this.navLeft[0].title, this.navLeft[0].grandson[0].title);
  },
  methods: {
    async initGetSecondNav() {
      let url = "admin/admin_user/level/2/id/" + this.currentContent.id;
      let response = await get({ url });
      this.navLeft = response.child;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onGetItem(key, keyPath) {
      console.log(key, keyPath);
      this.currentlySelected = keyPath;
    },
    onToSecondaryPage(data) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.generalize {
  height: 100% !important;
  display: flex;
  flex-direction: column;
  .content-right {
    background: rgba(242, 242, 242, 1);
    padding: 30px 60px;
    box-sizing: border-box;
    .content-right-w {
      width: 100% !important;
    }
  }
}
</style>
