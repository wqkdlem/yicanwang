<template>
  <div class="adminLog">
    <div class="adminLog-top">
      <div class="adminLog-top-tit">
        管理日志
        <span style="color:#3CB371"></span>
      </div>
      <div class="adminLog-top-con">
        <div class="adminLog-top-con-left">
          <!-- <div class="adminLog-top-con-i">
            类型：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>-->
          <div class="adminLog-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button
          type="primary"
          class="el-button"
          icon="el-icon-search"
          @click="initGetTableData"
        >搜索</el-button>
      </div>
    </div>
    <div class="adminLog-bot">
      <div class="adminLog-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" prop="admin_user" label="管理员" width="100"></el-table-column>
          <el-table-column align="center" prop="title" label="标题"></el-table-column>
          <el-table-column align="center" prop="desc" label="说明" width="180"></el-table-column>
          <el-table-column align="center" prop="request_type" label="请求类型"></el-table-column>
          <el-table-column align="center" prop="user_agent" label="头信息"></el-table-column>
          <el-table-column align="center" prop="request_url" label="链接"></el-table-column>
          <el-table-column align="center" prop="time" label="时间"></el-table-column>
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
      keyword: ""
    };
  },
  created() {
    this.initGetTableData();
  },
  methods: {
    //获取角色列表
    async initGetTableData() {
      let url = "admin/admin_log/";
      let params = {
        page: this.page,
        limit: this.limit,
        keyword: this.keyword
      };
      let response = await get({ url, params });
      console.log(response);
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.adminLog {
  display: flex;
  height: 100%;
  flex-direction: column;
  .adminLog-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .adminLog-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .adminLog-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .adminLog-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .adminLog-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .adminLog-bot {
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
    .adminLog-bot-top {
      display: flex;
      justify-content: start;
      .adminLog-bot-top-i {
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
    .adminLog-bot-bot {
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
