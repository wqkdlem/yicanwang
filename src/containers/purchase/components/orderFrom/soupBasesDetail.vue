<template>
  <div class="userListDetail">
    <div class="userListDetail-top">
      <div class="userListDetail-top-tit">订单详情</div>
      <div class="userListDetail-top-con" @click="onToRawMaterial">返回</div>
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
              <div class="userListDetail-bot-rig-i-left">订单编号</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.id}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">订单状态</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.status_text}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">下单用户</div>
              <div
                class="userListDetail-bot-rig-i-right"
                v-if="basicInformation.user&&basicInformation.user.username"
              >{{basicInformation.user.username}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">手机号</div>
              <div
                class="userListDetail-bot-rig-i-right"
                v-if="basicInformation.user&&basicInformation.user.mobilePhone"
              >{{basicInformation.user.mobilePhone}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">支付价格</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.order_amount}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">获得积分</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.integral}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">价格形成</div>
              <div class="userListDetail-bot-rig-i-right">
                <div style="color:#333333;">汤料总价-优惠+加工费=需支付价格</div>
                <div>1、汤料总价 等于 所有购买汤料产品的总价格</div>
                <div>2、需支付价格 等于 汤料产品总价“减去”打折优惠的金额“加上”加工费的金额</div>
              </div>
            </div>
            <!-- -------------------- -->
            <div
              class="userListDetail-bot-rig-i"
              style="border-top:1px solid #D8D8D8;margin-top:10px;padding-top:10px"
            >
              <div class="userListDetail-bot-rig-i-left">收货人</div>
              <div
                class="userListDetail-bot-rig-i-right"
                v-if="basicInformation.order_address&&basicInformation.order_address.username"
              >{{basicInformation.order_address.username}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">收货电话</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.telphone}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">收货地址</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.address}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">留言</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.remark}}</div>
            </div>
            <!-- ---------------- -->
            <div
              class="userListDetail-bot-rig-i"
              style="border-top:1px solid #D8D8D8;margin-top:10px;padding-top:10px"
            >
              <div class="userListDetail-bot-rig-i-left">快递公司</div>
              <div
                class="userListDetail-bot-rig-i-right"
              >{{basicInformation.level&&basicInformation.level.level_name?basicInformation.level.level_name:''}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">快递编号</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.expressno}}</div>
            </div>
            <!-- <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">是否可用</div>
              <div class="userListDetail-bot-rig-i-right">
                <el-radio v-model="basicInformation.status" :label="1">是</el-radio>
                <el-radio v-model="basicInformation.status" :label="2">否</el-radio>
              </div>
            </div>-->
          </div>
          <div v-if="navLeftId==2">
            <el-table
              :data="basicInformation.goods"
              border
              style="width: 100%;"
              show-summary
              :summary-method="getSummaries"
            >
              <el-table-column align="center" prop="goods_name" label="商品"></el-table-column>
              <el-table-column align="center" prop="telphone" label="图片" width="200">
                <img
                  slot-scope="solt"
                  :src="solt.row.goods_image"
                  style="width:180px;height:70px;display:inline-block;"
                  alt
                />
              </el-table-column>
              <el-table-column align="center" prop="totalPrice" label="购买价格(每100g)"></el-table-column>
              <el-table-column align="center" prop="goods_num" label="重量"></el-table-column>
              <el-table-column align="center" prop="totalPrice" label="小计"></el-table-column>
            </el-table>
          </div>
          <div v-if="navLeftId===3">
            <div v-if="logisticsInformation.length">
              <logistics :logisticsInformation="logisticsInformation"></logistics>
            </div>
            <div>暂无物流信息!</div>
            <!-- <el-table :data="userinfo" border :height="500" style="width: 100%;">
              <el-table-column align="center" prop="date" label="充值金额" width="180"></el-table-column>
              <el-table-column align="center" prop="address" label="充值平台"></el-table-column>
              <el-table-column align="center" prop="name" label="充值时间" width="180"></el-table-column>
              <el-table-column align="center" prop="address" label="状态"></el-table-column>
            </el-table>-->
          </div>
          <div v-if="navLeftId===4&&logData">
            <div v-if="logData.length">
              <logRecord :logData="logData"></logRecord>
            </div>
            <div>暂无日志记录！</div>
          </div>
        </div>
      </div>
      <div class="userListDetail-bot-bot" v-if="navLeftId===2">
        <div class="block">
          <span class="demonstration">每页显示</span>
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"-->
          <!-- :total="tableData.page.data_count" -->
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import logistics from "@/components/logistics.vue";
import logRecord from "@/components/logRecord.vue";
export default {
  name: "HelloWorld",
  components: { logistics, logRecord },
  data() {
    return {
      value: "",
      radio: 1,
      navLeft: [
        { title: "基本信息", id: 1 },
        { title: "购买商品", id: 2 },
        { title: "物流追踪", id: 3 },
        { title: "日志记录", id: 4 }
      ],
      userinfo: "",
      addressList: [],
      navLeftId: 1,
      basicInformation: {},
      logData: "",
      page: 1,
      limit: 10,
      rawMaterialData: ""
    };
  },
  created() {
    let { query } = this.$route;
    console.log(query, "query");
    this.rawMaterialData = query.id;
    this.getUserinfo();
    this.getLogData();
    this.getLogistics();
  },
  methods: {
    getNavLeftId(id) {
      this.navLeftId = id;
      this.page = 1;
    },
    //获取用户基本信息
    async getUserinfo() {
      let url = "/admin/soup_order";
      let params = {
        order_id: this.rawMaterialData
      };
      let response = await get({ url, params });
      this.basicInformation = response;
      console.log(this.basicInformation, "订单详情");
    },
    //获取日志信息
    async getLogData() {
      let params = {
        order_id: this.rawMaterialData
      };
      let url = "/admin/order_log";
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.logData = response;
      console.log(this.logData);
    },
    //获取物流信息
    async getLogistics() {
      let url = "/admin/logistics";
      let params = {
        order_id: this.rawMaterialData
      };
      let response = await get({ url, params });
      this.logisticsInformation = response;
      console.log(this.basicInformation, "物流信息");
    },
    //返回
    onToRawMaterial() {
      this.$emit("onToRawMaterial");
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (index === 4) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.userListDetail {
  display: flex;
  height: 100%;
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
          .userListDetail-bot-rig-i-left {
            width: 150px;
            text-align: right;
            font-size: 16px;
            color: #979797;
            font-weight: 400;
          }
          .userListDetail-bot-rig-i-right {
            font-size: 16px;
            color: #979797;
            font-weight: 400;
            margin-left: 30px;
            width: 60%;
            div {
              word-wrap: break-word;
              word-break: normal;
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
