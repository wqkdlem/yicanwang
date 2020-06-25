<template>
  <div>
    <el-row class="table-title">
      <el-col :span="6">
        <div class="table-title-div">商品</div>
      </el-col>
      <el-col :span="2">
        <div class="table-title-div">小计</div>
      </el-col>
      <el-col :span="2">
        <div class="table-title-div">买家</div>
      </el-col>
      <el-col :span="3">
        <div class="table-title-div">快递信息</div>
      </el-col>
      <el-col :span="2">
        <div class="table-title-div">加工费</div>
      </el-col>
      <el-col :span="3">
        <div class="table-title-div">价格/支付</div>
      </el-col>
      <el-col :span="2">
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
                  <div style="color:#333333;;margin-left:10px;">{{good.goods_name}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="table-content-foot-div border0">
                  <div style="padding:0;">{{good.totalPrice}}</div>
                  <div style="padding:0;">{{Math.round(good.goods_num)}}件</div>
                </div>
              </el-col>
              <!-- </el-row> -->
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="table-content-content-div">
            <div style="color:#333333">{{item.user.username}}</div>
            <div>{{item.user.telphone}}</div>
            <!-- <img :src="xie" @click="ifChagneUser=true" style="width:13px;height:14px;" alt /> -->
          </div>
        </el-col>
        <el-col :span="3">
          <div class="table-content-content-div">
            <div>{{item.express_company}}</div>
            <div>单号：{{item.expressno}}</div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="table-content-content-div">
            <div>{{item.working_price}}</div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="table-content-content-div">
            <div>{{item.order_amount}}</div>
            <!-- <div class="payState">取消支付</div> -->
          </div>
        </el-col>
        <el-col :span="2">
          <div class="table-content-content-div">{{item.create_time}}</div>
        </el-col>
        <el-col :span="4">
          <div class="table-content-content-div border0 table-content-content-div-change">
            <div class="payState" @click="onToRawMaterialDetail(item.id)">详情</div>
            <div
              class="payState"
              v-if="item.order_state===2||item.order_state===3||item.order_state===4"
              @click="getLogistics(item)"
            >物流</div>
            <div
              class="payState"
              @click="ifShipments = true;changeOrderPriceData=item;changeOrderPriceData.price = '';
      changeOrderPriceData.expressno = ''"
              v-if="item.order_state===1"
            >发货</div>
            <div
              class="payState"
              @click="onChangeOrderPrice('confirm_receipt',item)"
              v-if="item.order_state===2"
            >确认收货</div>
            <div
              class="payState"
              @click="ifOrderPrice = true;changeOrderPriceData=item"
              v-if="item.order_state===0"
            >订单改价</div>
            <div
              class="payState"
              @click="getAddressList(item)"
              v-if="item.order_state===0||item.order_state===1"
            >修改收货地址</div>
            <!-- <div class="payState" @click="ifRefund = true" v-if="item.order_state===5">退款</div> -->
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
    <el-dialog title="订单改价" class="abow_dialog" :visible.sync="ifOrderPrice" width="900px">
      <div class="box">
        <div class="shipments">
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
          <el-button
            style="margin-left:40px"
            type="primary"
            @click="onChangeOrderPrice('order_amount')"
          >确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="发货" class="abow_dialog" :visible.sync="ifShipments" width="900px">
      <div class="box">
        <div class="shipments">
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
        <div class="box-left" style="margin-top:20px">选择地址：</div>
        <div style="display:flex;aline-item:center;margin-top:8px">
          <el-select
            v-model="changeOrderPriceData.express_company"
            filterable
            placeholder="请选择物流公司"
          >
            <el-option
              v-for="item in companyList"
              :key="item.company"
              :label="item.company"
              :value="item.id"
            ></el-option>
          </el-select>
          <input
            style=" width: 243px;height: 40px;margin-left:20px"
            type="text"
            v-model="changeOrderPriceData.expressno"
            placeholder="请输入快递单号"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShipments = false">取 消</el-button>
          <el-button
            style="margin-left:40px"
            type="primary"
            @click="onChangeOrderPrice('send_goods')"
          >确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="修改地址" class="abow_dialog" :visible.sync="ifChageAddress" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left">修改地址：</div>

          <div class="box-right">
            <el-radio v-model="changeOrderPriceData.address_type" :label="1">选择其他地址</el-radio>
            <el-radio v-model="changeOrderPriceData.address_type" :label="2">修改当前地址</el-radio>
          </div>
        </div>
        <div class="box">
          <div v-if="changeOrderPriceData.address_type==1">
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
          </div>
          <div v-if="changeOrderPriceData.address_type==2">
            <div class="box-i">
              <div class="box-left">收货人：</div>
              <input
                width
                type="text"
                v-model="changeOrderPriceData.order_address.username"
                placeholder="请输入收货人名称"
              />
            </div>
            <div class="box-i">
              <div class="box-left">收货人手机号：</div>
              <input
                width
                type="text"
                v-model="changeOrderPriceData.order_address.telphone"
                placeholder="请输入收货人手机号"
              />
            </div>
            <div class="box-i">
              <div class="box-left">选择省市区：</div>
              <div style="display:flex;">
                <el-cascader
                  style="width:680px;margin-left:10px;"
                  :options="provincesList"
                  v-model="changeOrderPriceData.order_address.city_id"
                ></el-cascader>
              </div>
            </div>
            <div class="box-i">
              <div class="box-left">详细人地址：</div>
              <input
                width
                type="text"
                v-model="changeOrderPriceData.order_address.address_short"
                placeholder="请输入详细地址"
              />
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChageAddress = false">取 消</el-button>
          <el-button
            style="margin-left:40px"
            type="primary"
            @click="onChangeOrderPrice('edit_address')"
          >确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="修改买家信息" class="abow_dialog" :visible.sync="ifChagneUser" width="900px">
      <div class="box">
        <div class="box-i">
          <div class="box-left" style="width:140px;">买家姓名：</div>
          <input
            width
            type="text"
            style="width:680px;"
            v-model="changeOrderPriceData.title"
            placeholder="请输入"
          />
        </div>
        <div class="box-i">
          <div class="box-left" style="width:140px;">买家姓名手机号：</div>
          <input
            width
            type="text"
            style="width:680px;"
            v-model="changeOrderPriceData.title"
            placeholder="请输入"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChagneUser = false">取 消</el-button>
          <el-button style="margin-left:40px" type="primary" @click>确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="物流" class="abow_dialog" :visible.sync="ifLogistics" width="900px">
      <div class="box">
        <div>
          <div v-if="logisticsInformation">
            <logistics :logisticsInformation="logisticsInformation"></logistics>
          </div>
          <div v-else>暂无物流信息!</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifLogistics = false">取 消</el-button>
          <el-button style="margin-left:40px" type="primary" @click="ifLogistics = false">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- <el-dialog title="物流"  class="abow_dialog" :visible.sync="ifRefund" width="900px">
      <div class="box">
        <div style="margin-left:60px;">买家申请退款金额：12.00元</div>
        <div style="margin-left:60px;">退款金额将优先退还到月，剩余部分将会按您选择的退款方式退还</div>
        <div class="box-i">
          <div class="box-left" style="width:140px;">退款金额：</div>
          <input
            width
            type="text"
            style="width:680px;"
            v-model="changeOrderPriceData.title"
            placeholder="请输入"
          />
        </div>
        <div class="box-i">
          <div class="box-left" style="width:140px;">退款方式：</div>
          <el-select v-model="value" placeholder="请选择地址">
            <el-option
              style="width:680px;"
              v-for="item in logisticsCompany"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifChagneUser = false">取 消</el-button>
          <el-button style="margin-left:40px" type="primary" @click>确 定</el-button>
        </span>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import { localSave, localRead } from "@/lib/local.js";
export default {
  props: ["tableData"],
  data() {
    return {
      value: "",
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
      regionId: 0, //当前选中区index
      logisticsInformation: "", //物流信息
      ifLogistics: false, //物流
      companyList: "" //物流公司列表
    };
  },
  watch: {
    tableData(news, old) {
      this.tableData = news;
    }
  },
  created() {
    this.getCompanyList();
    if (localRead("provincesList"))
      return (this.provincesList = JSON.parse(localRead("provincesList")));
    this.getProvincesList();
  },
  methods: {
    onToRawMaterialDetail(id) {
      let data = {
        id: id
      };
      this.$router.push({ path: "/soupBasesDetail", query: data });
    },
    //获取地址选择列表
    async getAddressList(item) {
      this.ifChageAddress = true;
      this.changeOrderPriceData = item;
      this.addressId = this.changeOrderPriceData.id;
      let url = "/admin/screen/";
      let params = {
        type: "user_address",
        uid: this.changeOrderPriceData.uid
      };
      let response = await get({ url, params });
      this.addressList = response.address;
    },
    //获取省市区列表
    async getProvincesList() {
      let url = "/admin/citys";
      let params = "";
      let response = await get({ url, params });
      this.provincesList = JSON.stringify(response);
      localSave("provincesList", this.provincesList);
    },
    //获取物流信息
    async getLogistics(item) {
      this.ifLogistics = true;
      this.changeOrderPriceData = item;
      let url = "/admin/logistics";
      let params = {
        order_id: this.changeOrderPriceData.id
      };
      let response = await get({ url, params });
      console.log(response);
      this.logisticsInformation = response;
      console.log(this.basicInformation, "物流信息");
    },
    //获取物流公司列表
    async getCompanyList() {
      let url = "/admin/express_company";
      let params = "";
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.companyList = response;
    },
    async onChangeOrderPrice(content = "", item = "") {
      if (item) {
        this.changeOrderPriceData = item;
      }
      if (content === "order_amount") {
        if (!this.changeOrderPriceData.price)
          return this.$message("请输入修改金额");
      }
      if (content === "send_goods") {
        if (!this.changeOrderPriceData.express_company)
          return this.$message("请输入快递名称");
        if (!this.changeOrderPriceData.expressno)
          return this.$message("请输入快递编号");
      }
      if (content === "edit_address") {
        if (!this.changeOrderPriceData.address_type)
          return tiis.$message("请先选择修改方式");

        if (this.changeOrderPriceData.address_type == 1) {
          if (!this.addressId) return this.$message("请选择修改地址");
        }
        if (this.changeOrderPriceData.address_type == 2) {
          if (!this.changeOrderPriceData.order_address.username)
            return this.$message("请输入收货人名称");
          if (!this.changeOrderPriceData.order_address.telphone)
            return this.$message("请输入收货人手机号");
          if (!this.changeOrderPriceData.order_address.city_id)
            return this.$message("请选择省市区");
          if (!this.changeOrderPriceData.order_address.address_short)
            return this.$message("请输入详细地址");
        }
      }

      let data = {
        edit_type: content,
        order_id: this.changeOrderPriceData.id,
        order_amount: this.changeOrderPriceData.price,
        expressno: this.changeOrderPriceData.expressno,
        express_company: this.changeOrderPriceData.express_company,
        address_type: this.changeOrderPriceData.address_type,
        address_id: this.addressId,
        username: this.changeOrderPriceData.order_address.username,
        telphone: this.changeOrderPriceData.order_address.telphone,
        address: this.changeOrderPriceData.order_address.address_short,
        provinceid: this.addressId[0],
        cityid: this.addressId[1] || this.addressId[0],
        areaid: this.addressId[2] || this.addressId[0]
      };
      let url = "/admin/soup_order";
      let response = await put({ url, data });
      if (response.msg) return this.$message(response.msg);
      this.ifOrderPrice = false;
      this.$emit("onchange");
      if (content === "order_amount") return this.$message("订单改价成功");
      if (content === "send_goods") return this.$message("发货成功");
      if (content === "confirm_receipt") return this.$message("收货成功");
      this.ifChageAddress = false;
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
  .el-col {
    height: 100%;
  }
}

.table-title-div {
  text-align: center;
  padding: 10px 5px;
  box-sizing: border-box;
  border-right: 1px solid #c0c4cc;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  height: 100%;
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
  border-top: 1px solid #c0c4cc;
  background: #f6f6f6;
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
  div:nth-child(1) {
    height: 100%;
  }
  div {
    img {
      width: 60px;
      height: 60px;
      min-width: 60px;
      min-height: 60px;
    }
    div {
      flex: auto;
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
  div {
    text-align: center;
  }
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
      width: 130px;
      text-align: right;
      padding-right: 10px;
      box-sizing: border-box;
    }
    .box--right {
      margin-left: 10px;
    }
    input {
      width: 680px;
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
      width: 680px;
      height: 40px;
      margin-left: 10px;

      .el-input__inner {
        background-color: #f1f1f1;
      }
    }
  }
  .shipments {
    border: 1px solid #c0c4cc;
    border-right: 0;
    border-bottom: 0;
    .table-content-content {
      border-top: 0;
      border-bottom: 0;
      .table-content-content-div {
        border-right: 1px solid #c0c4cc;
        border-bottom: 1px solid #c0c4cc;
        border-top: 0;
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
