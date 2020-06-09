<template>
  <div class="categoryList">
    <div class="categoryList-top">
      <div class="categoryList-top-tit">
        社区轮播列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="categoryList-top-con">
        <div class="categoryList-top-con-left">
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
            <span>新增轮播图</span>
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
          <el-table-column align="center" prop="title" label="名称"></el-table-column>
          <el-table-column align="center" prop="count" label="图片" width="300">
            <img
              slot-scope="slot"
              :src="slot.row.bImg"
              alt
              style="width:240px;height:100px;display:inline-block;"
            />
          </el-table-column>
          <el-table-column align="center" prop="type_text" label="位置"></el-table-column>
          <el-table-column align="center" prop="weight" label="排序"></el-table-column>
          <el-table-column align="center" prop="is_show" label="显示">
            <div slot-scope="scope">
              <i
                v-if="scope.row.is_show"
                class="el-icon-check"
                style="font-size:22px;color:#3CB371;"
              ></i>
              <i
                v-if="!scope.row.is_show"
                class="el-icon-close"
                style="font-size:22px;color:#FB6534;"
              ></i>
            </div>
          </el-table-column>
          <el-table-column align="center" label="操作" width="120">
            <!--  @click="onShowJurisdiction(scope.row)" @click="onToCompile(scope.row)"  @click="ifDeleData(scope.row.id)"-->
            <template slot-scope="scope">
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
          <!-- :total="tableData.page.data_count" -->
          <span class="demonstration">每页显示</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="100"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="modelTitle" :visible.sync="ifChanCate" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">轮播图名称：</div>
          <input width type="text" v-model="basicInformationTwo.title" placeholder="请输入轮播图名称" />
        </div>
        <div class="box-i">
          <div class="box-left">跳转链接：</div>
          <input width type="text" v-model="basicInformationTwo.link" placeholder="跳转链接" />
        </div>
        <div class="box-i box-img">
          <div class="box-left">背景图片：</div>
          <uplodImg
            style="margin-left:10px"
            :uploadPicUrl="basicInformationTwo.bImg"
            @uploadSuccess="uploadSuccess"
          ></uplodImg>
        </div>
        <div style="display:flex;">
          <div class="box-a">
            <div class="box-left">排序：</div>
            <input
              type="number"
              v-model="basicInformationTwo.weight"
              class="box-right"
              placeholder="请输入排序"
            />
          </div>
          <div class="box-a">
            <div class="box-left">位置：</div>
            <el-select class="box-right" v-model="basicInformationTwo.type" placeholder="请选择轮播图位置">
              <el-option
                v-for="item in searchData.type"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
        <div class="box-con">确认删除当前轮播图？</div>
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
import { localSave, localRead } from "@/lib/local.js";
import uplodImg from "@/components/uplodImg.vue";
export default {
  name: "HelloWorld",
  components: { uplodImg },
  data() {
    return {
      searchData: {
        type: [
          { id: 1, name: "社区" },
          { id: 2, name: "学院" }
        ]
      },
      tableData: "",
      changeCateId: "",
      typeId: "",
      basicInformation: {
        title: "",
        link: "",
        bImg: "",
        weight: "",
        type: "",
        id: ""
      },
      basicInformationTwo: "",
      value: "",
      shensuo: require("@/assets/new_images/shensuo.png"),
      collecta: require("@/assets/new_images/collecta.png"),
      collectb: require("@/assets/new_images/collectb.png"),
      message: require("@/assets/new_images/message.png"),
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
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let url = "/admin/banner_sq";
      let params = {
        keyword: this.keyword,
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    onChangeCate(data) {
      this.ifChanCate = true;
      this.modelTitle = "修改轮播图";
      this.basicInformationTwo = JSON.parse(
        JSON.stringify(this.basicInformation)
      );
      this.basicInformationTwo = data;
    },
    onAddCate() {
      this.ifChanCate = true;
      this.modelTitle = "新增轮播图";
      this.basicInformationTwo = {
        title: "",
        link: "",
        bImg: "",
        weight: "",
        type: "",
        id: ""
      };
    },
    async onSureChangeLable() {
      this.ifChanCate = false;
      let {
        title = "",
        link = "",
        bImg = "",
        weight = "",
        type = "",
        id = ""
      } = this.basicInformationTwo;
      let url = "/admin/banner_sq";
      if (!title) return this.$message("请先输入轮播图名称");
      let data = {};
      if (this.modelTitle == "修改轮播图") {
        let data = {
          title,
          link,
          bImg: this.uploadPicImg,
          weight,
          type,
          id
        };
        let response = await put({ url, data });
      }
      if (this.modelTitle == "新增轮播图") {
        let data = {
          title,
          link,
          bImg: this.uploadPicImg,
          weight,
          type
        };
        let response = await post({ url, data });
      }
      this.$message(this.modelTitle + "成功");
      this.getTableData();
    },
    async onDelCate() {
      let url = "/admin/banner_sq";
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
    },
    uploadSuccess(data) {
      this.basicInformationTwo.bImg = data.uploadPicUrl;
      console.log(this.basicInformationTwo.bImg, "前端展示图片");
      this.uploadPicImg = data.uploadPicImg;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 140px;
  height: 140px;
  display: block;
}
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
