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

        <el-button
          type="primary"
          style="height:40px"
          class="el-button"
          icon="el-icon-search"
          @click="getTableData"
        >搜索</el-button>
      </div>
    </div>
    <div class="purchaseSlideshow-bot">
      <div class="purchaseSlideshow-bot-top">
        <!-- <div class="purchaseSlideshow-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>-->
      </div>
      <div class="purchaseSlideshow-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
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
            <div slot-scope="scope" style="display:flex;" v-if="scope.row.product">
              <img style="width:50px;height:50px;" :src="scope.row.product.goodImg" alt />
              <div style="margin-left:10px">{{scope.row.product.goods_name}}</div>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="address" label="评论图片" width="180">
            <div slot-scope="scope">
              <el-popover placement="top-start" title trigger="click">
                <img :src="bigImg" alt style="width: 380px;height: 380px" />
                <div slot="reference">
                  <img
                    @click="onGetBigImg(item)"
                    style="width:50px;height:50px;"
                    v-for="(item,index) in scope.row.assess_img"
                    :key="index"
                    :src="item"
                  />
                </div>
              </el-popover>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="content" min-width="180" label="评价内容"></el-table-column>
          <!-- <el-table-column align="center" prop="address" label="评价图片"></el-table-column> -->
          <el-table-column align="center" prop="reply" label="回复" min-width="180"></el-table-column>
          <el-table-column align="center" prop="value" label="星评">
            <div slot-scope="scope">
              {{scope.row.goods_start}}星
              <img :src="starImg" />
            </div>
          </el-table-column>
          <el-table-column align="center" prop="createtime" label="时间" width="120"></el-table-column>
          <el-table-column align="center" prop label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                style="color:#3CB371"
                @click="replyId=scope.row.id;ifChanCate=true;comcont=scope.row.content"
              >回复</el-button>
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
    <el-dialog title="回复评论" class="abow_dialog" :visible.sync="ifChanCate" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">评论内容：</div>
          <div>{{comcont}}</div>
        </div>
        <div class="box-i" style="display:flex;">
          <div class="box-left">评论回复：</div>
          <textarea
            width
            type="text"
            style="width:680px;height:100px;padding:10px;"
            v-model="replyCont"
            placeholder="请输入评论回复内容"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChanCate= false">取 消</el-button>
        <el-button style="margin-left:40px" type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除等级" class="abow_dialog" :visible.sync="ifShowDele" width="900px">
      <div class="box">
        <div class="box-con">确认删除当前评论？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShowDele = false">取 消</el-button>
          <el-button style="margin-left:40px" type="primary" @click="handleDelete">确 定</el-button>
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
      tableData: {},
      value: "",
      page: 1,
      limit: 10,
      keyword: "",
      timeData: "",
      stateId: "",
      comcont: "",
      starImg: require("@/assets/new_images/start.png"),
      replyCont: "",
      replyId: "",
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
      date: "",
      ifChanCate: false,
      ifShowDele: false,
      bigImg: "",
      evaluationId: ""
    };
  },
  created() {
    let { query } = this.$route;
    this.evaluationId = query.id;
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
        start_time: this.date[0],
        end_time: this.date[1],
        status: this.stateId
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    async handleEdit() {
      let data = {
        id: this.replyId,
        content: this.replyCont
      };
      let url = "/admin/product_reviews";
      if (!this.replyCont) return this.$message("请先输入回复内容");
      let response = await put({ url, data });
      this.ifChanCate = false;
      if (response.msg) return this.$message(response.msg);
      this.getTableData();
      this.$message("回复成功");
    },
    async handleDelete() {
      let data = {
        id: this.replyId
      };
      let url = "";
      // let response = await put({ url, data });
      this.ifShowDele = false;
      // if (response.msg) return this.$message(response.msg);
      // this.$message("删除成功");
    },
    handleSizeChange(data) {
      this.page = 1;
      this.limit = data;
      this.getTableData();
    },
    handleCurrentChange(data) {
      this.page = data;
      this.getTableData();
    },
    onGetBigImg(url) {
      this.bigImg = url;
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
        flex-wrap: wrap;
        .purchaseSlideshow-top-con-i {
          margin-top: 10px;
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
    .purchaseSlideshow-bot-bot {
      margin-top: 20px;
      flex: auto;
    }
  }
  .block {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
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
