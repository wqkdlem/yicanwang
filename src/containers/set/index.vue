
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
            default-active="/administrator"
            router
          >
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
                  :index="'/'+data.url?data.url:'administrator'"
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
// import administrator from "./components/systemSettings/administrator"; //系统-管理员
// import characterName from "./components/systemSettings/characterName"; //系统-群组管理
// import deit from "./components/systemSettings/deit"; //系统-群组管理
// import adminLog from "./components/systemSettings/adminLog"; //系统-群组管理
// import fileManagement from "./components/systemSettings/fileManagement"; //系统-文件管理
// import fileGroupManagement from "./components/systemSettings/fileGroupManagement"; //系统-文件组管理
// import freight from "./components/basicSetting/freight"; //基础设置-运费模板管理
// import provinces from "./components/basicSetting/provinces"; //基础设置-省市区
// import background from "./components/account/background"; //基础设置-后台统一管理
// import accountMan from "./components/account/accountMan"; //基础设置-账号密码管理
// import accounAdministrator from "./components/account/administrator"; //基础设置-账号密码管理员
// import category from "./components/account/category"; //基础设置-组别管理
// import slideshow from "./components/officialWebsite/slideshow"; //基础设置-官网轮播图
// import organization from "./components/officialWebsite/organization"; //基础设置-机构媒体联系
// import cutForm from "./components/officialWebsite/cutForm"; //基础设置-单页信息
// import cutFormDetail from "./components/officialWebsite/cutFormDetail"; //基础设置-单页信息详情
// import coreTeam from "./components/officialWebsite/coreTeam"; //基础设置-核心团队
// import startupStory from "./components/officialWebsite/startupStory"; //基础设置-创业故事
// import award from "./components/officialWebsite/award"; //基础设置-获得奖项
// import mediaVideo from "./components/officialWebsite/mediaVideo"; //基础设置-咨询媒体视频
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
      ],
      currentlySelected: "", //当前三级选中的页面
      ifCutForm: true,
      cutFormDetailData: ""
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
      console.log(key, keyPath);
      this.currentlySelected = keyPath;
      this.ifCutForm = true;
    },
    //角色管理-权限
    onShowJurisdiction(data) {
      this.jurisdictionData = data;
      this.$nextTick(() => {
        this.ifShowCharacterName = false;
      });
    },
    //角色管理-编辑
    onToCompile() {
      // this.ifShowCharacterName = false;
    },
    //角色管理-增加
    onToAdd() {
      // this.ifShowCharacterName = false;
    }, //展示角色列表
    onShowCharacterName() {
      console.log("fanshui");
      this.ifShowCharacterName = true;
    },
    onToSecondaryPage(data) {},
    //单页增加或编辑
    onToCutFormDetail(data) {
      this.ifCutForm = false;
      this.cutFormDetailData = data;
    },
    onToCutFrom() {
      this.ifCutForm = true;
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
