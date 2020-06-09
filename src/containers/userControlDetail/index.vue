
<template>
  <div class="purchase">
    <navTit :vid="2"></navTit>
    <div class="content">
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="245px">
          <el-menu @close="handleClose" @open="handleOpen" @select="onGetItem">
            <el-submenu v-for="(item,index) in navLeft" :key="index" :index="item.title">
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <img style="width:15px;height:15px" :src="item.icon" alt />
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
  name: "HelloWorld",
  components: {
    navTit,
    home
  },
  data() {
    return {
      currentContent: "",
      navLeft: [
        // {
        //   title: "店铺管理",
        //   grandson: [
        //     { title: "轮播图管理" },
        //     { title: "消息发布" },
        //     { title: "帮助回答" },
        //     { title: "app版本管理" }
        //   ]
        // },
        // {
        //   title: "小程序管理",
        //   grandson: [
        //     { title: "二维码列表" },
        //     { title: "小程序广告位" },
        //     { title: "小程序视频管理" },
        //     { title: "小程序轮播图管理" }
        //   ]
        // }
      ]
    };
  },
  created() {
    let { query } = this.$route;
    this.currentContent = query;
    this.initGetSecondNav();
  },
  methods: {
    //获取二三级侧边栏
    async initGetSecondNav() {
      let url = "admin/admin_user/level/2/id/" + this.currentContent.id;
      let data = {};
      let response = await get({ url });
      this.navLeft = response.child;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
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
.purchase {
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
