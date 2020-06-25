<template>
  <div class="categoryList">
    <div class="categoryList-top">
      <div class="categoryList-top-tit">
        充值设置列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="categoryList-top-con">
        <div class="categoryList-top-con-left">
          <div class="categoryList-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button
          style="margin-left:40px"
          type="primary"
          class="el-button"
          icon="el-icon-search"
          @click="getTableData"
        >搜索</el-button>
      </div>
    </div>
    <div class="categoryList-bot">
      <div class="categoryList-bot-top">
        <div class="categoryList-bot-top-w">
          <div class="categoryList-bot-top-i" @click="onAddCate">
            <i class="el-icon-plus"></i>
            <span>新增充值设置</span>
          </div>
          <!-- <div class="categoryList-bot-top-i">
            <i class="el-icon-delete"></i>
            <span>批量删除</span>
          </div>-->
        </div>
      </div>
      <div class="categoryList-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="value" label="充值金额"></el-table-column>
          <el-table-column align="center" prop="add_value" label="赠送金额"></el-table-column>
          <el-table-column align="center" label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                style="color:#3CB371"
                @click="onChangeCate(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#FB6534"
                @click="ifShowDele=true;changeCateId=scope.row.id"
              >删除</el-button>
            </template>
          </el-table-column>
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
    <el-dialog :title="modelTitle" class="abow_dialog" :visible.sync="ifChanCate" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">充值金额：</div>
          <input width type="text" v-model="basicInformation.rechargeAmount" placeholder="设定的充值金额" />
        </div>
        <div class="box-i">
          <div class="box-left">赠送金额：</div>
          <input width type="text" v-model="basicInformation.giftAmount" placeholder="超过设定的充值金额赠送数" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChanCate= false">取 消</el-button>
        <el-button style="margin-left:40px" type="primary" @click="onSureChangeLable">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除等级" class="abow_dialog" :visible.sync="ifShowDele" width="900px">
      <div class="box">
        <div class="box-con">确认删除当前充值设置？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShowDele = false">取 消</el-button>
          <el-button style="margin-left:40px" type="primary" @click="onDelCate">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: "",
      changeCateId: "",
      searchData: {},
      typeId: "",
      basicInformation: {
        id: "",
        rechargeAmount: "",
        giftAmount: ""
      },
      value: "",
      shensuo: require("@/assets/new_images/shensuo.png"),
      collecta: require("@/assets/new_images/collecta.png"),
      collectb: require("@/assets/new_images/collectb.png"),
      message: require("@/assets/new_images/message.png"),
      uplodingImg: require("@/assets/new_images/uplodingImg.png"),
      ifChangeGoods: false,
      keyword: "",
      modelTitle: "",
      page: 1,
      limit: 10,
      ifChanCate: false,
      ifShowDele: false
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let url = "/admin/recharge_config";
      // let { type = "" } = this.searchDataidArry;
      let params = {
        keyword: this.keyword,
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.tableData = response;
    },
    onChangeCate(data) {
      this.ifChanCate = true;
      this.modelTitle = "修改充值设置";
      this.basicInformation.id = data.id;
      console.log(this.basicInformation.id);
      this.basicInformation.rechargeAmount = data.value;
      this.basicInformation.giftAmount = data.add_value;
    },
    onAddCate() {
      this.ifChanCate = true;
      this.modelTitle = "新增充值设置";
      this.basicInformation = {
        id: "",
        rechargeAmount: "",
        giftAmount: ""
      };
    },
    async onSureChangeLable() {
      this.ifChanCate = false;
      let {
        rechargeAmount = "",
        giftAmount = "",
        id = ""
      } = this.basicInformation;
      let url = "/admin/recharge_config";
      if (!rechargeAmount) return this.$message("请先输入充值金额");
      if (!giftAmount) return this.$message("请先输入赠送金额");
      let data = {};
      if (this.modelTitle == "修改充值设置") {
        let data = {
          value: rechargeAmount,
          add_value: giftAmount,
          id
        };
        let response = await put({ url, data });
        if (response.msg) return this.$message(response.msg);
      }
      if (this.modelTitle == "新增充值设置") {
        let data = {
          value: rechargeAmount,
          add_value: giftAmount
        };
        let response = await post({ url, data });
        if (response.msg) return this.$message(response.msg);
      }

      this.$message(this.modelTitle + "成功");
      this.getTableData();
    },
    async onDelCate() {
      let url = "/admin/recharge_config";
      let data = {
        id: this.changeCateId
      };
      let response = await del({ url, data });
      this.ifShowDele = false;
      if (response.msg) return this.$message(response.msg);
      this.$message("删除成功");
      this.getTableData();
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
    // padding: 20px 25px;
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
      input {
        width: 680px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        margin-left: 10px;
        background-color: #f1f1f1;
        border: none;
      }
      img,
      .box-right {
        margin-left: 10px;
      }
      .el-select {
        width: 670px;
        height: 40px;
        margin-left: 10px;

        .el-input__inner {
          background-color: #f1f1f1;
        }
      }
    }
    .box-a {
      display: flex;
      align-items: flex-start;
      margin-top: 20px;
      .box-left {
        font-size: 14px;
        color: #333333;
        width: 100px !important;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
      }
      .box-right > div:nth-child(2) {
        margin-top: 20px;
      }
      .box-right > div > div {
        margin-left: 20px;
      }
    }
    .box-right {
      width: 670px;
      margin-left: 10px;
    }
    .box-right > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: start;
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
  }
   .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
