<template>
  <div class="categoryList">
    <div class="categoryList-top">
      <div class="categoryList-top-tit">
        发帖列表
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
            标签：
            <div v-if="ifShowLable">
              <el-cascader :options="searchData.lable" :show-all-levels="false" v-model="cid"></el-cascader>
            </div>
          </div>
          <div class="categoryList-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>
        <el-button type="primary" class="el-button" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </div>
    </div>
    <div class="categoryList-bot">
      <div class="categoryList-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="user.nickname" label="用户">
            <div slot-scope="solt">
              <!-- <img class="el-table-column-img" :src="solt.row.user.headImg||''" alt /> -->
              <div>{{solt.row.user.nickname}}</div>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="content" width="180" label="发帖内容/标签">
            <div slot-scope="solt">
              <div>{{solt.row.title}}</div>
              <div style="color:#979797">{{solt.row.content}}/</div>
              <span style="color:#3CB371">#{{solt.row.type_name}}#</span>
            </div>
          </el-table-column>
          <!-- <el-table-column align="center" prop="title" label="媒体"></el-table-column> -->
          <el-table-column align="center" prop="title" label="媒体" width="200">
            <div slot-scope="solt">
              <img :src="solt.row.imgs[0]" alt style="width:160px;height:80px;display:blocck;" />
              <div v-if="solt.row.imgs.length!=0">1/{{solt.row.imgs.length}}</div>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="create_time" label="时间"></el-table-column>
          <el-table-column align="center" prop="weight" label="点赞/帖子">
            <div slot-scope="solt">{{solt.row.like}}/{{solt.row.reply}}</div>
          </el-table-column>

          <el-table-column align="center" prop="status" label="状态">
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
            <!--  @click="onShowJurisdiction(scope.row)" @click="onToCompile(scope.row)"  @click="ifDeleData(scope.row.id)"-->
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                style="color:#3CB371"
                @click="basicInformation=scope.row;ifChanCate=true;"
              >详情</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#FB6534
                "
                @click="ifShowDele=true;changeCateId=scope.row.id;status=scope.row.status"
              >{{scope.row.status?'封贴':"取消封贴"}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          {{tableData.page}}
          <!-- :total="tableData.page.data_count" -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="发帖编辑" :visible.sync="ifChanCate" width="600px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">禁言期限：</div>
          <el-select v-model="dateData" placeholder="请选择">
            <el-option
              v-for="item in searchData.level"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="box-i">
          <div class="box-left">禁言原因：</div>
          <textarea name id cols="200" rows="10" placeholder="请输入禁言原因"></textarea>
        </div>
        <div class="box-i">
          <div class="box-left">是否显示</div>
          <div class="box-right">
            <el-radio v-model="basicInformation.status" :label="1">是</el-radio>
            <el-radio v-model="basicInformation.status" :label="2">否</el-radio>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChanCate= false">取 消</el-button>
        <el-button type="primary" @click="onSureChangeLable">确 定</el-button>
      </span>
    </el-dialog>-->
    <el-dialog title="发帖详情" :visible.sync="ifChanCate" width="600px">
      <div class="box">
        <div class="box-content">
          <div class="box-content-title">
            <!-- <img  v-if="basicInformation" :src="basicInformation.user.headImg||''" alt class="el-table-column-img" /> -->
            <div v-if="basicInformation.title">{{basicInformation.user.nickname}}</div>
          </div>
          <div class="box-content-cen" v-if="basicInformation.title">
            <span>{{basicInformation.title}}</span>
            <div>{{basicInformation.content}}</div>
            <div style="color:#3CB371">#{{basicInformation.type_name}}#</div>
            <div v-if="basicInformation.title">
              <img
                style="width:100px;height:100px;margin-left:15px;"
                v-for="(item,index) in basicInformation.imgs"
                :key="index"
                :src="item"
                alt
              />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="删除等级" :visible.sync="ifShowDele" width="400px">
      <div class="box">
        <div class="box-con">确认{{status?'封贴':"取消封贴"}}？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShowDele = false">取 消</el-button>
          <el-button type="primary" @click="onDelCate">确 定</el-button>
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
      searchData: {},
      tableData: "",
      changeCateId: "",
      typeId: "",
      basicInformation: {},
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
      ifShowDele: false,
      dateData: "",
      status: "",
      date: "",
      cid: [], //标签id
      ifShowLable: false
    };
  },
  created() {
    this.getTableData();
    this.getLableData();
  },
  methods: {
    async getLableData() {
      let url = "/admin/screen/";
      let params = {
        type: "card_label_all"
      };
      let response = await get({ url, params });
      this.searchData.lable = response.card_label_all;
      this.ifShowLable = true;
    },
    async getTableData() {
      let url = "/admin/cards";
      // let { type = "" } = this.searchDataidArry;
      console.log(this.cid);
      let params = {
        cid: this.cid.pop(),
        keyword: this.dateData,
        start_time: this.date[0],
        end_time: this.date[1],
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    async onDelCate() {
      console.log(this.status);
      let url = "/admin/cards";
      let data = {
        id: this.changeCateId,
        status: this.status == 1 ? 0 : 1
      };
      let response = await put({ url, data });
      this.ifShowDele = false;
      this.$message("操作成功");
      this.getTableData();
    },
    //帖子
    onTOComment(id) {
      this.$emit("onTOComment", id);
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
