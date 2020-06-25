<template>
  <div class="keyword">
    <div class="keyword-top">
      <div class="keyword-top-tit">
        搜索关键字统计
        <span style="color:#999999">TOP20</span>
      </div>
      <div class="keyword-top-con">
        <div class="keyword-top-con-left">
          <div class="keyword-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button style="margin-left:40px" type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="keyword-bot">
      <div class="keyword-bot-top">
        <div class="keyword-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>新增视频</span>
        </div>
      </div>
      <div class="keyword-bot-bot">
        <echarts :echarts_obj="pieChart" v-if="ifPieChart" />
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
import { pieChart } from "@/utils/echartsConfiguration.js";
import echarts from "@/components/charts/lineChart";
export default {
  name: "HelloWorld",
  components: {
    echarts
  },
  data() {
    return {
      pieChart: {}, //饼图
      ifPieChart: true //是否绘制饼图
    };
  },
  created() {
    let data = {
      skuTd: { name: "12", value: "0.15" },
      skuYs: { name: "12", value: "0.85" }
    };
    this.initGetPieDate(data);
  },
  methods: {
    initGetPieDate(data = "") {
      this.ifPieChart = false;
      let pieChart_1 = JSON.parse(JSON.stringify(pieChart));
      //   console.log(pieChart_1, "饼图数据");
      //   let pieDate = [
      //     {
      //       value: 0,
      //       name: "今日"
      //     },
      //     {
      //       value: 0,
      //       name: "昨日"
      //     }
      //   ];
      //   pieDate[0].value = data.skuTd || 0;
      //   pieDate[1].value = data.skuYs || 0;
      //   const url = "";
      //   const params = {};
      //   pieChart_1.series[0].data.forEach((element, index) => {
      //     element.name = pieDate[index].name;
      //     element.value = pieDate[index].value;
      //   });
      //   console.log(pieChart_1, "饼图数据");
      this.$nextTick(() => {
        this.pieChart = pieChart_1;
        this.ifPieChart = true;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.keyword {
  display: flex;
  height: 100%;
  flex-direction: column;
  .keyword-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .keyword-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .keyword-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .keyword-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .keyword-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .keyword-bot {
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;

    flex: auto;
    text-align: left;
    // padding: 20px 25px;
    // box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .keyword-bot-top {
      display: flex;
      justify-content: start;
      .keyword-bot-top-i {
        cursor: pointer;
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
    .keyword-bot-bot {
      width: 100%;
      height: 500px;
      background-color: #fff;
      padding: 20px 25px;
      box-sizing: border-box;
      margin-top: 20px;
      border-radius: 4px;
    }
  }
}
</style>
