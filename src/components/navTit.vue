<template>
  <div class="nav">
    <div class="nav-left">
      <img style :src="logo" alt />
      <!-- <span>伊餐网</span> -->
    </div>
    <div class="nav-center">
      <div
        class="nav-center-i"
        v-for="(item,index) in navData"
        :key="index"
        @click="onToPage(item)"
      >
        <img :src="item.icons" v-if="vid===item.id" alt />
        <img :src="item.icon" v-else alt />
        <div>{{item.title}}</div>
      </div>
    </div>
    <div class="nav-rig" @click="ifQuit = true;">
      <img style :src="touxiang" alt />
      <span>{{username}}</span>
    </div>
    <el-dialog title="退出登录"  class="abow_dialog" :visible.sync="ifQuit" width="600px">
      <div class="box">
        <div>确认退出当前帐号？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChagneUser = false">取 消</el-button>
          <el-button style="margin-left:40px" type="primary" @click="onToQuit">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import { localSave, localRead } from "@/lib/local.js";
export default {
  name: "navTit",
  props: { vid: {} },
  data() {
    return {
      ifQuit: false,
      touxiang: require("@/assets/new_images/touxiang.png"),
      logo: require("@/assets/new_images/logo.png"),
      navData: "",
      username: ""
    };
  },
  catch: {},
  created() {
    this.onGetNavList();
    this.username = localRead("username");
  },
  methods: {
    onToPage(item) {
      let query = item;
      if (item.id === 1) return this.$router.push({ path: "/home", query });
      if (item.id === 2) return this.$router.push({ path: "/purchase", query });
      if (item.id === 41) return this.$router.push({ path: "/order", query });
      if (item.id === 42) return this.$router.push({ path: "/bigData", query });
      if (item.id === 43)
        return this.$router.push({ path: "/generalize", query });
      if (item.id === 54)
        return this.$router.push({ path: "/community", query });
      if (item.id === 64) return this.$router.push({ path: "/set", query });
    },
    async onGetNavList() {
      let url = "admin/admin_user/level/1";
      let data = {};
      let response = await get({ url, data });
      // let response = await fakeGet(this.navData);
      this.navData = response;
      this.navData.map(item => {
        item.icon = require(`@/assets/new_images/navImg/${item.icon}.png`);
        item.icons = require(`@/assets/new_images/navImg/${item.icons}.png`);
      });
    },
    onToQuit() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nav {
  width: 100%;
  min-width: 1240px;
  height: 120px;
  background-color: #3cb371;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 35px 0 0;
  box-sizing: border-box;
  .nav-left {
    width: 245px;
    background-color: #39ab6c;
    height: 110px;
    padding-left: 35px;
    box-sizing: border-box;
    text-align: left;
    display: flex;
    align-items: center;
    img {
      width: 120px;
      height: 35px;
      line-height: 120px;
      display: inline-block;
    }
    span {
      color: #fff;
      font-size: 24px;
      display: inline-block;
      margin-left: 10px;
    }
  }
  .nav-center {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-center-i {
      width: 100px;
      margin: 0 8px;
      color: rgba(255, 255, 255, 1);
      font-size: 18px;
    }
  }
  .nav-rig {
    display: flex;
    align-items: center;
    img {
      width: 44px;
      height: 44px;
      display: inline-block;
    }
    span {
      color: #fff;
      font-size: 24px;
      display: inline-block;
      margin-left: 10px;
    }
  }
}
.box {
  font-size: 14px;
  .dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 30px;
  }
}
</style>
