<template>
  <div class="administrator">
    <div class="administrator-top">
      <div class="administrator-top-tit">
        管理员列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="administrator-top-con">
        <div class="administrator-top-con-left">
          <div class="administrator-top-con-i">
            关键字：
            <el-input
              style="width:230px;"
              v-model="keyword"
              placeholder="请输入关键字"
              @οnkeydοwn="onSearch"
            ></el-input>
          </div>
        </div>

        <el-button
          style="margin-left:40px"
          type="primary"
          class="el-button"
          icon="el-icon-search"
          @click="onSearch"
        >搜索</el-button>
      </div>
    </div>
    <div class="administrator-bot">
      <div class="administrator-bot-top">
        <div class="administrator-bot-top-i" @click="onAddData">
          <i class="el-icon-plus" @click="onAddData"></i>
          <span @click="onAddData">新增管理员</span>
        </div>
      </div>
      <div class="administrator-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" prop="id" label="ID" width="60"></el-table-column>
          <el-table-column align="center" prop="is_super_text" label="是否超级管理员" width="120"></el-table-column>
          <el-table-column align="center" prop="username" label="用户名称">
            <div slot-scope="scope">{{scope.row.username}}</div>
          </el-table-column>
          <el-table-column align="center" prop="realname" label="真实姓名" width="120"></el-table-column>
          <el-table-column align="center" prop="role.role_name" label="角色名称"></el-table-column>
          <el-table-column align="center" prop="status" label="是否启用">
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
          <el-table-column align="center" prop="last_logintime" label="最后登陆时间" width="110"></el-table-column>
          <el-table-column align="center" prop="last_login_ip" label="最后登录IP"></el-table-column>
          <el-table-column align="center" prop="address" label="操作" width="100">
            <template slot-scope="scope" style>
              <el-button
                type="text"
                @click="onChangeData(scope.row)"
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
          <!-- :current-page.sync="currentPage2" -->
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="tableData.page.data_count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :title="modelTitle"
      class="abow_dialog"
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
    >
      <div class="box">
        <div class="box-i">
          <div class="box-left">用户名称：</div>
          <input width type="text" v-model="changeDataContent.username" placeholder="请输入用户名称" />
        </div>
        <div class="box-i">
          <div class="box-left">真实姓名：</div>
          <input width type="text" v-model="changeDataContent.realname" placeholder="请输入真实姓名" />
        </div>

        <!-- <div class="box-i" v-if="modelTitle==='新增管理员'">
          <div class="box-left">用户密码：</div>
          <input width type="text" placeholder="请输入用户密码" />
        </div>-->
        <div class="box-i">
          <div class="box-left">角色名称：</div>
          <el-select v-model="changeDataContent.role_id" placeholder="请选择" width="630px" style>
            <el-option
              v-for="item in rolesList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="box-i">
          <div class="box-left">是否启用：</div>
          <div class="box--right">
            <el-radio v-model="changeDataContent.status" :label="1">是</el-radio>
            <el-radio v-model="changeDataContent.status" :label="0">否</el-radio>
          </div>
        </div>
        <div class="box-i">
          <div class="box-left">是否超级管理员：</div>
          <div class="box--right">
            <el-radio v-model="changeDataContent.is_super" :label="1">是</el-radio>
            <el-radio v-model="changeDataContent.is_super" :label="0">否</el-radio>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button style="margin-left:40px" type="primary" @click="ifChangeuser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除管理员" class="abow_dialog" :visible.sync="ifDele" width="900px">
      确定删除管理员？
      <div class="box"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifDele = false">取 消</el-button>
        <el-button style="margin-left:40px" type="primary" @click="onDeleData">确 定</el-button>
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
      keyword: "",
      tableData: [],
      value: "",
      dialogVisible: false,
      radio: 1,
      page: 1,
      limit: 10,
      changeDataContent: {
        is_super: 0,
        status: 0
      },
      ifDele: false,
      modelTitle: "修改管理员",
      rolesList: [],
      ondeleDataID: ""
    };
  },
  created() {
    this.getTableData();
    this.initGetTableData();
  },
  mounted() {},
  methods: {
    onAddData() {
      this.changeDataContent = {
        is_super: 0,
        status: 0
      };
      this.modelTitle = "新增管理员";
      this.dialogVisible = true;
    },
    onChangeData(data) {
      this.changeDataContent = data;
      this.dialogVisible = true;
      this.modelTitle = "修改管理员";
    },
    ifDeleData(id) {
      this.ondeleDataID = id;
      this.ifDele = true;
    },
    //确定修改或者新增管理员
    async ifChangeuser() {
      this.dialogVisible = false;
      let url = "/admin/admin/";
      let {
        username = "",
        realname = "",
        role_id = "",
        is_super = "",
        status = "",
        id = ""
      } = this.changeDataContent;
      console.log(this.changeDataContent);
      if (!username) return this.$message("请先输入用户名");
      if (!realname) return this.$message("请先输入真实姓名");
      if (!role_id) return this.$message("请先选择角色");
      let data = {};
      if (this.modelTitle == "修改管理员") {
        let data = {
          username,
          realname,
          role_id,
          is_super,
          status,
          id
        };
        let response = await put({ url, data });
        if (response.msg) return this.$message(response.msg);
      }
      if (this.modelTitle == "新增管理员") {
        let data = {
          username,
          realname,
          role_id,
          is_super,
          status
        };
        let response = await post({ url, data });
        if (response.msg) return this.$message(response.msg);
      }

      this.getTableData();
      // this.$message(this.modelTitle + "成功");
    },
    //删除管理员
    async onDeleData() {
      this.ifDele = false;
      let url = "/admin/admin/";
      let data = { id: this.ondeleDataID };
      let response = await del({ url, data });
      if (response.msg) return this.$message(response.msg);
      this.getTableData();
      this.$message("删除成功");
    },
    handleClose(data) {
      this.dialogVisible = false;
    },
    onSearch() {
      if (!this.keyword) return this.$message("请先输入关键字");
      this.getTableData();
    },
    //获取表格数据
    async getTableData() {
      console.log("111111111");
      let url = "/admin/admin/";
      let params = {
        page: this.page,
        limit: this.limit,
        keyword: this.keyword
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    //获取角色列表
    async initGetTableData() {
      let url = "/admin/screen/";
      console.log(url);
      let params = {
        type: "roles"
      };
      let response = await get({ url, params });
      console.log(response);
      this.rolesList = response.roles;
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


<style scoped lang="less" stylus>
@import "../../../../stylus/administrator.less";
.administrator {
  display: flex;
  height: 100%;
  flex-direction: column;
  .administrator-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .administrator-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .administrator-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .administrator-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .administrator-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .administrator-bot {
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
    .administrator-bot-top {
      display: flex;
      justify-content: start;
      .administrator-bot-top-i {
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
    .administrator-bot-bot {
      margin-top: 20px;
      flex: auto;
      .block {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 10px;
      }
      .administrator-bot-bot-operate {
        display: flex;
        justify-content: center;
        font-size: 24px;
        font-weight: 500;
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
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>