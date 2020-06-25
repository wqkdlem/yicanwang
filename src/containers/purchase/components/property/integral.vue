<template>
  <div class="property">
    <div class="property-top">
      <div class="property-top-tit">
        积分列表
        <!-- <span style="color:#999999">+运费减-所有优惠,实付金额的计算</span> -->
      </div>
      <div class="property-top-con">
        <div class="property-top-con-left">
          <div class="property-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
          <div class="property-top-con-i">
            类型：
            <el-select v-model="signTypeId" placeholder="请选择">
              <el-option
                v-for="item in signType"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <!-- <div class="property-top-con-i">
            时间搜索：
            <el-date-picker
              type="daterange"
              v-model="date"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>-->
        </div>

        <el-button
          style="height:40px;"
          type="primary"
          class="el-button"
          @click="getTableData"
          icon="el-icon-search"
        >搜索</el-button>
      </div>
    </div>
    <div class="property-bot">
      <div class="property-bot-top">
        <!-- <div class="property-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>汤料统计</span>
        </div>-->
        <!-- <div class="property-bot-top-r">
          <div>销量：</div>
          <div>总销：</div>
          <div>盈利：</div>
        </div>-->
      </div>
      <div class="property-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->

          <el-table-column align="center" prop="id" label="id"></el-table-column>
          <el-table-column align="center" prop="user" label="用户" width="180">
            <div slot-scope="solt">{{solt.row.user.nickname}}</div>
            <div slot-scope="solt">{{solt.row.user.mobilePhone}}</div>
          </el-table-column>
          <el-table-column align="center" prop="integral" label="积分" width="180"></el-table-column>
          <el-table-column align="center" prop="content" label="备注" width="180"></el-table-column>
          <el-table-column align="center" prop="create_time" label="时间"></el-table-column>
          <el-table-column align="center" prop="sign_type" label="获取类型"></el-table-column>
          <el-table-column align="center" prop="order_no" label="订单号"></el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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
      tableData: "",
      value: "",
      keyword: "",
      page: 1,
      limit: 10,
      signTypeId: "",
      signType: []
    };
  },
  created() {
    this.getTableData();
    this.getTradeTypeId();
  },
  methods: {
    async getTableData() {
      let url = "/admin/integral_log";
      let params = {
        sign_type: this.signTypeId,
        keyword: this.keyword,
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.tableData = response;
    },
    async getTradeTypeId() {
      let url = "/admin/screen/";
      let params = {
        type: "integral_type"
      };
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.signType = response.integral_type;
    },
    handleSizeChange(data) {
      this.page = 1;
      this.limit = data;
      this.getTableData();
    },
    handleCurrentChange(data) {
      this.page = data;
      this.getTableData();
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
