<template>
  <div class="userLevel">
    <div class="userLevel-top">
      <div class="userLevel-top-tit">
        等级列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="userLevel-top-con">
        <div class="userLevel-top-con-left">
          <div class="userLevel-top-con-i">
            关键字：
            <el-input type="text" v-model="keyword" style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button style="margin-left:40px" type="primary" class="el-button" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </div>
    </div>
    <div class="userLevel-bot">
      <div class="userLevel-bot-top">
        <div class="userLevel-bot-top-i" @click="onAddevel">
          <i class="el-icon-plus"></i>
          <span>新增等级</span>
        </div>
        <!-- <div class="userLevel-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>-->
      </div>
      <div class="userLevel-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" prop="level_name" label="等级名称"></el-table-column>
          <el-table-column align="center" prop="desc" label="说明"></el-table-column>
          <el-table-column align="center" prop="price" label="价值金额"></el-table-column>
          <el-table-column align="center" prop="amount" label="消费累计"></el-table-column>
          <el-table-column align="center" prop="discount" label="优惠折扣"></el-table-column>
          <!-- <el-table-column align="center" prop="address" label="状态"></el-table-column> -->
          <el-table-column align="center" prop label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                style="color:#3CB371"
                @click="onChangeLevel(scope.row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="text"
                style="color:#FB6534"
                @click="delLevelId = scope.row.level_id;ifShowDele=true;"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!-- 
          :current-page.sync="currentPage2"-->
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
    <el-dialog :title="modelTitle"  class="abow_dialog" :visible.sync="ifChanlevel" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">等级名称：</div>
          <input width type="text" v-model="changeDataContent.level_name" placeholder="请输入等级名称" />
        </div>
        <div class="box-i">
          <div class="box-left">等级说明：</div>
          <textarea width type="text" v-model="changeDataContent.desc" placeholder="请输入等级说明" />
        </div>
        <div class="box-i">
          <div class="box-left">价值金额：</div>
          <input
            width
            type="number"
            min="0"
            v-model="changeDataContent.price"
            placeholder="请输入价值金额"
          />
        </div>
        <div class="box-i">
          <div class="box-left">消费累计：</div>
          <input
            width
            type="number"
            min="0"
            v-model="changeDataContent.amount"
            placeholder="请输入消费累计"
          />
        </div>
        <div class="box-i">
          <div class="box-left">优惠折扣：</div>
          <input
            width
            type="number"
            min="0"
            v-model="changeDataContent.discount"
            placeholder="请输入优惠折扣"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChanlevel = false">取 消</el-button>
        <el-button style="margin-left:40px" type="primary" @click="onSureChangeLevel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除等级"  class="abow_dialog" :visible.sync="ifShowDele" width="900px">
      <div class="box">
        <div class="box-con">确认删除当前等级？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShowDele = false">取 消</el-button>
          <el-button style="margin-left:40px" type="primary" @click="onDelLevel">确 定</el-button>
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
      keyword: "",
      tableData: "",
      value: "",
      ifChanlevel: false,
      ifShowDele: false,
      delLevelId: "",
      page: 1,
      limit: 10,
      modelTitle: "",
      uplodingImg: require("@/assets/new_images/uplodingImg.png"),
      changeDataContent: {
        level_name: "",
        amount: "",
        discount: "",
        price: "",
        level_id: "",
        desc: ""
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let url = "/admin/level";
      let params = {
        keyword: this.keyword,
        level_id: "",
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.tableData = response;
    },
    onChangeLevel(data) {
      this.ifChanlevel = true;
      this.modelTitle = "修改等级";
      this.changeDataContent = data;
    },
    onAddevel() {
      this.ifChanlevel = true;
      this.modelTitle = "新增等级";
      this.changeDataContent = {
        level_name: "",
        amount: "",
        discount: "",
        price: "",
        level_id: "",
        desc: ""
      };
    },
    async onSureChangeLevel() {
      this.ifChanlevel = false;
      let url = "/admin/level";
      let {
        level_name = "",
        amount = "",
        discount = "",
        price = "",
        level_id = "",
        desc = ""
      } = this.changeDataContent;
      if (!level_name) return this.$message("请输入等级名称");
      if (!desc) return this.$message("请输入等级说明");
      if (!price) return this.$message("请输入价值金额");
      if (!amount) return this.$message("请输入累计消费");
      if (!discount) return this.$message("请输入优惠折扣");
      let data = {};
      if (this.modelTitle == "修改等级") {
        let data = {
          name: level_name,
          amount,
          discount,
          price,
          id: level_id,
          desc
        };
        let response = await put({ url, data });
      }
      if (this.modelTitle == "新增等级") {
        let data = {
          name: level_name,
          amount,
          discount,
          price,
          desc
        };
        let response = await post({ url, data });
        if (response.msg) return this.$message(response.msg);
      }
      this.$message(this.modelTitle + "成功");
      this.getTableData();
    },
    async onDelLevel() {
      let url = "/admin/level";
      let data = {
        id: this.delLevelId
      };
      let response = await del({ url, data });
      if (response.msg) return this.$message(response.msg);
      this.ifShowDele = false;
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
.userLevel {
  display: flex;
  height: 100%;
  flex-direction: column;
  .userLevel-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .userLevel-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .userLevel-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .userLevel-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .userLevel-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .userLevel-bot {
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
    .userLevel-bot-top {
      display: flex;
      justify-content: start;
      .userLevel-bot-top-i {
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
    .userLevel-bot-bot {
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
  .box {
    .box-con {
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 30px 0;
    }
    .box-i {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .box-left {
        font-size: 14px;
        color: #333333;
        width: 140px;
        padding-right: 10px;
        box-sizing: border-box;
        text-align: right;
      }
      .box-right {
        margin-left: 10px;
      }
      input {
        width: 630px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        margin-left: 10px;
        background-color: #f1f1f1;
        border: none;
      }
      textarea {
        width: 630px;
        height: 90px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        margin-left: 10px;
        background-color: #f1f1f1;
        border: none;
        font-size: 13px;
        color: #333333;
      }
      .el-select {
        width: 630px;
        height: 40px;
        margin-left: 10px;

        .el-input__inner {
          background-color: #f1f1f1;
        }
      }
    }
  }
}
</style>
