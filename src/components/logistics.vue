<template>
  <div class="logistics">
    <div class="logistics-title">
      <img class="logistics-title-lef" :src="kuaidigongsi" alt />
      <div class="logistics-title-rig">
        <div class="logistics-title-rig-top">快递单号：{{logisticsInformationa.nu}}</div>
        <div class="logistics-title-rig-bot">配送公司：{{logisticsInformationa.com}}</div>
      </div>
    </div>
    <div class="package-status" style="margin-top: 30px;">
      <div class="status-box" v-for="(item,index) in logisticsInformationa.data" :key="index">
        <div class="status-box-icon">
          <img v-if="item.status==='揽收'" style :src="index+1===1?yilanshou:lanshou" alt />
          <img v-if="item.status==='派件'" style :src="index+1===1?yipaidong:paisong" alt />
          <img v-if="item.status==='签收'" style :src="index+1===1?yiqianshou:qianshou" alt />
          <span
            v-if="item.status==='在途'"
            :style="index+1===1?'background-color:#3CB371;top: 0;':''"
          ></span>
        </div>
        <div class="status-box-content">
          <div class="status-content-before" :style="index===0?'color:#1B9B3F':''">{{item.context}}</div>
          <div class="status-time-before">{{item.ftime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  props: ["logisticsInformation"],
  data() {
    return {
      kuaidigongsi: require("@/assets/new_images/kuaidigongsi.png"),
      qianshou: require("@/assets/new_images/qianshou.png"),
      yiqianshou: require("@/assets/new_images/yiqianshou.png"),
      lanshou: require("@/assets/new_images/lanshou.png"),
      yilanshou: require("@/assets/new_images/yilanshou.png"),
      paisong: require("@/assets/new_images/paisong.png"),
      yipaidong: require("@/assets/new_images/yipaidong.png"),
      qujian: require("@/assets/new_images/qujian.png"),
      yiqujian: require("@/assets/new_images/yiqujian.png"),
      logisticsInformationa: {}
    };
  },
  created() {
    this.logisticsInformationa = this.logisticsInformation;
    console.log(this.logisticsInformationa);
  },
  watch: {
    logisticsInformation(nw, old) {
      this.logisticsInformationa = nw;
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.logistics-title {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  padding: 20px 50px;
  box-sizing: border-box;
  .logistics-title-lef {
    width: 50px;
    height: 50px;
  }
  .logistics-title-rig {
    margin-left: 20px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    .logistics-title-rig-bot {
      margin-top: 8px;
    }
  }
}
.package-status {
  .status-box {
    border-left: 1px solid #d8d8d8;
    min-height: 80px;
    .status-box-icon {
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: -15px;
        z-index: 99999;
        width: 30px;
        height: 30px;
        display: inline-block;
      }
      span {
        position: absolute;
        top: 10px;
        left: -3px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #d8d8d8;
        display: inline-block;
      }
    }
  }
  .status-box:last-child {
    border-left: 0;
  }
  .status-box-content {
    padding: 0px 30px 20px;
    box-sizing: border-box;
    color: #999999;
    .status-time-before {
      margin-top: 10px;
    }
  }
}
</style>
