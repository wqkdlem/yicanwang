<template>
  <div class="bigData">
    <navTit :vid="42"></navTit>
    <div class="content">
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="245px">
          <el-menu
            @close="handleClose"
            @open="handleOpen"
            @select="onGetItem"
            :default-active="routerA"
            router
          >
            <el-submenu v-for="(item,index) in navLeft" :key="index" :index="item.title">
              <template slot="title">
                <img style="width:15px;height:15px" :src="item.icon" alt />
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(data,index) in item.grandson"
                  :key="index"
                  :index="'/'+data.url"
                  @click="onToSecondaryPage(item)"
                >{{data.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container class="content-right">
          <router-view style="width:100%" />
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import navTit from "@/components/navTit";
export default {
  components: { navTit },
  name: "HelloWorld",
  data() {
    return {
      currentContent: "",
      navLeft: [],
      routerA: "/dataGrid"
    };
  },
  created() {
    let { query } = this.$route;
    this.currentContent = query;
    console.log(this.currentContent);
    this.initGetSecondNav();
    this.getUrl();
  },
  methods: {
    async initGetSecondNav() {
      let url = "admin/admin_user/level/2/id/42";
      let response = await get({ url });
      if (response.msg) return this.$message(response.msg);
      if (response.child) {
        this.navLeft = response.child;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onGetItem(key, keyPath) {
      // this.routerA = key;
    },
    onToSecondaryPage(data) {},
    getUrl() {
      let self = this;
      let currentUrl = window.location.href;
      let aa = currentUrl.split("#")[1];
      self.routerA = aa.substring(0, aa.indexOf("?"));
      if (self.routerA) {
        console.log(currentUrl, self.routerA, "刷新后路由");
      } else {
        self.routerA = currentUrl.split("#")[1];
        console.log(self.routerA, "刷新后路由11111111111");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bigData {
  height: 100% !important;
  display: flex;
  flex-direction: column;
  .content-right {
    background: rgba(242, 242, 242, 1);
    padding: 20px 25px;
  }
}
</style>
