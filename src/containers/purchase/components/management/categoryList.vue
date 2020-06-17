<template>
  <div class="categoryList">
    <div class="categoryList-top">
      <div class="categoryList-top-tit">
        分类列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="categoryList-top-con">
        <div class="categoryList-top-con-left">
          <div class="categoryList-top-con-i">
            分类：
            <el-select v-model="typeId" placeholder="请选择">
              <el-option
                v-for="item in searchData.ctype"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
      <div class="categoryList-bot-top">
        <div class="categoryList-bot-top-w">
          <div class="categoryList-bot-top-i" @click="onAddCate">
            <i class="el-icon-plus"></i>
            <span>新增分类</span>
          </div>
          <div class="categoryList-bot-top-i">
            <i class="el-icon-delete"></i>
            <span>批量删除</span>
          </div>
        </div>
      </div>
      <div class="categoryList-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="name" label="分类名称"></el-table-column>
          <el-table-column align="center" prop="title" label="标题"></el-table-column>
          <el-table-column align="center" prop="subtitle" label="短标题"></el-table-column>
          <el-table-column align="center" prop="subtitle" label="分类图片" width="180">
            <img style="width:140px;height:140px" slot-scope="solt" :src="solt.row.cate_url" alt />
          </el-table-column>
          <el-table-column align="center" prop="weight" label="排序"></el-table-column>
          <!-- <el-table-column align="center" prop="goods_price" label="首页排列"></el-table-column>
          <el-table-column align="center" align="center" prop="status" label="首页显示">
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
          </el-table-column>-->
          <el-table-column align="center" prop="status" label="可用">
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
          <el-table-column label="操作" width="160">
            <!--  @click="onShowJurisdiction(scope.row)" @click="onToCompile(scope.row)"  @click="ifDeleData(scope.row.id)"-->
            <template slot-scope="scope">
              <!-- <el-button
                type="text"
                size="small"
                style="color:#3CB371"
                @click="onTOComment(scope.row.id)"
              >详情</el-button>-->
              <el-button
                type="text"
                size="small"
                style="color:#3CB371"
                @click="onChangeCate(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#FB6534
                "
                @click="ifShowDele=true;changeCateId=scope.row.id"
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
            :total="10"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="modelTitle" :visible.sync="ifChanCate" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">分类名称：</div>
          <input width type="text" v-model="basicInformation.name" placeholder="请输入分类名称" />
        </div>
        <div class="box-i">
          <div class="box-left">主标题：</div>
          <input width type="text" v-model="basicInformation.title" placeholder="请输入分类名称" />
        </div>
        <div class="box-i">
          <div class="box-left">短标题：</div>
          <input width type="text" v-model="basicInformation.subtitle" placeholder="请输入分类名称" />
        </div>
        <div class="box-img">
          <div class="box-left">分类图片：</div>
          <!-- <img style="width:180px;height:180px" :src="basicInformation.cate_url||uplodingImg" alt /> -->
          <uplodImg
            style="margin-left:10px"
            :uploadPicUrl="basicInformation.cate_url"
            @uploadSuccess="uploadSuccess"
          ></uplodImg>
        </div>
        <div class="box-i">
          <div class="box-left">排序：</div>
          <input width type="number" v-model="basicInformation.weight" placeholder="请输入分类名称" />
        </div>
        <div class="box-i">
          <div class="box-left">汤料分类：</div>
          <div class="box-right">
            <el-radio v-model="basicInformation.ctype" :label="1">原料</el-radio>
            <el-radio v-model="basicInformation.ctype" :label="2">汤料</el-radio>
          </div>
        </div>
        <div class="box-i">
          <div class="box-left">首页显示</div>
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
    </el-dialog>
    <el-dialog title="删除等级" :visible.sync="ifShowDele" width="400px">
      <div class="box">
        <div class="box-con">确认删除当前分类？</div>
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
import uplodImg from "@/components/uplodImg.vue";
export default {
  name: "HelloWorld",
  components: { uplodImg },
  data() {
    return {
      tableData: "",
      changeCateId: "",
      searchData: {},
      typeId: "",
      basicInformation: {
        name: "",
        title: "",
        ctype: 1,
        subtitle: "",
        cate_url: "",
        is_check: "",
        id: "",
        status: 1,
        weight: ""
      },
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
      uploadPicImg: ""
    };
  },
  created() {
    this.initSearchList();
    this.getTableData();
  },
  methods: {
    async initSearchList() {
      let url = "/admin/screen/";
      let params = {
        type: "cate"
      };
      let response = await get({ url, params });
      this.searchData = response;
    },
    async getTableData() {
      let url = "/admin/cate";
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
      this.modelTitle = "修改分类";
      this.basicInformation = data;
    },
    onAddCate() {
      this.ifChanCate = true;
      this.modelTitle = "新增分类";
      this.basicInformation = {
        name: "",
        title: "",
        ctype: 1,
        subtitle: "",
        cate_url: "",
        is_check: "",
        id: "",
        status: 1,
        weight: ""
      };
    },
    async onSureChangeLable() {
      this.ifChanCate = false;
      let {
        name = "",
        title = "",
        ctype = "",
        subtitle = "",
        cate_url = "",
        is_check = "",
        id = "",
        status = 1,
        weight = ""
      } = this.basicInformation;
      let url = "admin/cate";
      if (!name) return this.$message("请先输入分类名称");
      let data = {};
      if (this.modelTitle == "修改分类") {
        this.uploadPicImg = cate_url;
        let data = {
          name,
          title,
          ctype,
          subtitle,
          cate_url: this.uploadPicImg,
          is_check,
          id,
          status,
          weight
        };
        let response = await put({ url, data });
      }
      if (this.modelTitle == "新增分类") {
        let data = {
          name,
          title,
          ctype,
          subtitle,
          cate_url: this.uploadPicImg,
          is_check,
          status,
          weight
        };
        let response = await post({ url, data });
      }
      this.$message(this.modelTitle + "成功");
      this.getTableData();
    },
    uploadSuccess(data) {
      this.basicInformation.cate_url = data.uploadPicUrl;
      console.log(this.basicInformation.cate_url, "前端展示图片");
      this.uploadPicImg = data.uploadPicImg;
    },
    async onDelCate() {
      let url = "admin/cate";
      let data = {
        id: this.changeCateId
      };
      let response = await del({ url, data });
      this.ifShowDele = false;
      this.$message("删除成功");
      this.getTableData();
    },
    //评论
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
      input {
        width: 670px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        margin-left: 10px;
        background-color: #f1f1f1;
        border: none;
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
