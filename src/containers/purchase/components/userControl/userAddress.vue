<template>
  <div class="userAddress">
    <div class="userAddress-top">
      <div class="userAddress-top-tit">用户地址</div>
      <div class="userAddress-top-con">
        <div class="userAddress-top-con-left">
          <div class="userAddress-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>
        <el-button
          type="primary"
          style="height:40px"
          class="el-button"
          icon="el-icon-search"
          @click="getTableData"
        >搜索</el-button>
      </div>
    </div>
    <div class="userAddress-bot">
      <div class="userAddress-bot-w">
        <div class="userAddress-bot-rig">
          <el-table :data="tableData.data" border :height="500" style="width: 100%;">
            <el-table-column align="center" prop="date" label="收货人">
              <div slot-scope="slot">
                <div>{{slot.row.username}}</div>
                <div v-if="slot.row.is_default" style="font-size:13px;color:#3CB371">默认地址</div>
              </div>
            </el-table-column>
            <el-table-column align="center" prop="telphone" label="电话"></el-table-column>
            <el-table-column align="center" prop="address" label="地址"></el-table-column>
            <el-table-column align="center" prop="createtime" label="创建时间"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="userAddress-bot-bot">
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
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      value: "",
      radio: 1,
      tableData: "",
      keyword: "",
      page: 1,
      limit: 10
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let url = "/admin/address";
      let params = {
        keyword: this.keyword,
        id: "",
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      this.tableData = response;
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
.userAddress {
  display: flex;
  height: 100%;
  flex-direction: column;
  .userAddress-top,
  .userAddress-bot {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .userAddress-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .userAddress-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .userAddress-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
        .userAddress-top-con-i {
          margin-right: 60px;
          height: 50px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .userAddress-bot {
    margin-top: 30px;
    .userAddress-bot-w {
    }
    .userAddress-bot-bot {
      margin-top: 20px;
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
