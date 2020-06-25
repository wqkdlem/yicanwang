
<template>
  <div class="purchase">
    <navTit :vid="64"></navTit>
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
  name: "HelloWorld",
  components: {
    navTit
  },
  data() {
    return {
      currentContent: "",
      ifShowCharacterName: true, //是否展示角色列表
      jurisdictionData: "",
      currentlySelected: "", //当前三级选中的页面
      ifCutForm: true,
      cutFormDetailData: "",
      routerA: "/freight",
      navLeft: []
    };
  },
  created() {
    let { query } = this.$route;
    this.currentContent = query;
    this.initGetSecondNav();
    this.getUrl();
  },
  methods: {
    //获取二三级侧边栏
    async initGetSecondNav() {
      let url = "admin/admin_user/level/2/id/64";
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
      this.routerA = key;
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
.purchase {
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
      height: 100% !important;
    }
  }
}
</style>
