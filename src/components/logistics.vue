<template>
  <div class="logistics">
    <div class="logistics-title">
      <img class="logistics-title-lef" :src="kuaidigongsi" alt />
      <div class="logistics-title-rig">
        <div class="logistics-title-rig-top">快递单号：374686814693333</div>
        <div class="logistics-title-rig-bot">配送公司：顺丰速运</div>
      </div>
    </div>
    <div class="package-status">
      <div class="status-box">
        <ul class="status-list">
          <li>
            <div class="status-content-before">您的订单开始处理</div>
            <div class="status-time-before">2017-08-17 23:31 周四</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">卖家发货</div>
            <div class="status-time-before">2017-08-18 09:11 周五</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">发往深圳中转站</div>
            <div class="status-time-before">2017-08-19 01:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">到达深圳</div>
            <div class="status-time-before">2017-08-19 06:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">发往潮汕中心</div>
            <div class="status-time-before">2017-08-19 09:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li class="latest">
            <div class="status-content-latest">快件到达 潮汕中心</div>
            <div class="status-time-latest">2017-08-20 14:16 周日</div>
            <div class="status-line"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return { kuaidigongsi: require("@/assets/new_images/kuaidigongsi.png") };
  },
  created() {
    this.aaa();
  },
  methods: {
    async aaa() {
      let url = "/ssp/sheet/api/getSheetList";
      let data = "11111111111";
      let response = await fakeGet("111111111111");
      console.log(response);
    }
  }
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
ul li {
  list-style: none;
}
.package-status {
  padding: 18px 0 50px;
  box-sizing: border-box;
}
.package-status .status-list {
  margin: 0;
  padding: 0;
  margin-top: -5px;
  padding-left: 8px;
  list-style: none;
}
.package-status .status-list > li {
  border-left: 2px solid #3cb371;
  text-align: left;
}
.package-status .status-list > li:before {
  /* 流程点的样式 */
  content: "";
  border: 3px solid #3cb371;
  background-color: #3cb371;
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 10px;
  margin-left: -7px;
  margin-right: 10px;
}
.package-status .status-box {
  overflow: hidden;
}
.package-status .status-list > li {
  height: auto;
  width: 95%;
}
.package-status .status-list {
  margin-top: -8px;
}
.package-status .status-box {
  position: relative;
}
.package-status .status-box:before {
  content: " ";
  background-color: #f3f3f3;
  display: block;
  position: absolute;
  top: -8px;
  left: 20px;
  width: 10px;
  height: 4px;
}
.package-status .status-list {
  margin-top: 0px;
}
.status-list > li:not(:first-child) {
  padding-top: 10px;
}
.status-content-before {
  text-align: left;
  margin-left: 25px;
  margin-top: -20px;
}
.status-content-latest {
  text-align: left;
  margin-left: 25px;
  color: #3cb371;
  margin-top: -20px;
}
.status-time-before {
  text-align: left;
  margin-left: 25px;
  font-size: 10px;
  margin-top: 5px;
}
.status-time-latest {
  text-align: left;
  margin-left: 25px;
  color: #3cb371;
  font-size: 10px;
  margin-top: 5px;
}
.status-line {
  border-bottom: 1px solid #ccc;
  margin-left: 25px;
  margin-top: 10px;
}
.list {
  padding: 0 20px;
  background-color: #f8f8f8;
  margin: 10px 0 0 25px;
  border: 1px solid #ebebeb;
}
.list li {
  line-height: 30px;
  color: #616161;
}
</style>
