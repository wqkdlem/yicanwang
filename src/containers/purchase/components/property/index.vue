<template>
  <div class="property">
    <div class="property-top">
      <div class="property-top-tit">
        {{title}}
        <!-- <span style="color:#999999">+运费减-所有优惠,实付金额的计算</span> -->
      </div>
      <div class="property-top-con">
        <div class="property-top-con-left">
          <div class="property-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
          <div class="property-top-con-i">
            {{title==='积分记录'?'类型':'状态'}}：
            <el-select v-model="value" placeholder="请选择">
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>-->
            </el-select>
          </div>
          <div class="property-top-con-i">
            时间搜索：
            <!-- v-model="value1" -->
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>

        <el-button style="height:40px;" type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="property-bot">
      <div class="property-bot-top">
        <div class="property-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>汤料统计</span>
        </div>
        <!-- <div class="property-bot-top-r">
          <div>销量：</div>
          <div>总销：</div>
          <div>盈利：</div>
        </div>-->
      </div>
      <div class="property-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->

          <div v-if="title==='支付流水'">
            <el-table-column align="center" prop="date" label="id"></el-table-column>
            <el-table-column align="center" prop="date" label="流水号" width="120"></el-table-column>
            <el-table-column align="center" prop="name" label="类型"></el-table-column>
            <el-table-column align="center" prop="name" label="外部号（支付平台）" width="180"></el-table-column>
            <el-table-column align="center" prop="name" label="已支付" width="180"></el-table-column>
            <el-table-column align="center" prop="name" label="备注" width="180"></el-table-column>
            <el-table-column align="center" prop="name" label="创建时间" width="180"></el-table-column>
            <el-table-column align="center" prop="name" label="操作" width="120"></el-table-column>
          </div>
          <div v-else>
            <el-table-column align="center" prop="date" label="id" width="180"></el-table-column>
            <el-table-column
              align="center"
              v-if="title==='充值记录'||title==='消费记录'||title==='积分记录'"
              prop="date"
              label="用户"
              width="180"
            ></el-table-column>

            <el-table-column
              align="center"
              v-if="title==='充值记录'"
              prop="name"
              label="充值金额"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              v-if="title==='消费记录'"
              prop="name"
              label="消费金额"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              v-if="title==='积分记录'"
              prop="name"
              label="积分"
              width="180"
            ></el-table-column>
            <!-- <el-table-column align="center" prop="address" label="产品">
            <div slot-scope="scope">{{scope.row.name}}</div>
            </el-table-column>-->
            <el-table-column
              align="center"
              v-if="title==='充值记录'||title==='消费记录'"
              prop="name"
              label="平台"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              v-if="title==='积分记录'"
              prop="name"
              label="备注"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              v-if="title==='充值记录'||title==='消费记录'||title==='积分记录'"
              prop="address"
              label="时间"
            ></el-table-column>
            <el-table-column align="center" v-if="title==='消费记录'" prop="address" label="关联状态"></el-table-column>
            <el-table-column
              align="center"
              v-if="title==='充值记录'||title==='消费记录'"
              prop="address"
              label="状态"
            ></el-table-column>
            <el-table-column
              align="center"
              v-if="title==='关联订单'"
              prop="name"
              label="积分"
              width="180"
            ></el-table-column>
          </div>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"-->
          <!-- :current-page.sync="currentPage2" -->
          <el-pagination
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
  props: ["title"],
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
.property {
  display: flex;
  height: 100%;
  flex-direction: column;
  .property-top {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .property-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .property-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .property-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
        align-items: flex-end;
        .property-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
          margin-top: 8px;
        }
      }
    }
  }
  .property-bot {
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
    .property-bot-top {
      display: flex;
      justify-content: space-between;
      .property-bot-top-i {
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
      .property-bot-top-r {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        font-weight: 500;
      }
    }
    .property-bot-bot {
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
