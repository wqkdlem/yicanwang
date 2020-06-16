<template>
  <div class="nav">
    <div class="nav-left">
      <img style src alt />
      <span>伊餐网</span>
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
      <img style src alt />
      <span>111</span>
    </div>
    <el-dialog title="物流" :visible.sync="ifQuit" width="600px">
      <div class="box">
        <div>确认退出当前帐号？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChagneUser = false">取 消</el-button>
          <el-button type="primary" @click="onToQuit">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "navTit",
  props: { vid: {} },
  data() {
    return {
      ifQuit: false,
      navData: [
        // {
        //   id: 1,
        //   pid: 0,
        //   title: "首页",
        //   condition: 1,
        //   level: 1,
        //   icon: "shouye",
        //   icons: "onshouye",
        //   url: "#"
        // },
        // {
        //   id: 2,
        //   pid: 0,
        //   title: "采购",
        //   condition: 1,
        //   level: 1,
        //   icon: "caigou",
        //   icons: "onCaigou",
        //   url: "#"
        // },
        // {
        //   id: 41,
        //   pid: 0,
        //   title: "点餐",
        //   condition: 1,
        //   level: 1,
        //   icon: "diancan",
        //   icons: "onDiancan",
        //   url: "#"
        // },
        // {
        //   id: 42,
        //   pid: 0,
        //   title: "大数据",
        //   condition: 1,
        //   level: 1,
        //   icon: "shuju",
        //   icons: "onShuju",
        //   url: "#"
        // },
        // {
        //   id: 43,
        //   pid: 0,
        //   title: "推广",
        //   condition: 1,
        //   level: 1,
        //   icon: "tuiguang",
        //   icons: "onTuiguang",
        //   url: "#"
        // },
        // {
        //   id: 54,
        //   pid: 0,
        //   title: "社区",
        //   condition: 1,
        //   level: 1,
        //   icon: "shequ",
        //   icons: "onShequ",
        //   url: "#"
        // },
        // {
        //   id: 64,
        //   pid: 0,
        //   title: "系统设置",
        //   condition: 1,
        //   level: 1,
        //   icon: "shezhi",
        //   icons: "onShezhi",
        //   url: "#"
        // }
      ]
    };
  },
  catch: {},
  created() {
    this.onGetNavList();
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
    height: 120px;
    padding-left: 35px;
    box-sizing: border-box;
    text-align: left;
    display: flex;
    align-items: center;
    img {
      width: 44px;
      height: 44px;
      border: 1px solid red;
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
      border: 1px solid red;
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
