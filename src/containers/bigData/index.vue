<template>
  <div class="bigData">
    <navTit :vid="42"></navTit>
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
        <el-container class="content-right"></el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
import navTit from "@/components/navTit";
export default {
  components: { navTit },
  name: "HelloWorld",
  data() {
    return {
      currentContent: "",
      navLeft: []
    };
  },
  created() {
    let { query } = this.$route;
    this.currentContent = query;
    console.log(this.currentContent);
    this.initGetSecondNav();
  },
  methods: {
    async initGetSecondNav() {
      let url = "admin/admin_user/level/2/id/" + this.currentContent.id;
      let response = await get({ url });
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
      console.log(key, keyPath);
    },
    onToSecondaryPage(data) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bigData {
  height: 100% !important;
  display: flex;
  flex-direction: column;
}
</style>
