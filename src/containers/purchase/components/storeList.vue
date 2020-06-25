<template>
  <div class="purchaseSlideshow">
    <div class="purchaseSlideshow-top">
      <div class="purchaseSlideshow-top-tit">店铺列表</div>
      <div class="purchaseSlideshow-top-con">
        <div class="purchaseSlideshow-top-con-left">
          <div class="purchaseSlideshow-top-con-i">
            审核状态：
            <el-select v-model="statysDataId" placeholder="请选择">
              <el-option
                v-for="item in statysData"
                :key="item.title"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="purchaseSlideshow-top-con-i">
            省份筛选：
            <el-select v-if="provincesList" v-model="provinceId" placeholder="请选择">
              <el-option
                v-for="item in provincesList"
                :key="item.label"
                :label="item.label"
                :value="item.index"
              ></el-option>
            </el-select>
          </div>
          <div class="purchaseSlideshow-top-con-i">
            城市筛选：
            <div v-if="provincesList[provinceId]">
              <el-select v-model="cityId" placeholder="请选择">
                <el-option
                  v-for="item in provincesList[provinceId].children||[]"
                  :key="item.label"
                  :label="item.label"
                  :value="item.index"
                ></el-option>
              </el-select>
            </div>
            <el-select v-else placeholder="请选择" v-model="cityId">
              <el-option v-for="item in city" :key="item.label" :label="item.label" value="0"></el-option>
            </el-select>
          </div>
          <div class="purchaseSlideshow-top-con-i">
            地区筛选：
            <div v-if="provincesList[provinceId]&&provincesList[provinceId].children[cityId]">
              <el-select v-model="areaId" placeholder="请选择">
                <el-option
                  v-for="item in provincesList[provinceId].children[cityId].children"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <el-select v-else v-model="areaId" placeholder="请选择">
              <el-option v-for="item in area" :key="item.label" :label="item.label" value="0"></el-option>
            </el-select>
          </div>
          <div class="purchaseSlideshow-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button style="margin-left:40px" type="primary" class="el-button" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </div>
    </div>
    <div class="purchaseSlideshow-bot">
      <!-- <div class="purchaseSlideshow-bot-top">
        <div class="purchaseSlideshow-bot-top-i" @click="onChangeImg">
          <i class="el-icon-plus"></i>
          <span>新增轮播图</span>
        </div>
        <div class="purchaseSlideshow-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>
      </div>-->
      <div class="purchaseSlideshow-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" prop="store_name" label="店铺名称" min-width="120"></el-table-column>
          <el-table-column align="center" prop="title" label="申请人信息" min-width="120">
            <div slot-scope="solt">
              <div>{{solt.row.user_name}}</div>
              <div>{{solt.row.phone}}</div>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="id_card" label="身份证号" min-width="120"></el-table-column>
          <el-table-column align="center" prop="address" label="店铺地址" min-width="150"></el-table-column>
          <el-table-column align="center" prop="bus_time" label="营业时间" min-width="120"></el-table-column>
          <el-table-column align="center" prop="name" label="营业执照" min-width="180">
            <!-- <img
              slot-scope="scope"
              style="width:100px;height:40px;border-radius:4px;"
              :src="scope.row.bus_license"
              alt
            />-->
            <div slot-scope="scope">
              <el-popover placement="top-start" title trigger="click">
                <img :src="scope.row.bus_license" alt style="width: 380px;height: 380px" />
                <div slot="reference">
                  <img style="width:100px;height:40px;" :src="scope.row.bus_license" />
                </div>
              </el-popover>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="name" label="店铺门脸图" min-width="150">
            <div slot-scope="scope">
              <el-popover placement="top-start" title trigger="click">
                <img :src="scope.row.storeImg" alt style="width: 380px;height: 380px" />
                <div slot="reference">
                  <img style="width:100px;height:40px;" :src="scope.row.storeImg" />
                </div>
              </el-popover>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="title" label="审核状态" min-width="130">
            <div style="width:100%" slot-scope="solt">
              <div v-if="!solt.row.check_status">未审核</div>
              <div v-if="solt.row.check_status===1" style="margin:0 auto;" class="tongyi">同意入驻</div>
              <div style="width:100%" v-if="solt.row.check_status===2">
                <div class="tongyi" style="background:#FB6534;margin:0 auto;">拒绝入驻</div>
                <div style="matgin:0 auto">(拒绝原因：{{solt.row.reason}})</div>
              </div>
            </div>
          </el-table-column>
          <el-table-column align="center" prop="address" label="操作" min-width="160" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.check_status===0">
                <span
                  @click="edit_type='check_agree';stopId=scope.row.id;ifTongguo=true"
                  style="color:#3CB371"
                >同意</span>
                <span
                  @click="ifChangeGoods=true;stopId=scope.row.id;edit_type='check_refuse'"
                  style="color:#FB6534"
                >拒绝</span>
              </div>
              <div v-else style="color:#999999">已审核</div>
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
            :total="10"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="审核拒绝"  class="abow_dialog" :visible.sync="ifChangeGoods" width="900px" :before-close="handleClose">
      <div class="box">
        <div class="box-i">
          <div class="box-left">拒绝原因：</div>
          <textarea
            style="width:500px;height:100px"
            type="text"
            v-model="reason"
            placeholder="请输入拒绝原因"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifChangeGoods = false;stopId=''">取 消</el-button>
        <el-button style="margin-left:40px" type="primary" @click="onToChange">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="通过审核"  class="abow_dialog" :visible.sync="ifTongguo" width="500px" :before-close="handleClose">
      <div class="box">确认通过该店铺入驻</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifTongguo = false;stopId=''">取 消</el-button>
        <el-button style="margin-left:40px" type="primary" @click="onToChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import { localSave, localRead } from "@/lib/local.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: "",
      statysData: [
        { title: "未审核", id: 0 },
        { title: "审核通过", id: 1 },
        { title: "审核失败", id: 2 }
      ], //审核状态列表
      statysDataId: "",
      ifChangeGoods: false,
      page: 1,
      limit: 10,
      keyword: "",
      type: "",
      provincesList: "",
      province: [], //省份列表
      city: [], //城市列表
      area: [], //区域列表
      provinceId: "",
      cityId: "",
      areaId: "",
      edit_type: "",
      ifTongguo: false,
      stopId: "",
      reason: ""
    };
  },
  created() {
    this.getTableData();
    if (localRead("provincesList")) {
      this.provincesList = JSON.parse(localRead("provincesList"));
      this.provincesList.map((item, index) => {
        if (item.children.length > 0) {
          item.index = index;
          item.children.map((cityA, index) => {
            if (cityA.children.length > 0) {
              cityA.index = index;
            } else {
              cityA.children = [{ label: "暂无区", index: 0 }];
            }
          });
        } else {
          item.children = [{ label: "暂无市", index: 0 }];
        }
      });
      return;
    }
    this.getProvincesList();
  },
  methods: {
    handleClose() {
      this.ifChangeGoods = false;
      this.ifTongguo = false;
    },
    async onToChange() {
      if (this.edit_type === "check_refuse") {
        if (!this.reason) return this.$message("请输入拒绝愿意");
      }
      let data = {
        id: this.stopId,
        edit_type: this.edit_type,
        reason: this.reason
      };
      let url = "/admin/shop";
      let response = await put({ url, data });
      this.ifTongguo = false;
      this.ifChangeGoods = false;
      if (response.msg) return this.$message(response.msg);
      this.$message("操作成功");
      this.getTableData();
    },
    async getTableData() {
      let url = "/admin/shop";
      let province = "";
      if (this.provincesList[this.provinceId]) {
        console.log("111111111111");
        province = this.provincesList[this.provinceId].value;
      }
      // let province = this.provincesList[this.provinceId]
      //   ? this.provincesList[this.provinceId].value
      //   : "";
      let city = "";
      if (
        this.provincesList[this.provinceId] &&
        this.provincesList[this.provinceId].children[this.cityId]
      ) {
        console.log("222222222222");
        city = this.provincesList[this.provinceId].children[this.cityId].value;
      }
      // let city =
      //   this.provincesList[this.provinceId] &&
      //   this.provincesList[this.provinceId].children[this.cityId]
      //     ? this.provincesList[this.provinceId].children[this.cityId].value
      //     : "";
      let params = {
        page: this.page,
        limit: this.limit,
        keyword: this.keyword,
        check_status: this.statysDataId,
        province,
        city,
        area: this.areaId
      };
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.tableData = response;
    },
    //获取省市区列表
    async getProvincesList() {
      let url = "/admin/citys";
      let params = "";
      let response = await get({ url, params });
      localSave("provincesList", JSON.stringify(response));
      this.provincesList = JSON.stringify(response);
      this.provincesList.map((item, index) => {
        if (item.children.length > 0) {
          console.log(item.label, "有下级市");
          item.index = index;
          item.children.map((cityA, index) => {
            if (cityA.children.length > 0) {
              console.log(cityA.label, "有下级区");
              cityA.index = index;
            } else {
              cityA.children = [{ label: "暂无区", index: 0 }];
              console.log(cityA.label, "无下级区");
            }
          });
        } else {
          item.children = [{ label: "暂无市", index: 0 }];
          console.log(item.label, "无下级市");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-button {
  height: 40px;
}
.purchaseSlideshow {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  .purchaseSlideshow-top {
    border-radius: 4px;
    width: 100%;
    // height: 120px;
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
      align-items: center;
      .purchaseSlideshow-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
        .purchaseSlideshow-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
          margin-top: 8px;
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
        cursor: pointer;
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
  .tongyi {
    width: 76px;
    height: 25px;
    background: rgba(60, 179, 113, 1);
    color: #ffffff;
    font-size: 14px;
  }
}
</style>
