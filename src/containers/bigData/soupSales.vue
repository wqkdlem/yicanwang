<template>
  <div class="categoryList">
    <div class="categoryList-top">
      <div class="categoryList-top-tit">
        汤料真实销售统计
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="categoryList-top-con">
        <div class="categoryList-top-con-left">
          <div class="categoryList-top-con-i">
            时间：
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="categoryList-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>
        <el-button style="margin-left:40px" type="primary" class="el-button" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </div>
    </div>
    <div class="categoryList-bot">
      <div class="categoryList-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" prop="id" label="图片" width="200">
            <img slot-scope="scope" :src="scope.row.goodImg" alt style="width:180px;height:70px;" />
          </el-table-column>
          <el-table-column align="center" prop="goods_name" label="产品"></el-table-column>
          <el-table-column align="center" prop="sum_goods_num" label="购买次数"></el-table-column>
          <el-table-column align="center" prop="sum_profit" label="销量重量/公斤"></el-table-column>
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
  data() {
    return {
      tableData: "",
      keyword: "",
      page: 1,
      limit: 10,
      date: ""
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let url = "/admin/data";
      let params = {
        data_type: "product_soup",
        keyword: this.keyword,
        start_time: this.date[0],
        end_time: this.date[1],
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.tableData = response;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "统计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (index === 2) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else if (index === 3 || index === 4) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "¥";
        } else {
          sums[index] = "";
        }
      });

      return sums;
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
.el-button {
  height: 40px;
}
.el-icon-plusb {
  color: rgba(153, 153, 153, 1);
  font-size: 40px;
}
.categoryList {
  display: flex;
  height: 100%;
  flex-direction: column;
  .categoryList-top {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .categoryList-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .categoryList-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .categoryList-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
        .categoryList-top-con-i {
          margin-top: 8px;
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .categoryList-bot {
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    // background-color: #fff;
    flex: auto;
    text-align: left;

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .categoryList-bot-top {
      display: flex;
      justify-content: space-between;
      .categoryList-bot-top-w {
        display: flex;
        justify-content: start;
        .categoryList-bot-top-i {
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
    }
    .categoryList-bot-bot {
      margin-top: 20px;
    }
  }
  .categoryList-bot-bot {
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
  .box {
    .box-i,
    .box-img {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .box-left {
        font-size: 14px;
        color: #333333;
        width: 100px !important;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
      }
      .box--right {
        margin-left: 10px;
      }
      input,
      textarea {
        width: 470px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        margin-left: 10px;
        background-color: #f1f1f1;
        border: none;
      }
      textarea {
        height: 100px;
      }
      img,
      .box-right {
        margin-left: 10px;
      }
      .el-select {
        width: 470px;
        height: 40px;
        margin-left: 10px;

        .el-input__inner {
          background-color: #f1f1f1;
        }
      }
    }
    .box-a {
      display: flex;
      align-items: center;
      width: 45%;
      margin-top: 10px;
      .box-left {
        font-size: 14px;
        color: #333333;
        width: 100px !important;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
      }
      .box-right {
        flex: auto;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        margin-left: 10px;
        background-color: #f1f1f1;

        border: none;
      }
      input {
        padding: 0 20px;
      }
    }
    .box-con {
      padding-left: 30px;
      box-sizing: border-box;
      font-size: 18px;
      height: 80px;
      line-height: 80px;
    }
    .box-img {
      align-items: flex-start;
    }
    .box-content {
      .box-content-title {
        text-align: left;
        padding: 5px 30px;
        box-sizing: border-box;
      }
      .box-content-cen {
        div {
          width: 100%;
          text-align-last: left;
          padding: 5px 30px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: start;
          flex-wrap: wrap;
        }
      }
    }
  }
  .el-table-column-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-block;
  }
}
</style>
