<template>
  <div>
    <el-row class="table-title">
      <el-col :span="6">
        <div class="table-title-div">商品</div>
      </el-col>
      <el-col :span="2">
        <div class="table-title-div">小计</div>
      </el-col>
      <el-col :span="3">
        <div class="table-title-div">买家</div>
      </el-col>
      <el-col :span="3">
        <div class="table-title-div">快递信息</div>
      </el-col>
      <el-col :span="3">
        <div class="table-title-div">价格/支付</div>
      </el-col>
      <el-col :span="3">
        <div class="table-title-div">下单时间</div>
      </el-col>
      <el-col :span="4">
        <div class="table-title-div border0">操作</div>
      </el-col>
    </el-row>
    <div class="table-content" v-for="(item,index) in tableData.data" :key="index">
      <el-row class="table-content-title">
        <el-col :span="22">
          <div class="table-content-title-div">ID/编号:{{item.uid}}/{{item.id}}</div>
        </el-col>
        <el-col :span="2">
          <div class="table-content-title-div stateStyle">{{item.status_text}}</div>
        </el-col>
      </el-row>
      <el-row class="table-content-content" type="flex">
        <el-col :span="8">
          <div class="table-content-content-div">
            <div
              class="table-content-content-div-a"
              v-for="(good,index) in item.goods"
              :key="index"
            >
              <!-- <el-row class="table-content-foot"> -->
              <el-col :span="18">
                <div class="table-content-foot-div" style="display:flex;">
                  <img :src="good.goods_image" alt />
                  <div style="color:#333333">{{good.goods_name}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="table-content-foot-div border0">
                  <div>{{good.totalPrice}}</div>
                  <div>{{good.goods_num}}件</div>
                </div>
              </el-col>
              <!-- </el-row> -->
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="table-content-content-div">
            <div style="color:#333333">{{item.user.username}}</div>
            <div>{{item.user.telphone}}</div>
            <!-- <img :src="xie" @click="ifChagneUser=true" style="width:13px;height:14px;" alt /> -->
          </div>
        </el-col>
        <el-col :span="3">
          <div class="table-content-content-div">
            <!-- <div>百世汇通</div> -->
            <div>单号：{{item.expressno}}</div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="table-content-content-div">
            <div>{{item.order_amount}}</div>
            <!-- <div class="payState">取消支付</div> -->
          </div>
        </el-col>
        <el-col :span="3">
          <div class="table-content-content-div">{{item.create_time}}</div>
        </el-col>
        <el-col :span="4">
          <!-- <div class="table-content-content-div border0 table-content-content-div-change">
            <div class="payState" @click="onToRawMaterialDetail(item.id)">详情</div>
            <div
              class="payState"
              v-if="item.pay_status===2||item.pay_status===3||item.pay_status===4"
            >物流</div>
            <div class="payState" @click="ifShipments = true" v-if="item.pay_status===1">发货</div>
            <div class="payState" v-if="item.pay_status===2">确认收货</div>
            <div
              class="payState"
              @click="ifOrderPrice = true;changeOrderPriceData=item"
              v-if="item.pay_status===0"
            >订单改价</div>
            <div
              class="payState"
              @click="ifChageAddress = true"
              v-if="item.pay_status===0||item.pay_status===1"
            >修改收货地址</div>
            <div class="payState" @click="ifRefund = true" v-if="item.pay_status===5">退款</div>
          </div>-->
          <div class="table-content-content-div border0 table-content-content-div-change">
            <div class="payState" @click="onToRawMaterialDetail(item.id)">详情</div>
            <div class="payState">物流</div>
            <div
              class="payState"
              @click="ifShipments = true;changeOrderPriceData=item;changeOrderPriceData.price = '';
      changeOrderPriceData.expressno = '';"
            >发货</div>
            <div class="payState">确认收货</div>
            <div class="payState" @click="ifOrderPrice = true;changeOrderPriceData=item">订单改价</div>
            <div class="payState" @click="getAddressList(item)">修改收货地址</div>
            <div class="payState" @click="ifRefund = true">退款</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-content-foot">
        <el-col :span="6">
          <div class="table-content-foot-div" style="text-align: right;">总计:</div>
        </el-col>
        <el-col :span="2">
          <div class="table-content-foot-div">{{item.sum_money}}</div>
        </el-col>
        <el-col :span="16">
          <div class="table-content-foot-div border0">
            <!-- {{item.order_address.address}} -->
          </div>
        </el-col>
      </el-row>
      <el-row class="table-content-foot">
        <el-col :span="24">
          <div
            class="table-content-foot-div border0"
            style="background:rgba(217,242,224,1);color:rgba(60,179,113,1);font-size:16px;"
          >买家留言：{{item.remark}}</div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="订单改价" :visible.sync="ifOrderPrice" width="600px">
      <div class="box">
        <div>
          <el-row class="table-title">
            <el-col :span="12">
              <div class="table-title-div">商品</div>
            </el-col>
            <el-col :span="4">
              <div class="table-title-div">总计</div>
            </el-col>
            <el-col :span="8">
              <div class="table-title-div">订单改价</div>
            </el-col>
          </el-row>
          <div class="table-content" style="margin-top: 0;">
            <el-row class="table-content-content" style="background:#fff" type="flex">
              <el-col :span="12">
                <div class="table-content-content-div">
                  <div
                    class="table-content-content-div-a"
                    v-for="(item,index) in changeOrderPriceData.goods"
                    :key="index"
                    style="padding:10px;box-sizing:border-box;"
                  >
                    <img :src="item.goods_image" style="width:60px;height:60px;" alt />
                    <div style="margin-left:6px;">{{item.goods_name}}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="table-content-content-div">
                  <div>{{changeOrderPriceData.order_amount}}$</div>
                  <div>{{changeOrderPriceData.sum_count}}件</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="table-content-content-div">
                  <input class type="text" v-model="changeOrderPriceData.price" />
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifOrderPrice = false">取 消</el-button>
          <el-button type="primary" @click="onChangeOrderPrice('order_amount')">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="发货" :visible.sync="ifShipments" width="600px">
      <div class="box">
        <div>
          <el-row class="table-title">
            <el-col :span="12">
              <div class="table-title-div">商品</div>
            </el-col>
            <el-col :span="4">
              <div class="table-title-div">总计</div>
            </el-col>
            <el-col :span="8">
              <div class="table-title-div">收货地址</div>
            </el-col>
          </el-row>
          <div class="table-content" style="margin-top: 0;">
            <el-row class="table-content-content" style="background:#fff" type="flex">
              <el-col :span="12">
                <div class="table-content-content-div">
                  <div
                    class="table-content-content-div-a"
                    style="padding:10px;box-sizing:border-box;"
                    v-for="(item,index) in changeOrderPriceData.goods"
                    :key="index"
                  >
                    <img :src="item.goods_image" alt style="width:60px;height:60px;" />
                    <div style="margin-left:6px;">{{item.goods_name}}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="table-content-content-div">
                  <div>{{changeOrderPriceData.order_amount}}$</div>
                  <div>{{changeOrderPriceData.sum_count}}件</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="table-content-content-div">
                  <!-- {{changeOrderPriceData.order_address.address}} -->
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div style="margin-top:20px">
          <input
            style=" width: 276px;height: 40px;margin-left:20px"
            type="text"
            v-model="changeOrderPriceData.expressno"
            placeholder="请输入快递单号"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShipments = false">取 消</el-button>
          <el-button type="primary" @click="onChangeOrderPrice('send_goods')">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="修改地址" :visible.sync="ifChageAddress" width="600px">
      <div class="box">
        <div class="box">
          <div>选择其他地址</div>

          <div class="box-i">
            <div class="box-left">选择地址：</div>
            <el-select v-model="addressId" placeholder="请选择地址">
              <el-option
                v-for="item in addressList"
                :key="item.address_info"
                :label="item.address_info"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div>修改地址</div>
          <div class="box-i">
            <div class="box-left">收货人：</div>
            <input width type="text" v-model="basicInformation.title" placeholder="请输入" />
          </div>
          <div class="box-i">
            <div class="box-left">收货人手机号：</div>
            <input width type="text" v-model="basicInformation.title" placeholder="请输入" />
          </div>
          <div class="box-i">
            <div class="box-left">选择地址：</div>
            <div style="display:flex;">
              <el-select v-model="proviceId" placeholder="选择省" style="width:130px">
                <div v-if="provincesList">
                  <el-option
                    v-for="item in provincesList"
                    :key="item.label"
                    :label="item.label"
                    :value="item.index"
                  ></el-option>
                </div>
              </el-select>
              <el-select v-model="cityId" placeholder="选择市" style="width:130px">
                <div v-if="provincesList[proviceId].children">
                  <el-option
                    v-for="item in provincesList[proviceId].children"
                    :key="item.label"
                    :label="item.label"
                    :value="item.index"
                  ></el-option>
                </div>
              </el-select>
              <el-select v-model="regionId" placeholder="选择区" style="width:130px">
                <div v-if="provincesList[proviceId].children[cityId].children">
                  <el-option
                    v-for="item in provincesList[proviceId].children[cityId].children"
                    :key="item.label"
                    :label="item.label"
                    :value="item.index"
                  ></el-option>
                </div>
              </el-select>
            </div>
          </div>
          <div class="box-i">
            <div class="box-left">详细人地址</div>
            <input width type="number" v-model="basicInformation.weight" placeholder="请输入详细地址" />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChageAddress = false">取 消</el-button>
          <el-button type="primary" @click>确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="修改买家信息" :visible.sync="ifChagneUser" width="600px">
      <div class="box">
        <div class="box-i">
          <div class="box-left" style="width:140px;">买家姓名：</div>
          <input
            width
            type="text"
            style="width:380px;"
            v-model="basicInformation.title"
            placeholder="请输入"
          />
        </div>
        <div class="box-i">
          <div class="box-left" style="width:140px;">买家姓名手机号：</div>
          <input
            width
            type="text"
            style="width:380px;"
            v-model="basicInformation.title"
            placeholder="请输入"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChagneUser = false">取 消</el-button>
          <el-button type="primary" @click>确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="物流" :visible.sync="ifChagneUser" width="600px">
      <div class="box">
        <div>
          <img :src="tishi" style="width:14px;height:15px;" alt /> 当前暂无任何快递信息
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChagneUser = false">取 消</el-button>
          <el-button type="primary" @click>确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="物流" :visible.sync="ifRefund" width="600px">
      <div class="box">
        <div style="margin-left:60px;">买家申请退款金额：12.00元</div>
        <div style="margin-left:60px;">退款金额将优先退还到月，剩余部分将会按您选择的退款方式退还</div>
        <div class="box-i">
          <div class="box-left" style="width:140px;">退款金额：</div>
          <input
            width
            type="text"
            style="width:380px;"
            v-model="basicInformation.title"
            placeholder="请输入"
          />
        </div>
        <div class="box-i">
          <div class="box-left" style="width:140px;">退款方式：</div>
          <el-select v-model="value" placeholder="请选择地址">
            <el-option
              style="width:380px;"
              v-for="item in logisticsCompany"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChagneUser = false">取 消</el-button>
          <el-button type="primary" @click>确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  props: ["tableData"],
  data() {
    return {
      value: "",
      basicInformation: {},
      uplodingImg: require("@/assets/new_images/uplodingImg.png"),
      xie: require("@/assets/new_images/xie.png"),
      tishi: require("@/assets/new_images/tishi.png"),
      ifOrderPrice: false, //订单改价
      changeOrderPriceData: {},
      ifShipments: false, //发货
      logisticsCompany: [
        { name: "韵达", id: 1 },
        { name: "中通", id: 1 }
      ],
      logisticsCompanyTitle: "",
      courierNumber: "", //快递单号
      ifChageAddress: false, //修改地址
      ifChagneUser: false, //修改买家信息
      ifRefund: false, //退款
      addressList: [], //地址列表
      addressId: "",
      provincesList: "", //省市区列表
      proviceId: 0, //当前选中省份index
      cityId: 0, //当前选中市index
      regionId: 0 //当前选中区index
    };
  },
  watch: {
    tableData(news, old) {
      this.tableData = news;
    }
  },
  created() {
    this.getProvincesList();
  },
  methods: {
    onToRawMaterialDetail(id) {
      this.$emit("onToRawMaterialDetail", id);
    },
    //获取地址选择列表
    async getAddressList(item) {
      this.ifChageAddress = true;
      this.basicInformation = item;
      let url = "/admin/screen/";
      let params = {
        type: "user_address",
        uid: this.basicInformation.uid
      };
      let response = await get({ url, params });
      this.addressList = response.address;
    },
    //获取省市区列表
    async getProvincesList() {
      let url = "/admin/citys";
      let params = "";
      let response = await get({ url, params });
      response.map((item, index) => {
        item.index = index;
        item.children.map((childa, index) => {
          childa.index = index;
          childa.children.map((childb, index) => {
            childb.index = index;
          });
        });
      });
      this.provincesList = response;
      console.log(this.provincesList);
    },
    async onChangeOrderPrice(content = "") {
      if (content === "order_amount") {
        if (!this.changeOrderPriceData.price)
          return this.$message("请输入修改金额");
      }
      if (content === "send_goods") {
        if (!this.changeOrderPriceData.expressno)
          return this.$message("请输入订单号");
      }
      let data = {
        edit_type: content,
        order_id: this.changeOrderPriceData.id,
        order_amount: this.changeOrderPriceData.price,
        expressno: this.changeOrderPriceData.expressno
      };
      let url = "/admin/raw_order";
      let respone = await put({ url, data });
      if (respone.msg) return this.$message(respone.msg);
      this.ifOrderPrice = false;
      if (content === "order_amount") {
        this.$message("订单改价成功");
      }
      if (content === "send_goods") {
        this.$message("发货成功");
      }
      this.$emit("onchange");
    }
  }
};
</script>

<style  scoped lang="less">
.el-select {
  width: 240px;
  height: 30px;
  background: rgba(246, 246, 246, 1);
  border: none;
}
input {
  width: 160px;
  height: 30px;
  background: rgba(246, 246, 246, 1);
  border: none;
  padding: 0 8px;
}

.table-title {
  border-bottom: 1px solid #c0c4cc;
}

.table-title-div {
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  border-right: 1px solid #c0c4cc;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
}
.table-content {
  margin-top: 20px;
}

.table-content-title {
  padding: 10px;
  box-sizing: border-box;
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
  color: rgba(51, 51, 51, 0.5);
  font-size: 14px;
}

.table-content-content {
  border-bottom: 1px solid #c0c4cc;
  background: rgba(233, 233, 233, 1);
}

.table-content-content-div {
  padding: 10px !important;
  box-sizing: border-box;
  flex-grow: 1;
  border-right: 1px solid #c0c4cc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 0.5);
  div {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
}

.table-content-content-div:nth-child(1) {
  padding: 0 !important;
}

.table-content-content-div-a {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  // padding: 10px;
  // box-sizing: border-box;
  border-bottom: 1px solid #c0c4cc;
  div {
    img {
      width: 60px;
      height: 60px;
      min-width: 60px;
      min-height: 60px;
    }
    div {
      flex: auto;
      margin-left: 10px;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }
  }
}
.table-content-content-div-a:last-child {
  border-bottom: 0;
}
.table-content-content-div-b {
  border-bottom: 1px solid #c0c4cc;
  width: 100%;
  text-align: center;
}
.table-content-foot {
  background-color: #f6f6f6;
}
.table-content-content-div-b:last-child {
  border-bottom: 0;
}
.table-content-foot-div {
  padding: 15px 10px;
  box-sizing: border-box;
  text-align: left;
  border-right: 1px solid #c0c4cc;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.5);
  font-size: 14px;
}
.table-content-content-div-change {
  padding: 20px !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  div {
    text-align: center;
    color: #ffffff;
  }
}
.dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 30px;
}
.stateStyle {
  width: 60px;
  height: 28px;
  background: rgba(225, 185, 33, 1);
  font-size: 14px;
  color: #ffffff;
  line-height: 28px;
  text-align: center;
  border-radius: 4px;
}
.payState {
  padding: 5px 15px;
  box-sizing: border-box;
  height: 25px;
  background: #3cb371;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  border-radius: 4px;
}
.stateStyle_new {
  width: 60px;
  height: 28px;
  background: #979797;
  font-size: 14px;
  color: #ffffff;
  line-height: 28px;
  text-align: center;
  color: rgba(51, 51, 51, 0.5);
  border-radius: 4px;
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
      width: 100px;
      text-align: right;
      padding-right: 10px;
      box-sizing: border-box;
    }
    .box--right {
      margin-left: 10px;
    }
    input {
      width: 410px;
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
      width: 410px;
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
.border0 {
  border-right: 0;
}
.padding0 {
  padding: 0 !important;
}
</style>
