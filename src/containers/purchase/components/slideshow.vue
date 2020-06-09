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

        <el-button type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="purchaseSlideshow-bot">
      <div class="purchaseSlideshow-bot-top">
        <div class="purchaseSlideshow-bot-top-i" @click="onChangeImg">
          <i class="el-icon-plus"></i>
          <span>新增轮播图</span>
        </div>
        <div class="purchaseSlideshow-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>
      </div>
      <div class="purchaseSlideshow-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="date" label="ID" width="180"></el-table-column>
          <el-table-column align="center" prop="name" label="标题" width="180"></el-table-column>
          <el-table-column align="center" prop="address" label="位置"></el-table-column>
          <el-table-column align="center" prop="address" label="值"></el-table-column>
          <el-table-column align="center" prop="address" label="排序"></el-table-column>
          <el-table-column align="center" prop="value" label="启用">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-table-column>
          <el-table-column align="center" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"-->
          <!-- :current-page.sync="currentPage2" -->
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="tableData.page.data_count"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="修改分类" :visible.sync="ifChangeGoods" width="900px" :before-close="handleClose">
      <div class="box">
        <div class="box-i">
          <div class="box-left">商品类型：</div>
          <div class="box-right">
            <div class="box-right-i">普通</div>
            <div class="box-right-i">粉料</div>
            <div class="box-right-i">原料</div>
          </div>
        </div>
        <div class="box-i">
          <div class="box-left">商品主标题：</div>
          <input width type="text" placeholder="aaaa" />
        </div>
        <div class="box-i">
          <div class="box-left">商品副标题：</div>
          <input width type="text" placeholder="aaaa" />
        </div>
        <div class="box-i box-img">
          <div class="box-left">商品图片：</div>
          <img style="width:180px;height:180px" src alt />
        </div>
        <div class="box-i">
          <div class="box-left">排序类型</div>
          <input width type="text" placeholder="aaaa" />
        </div>
        <div class="box-i">
          <div class="box-left">排序：</div>
          <el-select v-model="value" placeholder="请选择" width="670px" style>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChangeGoods = false">取 消</el-button>
        <el-button type="primary" @click="ifChangeGoods = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      ifChangeGoods: false,
      page: 1,
      limit: 10,
      keyword: "",
      type: ""
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
      this.tableData = respone;
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
