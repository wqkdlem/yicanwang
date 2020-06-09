<template>
  <div class="charcterName">
    <div class="charcterName-top">
      <div class="charcterName-top-tit">
        角色名称
        <span style="color:#3CB371"></span>
      </div>
      <div class="charcterName-top-con">
        <div class="charcterName-top-con-left">
          <div class="charcterName-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="charcterName" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="charcterName-bot">
      <div class="charcterName-bot-top">
        <div class="charcterName-bot-top-i" @click="onToAdd">
          <i class="el-icon-plus"></i>
          <span>新建角色名称</span>
        </div>
        <div class="charcterName-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>
      </div>
      <div class="charcterName-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="75"></el-table-column>
          <el-table-column align="center" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="role_name" label="角色名称" width="180"></el-table-column>
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
          <el-table-column align="center" label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="onShowJurisdiction(scope.row)"
                size="small"
                style="color:#3CB371"
              >权限</el-button>
              <el-button
                type="text"
                @click="onToCompile(scope.row)"
                size="small"
                style="color:#3CB371"
              >编辑</el-button>
              <el-button
                @click="ifDeleData(scope.row.id)"
                type="text"
                size="small"
                style="color:#FB6534
                "
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!--  :current-page.sync="currentPage2"-->
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
    <el-dialog :title="modelTitle" :visible.sync="dialogVisible" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">用户名称：</div>
          <input width type="text" v-model="changeDataContent.role_name" placeholder="请输入用户名称" />
        </div>
        <div class="box-i">
          <div class="box-left">是否显示：</div>
          <div class="box--right">
            <el-radio v-model="changeDataContent.status" :label="1">是</el-radio>
            <el-radio v-model="changeDataContent.status" :label="0">否</el-radio>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ifChangeuser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除角色" :visible.sync="ifDele" width="300px">
      确定删除角色？
      <div class="box"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifDele = false">取 消</el-button>
        <el-button type="primary" @click="onDeleData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: [],
      value: "",
      page: 1,
      limit: 10,
      ifDele: false,
      onDeleDataId: "",
      charcterName: "",
      ifDele: false,
      modelTitle: "修改角色",
      changeDataContent: {
        //角色内容
        role_name: "",
        status: 0,
        id: ""
      },
      dialogVisible: false //是否展示编辑角色弹出框
    };
  },
  created() {
    this.initGetTableData();
  },
  methods: {
    //获取角色列表
    async initGetTableData() {
      let url = "/admin/role/";
      let params = {
        page: this.page,
        limit: this.limit,
        charcterName: this.charcterName
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    handleSizeChange(data) {
      this.page = 1;
      this.limit = data;
      this.initGetTableData();
    },
    handleCurrentChange(data) {
      this.page = data;
      this.initGetTableData();
    },
    ifDeleData(id) {
      this.ondeleDataID = id;
      this.ifDele = true;
    },
    // 权限
    onShowJurisdiction(data) {
      this.$emit("onShowJurisdiction", data);
    },
    // 编辑
    onToCompile(data) {
      console.log(data);
      this.dialogVisible = true;
      this.modelTitle = "修改角色";
      this.changeDataContent = data;
    },
    //新增
    onToAdd() {
      this.dialogVisible = true;
      this.modelTitle = "新增角色";
      this.changeDataContent = {
        role_name: "",
        status: 0,
        id: ""
      };
    },
    async ifChangeuser() {
      this.dialogVisible = false;
      let url = "/admin/role/";
      let { role_name = "", status = 0, id = "" } = this.changeDataContent;
      if (!role_name) return this.$message("请先输入角色名");
      let data = {};
      if (this.modelTitle == "修改角色") {
        let data = {
          role_name,
          status,
          id
        };
        let response = await put({ url, data });
      }
      if (this.modelTitle == "新增角色") {
        let data = {
          role_name,
          status
        };
        let response = await post({ url, data });
        this.$message(this.modelTitle + "成功");
      }
      this.$message(this.modelTitle + "成功");
      this.initGetTableData();
    },
    //删除角色
    async onDeleData() {
      this.ifDele = false;
      let url = "/admin/role/";
      let data = { id: this.ondeleDataID };
      let response = await del({ url, data });
      if (response.code != 200) return this.$message(response.msg);
      this.initGetTableData();
      this.$message("删除成功");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.charcterName {
  display: flex;
  height: 100%;
  flex-direction: column;
  .charcterName-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .charcterName-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .charcterName-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .charcterName-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .charcterName-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .charcterName-bot {
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
    .charcterName-bot-top {
      display: flex;
      justify-content: start;
      .charcterName-bot-top-i {
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
    .charcterName-bot-bot {
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
      .box--right {
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
