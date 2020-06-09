<template>
  <div class="purchaseQrCode">
    <div class="purchaseQrCode-top">
      <div class="purchaseQrCode-top-tit">
        小程序视频管理
        <span style="color:#3CB371">(2)</span>
      </div>
      <div class="purchaseQrCode-top-con">
        <div class="purchaseQrCode-top-con-left">
          <div class="purchaseQrCode-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="purchaseQrCode-bot">
      <div class="purchaseQrCode-bot-top">
        <div class="purchaseQrCode-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>新增视频</span>
        </div>
      </div>
      <div class="purchaseQrCode-bot-con">
        <div class="purchaseQrCode-bot-con-i" v-for="(item,index) in videoData" :key="index">
          <div class="purchaseQrCode-bot-con-i-top">
            <VideosPlay></VideosPlay>
          </div>
          <div class="purchaseQrCode-bot-con-i-cnea">
            <span style="color:rgba(153,153,153,1);">ID：{{item.id}}</span>
            <span style="color:#E28A0C;">排序：{{item.sort}}</span>
          </div>
          <div class="purchaseQrCode-bot-con-i-cneb">{{item.title}}</div>
          <div class="purchaseQrCode-bot-con-i-cnec">{{item.content}}</div>
          <div class="purchaseQrCode-bot-con-i-bot">
            <el-switch v-model="item.ifShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            <img :src="writeIcon" alt />
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
import VideosPlay from "@/components/videos.vue";
export default {
  name: "HelloWorld",
  components: { VideosPlay },
  data() {
    return {
      writeIcon: require("@/assets/new_images/writea.png"),
      value: "",
      videoData: [
        {
          url: "",
          title: "配料大师",
          id: "22",
          sort: "41",
          content:
            "http://res.emjiayuan.com/QQ%E8%A7%86%E9%A2%9120190313104856.mp4",
          ifShow: true
        },
        {
          url: "",
          title: "汤料大师视频",
          id: "22",
          sort: "42",
          content:
            "http://res.emjiayuan.com/QQ%E8%A7%86%E9%A2%9120190313104856.mp4",
          ifShow: false
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.purchaseQrCode {
  .el-icon-delete {
    color: #e65959;
  }
  display: flex;
  height: 100%;
  flex-direction: column;
  .purchaseQrCode-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    text-align: left;
    padding: 20px 25px;
    box-sizing: border-box;
    .purchaseQrCode-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .purchaseQrCode-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .purchaseQrCode-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .purchaseQrCode-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .purchaseQrCode-bot {
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    // background-color: #fff;
    flex: auto;
    text-align: left;

    display: flex;
    flex-direction: column;
    .purchaseQrCode-bot-top {
      display: flex;
      justify-content: start;
      padding: 20px 25px;
      .purchaseQrCode-bot-top-i {
        // width: 130px;
        margin-right: 30px;
        padding: 0 12px;
        box-sizing: border-box;
        background: rgba(60, 179, 113, 1);
        color: #ffffff;
        height: 32px;
        border-radius: 4px;
        display: flex;
        justify-content: start;
        align-items: center;
        span {
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
    .purchaseQrCode-bot-con {
      display: flex;
      flex-direction: row;
      justify-content: start;
      .purchaseQrCode-bot-con-i {
        width: 350px;
        height: 470px;
        margin-top: 30px;
        border-radius: 4px;
        overflow: hidden;
        background-color: #fff;
        margin-right: 40px;
        .purchaseQrCode-bot-con-i-cnea {
          padding: 0 20px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          span {
            font-size: 16px;
          }
        }
        .purchaseQrCode-bot-con-i-cneb {
          padding: 0 20px;
          box-sizing: border-box;
          margin-top: 15px;
          font-size: 18px;
          color: #333333;
        }
        .purchaseQrCode-bot-con-i-cnec {
          width: 308px;
          height: 90px;
          margin: 40px auto 30px;
          padding: 15px 20px;
          box-sizing: border-box;
          background: #fcfcfc;
          border: 1px solid #e6e6e6;
          word-break: break-all;
          word-wrap: break-word;
        }
        .purchaseQrCode-bot-con-i-bot {
          display: flex;
          padding: 0 20px;
          box-sizing: border-box;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
