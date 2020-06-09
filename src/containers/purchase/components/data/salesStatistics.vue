<template>
  <div class="salesStatistics">
    <div class="salesStatistics-top">
      <div class="salesStatistics-top-tit">
        数据统计
        <span style="color:#999999">+运费减-所有优惠,实付金额的计算</span>
      </div>
      <div class="salesStatistics-top-con">
        <div class="salesStatistics-top-con-left">
          <div class="salesStatistics-top-con-i">
            时间搜索：
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>

        <el-button style="height:50px;" type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
        <el-button
          style="height:50px;"
          type="primary"
          class="el-button"
          icon="el-icon-folder-add"
        >导出docx</el-button>
      </div>
    </div>
    <div class="salesStatistics-bot">
      <div class="salesStatistics-bot-top">
        <div class="salesStatistics-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>汤料统计</span>
        </div>
        <div class="salesStatistics-bot-top-r">
          <div>销量：</div>
          <div>总销：</div>
          <div>盈利：</div>
        </div>
      </div>
      <div class="salesStatistics-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" prop="date" label="图片" width="180"></el-table-column>
          <el-table-column align="center" prop="address" label="产品">
            <div slot-scope="scope">{{scope.row.name}}</div>
          </el-table-column>
          <el-table-column align="center" prop="name" label="真是销量（件）" width="180"></el-table-column>
          <el-table-column align="center" prop="address" label="订单总销（元）"></el-table-column>
          <el-table-column align="center" prop="address" label="应得利润（元）"></el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"-->
          <el-pagination
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="tableData.page.data_count"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: this.getTableData(),
      value: ""
    };
  },
  created() {},
  methods: {
    getTableData() {
      return [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          value: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.salesStatistics {
  display: flex;
  height: 100%;
  flex-direction: column;
  .salesStatistics-top {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .salesStatistics-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .salesStatistics-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .salesStatistics-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
        align-items: flex-end;
        .salesStatistics-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
          margin-top: 8px;
        }
      }
    }
  }
  .salesStatistics-bot {
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    flex: auto;
    text-align: left;
    padding: 20px 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .salesStatistics-bot-top {
      display: flex;
      justify-content: space-between;
      .salesStatistics-bot-top-i {
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
      .salesStatistics-bot-top-r {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        font-weight: 500;
      }
    }
    .salesStatistics-bot-bot {
      margin-top: 20px;
      flex: auto;
      .block {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
  }
}
</style>
