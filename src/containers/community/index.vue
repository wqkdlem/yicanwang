<template>
  <div class="community">
    <navTit :vid="54"></navTit>
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
          <div class="content-right-w" v-if="!currentlySelected||!currentlySelected[0]">
            <div class="content-right-w">
              <home></home>
            </div>
          </div>
          <div class="content-right-w" v-if="currentlySelected[0]==='圈子'">
            <div v-if="currentlySelected[1]==='社区轮播'">
              <communityBy></communityBy>
            </div>
            <div v-else-if="currentlySelected[1]==='发帖管理'">
              <postHtml></postHtml>
            </div>
            <div v-else-if="currentlySelected[1]==='标签管理'">
              <lable></lable>
            </div>

            <div v-else-if="currentlySelected[1]==='敏感词过滤'">
              <sensitive></sensitive>
            </div>
            <div v-else-if="currentlySelected[1]==='黑名单管理'">
              <blacklist></blacklist>
            </div>
          </div>
          <div class="content-right-w" v-else-if="currentlySelected&&currentlySelected[0]==='学院'">
            <div v-if="currentlySelected[1]==='学习视频分类'">
              <classify></classify>
            </div>
            <div v-else-if="currentlySelected[1]==='学习视频管理'">
              <videomessage></videomessage>
            </div>
            <div v-else-if="currentlySelected[1]==='视频评论管理'">
              <comment></comment>
            </div>
          </div>
          <div class="content-right-w" v-else-if="currentlySelected&&currentlySelected[0]==='用户管理'">
            <div v-if="currentlySelected[1]==='用户列表'">
              <userList v-if="ifUserList" @onToUserDetail="onToUserDetail"></userList>
              <userListDetail
                @onShowUserList="onShowUserList"
                :userDetailData="userDetailData"
                v-if="!ifUserList"
              ></userListDetail>
            </div>
            <div v-else-if="currentlySelected[1]==='用户地址'">
              <userAddress></userAddress>
            </div>
            <div v-else-if="currentlySelected[1]==='用户标签'">
              <userLabel></userLabel>
            </div>
            <div v-else-if="currentlySelected[1]==='用户等级'">
              <userLevel></userLevel>
            </div>
          </div>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import navTit from "@/components/navTit";
import communityBy from "./components/circle/communityBy"; //系统-管理员
import lable from "./components/circle/lable"; //系统-标签管理
import postHtml from "./components/circle/post"; //系统-发帖管理
import sensitive from "./components/circle/sensitive"; //系统-敏感词过滤
import blacklist from "./components/circle/blacklist"; //系统-黑名单管理
import videomessage from "./components/college/video"; //系统-管理员
import classify from "./components/college/classify"; //系统-标签管理
import comment from "./components/college/comment"; //系统-标签管理
export default {
  name: "HelloWorld",
  components: {
    navTit,
    communityBy,
    lable,
    videomessage,
    classify,
    comment,
    postHtml,
    sensitive,
    blacklist
  },
  data() {
    return {
      currentContent: "",
      navLeft: [],
      currentlySelected: ""
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
      this.currentlySelected = keyPath;
    },
    onToSecondaryPage(data) {}
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
