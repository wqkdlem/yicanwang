<template>
  <div class="categoryList">
    <div class="categoryList-top">
      <div class="categoryList-top-tit">核心团队列表>新增</div>
      <div>
        <span style="color: #3cb371;">返回</span>
      </div>
    </div>
    <div class="box">
      <!-- <div class="box-i">
        <div class="box-left">类型：</div>
        <el-select v-model="dateData" placeholder="请选择类型">
          <el-option
            v-for="item in searchData.level"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>-->
      <div class="box-i">
        <div class="box-left">姓名：</div>
        <input type="text" placeholder="请输入姓名" />
      </div>
      <div class="box-i">
        <div class="box-left">职位：</div>
        <input type="text" placeholder="请输入职位" />
      </div>
      <div class="box-i">
        <div class="box-left">职位：</div>
        <img :src="uplodingImg" />
      </div>

      <!-- <div class="box-i">
        <div class="box-left">首页显示：</div>
        <div class="box-right">
          <el-radio v-model="basicInformation.status" :label="1">是</el-radio>
          <el-radio v-model="basicInformation.status" :label="2">否</el-radio>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  props: ["jurisdictionData"],
  data() {
    return {
      searchData: {},
      tableData: "",
      changeCateId: "",
      typeId: "",
      basicInformation: {
        name: "",
        title: "",
        weight: ""
      },
      value: "",
      uplodingImg: require("@/assets/new_images/uplodingImg.png"),
      ifChangeGoods: false,
      keyword: "",
      modelTitle: "",
      page: 1,
      limit: 10,
      ifChanCate: false,
      ifShowDele: false,
      dateData: ""
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let url = "/admin/community_label";
      // let { type = "" } = this.searchDataidArry;
      let params = {
        ctype: this.typeId,
        keyword: this.keyword,
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    onChangeCate(data) {
      this.ifChanCate = true;
      this.modelTitle = "修改单页信息";
      this.basicInformation = data;
    },
    onAddCate() {
      this.ifChanCate = true;
      this.modelTitle = "新增单页信息";
      this.basicInformation = {
        name: "",
        title: "",
        weight: ""
      };
    },
    async onSureChangeLable() {
      this.ifChanCate = false;
      let {
        name = "",
        title = "",
        weight = "",
        id = ""
      } = this.basicInformation;
      let url = "/admin/community_label";
      if (!name) return this.$message("请先输入单页信息名称");
      let data = {};
      if (this.modelTitle == "修改单页信息") {
        let data = {
          name,
          title,
          weight,
          id
        };
        let response = await put({ url, data });
      }
      //   if (this.modelTitle == "新增单页信息") {
      //     let data = {
      //       name,
      //       title,
      //       weight
      //     };
      //     let response = await post({ url, data });
      //   }
      this.$message(this.modelTitle + "成功");
      this.getTableData();
    },
    async onDelCate() {
      let url = "/admin/community_label";
      let data = {
        id: this.changeCateId
      };
      let response = await del({ url, data });
      this.ifShowDele = false;
      this.$message("删除成功");
      this.getTableData();
    },
    //单页信息
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
    },
    onToCutFrom() {
      this.$emit("onToCutFrom");
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
  height: 100% !important;
  flex-direction: column;
  .categoryList-top {
    border-radius: 4px;
    width: 100%;
    height: 60px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  .box {
    background-color: #fff;
    margin-top: 10px;
    flex: auto;
    .box-i,
    .box-img {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .box-left {
        font-size: 14px;
        color: #333333;
        width: 120px !important;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
      }
      input,
      textarea {
        width: 410px;
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
        width: 410px;
        height: 40px;
        margin-left: 10px;

        .el-input__inner {
          background-color: #f1f1f1;
        }
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
      border: 1px solid red;
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
          justify-content: space-between;
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
    border: 1px solid red;
  }
}
</style>
