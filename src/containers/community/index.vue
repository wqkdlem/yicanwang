<template>
  <div class="community">
    <navTit :vid="54"></navTit>
    <div class="content">
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="245px">
          <el-menu default-active="/communityBy" router>
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
// import communityBy from "./components/circle/communityBy"; //系统-社区轮播
// import lable from "./components/circle/lable"; //系统-标签管理
// import postHtml from "./components/circle/post"; //系统-发帖管理
// import sensitive from "./components/circle/sensitive"; //系统-敏感词过滤
// import blacklist from "./components/circle/blacklist"; //系统-黑名单管理
// import videomessage from "./components/college/video"; //系统-学习视频管理
// import classify from "./components/college/classify"; //系统-学习视频分类
// import comment from "./components/college/comment"; //系统-视频评论管理
export default {
  name: "HelloWorld",
  components: {
    navTit
  },
  data() {
    return {
      currentContent: "",
      navLeft: [],
      currentlySelected: "",
      routerA: "/communityBy"
    };
  },
  created() {
    let { query } = this.$route;
    this.currentContent = query;
    this.initGetSecondNav();
    this.getUrl();
  },
  methods: {
    async initGetSecondNav() {
      let url = "admin/admin_user/level/2/id/54";
      let response = await get({ url });
      this.navLeft = response.child;
    },
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
.community {
  height: 100% !important;
  display: flex;
  flex-direction: column;
  .content-right {
    background: rgba(242, 242, 242, 1);
    padding: 30px 60px;
    box-sizing: border-box;
    height: 100%;
    .content-right-w {
      width: 100% !important;
      height: 100%;
    }
  }
}
</style>
