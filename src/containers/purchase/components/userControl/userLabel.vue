<template>
  <div class="userLabel">
    <div class="userLabel-top">
      <div class="userLabel-top-tit">
        标签列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="userLabel-top-con">
        <div class="userLabel-top-con-left">
          <div class="userLabel-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </div>
    </div>
    <div class="userLabel-bot">
      <div class="userLabel-bot-top">
        <div class="userLabel-bot-top-i" @click="onAddLable">
          <i class="el-icon-plus"></i>
          <span>新增标签</span>
        </div>
        <div class="userLabel-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>
      </div>
      <div class="userLabel-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="group" label="名称"></el-table-column>
          <el-table-column align="center" prop="status" label="显示">
            <div slot-scope="scope">
              <i
                v-if="scope.row.status"
                class="el-icon-check"
                style="font-size:22px;color:#3CB371;"
              ></i>
              <i
                v-if="!scope.row.status"
                class="el-icon-close"
                style="font-size:22px;color:#FB6534;"
              ></i>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="time" label="时间"></el-table-column>
          <el-table-column align="center" label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click="onChangeLable(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="delLableId=scope.row.gid;ifShowDele=true;"
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
    <el-dialog :title="modelTitle" :visible.sync="ifChanlable" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">标签名称：</div>
          <input width type="text" v-model="changeDataContent.group" placeholder="请输入等级名称" />
        </div>
        <div class="box-i">
          <div class="box-left">是否显示：</div>
          <div class="box-right">
            <el-radio v-model="changeDataContent.status" :label="1">是</el-radio>
            <el-radio v-model="changeDataContent.status" :label="0">否</el-radio>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChanlable = false">取 消</el-button>
        <el-button type="primary" @click="onSureChangeLable">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除标签" :visible.sync="ifShowDele" width="400px">
      <div class="box">
        <div class="box-con">确认删除当前标签？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShowDele = false">取 消</el-button>
          <el-button type="primary" @click="onDelLable">确 定</el-button>
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
      value: "",
      keyword: "",
      modelTitle: "",
      delLableId: "",
      ifShowDele: false,
      ifChanlable: false,
      changeDataContent: {
        group: "",
        status: 1,
        gid: ""
      },
      page: 1,
      limit: 10
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let url = "/admin/label";
      let params = {
        keyword: this.keyword,
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    onChangeLable(data) {
      this.ifChanlable = true;
      this.modelTitle = "修改标签";
      this.changeDataContent = data;
    },
    onAddLable() {
      this.ifChanlable = true;
      this.modelTitle = "新增标签";
      this.changeDataContent = {
        group: "",
        status: 1,
        gid: ""
      };
    },
    async onSureChangeLable() {
      this.ifChanlable = false;
      let url = "/admin/label";
      let { group = "", status = 1, gid = "" } = this.changeDataContent;
      if (!group) return this.$message("请先输入标签名称");
      let data = {};
      if (this.modelTitle == "修改标签") {
        let data = {
          name: group,
          status,
          id: gid
        };
        let response = await put({ url, data });
      }
      if (this.modelTitle == "新增标签") {
        let data = {
          name: group,
          status
        };
        let response = await post({ url, data });
      }
      this.$message(this.modelTitle + "成功");
      this.getTableData();
    },
    async onDelLable() {
      let url = "/admin/label";
      let data = {
        id: this.delLableId
      };
      let response = await del({ url, data });
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
.userLabel {
  display: flex;
  height: 100%;
  flex-direction: column;
  .userLabel-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .userLabel-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .userLabel-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .userLabel-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .userLabel-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .userLabel-bot {
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
    .userLabel-bot-top {
      display: flex;
      justify-content: start;
      .userLabel-bot-top-i {
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
    }
    .userLabel-bot-bot {
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
      text-align: left;
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
