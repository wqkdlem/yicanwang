<template>
  <div class="categoryList">
    <div class="categoryList-top">
      <div class="categoryList-top-tit">
        产品列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="categoryList-top-con">
        <div class="categoryList-top-con-left">
          <div class="categoryList-top-con-i">
            催单状态：
            <el-cascader :options="typeDataAll" :show-all-levels="false" v-model="typeId"></el-cascader>
          </div>
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
            <span>新增视频</span>
          </div>
          <div class="categoryList-bot-top-i">
            <i class="el-icon-delete"></i>
            <span>批量删除</span>
          </div>
        </div>
      </div>
      <div class="categoryList-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="title" label="视频标题"></el-table-column>
          <el-table-column align="center" prop="type_name" label="分类"></el-table-column>
          <el-table-column align="center" prop="fileimg" label="视频封面" width="240">
            <img
              slot-scope="solt"
              :src="solt.row.fileimg"
              alt
              style="width:200px;height:80px;display:blocck;"
            />
          </el-table-column>
          <el-table-column align="center" prop="fileurl" label="url"></el-table-column>
          <el-table-column align="center" prop="create_time" label="时间"></el-table-column>
          <el-table-column align="center" prop="weight" label="点赞/评论">
            <div slot-scope="solt">{{solt.row.like}}/{{solt.row.reply}}</div>
          </el-table-column>
          <el-table-column align="center" prop="weight" label="排序"></el-table-column>
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
          <span class="demonstration">每页显示</span>
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
    <el-dialog :title="modelTitle" :visible.sync="ifChanCate" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">视频分类：</div>
          <el-cascader :options="typeData" :show-all-levels="false" v-model="basicInformation.cate"></el-cascader>
        </div>
        <div class="box-i">
          <div class="box-left">视频标题：</div>
          <textarea
            name
            id
            cols="200"
            rows="10"
            v-model="basicInformation.title"
            placeholder="请输入视频标题"
          ></textarea>
        </div>
        <div style="display:flex;">
          <div class="box-img">
            <div class="box-left">视频封面：</div>
            <uplodImg
              style="margin-left:10px"
              :uploadPicUrl="basicInformation.fileimg"
              @uploadSuccess="uploadSuccess"
            ></uplodImg>
          </div>
          <div class="box-img">
            <div class="box-left">上传视频：</div>
            <video style="width:180px;height:180px" :src="basicInformation.fileurl" alt />
          </div>
        </div>
        <div class="box-i">
          <div class="box-left">排序：</div>
          <input width type="text" v-model="basicInformation.weight" placeholder="请输入排序" />
        </div>
        <!-- <div class="box-i">
          <div class="box-left">URL：</div>
          <input width type="text" v-model="basicInformation.name" placeholder="请输入url" />
        </div>-->
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChanCate= false">取 消</el-button>
        <el-button type="primary" @click="onSureChangeLable">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除等级" :visible.sync="ifShowDele" width="400px">
      <div class="box">
        <div class="box-con">确认删除视频？</div>
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
      searchData: {},
      tableData: "",
      changeCateId: "",
      typeData: "",
      typeDataAll: "",
      typeId: [],
      basicInformation: {
        title: "",
        weight: "",
        fileimg: "",
        fileurl: "",
        cate: [],
        id: ""
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
      uploadPicImg: "",
      date: ""
    };
  },
  created() {
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
    async getTableData() {
      let url = "/admin/college_video";
      // let { type = "" } = this.searchDataidArry;
      let params = {
        start_time: date[0],
        end_time: date[1],
        keyword: this.keyword,
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    onChangeCate(data) {
      this.ifChanCate = true;
      this.modelTitle = "修改视频";
      this.basicInformation = data;
    },
    onAddCate() {
      this.ifChanCate = true;
      this.modelTitle = "新增视频";
      this.basicInformation = {
        title: "",
        weight: "",
        fileimg: "",
        fileurl: "",
        cate: [],
        id: ""
      };
    },
    async onSureChangeLable() {
      this.ifChanCate = false;
      let {
        title = "",
        weight = "",
        fileimg = "",
        fileurl = "",
        cate = [],
        id = ""
      } = this.basicInformation;
      let url = "/admin/college_video";
      if (!title) return this.$message("请先输入视频名称");
      let data = {};
      if (this.modelTitle == "修改视频") {
        let data = {
          title,
          weight,
          fileimg,
          fileurl,
          cate,
          id
        };
        let response = await put({ url, data });
      }
      if (this.modelTitle == "新增视频") {
        let data = {
          title,
          weight,
          fileimg,
          fileurl: "http://qiniu.emjiayuan.com//aaa1.mp4",
          cate
        };
        let response = await post({ url, data });
      }
      this.$message(this.modelTitle + "成功");
      this.getTableData();
    },
    async onDelCate() {
      let url = "/admin/college_video";
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
