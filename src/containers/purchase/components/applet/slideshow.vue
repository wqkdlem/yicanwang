<template>
  <div class="purchaseSlideshow">
    <div class="purchaseSlideshow-top">
      <div class="purchaseSlideshow-top-tit">轮播图管理</div>
      <div class="purchaseSlideshow-top-con">
        <div class="purchaseSlideshow-top-con-left">
          <div class="purchaseSlideshow-top-con-i">
            类型：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- <div class="purchaseSlideshow-top-con-i">
            显示位置：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>-->
          <div class="purchaseSlideshow-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" bImg="el-bImg-search">搜索</el-button>
      </div>
    </div>
    <div class="purchaseSlideshow-bot">
      <div class="purchaseSlideshow-bot-top">
        <div class="purchaseSlideshow-bot-top-i" @click="onChangeImg">
          <i class="el-bImg-plus"></i>
          <span>新增轮播图</span>
        </div>
        <div class="purchaseSlideshow-bot-top-i">
          <i class="el-bImg-delete"></i>
          <span>批量删除</span>
        </div>
      </div>
      <div class="purchaseSlideshow-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="name" label="图片" width="180">
            <img
              slot-scope="scope"
              style="width:100px;height:40px;border-radius:4px;"
              :src="scope.row.bImgs"
              alt
            />
          </el-table-column>
          <el-table-column align="center" prop="title" label="标题"></el-table-column>
          <el-table-column align="center" prop="weight" label="排序"></el-table-column>
          <el-table-column align="center" prop="link" label="链接"></el-table-column>
          <el-table-column align="center" prop="type_id" label="类型"></el-table-column>
          <el-table-column align="center" label="启用">
            <el-switch
              slot-scope="scope"
              v-model="scope.row.is_show"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-table-column>
          <el-table-column align="center" prop="address" label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click="onToChange(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="ifDeleData(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!-- -->
          <!-- :current-page.sync="currentPage2"  :total="tableData.page.data_count" -->
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :title="modelTitle"
      :visible.sync="ifChangeGoods"
      width="900px"
      :before-close="handleClose"
    >
      <div class="box">
        <div class="box-i">
          <div class="box-left">商品类型：</div>
          <div class="box-right">
            <div
              class="box-right-i"
              @click="changeData.type_id=2"
              :class="changeData.type_id==2?'box-right-ia':''"
            >粉料</div>
            <div
              class="box-right-i"
              @click="changeData.type_id=1"
              :class="changeData.type_id==1?'box-right-ia':''"
            >原料</div>
          </div>
        </div>
        <div class="box-i">
          <div class="box-left">轮播图名称：</div>
          <input width type="text" v-model="changeData.title" placeholder="请输入图片名称" />
        </div>
        <div class="box-i box-img">
          <div class="box-left">图片：</div>
          <uplodImg
            style="margin-left:10px"
            :uploadPicUrl="changeData.bImg"
            @uploadSuccess="uploadSuccess"
          ></uplodImg>
        </div>
        <div class="box-i box-img">
          <div class="box-left">链接：</div>
          <input width type="text" v-model="changeData.link" placeholder="请输入链接" />
        </div>
        <div class="box-i">
          <div class="box-left">排序：</div>
          <input width type="number" v-model="changeData.weight" placeholder="请输入排序" />
        </div>
        <div class="box-i">
          <div class="box-left">启用：</div>
          <el-switch
            v-model="changeData.is_show"
            style="margin-left:10px"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChangeGoods = false">取 消</el-button>
        <el-button type="primary" @click="ifChangeuser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除管理员" :visible.sync="ifDele" width="300px">
      确定删除管理员？
      <div class="box"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifDele = false">取 消</el-button>
        <el-button type="primary" @click="onDeleData">确 定</el-button>
      </span>
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
      tableData: [],
      options: [],
      value: "",
      ifChangeGoods: false,
      page: 1,
      limit: 10,
      keyword: "",
      type: "",
      ifDele: false,
      ondeleDataID: "",
      changeData: {
        id: "",
        title: "",
        bImg: "",
        weight: "",
        is_show: true,
        type_id: 2,
        link: ""
      },
      modelTitle: "修改轮播图",
      uploadPicImg: ""
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    handleClose() {
      this.ifChangeGoods = false;
    },
    onChangeImg() {
      this.ifChangeGoods = true;
      this.changeData = {
        id: "",
        title: "",
        bImg: "",
        weight: "",
        is_show: true,
        type_id: 2,
        link: ""
      };
      this.modelTitle = "新增轮播图";
    },
    onToChange(data) {
      this.ifChangeGoods = true;
      this.changeData = data;
      this.modelTitle = "修改轮播图";
    },
    //确定修改或者新增轮播图
    async ifChangeuser() {
      this.ifChangeGoods = false;
      let url = "/admin/banner_yl";
      let {
        id = "",
        title = "",
        bImg = "",
        weight = "",
        is_show = true,
        type_id = "",
        link = ""
      } = this.changeData;
      console.log(this.changeData);
      if (!title) return this.$message("请先输入标题");
      // if (!bImg) return this.$message("请先上传图片");
      if (!weight) return this.$message("请先输入排序");
      let data = {};
      if (this.modelTitle == "修改轮播图") {
        let data = {
          id,
          title,
          bImg: this.uploadPicImg,
          weight,
          is_show: is_show ? 1 : 0,
          type_id,
          link
        };
        let response = await put({ url, data });
      }
      if (this.modelTitle == "新增轮播图") {
        let data = {
          title,
          bImg: this.uploadPicImg,
          weight,
          is_show: is_show ? 1 : 0,
          type_id,
          link
        };
        let response = await post({ url, data });
      }
      this.getTableData();
      // this.$message(this.modelTitle + "成功");
    },
    async getTableData() {
      let url = "/admin/banner_yl";
      let params = {
        page: this.page,
        limit: this.limit,
        keyword: this.keyword,
        type: this.type
      };
      let respone = await get({ url, params });
      // if (respone.code != 200) return this.$message(respone.msg);
      respone.data.map((item, index) => {
        console.log(item, index);
        if (item.is_show == 1) item.is_show = true;
        if (item.is_show == 0) item.is_show = false;
      });
      this.tableData = respone;
    },
    uploadSuccess(data) {
      this.changeData.bImg = data.uploadPicUrl;
      console.log(this.changeData.bImg, "前端展示图片");
      this.uploadPicImg = data.uploadPicImg;
      console.log(this.changeData.bImg, this.uploadPicImg);
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
    ifDeleData(id) {
      this.ondeleDataID = id;
      this.ifDele = true;
    },
    //删除管理员
    async onDeleData() {
      this.ifDele = false;
      let url = "/admin/admin/";
      let data = { id: this.ondeleDataID };
      let response = await del({ url, data });
      this.getTableData();
      this.$message("删除成功");
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
  .box {
    .box-i {
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
      .box-right {
        margin-left: 10px;
        display: flex;
        .box-right-i {
          width: 100px;
          height: 30px;
          line-height: 30px;
          background: rgba(255, 255, 255, 1);
          border-radius: 30px;
          text-align: center;
          font-size: 16px;
          color: #979797;
          border: 1px solid #979797;
          margin-right: 15px;
        }
        .box-right-ia {
          color: rgba(255, 255, 255, 1);
          border: 1px solid rgba(60, 179, 113, 1);
          background: rgba(60, 179, 113, 1);
        }
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
      img {
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
