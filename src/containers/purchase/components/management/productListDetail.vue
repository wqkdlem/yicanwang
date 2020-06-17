<template>
  <div class="userListDetail">
    <div class="userListDetail-top">
      <div class="userListDetail-top-tit">产品操作</div>
      <div class="userListDetail-top-con" @click="onShowProductList">返回</div>
    </div>
    <div class="userListDetail-bot">
      <div class="userListDetail-bot-w">
        <div class="userListDetail-bot-lef">
          <div
            class="userListDetail-bot-lef-i"
            v-for="(item,index) in navLeft"
            :key="index"
            @click="getNavLeftId(item.id)"
            :class="navLeftId==item.id?'userListDetail-bot-lef-ion':''"
          >{{item.title}}</div>
        </div>
        <div class="userListDetail-bot-rig">
          <div v-if="navLeftId===1">
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">产品名称：</div>
              <input v-model="detailData.goods_name" type="text" />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">产品售价：</div>
              <div class="userListDetail-bot-rig-i-right">
                <input type="text" v-model="detailData.goods_price" />
                <span>元</span>
              </div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">产品成本价：</div>
              <div class="userListDetail-bot-rig-i-right">
                <input type="text" v-model="detailData.goods_cost" />
                <span>元</span>
              </div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">品牌：</div>
              <div class="userListDetail-bot-rig-i-right">
                <input type="text" v-model="detailData.brand" />
                <span>元</span>
              </div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">产品规格：</div>
              <input type="text" v-model="detailData.specs" />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">产品库存：</div>
              <input type="number" v-model="detailData.goods_storage" />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">商品重量：</div>
              <input type="text" v-model="detailData.goods_weight" />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">商品体积：</div>
              <input type="number" v-model="detailData.goods_size" />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">产品排序：</div>
              <input type="number" v-model="detailData.weight" />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">市场价：</div>
              <input type="number" v-model="detailData.goods_mark_price" />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">赠送积分：</div>
              <input type="number" v-model="detailData.goods_integral" />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">产品分类：</div>
              <div v-if="ifClassify">
                <el-cascader
                  class="userListDetail-bot-rig-i-right"
                  v-model="detailData.cates"
                  :options="classifyData"
                  leafOnly="true"
                ></el-cascader>
              </div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">运费模板：</div>
              <el-select
                placeholder="请选择运费模板"
                v-model="detailData.template_id"
                width="630px"
                class="userListDetail-bot-rig-i-right"
              >
                <el-option
                  v-for="item in freightData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div style="display:flex; padding: 0 40px;box-sizing: border-box;">
              <div class="userListDetail-bot-rig-i userListDetail-bot-rig-a">
                <div class="userListDetail-bot-rig-i-left">新品：</div>
                <div class="userListDetail-bot-rig-i-righta">
                  <el-radio v-model="detailData.goods_new" :label="1">是</el-radio>
                  <el-radio v-model="detailData.goods_new" :label="0">否</el-radio>
                </div>
              </div>
              <div class="userListDetail-bot-rig-i">
                <div class="userListDetail-bot-rig-i-left">招牌：</div>
                <div class="userListDetail-bot-rig-i-righta">
                  <el-radio v-model="detailData.goods_sign" :label="1">是</el-radio>
                  <el-radio v-model="detailData.goods_sign" :label="0">否</el-radio>
                </div>
              </div>
            </div>
            <div style="display:flex; padding: 0 40px;box-sizing: border-box;">
              <div class="userListDetail-bot-rig-i userListDetail-bot-rig-a">
                <div class="userListDetail-bot-rig-i-left">上架：</div>
                <div class="userListDetail-bot-rig-i-righta">
                  <el-radio v-model="detailData.is_on_sale" :label="1">是</el-radio>
                  <el-radio v-model="detailData.is_on_sale" :label="0">否</el-radio>
                </div>
              </div>
              <div class="userListDetail-bot-rig-i">
                <div class="userListDetail-bot-rig-i-left">审核：</div>
                <div class="userListDetail-bot-rig-i-righta">
                  <el-radio v-model="detailData.check_status" :label="1">是</el-radio>
                  <el-radio v-model="detailData.check_status" :label="0">否</el-radio>
                </div>
              </div>
            </div>
          </div>

          <div v-if="navLeftId===1">
            <div class="submit" @click="changeContent">提交</div>
          </div>
          <div v-if="navLeftId==2">
            <div class="userListDetail-content">
              <!-- <div class="userListDetail-content-title">
                <i class="el-icon-delete"></i>
                <span>批量删除</span>
              </div>-->
              <div class="userListDetail-content-cen">
                <span>上传图片：</span>
                <div class="userListDetail-content-cen-con">
                  <moreUplodImg
                    style="margin-left:10px"
                    :uploadPicUrl="detailData.goodImg"
                    @uploadSuccess="uploadSuccess"
                  ></moreUplodImg>
                </div>
              </div>
            </div>
            <vueQuillEditor @change="change" :goods_content="detailData.goods_content"></vueQuillEditor>
          </div>
          <div v-if="navLeftId===3">
            <el-table :data="userinfo" border :height="500" style="width: 100%;">
              <el-table-column align="center" prop="date" label="充值金额" width="180"></el-table-column>
              <el-table-column align="center" prop="address" label="充值平台"></el-table-column>
              <el-table-column align="center" prop="name" label="充值时间" width="180"></el-table-column>
              <el-table-column align="center" prop="address" label="状态"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="userListDetail-bot-bot" v-if="navLeftId==3">
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"-->
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="tableData.page.data_count"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import vueQuillEditor from "@/components/vueQuillEditor"; //富文本编辑器
import moreUplodImg from "@/components/moreUplodImg.vue";
export default {
  name: "HelloWorld",
  components: { vueQuillEditor, moreUplodImg },
  data() {
    return {
      value: "",
      radio: 1,
      navLeft: [
        { title: "基本信息", id: 1 },
        { title: "附加信息", id: 2 }
      ],
      uploadPicImg: "",
      userinfo: "",
      addressList: [],
      navLeftId: 1,
      page: 1,
      limit: 10,
      rolesList: [],
      freightData: "",
      uplodingImg: require("@/assets/new_images/uplodingImg.png"),
      ifClassify: false,
      classifyData: "",
      classifyId: "",
      detailData: {
        goods_name: "",
        gc_id: "",
        goods_price: "",
        goods_cost: "",
        weight: "",
        goods_storage: "",
        goods_type: "",
        goods_new: "",
        goods_sign: "",
        goodImg: "",
        createtime: "",
        template_id: "",
        is_on_sale: "",
        is_free_shopping: "",
        check_status: "",
        goods_content: "",
        specs: "",
        brand: "",
        goods_weight: "",
        goods_words: "",
        goods_level: "",
        goods_size: "",
        goods_mark_price: "",
        goods_integral: "",
        cates: "",
        productListDetailData: ""
      }
    };
  },
  created() {
    let { query } = this.$route;
    this.productListDetailData = query;
    this.initGetClassify();
    this.getFreight();
    if (this.productListDetailData && this.productListDetailData.id) {
      this.navLeft = [
        { title: "基本信息", id: 1 },
        { title: "附加信息", id: 2 },
        { title: "日志记录", id: 3 }
      ];
      this.getEssential();
    }
  },
  methods: {
    getNavLeftId(id) {
      this.navLeftId = id;
      this.page = 1;
    },
    //获取运费模板id
    async getFreight() {
      let params = {
        type: "freight_template"
      };
      let url = "/admin/screen/";
      let response = await get({ url, params });
      this.freightData = response.template_id;
    },
    //获取商品基本信息
    async getEssential() {
      let params = {
        id: this.productListDetailData.id
      };
      let url = "/admin/product_de";
      let response = await get({ url, params });
      this.detailData = response;
    },
    //获取商品分类
    async initGetClassify() {
      let params = {
        ctype: 1
      };
      let url = "/admin/cate_tree";
      let response = await get({ url, params });
      this.classifyData = response;
      this.ifClassify = true;
      console.log(this.classifyData);
    },
    //添加或者修改基本信息
    async changeContent() {
      let {
        id = "",
        goods_name = "",
        gc_id = "",
        goods_price = "",
        goods_cost = "",
        weight = "",
        goods_storage = "",
        goods_type = "",
        goods_new = "",
        goods_sign = "",
        goodImg = "",
        createtime = "",
        template_id = "",
        is_on_sale = "",
        is_free_shopping = "",
        check_status = "",
        goods_content = "",
        specs = "",
        brand = "",
        goods_weight = "",
        goods_words = "",
        goods_level = "",
        goods_size = "",
        goods_mark_price = "",
        goods_integral = "",
        cates = ""
      } = this.detailData;
      let url = "/admin/product_yl";
      let response = "";
      if (this.productListDetailData && this.productListDetailData.id) {
        let data = {
          id,
          goods_name,
          goods_price,
          gc_id: 1,
          goods_storage,
          goods_new,
          goods_sign,
          goodImg: this.uploadPicImg,
          is_on_sale,
          goods_content,
          specs,
          brand,
          template_id,
          goods_weight,
          goods_size,
          is_free_shopping,
          goods_mark_price,
          goods_integral,
          cates,
          goods_cost
        };
        response = await put({ url, data });
      } else {
        let data = {
          goods_name,
          goods_price,
          gc_id: 1,
          goods_storage,
          goods_new,
          goods_sign,
          goodImg: this.uploadPicImg,
          is_on_sale,
          goods_content,
          specs,
          brand,
          template_id,
          goods_weight,
          goods_size,
          is_free_shopping,
          goods_mark_price,
          goods_integral,
          cates,
          goods_cost
        };
        response = await post({ url, data });
      }
      console.log(response);
    },
    onShowUserList() {
      this.$emit("onShowUserList");
    },
    onShowProductList() {
      this.$router.go(-1);
    },
    handleSizeChange(data) {
      this.page = 1;
      this.limit = data;
      if (this.navLeftId === 1) {
        this.getUserinfo();
      }
    },
    handleCurrentChange(data) {
      this.page = data;
      if (this.navLeftId === 1) {
        this.getUserinfo();
      }
    },
    change(data) {
      this.detailData.goods_content = data;
    },
    uploadSuccess(data) {
      this.detailData.goodImg = data.uploadPicUrl;
      console.log(this.detailData.goodImg, "前端展示图片");
      this.uploadPicImg = data.uploadPicImg;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.userListDetail {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  .userListDetail-top {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .userListDetail-top-con {
      font-size: 20px;
      color: #3cb371;
    }
  }
  .userListDetail-top,
  .userListDetail-bot {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .userListDetail-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
  .userListDetail-bot {
    margin-top: 30px;
    flex: auto;
    .userListDetail-bot-w {
      width: 100%;

      display: flex;
      flex-direction: row;
      justify-content: start;
      .userListDetail-bot-lef {
        width: 182px;
        .userListDetail-bot-lef-i {
          width: 180px;
          height: 50px;
          border: 1px solid rgba(151, 151, 151, 1);
          font-size: 18px;
          font-weight: 400;
          color: #979797;
          line-height: 50px;
          text-align: center;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        .userListDetail-bot-lef-ion {
          background: rgba(60, 179, 113, 1);
          color: #fff;
          border: 1px solid rgba(60, 179, 113, 1);
        }
      }
      .userListDetail-bot-rig {
        flex: auto;
        margin-left: 50px;
        .userListDetail-bot-rig-i {
          display: flex;
          justify-content: start;
          margin-top: 20px;
          align-items: center;
          .userListDetail-bot-rig-i-left {
            width: 120px;
            text-align: right;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
            font-weight: 400;
          }
          input {
            width: 400px;
            height: 35px;
            background: rgba(241, 241, 241, 1);
            border: none;
            padding: 0 15px;
            box-sizing: border-box;
          }
          .userListDetail-bot-rig-i-right,
          .userListDetail-bot-rig-i-righta {
            width: 400px;
            height: 35px;
            font-size: 16px;
            color: #979797;
            font-weight: 400;
            display: flex;
            justify-content: start;
            align-items: center;
            input {
              height: 35px;
              border: none;
              flex: auto;
            }
            span {
              display: inline-block;
              width: 50px;
              height: 37px;
              background: rgba(227, 227, 227, 1);
              font-size: 14px;
              color: #333333;
              line-height: 35px;
              text-align: center;
            }
            .el-radio {
              width: 30px;
            }
          }
          .userListDetail-bot-rig-i-righta {
            width: 140px;
          }
          img {
            width: 80px;
            height: 80px;
            display: inline-block;
            margin-left: 30px;
          }
        }
        .userListDetail-bot-rig-a {
          width: 50%;
          .userListDetail-bot-rig-i-right {
            width: 100%;
          }
        }
        .userListDetail-content {
          .userListDetail-content-title {
            width: 100px;
            height: 30px;
            line-height: 30px;
            background-color: #3cb371;
            padding: 0 8px;
            box-sizing: border-box;
            border-radius: 4px;
            span {
              font-size: 14px;
              color: #ffffff;
            }
          }
          .userListDetail-content-cen {
            display: flex;
            padding: 20px 0;
            box-sizing: border-box;
            span {
              width: 140px;
              font-size: 16px;
              font-weight: 400;
            }
            .userListDetail-content-cen-con {
              flex: auto;
            }
            .userListDetail-content-cen-con-w {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;

              img {
                width: 160px;
                height: 160px;
                margin-right: 20px;
              }
            }
          }
        }
        .submit {
          width: 372px;
          height: 50px;
          background: #3cb371;
          color: #ffffff;
          font-size: 16px;
          line-height: 50px;
          text-align: center;
          border-radius: 8px;
          margin: 30px 0 0 30px;
        }
      }
    }
    .userListDetail-bot-bot {
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
}
</style>
