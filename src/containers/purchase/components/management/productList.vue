<template>
  <div class="productList">
    <div class="productList-top">
      <div class="productList-top-tit">
        产品列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="productList-top-con">
        <div class="productList-top-con-left">
          <div class="productList-top-con-i">
            分类：
            <el-select v-model="searchDataidArry.type" placeholder="请选择">
              <el-option
                v-for="item in searchData.type"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="productList-top-con-i">
            新品：
            <el-select v-model="searchDataidArry.is_new" placeholder="请选择">
              <el-option
                v-for="item in searchData.is_new"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="productList-top-con-i">
            招牌：
            <el-select v-model="searchDataidArry.is_sign" placeholder="请选择">
              <el-option
                v-for="item in searchData.is_sign"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="productList-top-con-i">
            上架：
            <el-select v-model="searchDataidArry.is_on_sale" placeholder="请选择">
              <el-option
                v-for="item in searchData.is_on_sale"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="productList-top-con-i">
            库存：
            <el-select v-model="searchDataidArry.stock" placeholder="请选择">
              <el-option
                v-for="item in searchData.stock"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="productList-top-con-i">
            审核：
            <el-select v-model="searchDataidArry.is_check" placeholder="请选择">
              <el-option
                v-for="item in searchData.is_check"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="productList-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </div>
    </div>
    <div class="productList-bot">
      <div class="productList-bot-top">
        <div class="productList-bot-top-w">
          <div class="productList-bot-top-i" @click="onToProductListDetail">
            <i class="el-icon-plus"></i>
            <span>新增原料</span>
          </div>
          <div class="productList-bot-top-i">
            <i class="el-icon-delete"></i>
            <span>回收站</span>
          </div>
        </div>
        <div class="productList-bot-top-r">
          <div class="productList-bot-top-r-w">
            Id：
            <div>
              <img
                @click="searchDataidArry.id=1;searchDataidArry.createtime=''"
                :src="searchDataidArry.id===1?onUp:up"
                alt
              />
              <img
                style="margin-top:5px"
                @click="searchDataidArry.id=2;searchDataidArry.createtime=''"
                :src="searchDataidArry.id==2?onDown:down"
                alt
              />
            </div>
          </div>
          <div class="productList-bot-top-r-w">
            时间：
            <div>
              <img
                @click="searchDataidArry.createtime=1;searchDataidArry.id=''"
                :src="searchDataidArry.createtime===1?onUp:up"
                alt
              />
              <img
                style="margin-top:5px"
                @click="searchDataidArry.createtime=2;searchDataidArry.id=''"
                :src="searchDataidArry.createtime==2?onDown:down"
                alt
              />
            </div>
          </div>
        </div>
      </div>
      <div class="productList-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="goods_name" label="名称"></el-table-column>
          <el-table-column align="center" prop="specs" label="规格"></el-table-column>
          <el-table-column align="center" prop="cate.name" label="分类"></el-table-column>
          <el-table-column align="center" prop="group" label="图片">
            <img slot-scope="slot" style="width:120px;height:120px" :src="slot.row.goodImg" alt />
          </el-table-column>
          <el-table-column align="center" prop="goods_cost" label="价格/成本价">
            <div slot-scope="solt">{{solt.row.goods_price}}/{{solt.row.goods_cost}}</div>
          </el-table-column>
          <el-table-column align="center" prop="goods_storage" label="库存"></el-table-column>
          <el-table-column align="center" prop="weight" label="排序"></el-table-column>
          <el-table-column align="center" prop="goods_new" label="新品">
            <div slot-scope="scope">
              <i
                v-if="scope.row.goods_new"
                class="el-icon-check"
                style="font-size:22px;color:#3CB371;"
              ></i>
              <i
                v-if="!scope.row.goods_new"
                class="el-icon-close"
                style="font-size:22px;color:#FB6534;"
              ></i>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="goods_sign" label="招牌">
            <div slot-scope="scope">
              <i
                v-if="scope.row.goods_sign"
                class="el-icon-check"
                style="font-size:22px;color:#3CB371;"
              ></i>
              <i
                v-if="!scope.row.goods_sign"
                class="el-icon-close"
                style="font-size:22px;color:#FB6534;"
              ></i>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="is_on_sale" label="上架">
            <div slot-scope="scope">
              <i
                v-if="scope.row.is_on_sale"
                class="el-icon-check"
                style="font-size:22px;color:#3CB371;"
              ></i>
              <i
                v-if="!scope.row.is_on_sale"
                class="el-icon-close"
                style="font-size:22px;color:#FB6534;"
              ></i>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="check_status" label="审核">
            <div slot-scope="scope">
              <i
                v-if="scope.row.check_status"
                class="el-icon-check"
                style="font-size:22px;color:#3CB371;"
              ></i>
              <i
                v-if="!scope.row.check_status"
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
                @click="onTOComment(scope.row.id)"
              >评论</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#3CB371"
                @click="onToProductListDetail(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#FB6534
                "
                @click="delProductId=scope.row.id;ifShowDele=true"
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
    <el-dialog title="删除等级" :visible.sync="ifShowDele" width="400px">
      <div class="box">
        <div class="box-con">确认删除当前产品？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShowDele = false">取 消</el-button>
          <el-button type="primary" @click="onDelProduct">确 定</el-button>
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
      tableData: "",
      searchData: {},
      searchDataidArry: {
        type: "",
        is_new: "",
        is_sign: "",
        is_on_sale: "",
        stock: "",
        is_check: "",
        id: "",
        createtime: ""
      },
      value: "",
      onUp: require("@/assets/new_images/onUp.png"),
      onDown: require("@/assets/new_images/onDown.png"),
      up: require("@/assets/new_images/up.png"),
      down: require("@/assets/new_images/down.png"),
      shensuo: require("@/assets/new_images/shensuo.png"),
      collecta: require("@/assets/new_images/collecta.png"),
      collectb: require("@/assets/new_images/collectb.png"),
      message: require("@/assets/new_images/message.png"),
      uplodingImg: require("@/assets/new_images/uplodingImg.png"),
      ifChangeGoods: false,
      keyword: "",
      page: 1,
      limit: 10,
      delProductId: "",
      ifShowDele: false
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
        type: "product_yl"
      };
      let response = await get({ url, params });
      this.searchData = response;
    },
    async getTableData() {
      let url = "/admin/product_yl";
      let {
        type = "",
        is_new = "",
        is_sign = "",
        is_on_sale = "",
        stock = "",
        is_check = "",
        id = "",
        createtime = ""
      } = this.searchDataidArry;
      let params = {
        type,
        is_new,
        is_sign,
        is_on_sale,
        stock,
        is_check,
        id,
        createtime,
        keyword: this.keyword,
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      this.tableData = response;
    },
    onChangeLable(data) {
      this.ifChanlable = true;
      this.modelTitle = "修改标签";
      this.changeDataContent = data;
    },
    onAddLable() {
      this.ifChanlable = true;
      this.modelTitle = "新增标签";
      this.changeDataContent = {
        group: "",
        status: 1,
        gid: ""
      };
    },
    // async onSureChangeLable() {
    //   this.ifChanlable = false;
    //   let url = "/admin/product_yl";
    //   let { group = "", status = 1, gid = "" } = this.changeDataContent;
    //   if (!group) return this.$message("请先输入标签名称");
    //   let data = {};
    //   if (this.modelTitle == "修改标签") {
    //     let data = {
    //       name: group,
    //       status,
    //       id: gid
    //     };
    //     let response = await put({ url, data });
    //   }
    //   if (this.modelTitle == "新增标签") {
    //     let data = {
    //       name: group,
    //       status
    //     };
    //     let response = await post({ url, data });
    //   }
    //   this.$message(this.modelTitle + "成功");
    //   this.getTableData();
    // },
    async onDelProduct() {
      let url = "/admin/product_yl";
      let data = {
        id: this.delProductId
      };
      let response = await del({ url, data });
      this.ifShowDele = false;
      this.$message("删除成功");
      this.getTableData();
    },
    //产品管理编辑
    onToProductListDetail(data = "") {
      this.$router.push({ path: "/productListDetail", query: data });
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
.productList {
  display: flex;
  height: 100%;
  flex-direction: column;
  .productList-top {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .productList-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .productList-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .productList-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
        .productList-top-con-i {
          margin-top: 8px;
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .productList-bot {
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
    .productList-bot-top {
      display: flex;
      justify-content: space-between;
      .productList-bot-top-w {
        display: flex;
        justify-content: start;
        .productList-bot-top-i {
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
      .productList-bot-top-r {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        font-weight: 500;

        .productList-bot-top-r-w {
          display: flex;
          flex-direction: row;
          padding-left: 20px;
          div {
            display: flex;
            flex-direction: column;
            img {
              width: 15px;
              height: 8px;
            }
          }
        }
      }
    }
    .productList-bot-bot {
      margin-top: 20px;
    }
  }
  .userLabel-bot-bot {
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
