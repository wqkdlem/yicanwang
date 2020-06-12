<template>
  <div class="logistics">
    <!-- <div class="logistics-title">
      <img class="logistics-title-lef" :src="kuaidigongsi" alt />
      <div class="logistics-title-rig">
        <div class="logistics-title-rig-top">快递单号：374686814693333</div>
        <div class="logistics-title-rig-bot">配送公司：顺丰速运</div>
      </div>
    </div>-->
    <div class="package-status">
      <div class="status-box">
        <ul class="status-list">
          <li v-for="(item,index) in logData" :key="index">
            <div class="status-content-before">{{item.desc}}</div>
            <div class="status-time-before">{{item.time}}</div>
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
// .logistics-title {
//   display: flex;
//   flex-direction: row;
//   justify-content: start;
//   align-items: center;
//   border-bottom: 1px solid #d8d8d8;
//   padding: 20px 50px;
//   box-sizing: border-box;
//   .logistics-title-lef {
//     width: 50px;
//     height: 50px;
//   }
//   .logistics-title-rig {
//     margin-left: 20px;
//     font-size: 14px;
//     font-weight: 400;
//     color: rgba(0, 0, 0, 1);
//     .logistics-title-rig-bot {
//       margin-top: 8px;
//     }
//   }
// }
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
  border-left: 2px solid rgba(51, 51, 51, 0.5);
  text-align: left;
}
.package-status .status-list > li:last-child {
  border-left: 0;
}
.package-status .status-list > li:before {
  /* 流程点的样式 */
  content: "";
  border: 3px solid rgba(51, 51, 51, 0.1);
  background-color: rgba(51, 51, 51, 0.5);
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
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
  margin-top: -22px;
  color: rgba(51, 51, 51, 0.5);
}
.status-content-latest {
  text-align: left;
  margin-left: 25px;
  color: rgba(51, 51, 51, 0.5);
  margin-top: -20px;
}
.status-time-before {
  text-align: left;
  margin-left: 25px;
  font-size: 10px;
  margin-top: 5px;
  color: rgba(51, 51, 51, 0.5);
}
.status-time-latest {
  text-align: left;
  margin-left: 25px;
  color: rgba(51, 51, 51, 0.5);
  font-size: 10px;
  margin-top: 5px;
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
