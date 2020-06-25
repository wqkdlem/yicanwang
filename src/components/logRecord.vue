<template>
  <div class="logistics">
    <div class="package-status" style="margin-top: 30px;">
      <div class="status-box" v-for="(item,index) in logData" :key="index">
        <div class="status-box-icon">
          <span></span>
        </div>
        <div class="status-box-content">
          <div class="status-content-before">{{item.desc}}</div>
          <div class="status-time-before">{{item.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  props: ["logData"],
  data() {
    return { kuaidigongsi: require("@/assets/new_images/kuaidigongsi.png") };
  },
  created() {
    this.aaa();
  },
  methods: {
    async aaa() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
      span:first-child {
        top: 0px;
      }
      span:last-child {
        top: 0px;
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
