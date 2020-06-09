<template>
  <div class="purchaseSlideshow">
    <div class="purchaseSlideshow-top">
      <div class="purchaseSlideshow-top-tit">
        评价列表
        <span style="color:#3CB371">({{tableData.page.data_count}})</span>
      </div>
      <div class="purchaseSlideshow-top-con">
        <div class="purchaseSlideshow-top-con-left">
          <div class="purchaseSlideshow-top-con-i">
            状态：
            <el-select v-model="stateId" placeholder="请选择">
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="purchaseSlideshow-top-con-i">
            评论时间：
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="purchaseSlideshow-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </div>
    </div>
    <div class="purchaseSlideshow-bot">
      <div class="purchaseSlideshow-bot-top">
        <div class="purchaseSlideshow-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>
      </div>
      <div class="purchaseSlideshow-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="date" label="头像" width="80">
            <img
              style="width:30px;height:30px;border-radius:50%;"
              slot-scope="scope"
              :src="scope.row.user.headImg"
              alt
            />
          </el-table-column>
          <el-table-column align="center" prop="name" label="ID/名称" width="130">
            <div slot-scope="scope">
              <div
                style="font-size:16px;font-weight:bold;color:rgba(51,51,51,1);"
              >{{scope.row.user.nickname}}</div>
              <div
                style="font-size:14px;font-weight:800;color:rgba(153,153,153,1);"
              >id：{{scope.row.uid}}</div>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="address" label="产品" width="180">
            <!-- <div slot-scope="scope" style="display:flex;">
              <img style="width:30px;height:30px;" :src="scope.row.product.goodImg" alt />
              <div>{{scope.row.product.goods_name}}</div>
            </div>-->
          </el-table-column>
          <el-table-column align="center" prop="content" label="评价内容"></el-table-column>
          <!-- <el-table-column align="center" prop="address" label="评价图片"></el-table-column> -->
          <el-table-column align="center" prop="address" label="回复"></el-table-column>
          <el-table-column align="center" prop="value" label="启用">
            <div slot-scope="scope">
              {{scope.row.goods_start}}星
              <img :src="starImg" />
            </div>
          </el-table-column>
          <el-table-column align="center" prop="createtime" label="时间" width="120"></el-table-column>
          <el-table-column align="center" prop label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!---->
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
  </div>
</template>

<script>
import { get, post, del, putfakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  props: ["evaluationId"],
  data() {
    return {
      tableData: {},
      value: "",
      page: 1,
      limit: 10,
      keyword: "",
      timeData: "",
      stateId: "",
      starImg: require("@/assets/new_images/start.png"),
      stateList: [
        {
          value: "2",
          label: "全部"
        },
        {
          value: "0",
          label: "未回复"
        },
        {
          value: "1",
          label: "已回复"
        }
      ],
      date: ""
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let url = "/admin/product_reviews";
      let params = {
        page: this.page,
        limit: this.limit,
        product: this.evaluationId || "",
        keyword: this.keyword,
        start_time: date[0],
        end_time: date[1],
        status: this.stateId
      };
      let respone = await get({ url, params });
      this.tableData = respone;
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
.purchaseSlideshow {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  .purchaseSlideshow-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .purchaseSlideshow-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .purchaseSlideshow-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .purchaseSlideshow-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .purchaseSlideshow-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .purchaseSlideshow-bot {
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
    .purchaseSlideshow-bot-top {
      display: flex;
      justify-content: start;
      .purchaseSlideshow-bot-top-i {
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
    .purchaseSlideshow-bot-bot {
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
