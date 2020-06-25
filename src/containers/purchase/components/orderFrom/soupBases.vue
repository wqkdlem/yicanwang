<template>
  <div class="rawMaterial">
    <div class="rawMaterial-top">
      <div class="rawMaterial-top-tit">
        汤料订单列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="rawMaterial-top-con">
        <div class="rawMaterial-top-con-left">
          <!-- <div class="rawMaterial-top-con-i">
            催单状态：
            <el-select v-model="typeId" placeholder="请选择地址">
              <el-option
                style="width:380px;"
                v-for="item in typeDataAll"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>-->
          <div class="rawMaterial-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
          <div class="rawMaterial-top-con-i">
            时间：
            <el-date-picker
              style="border:1px solid rgba(51,51,51,0.14);"
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
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
    <div class="rawMaterial-bot">
      <div class="rawMaterial-bot-top">
        <div
          class="rawMaterial-bot-top-w"
          v-for="(item,index) in orderStatusList"
          :class="item.id==orderStatusId?'rawMaterial-bot-top-w-on':''"
          :key="index"
          @click="onChangeOrderStatus(item.id)"
        >{{item.title}}</div>
      </div>
      <div class="rawMaterial-bot-bot">
        <table_v :tableData="tableData" @onchange="onchange"></table_v>
      </div>
      <div class="block">
        <span class="demonstration">每页显示</span>
        <!--  -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          :total="tableData.page.data_count"
          layout="sizes, prev, pager, next"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import uplodImg from "@/components/uplodImg.vue";
import table_v from "@/components/soupTable.vue";
export default {
  name: "HelloWorld",
  components: { uplodImg, table_v },
  data() {
    return {
      expends: [], //默认展开的数据列表
      searchData: {},
      tableData: "",
      changeCateId: "",
      typeData: "",

      typeId: [],
      value: "",
      ifChangeGoods: false,
      keyword: "",
      modelTitle: "",
      page: 1,
      limit: 10,
      ifChanCate: false,
      ifShowDele: false,
      uploadPicImg: "",
      date: "",
      basicInformation: {
        title: "",
        weight: "",
        fileimg: "",
        fileurl: "",
        cate: [],
        id: ""
      },
      orderStatusList: this.getOrderStatusList(),
      orderStatusId: 1,
      typeDataAll: [
        { name: "全部", id: 1 },
        { name: "待付款", id: 2 },
        { name: "待发货", id: 3 },
        { name: "待收货", id: 4 },
        { name: "已完成", id: 5 }
      ]
    };
  },
  created() {
    let query = this.$route;
    this.uid = query.id;
    this.getTableData();
    this.getClassify();
    this.getClassifyAll();
  },
  methods: {
    async getClassifyAll() {
      let url = "/admin/screen/";
      // let { type = "" } = this.searchDataidArry;
      let params = {
        type: "video_type_all"
      };
      let response = await get({ url, params });
      this.typeDataAll = response.video_type_all;
    },
    async getClassify() {
      let url = "/admin/screen/";
      // let { type = "" } = this.searchDataidArry;
      let params = {
        type: "video_type"
      };
      let response = await get({ url, params });
      this.typeData = response.video_type;
    },
    onchange() {
      this.getTableData();
    },
    async getTableData() {
      let url = "/admin/raw_order";
      let params = {
        type: this.orderStatusId,
        start_time: this.date[0] || "",
        end_time: this.date[1] || "",
        keyword: this.keyword,
        page: this.page,
        limit: this.limit,
        uid: this.uid || ""
      };
      let response = await get({ url, params });
      this.tableData = response;
      console.log(this.tableData, "原料订单数据");
    },
    onChangeCate(data) {
      this.ifChanCate = true;
      this.modelTitle = "修改视频";
      this.basicInformation = data;
    },
    // getExpends() {
    //   console.log(this.tableData, "表格数据");
    //   var Id = this.tableData.data.map(item => item.id);
    //   this.expends = Id;
    //   console.log(this.expends);
    // },
    getRowKeys(row) {
      return row.id;
    },
    onChangeOrderStatus(id) {
      this.orderStatusId = id;
      this.getTableData();
    },
    getOrderStatusList() {
      return [
        { title: "全部", id: 1 },
        { title: "待付款", id: 2 },
        { title: "待发货", id: 3 },
        { title: "待收货", id: 4 },
        { title: "已完成", id: 5 }
      ];
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
    uploadSuccess(data) {
      this.basicInformation.fileimg = data.uploadPicUrl;
      console.log(this.basicInformation.fileimg, "前端展示图片");
      this.uploadPicImg = data.uploadPicImg;
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
.rawMaterial {
  display: flex;
  height: 100%;
  flex-direction: column;
  .rawMaterial-top {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .rawMaterial-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .rawMaterial-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .rawMaterial-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
        .rawMaterial-top-con-i {
          margin-top: 8px;
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .rawMaterial-bot {
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    flex: auto;
    text-align: left;
    // padding: 20px 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .rawMaterial-bot-top {
      display: flex;
      justify-content: start;
      background-color: #fff;
      margin-top: 15px;
      height: 50px;
      line-height: 50px;
      .rawMaterial-bot-top-w {
        margin: 0 12px;
      }
      .rawMaterial-bot-top-w-on {
        border-bottom: 1px solid #3cb371;
        color: #3cb371;
      }
    }
  }
  .rawMaterial-bot-bot {
    margin: 20px;
    flex: auto;
    background-color: #fff;
    border: 1px solid #979797;
    .block {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 10px;
    }
    div {
      border: none;
    }
  }
  .block {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
  }
  div {
    border: none;
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
        width: 670px;
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
  }
}
</style>
