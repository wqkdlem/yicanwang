<template>
  <!-- <p>Recent week sales overview</p> -->
  <div class="echarts">
    <div :style="{ height: height, width: width }" ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "analyzeSystem",
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    echarts_obj: {
      //echarts配置
      type: Object
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
    let _this = this;
    window.onresize = function() {
      _this.chart.resize();
    };
  },
  beforeDestroy() {
     window.onresize=null;
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    domclick() {},
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      this.chart.setOption(this.echarts_obj);
    }
  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
