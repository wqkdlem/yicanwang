
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
        <el-container class="content-right">
          <div class="content-right-w" v-if="!currentlySelected||!currentlySelected[0]">
            <div class="content-right-w">
              <home></home>
            </div>
          </div>
          <div class="content-right-w" v-if="currentlySelected[0]==='店铺管理'">
            <div v-if="currentlySelected[1]==='轮播图管理'">
              <slideshow></slideshow>
            </div>
            <div v-else-if="currentlySelected[1]==='消息发布'">
              <news></news>
            </div>
            <div v-else-if="currentlySelected[1]==='帮助回答'">
              <help></help>
            </div>
          </div>
          <div
            class="content-right-w"
            v-else-if="currentlySelected&&currentlySelected[0]==='小程序管理'"
          >
            <div v-if="currentlySelected[1]==='小程序轮播图'">
              <appletSlideshow></appletSlideshow>
            </div>
            <div v-else-if="currentlySelected[1]==='二维码管理'">
              <qrCode></qrCode>
            </div>
            <div v-else-if="currentlySelected[1]==='小程序广告位'">
              <advertising></advertising>
            </div>
            <div v-else-if="currentlySelected[1]==='小程序视频'">
              <Videos></Videos>
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

          <div class="content-right-w" v-else-if="currentlySelected&&currentlySelected[0]==='商品管理'">
            <div v-if="currentlySelected[1]==='产品管理'" style="height:100%">
              <div v-if="ifShowProductList">
                <productList
                  @onToProductListDetail="onToProductListDetail"
                  @onTOComment="onTOComment"
                ></productList>
              </div>
              <div v-if="!ifShowProductList" style="height:100%">
                <productListDetail
                  :productListDetailData="productListDetailData"
                  @onShowProductList="onShowProductList"
                ></productListDetail>
              </div>
            </div>
            <div v-else-if="currentlySelected[1]==='产品分类'">
              <categoryList></categoryList>
            </div>
            <div v-else-if="currentlySelected[1]==='汤料管理'">
              <div v-if="ifShowProductList">
                <soupBasesList @onToProductListDetail="onToProductListDetail"></soupBasesList>
              </div>
              <div v-if="!ifShowProductList" style="height:100%">
                <soupBasesListDetail
                  :productListDetailData="productListDetailData"
                  @onShowProductList="onShowProductList"
                ></soupBasesListDetail>
              </div>
            </div>
            <div v-else-if="currentlySelected[1]==='产品评论'">
              <evaluationList :evaluationId="evaluationId"></evaluationList>
            </div>
          </div>
          <div class="content-right-w" v-else-if="currentlySelected&&currentlySelected[0]==='订单'">
            <div v-if="currentlySelected[1]==='原料订单'">
              <materialOrder></materialOrder>
            </div>
            <div v-else-if="currentlySelected[1]==='汤料订单'">
              <orderSoup></orderSoup>
            </div>
          </div>
          <div class="content-right-w" v-else-if="currentlySelected&&currentlySelected[0]==='数据'">
            <div v-if="currentlySelected[1]==='搜索关键字分析'">
              <keyword></keyword>
            </div>
            <div v-else-if="currentlySelected[1]==='用户消费统计分析'">
              <realtimeConsumption></realtimeConsumption>
            </div>
            <div v-if="currentlySelected[1]==='数据整理分析'">
              <dataStatistics></dataStatistics>
            </div>
            <div v-else-if="currentlySelected[1]==='产品销售统计分析'">
              <salesStatistics></salesStatistics>
            </div>
          </div>
          <div class="content-right-w" v-else-if="currentlySelected&&currentlySelected[0]==='资产'">
            <div v-if="currentlySelected[1]==='充值记录'">
              <property :title="currentlySelected[1]"></property>
            </div>
            <div v-else-if="currentlySelected[1]==='消费记录'">
              <property :title="currentlySelected[1]"></property>
            </div>
            <div v-if="currentlySelected[1]==='积分记录'">
              <property :title="currentlySelected[1]"></property>
            </div>
            <div v-else-if="currentlySelected[1]==='支付流水'">
              <property :title="currentlySelected[1]"></property>
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
import home from "./components/home"; //采购首页
import slideshow from "./components/slideshow"; //轮播管理
import news from "./components/news"; //消息发布
import help from "./components/help"; //帮助回答
import qrCode from "./components/applet/qrCode"; //小程序管理-二维码列表
import appletSlideshow from "./components/applet/slideshow"; //小程序轮播管理
import advertising from "./components/applet/advertising"; //小程序管理-小程序广告位
import Videos from "./components/applet/video"; //小程序管理-小程序视频
import productList from "./components/management/productList"; //商品管理-产品管理(原料管理)
import productListDetail from "./components/management/productListDetail"; //商品管理-产品管理(原料管理)详情
import categoryList from "./components/management/categoryList"; //商品管理-产品分类
import soupBasesList from "./components/management/soupBasesList"; //商品管理-汤料列表
import soupBasesListDetail from "./components/management/soupBasesListDetail"; //商品管理-汤料(详情)
import evaluationList from "./components/management/evaluationList"; //商品管理-评价列表
import materialOrder from "./components/management/materialOrder"; //商品管理-原料订单
import orderSoup from "./components/management/orderSoup"; //商品管理-汤料订单
import keyword from "./components/data/keyword"; //数据-关键字统计
import realtimeConsumption from "./components/data/realtimeConsumption"; //数据-关键字统计
import dataStatistics from "./components/data/dataStatistics"; //数据-数据整理分析
import salesStatistics from "./components/data/salesStatistics"; //数据-产品销售统计分析
import dataOverview from "./components/data/dataOverview"; //数据-数据概览
import property from "./components/property/index.vue"; //数据-资产
import userList from "./components/userControl/userList"; //用户管理-用户列表
import userListDetail from "./components/userControl/userListDetail"; //用户管理-用户列表详情
import userAddress from "./components/userControl/userAddress"; //用户管理-用户地址
import userLevel from "./components/userControl/userLevel"; //用户管理-用户等级
import userLabel from "./components/userControl/userLabel"; //用户管理-用户标签
import rawMaterial from "./components/orderFrom/rawMaterial"; //订单-原料订单
import soupBases from "./components/orderFrom/soupBases"; //订单-汤料料订单
export default {
  name: "HelloWorld",
  components: {
    navTit,
    home,
    slideshow,
    news,
    help,
    appletSlideshow,
    qrCode,
    advertising,
    Videos,
    productList,
    categoryList,
    soupBasesList,
    evaluationList,
    materialOrder,
    orderSoup,
    keyword,
    realtimeConsumption,
    dataStatistics,
    salesStatistics,
    dataOverview,
    property,
    userAddress,
    userList,
    userListDetail,
    userLevel,
    userLabel,
    productListDetail,
    soupBasesListDetail,
    rawMaterial,
    soupBases
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
      ],
      currentlySelected: "", //当前三级选中的页面
      ifUserList: true,
      userDetailData: "",
      evaluationId: "",
      productListDetailData: "",
      ifShowProductList: true
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
      this.ifUserList = true;
      this.ifShowProductList = true;
      this.evaluationId = "";
    },
    onToSecondaryPage(data) {},
    //展示用户详情
    onToUserDetail(data) {
      this.ifUserList = false;
      this.userDetailData = data;
    },
    onShowUserListDetail() {
      this.ifUserList = false;
    },
    onShowUserList() {
      this.ifUserList = true;
    },
    //产品管理-评论
    onTOComment(id) {
      this.evaluationId = id;
      this.currentlySelected = ["商品管理", "产品评论"];
      console.log(this.currentlySelected, "onTOComment");
    },
    //产品管理-编辑
    onToProductListDetail(data = "") {
      this.ifShowProductList = false;
      this.productListDetailData = data;
    },
    onShowProductList() {
      this.ifShowProductList = true;
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
    .content-right-w {
      width: 100% !important;
    }
  }
}
</style>
