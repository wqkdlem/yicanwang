<template>
  <div class="userList">
    <div class="userList-top">
      <div class="userList-top-tit">
        用户列表
        <span style="color:#3CB371"></span>
      </div>
      <div class="userList-top-con">
        <div class="userList-top-con-left">
          <div class="userList-top-con-i">
            用户等级：
            <el-select v-model="levelId" placeholder="请选择">
              <el-option
                v-for="item in memberList.level"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="userList-top-con-i">
            是否VIP：
            <el-select v-model="isVipId" placeholder="请选择">
              <el-option
                v-for="item in memberList.is_vip"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="userList-top-con-i">
            标签筛选：
            <el-select v-model="labelId" placeholder="请选择">
              <el-option
                v-for="item in memberList.label"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="userList-top-con-i">
            注册时间：
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="userList-top-con-i">
            关键字：
            <el-input style="width:230px;" v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>
        <el-button
          type="primary"
          style="height:40px"
          class="el-button"
          icon="el-icon-search"
          @click="getTableData"
        >搜索</el-button>
      </div>
    </div>
    <div class="userList-bot">
      <div class="userList-bot-top">
        <!-- <div class="userList-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>新增用户</span>
        </div>-->
        <div class="userList-bot-top-r">
          <div class="userList-bot-top-r-w">
            Id：
            <div>
              <img @click="changeId(1)" :src="id===1?onUp:up" alt />
              <img style="margin-top:5px" @click="changeId(2)" :src="id==2?onDown:down" alt />
            </div>
          </div>
          <div class="userList-bot-top-r-w">
            注册时间：
            <div>
              <img @click="changeCreatetime(1)" :src="createtime===1?onUp:up" alt />
              <img
                style="margin-top:5px"
                @click="changeCreatetime(2)"
                :src="createtime==2?onDown:down"
                alt
              />
            </div>
          </div>
          <div class="userList-bot-top-r-w">
            积分：
            <div>
              <img @click="changeBalance(1)" :src="balance===1?onUp:up" alt />
              <img
                style="margin-top:5px"
                @click="changeBalance(2)"
                :src="balance==2?onDown:down"
                alt
              />
            </div>
          </div>
          <div class="userList-bot-top-r-w">
            余额：
            <div>
              <img @click="changeIntegral(1)" :src="integral===1?onUp:up" alt />
              <img
                style="margin-top:5px"
                @click="changeIntegral(2)"
                :src="integral==2?onDown:down"
                alt
              />
            </div>
          </div>
        </div>
      </div>
      <div class="userList-bot-bot">
        <div class="userList-bot-bot-i" v-for="(item,index) in tableData.data" :key="index">
          <div class="userList-bot-bot-i-top">
            <div class="userList-bot-bot-i-top-lef">id：{{item.id}}</div>
            <!-- <el-select v-model="value" placeholder="请选择" class="userList-bot-bot-i-top-rig">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
            <!-- onChangeLabelId= -->
            <div
              class="userList-bot-bot-i-top-rig"
              @click="dialogVisible=true;userId=item.id;modelTitle='修改用户标签';onChangeLabelId=item.label"
            >{{item.label||'修改用户标签'}}</div>
          </div>
          <img class="userList-bot-bot-i-img" :src="item.headImg" alt />
          <div class="userList-bot-bot-i-imga" v-if="item.level&&item.level.level_id">
            <img v-if="item.level.level_id===3" :src="vip1" alt />
            <img v-if="item.level.level_id===2" :src="vip2" alt />
            <img v-if="item.level.level_id===1" :src="vip3" alt />
            {{item.level.level_name}}
          </div>

          <div
            class="userList-bot-bot-i-cenb"
            @click="dialogVisible=true;userId=item.id;modelTitle='调整等级';onChangeLevelId=item.level.level_id"
          >
            <span>调整等级</span>
          </div>
          <div class="userList-bot-bot-i-cena">{{item.nickname}}</div>

          <div class="userList-bot-bot-i-cenc">
            <img src alt />
            <span>{{item.mobilePhone}}</span>
          </div>
          <div class="userList-bot-bot-i-cend">
            <div class="userList-bot-bot-i-cend-i">
              <img :src="jifen" alt />
              <div>{{item.integral}}</div>
            </div>
            <div class="userList-bot-bot-i-cend-i">
              <img :src="yue" alt />
              <div>{{item.balance}}</div>
            </div>
          </div>
          <div class="userList-bot-bot-i-cene">
            <div>
              <span style="font-size:14px">¥</span> 9999
            </div>
            <p>均周</p>
            <span>交易金额</span>
          </div>
          <div class="userList-bot-bot-i-cend userList-bot-bot-i-cenf">
            <div class="userList-bot-bot-i-cend-i">
              <img :src="dingdanIcon" alt />
              <div>订单列表</div>
            </div>
            <div class="userList-bot-bot-i-cend-i" @click="onToUserDetail(item)">
              <img :src="yonghu" alt />
              <div>用户详情</div>
            </div>
          </div>
          <div class="userList-bot-bot-i-ceng">
            <div class="userList-bot-bot-i-ceng-ia">发优惠劵</div>
            <div class="userList-bot-bot-i-ceng-ib">{{item.createtime}}</div>
          </div>
          <!-- <div class="userList-bot-bot-i"></div> -->
        </div>
      </div>
    </div>
    <el-dialog :title="modelTitle" :visible.sync="dialogVisible" width="500px">
      <div class="box" v-if="modelTitle=='修改用户标签'">
        <div
          class="box-i"
          :class="onChangeLabelId==item.name?'box-ia':''"
          v-for="(item,index) in tableData.label"
          :key="index"
          @click="onChangeLabelId=item.name;"
        >{{item.name}}</div>
      </div>
      <div class="box" v-if="modelTitle=='调整等级'">
        <div
          class="box-i"
          :class="onChangeLevelId==item.id?'box-ia':''"
          v-for="(item,index) in tableData.level"
          :key="index"
          @click="onChangeLevelId=item.id;"
        >{{item.name}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onChangeLabel">确 定</el-button>
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
      date: "",
      value: "",
      levelId: "",
      isVipId: "",
      labelId: "",
      memberList: {},
      page: 1,
      limit: 10,
      onUp: require("@/assets/new_images/onUp.png"),
      onDown: require("@/assets/new_images/onDown.png"),
      up: require("@/assets/new_images/up.png"),
      down: require("@/assets/new_images/down.png"),
      yue: require("@/assets/new_images/yue.png"),
      dingdanIcon: require("@/assets/new_images/dingdanIcon.png"),
      yonghu: require("@/assets/new_images/yonghu.png"),
      jifen: require("@/assets/new_images/jifen.png"),
      vip1: require("@/assets/new_images/vip1.png"),
      vip2: require("@/assets/new_images/vip2.png"),
      vip3: require("@/assets/new_images/vip3.png"),
      id: "",
      createtime: "",
      balance: "",
      integral: "",
      keyword: "",
      tableData: {},
      dialogVisible: false,
      userId: "",
      modelTitle: "修改用户等级",
      onChangeLevelId: "",
      onChangeLabelId: ""
    };
  },
  created() {
    this.initGetTableData();
    this.getTableData();
  },
  methods: {
    changeId(id) {
      this.id = id;
      this.createtime = "";
      this.balance = "";
      this.integral = "";
      this.getTableData();
    },
    changeCreatetime(data) {
      this.id = "";
      this.createtime = data;
      this.balance = "";
      this.integral = "";
      this.getTableData();
    },
    changeBalance(data) {
      this.id = "";
      this.createtime = "";
      this.balance = data;
      this.integral = "";
      this.getTableData();
    },
    changeIntegral(data) {
      this.id = "";
      this.createtime = "";
      this.balance = "";
      this.integral = data;
      this.getTableData();
    },
    //获取用户列表数据
    async getTableData() {
      let url = "/admin/member";
      let params = {
        page: this.page,
        limit: this.limit,
        keyword: this.keyword,
        id: this.id,
        createtime: this.createtime,
        balance: this.balance,
        integral: this.integral,
        level: this.levelId,
        label: this.labelId,
        is_vip: this.isVipId,
        start_time: this.date[0] || "",
        end_time: this.date[1] || ""
      };
      let response = await get({ url, params });
      this.tableData = response;
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
    //获取初始化选择列表
    async initGetTableData() {
      let url = "/admin/screen/";
      let params = {
        type: "member"
      };
      let response = await get({ url, params });
      console.log(response);
      this.memberList = response;
      console.log(this.memberList, "初始化所需所有列表");
    },
    //修改状态
    onChangeLabel() {
      this.dialogVisible = false;
      let data = {};
      if (this.modelTitle == "修改用户标签") {
        data = {
          id: this.userId,
          label: this.onChangeLabelId
        };
      }
      if (this.modelTitle == "调整等级") {
        data = {
          id: this.userId,
          userlevel: this.onChangeLevelId
        };
      }
      this.changeContent(data);
    },
    async changeContent(data) {
      let url = "/admin/member/";
      let response = await put({ url, data });
      console.log(response.msg);
      if (response.msg) return this.$message(response.msg);
      this.getTableData();
      this.$message("修改成功");
    },
    onToUserDetail(data) {
      console.log(data);
      this.$router.push({ path: "/userListDetail", query: data });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" stylus>
.userList {
  display: flex;
  height: 100%;
  flex-direction: column;
  .userList-top {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .userList-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .userList-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .userList-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
        .userList-top-con-i {
          margin-right: 60px;
          height: 50px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .userList-bot {
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    // background-color: #fff;
    flex: auto;
    text-align: left;
    display: flex;

    flex-direction: column;
    .userList-bot-top {
      display: flex;
      justify-content: flex-end;
      .userList-bot-top-i {
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
      .userList-bot-top-r {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        font-weight: 500;

        .userList-bot-top-r-w {
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
    .userList-bot-bot {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: start;
      flex-wrap: wrap;
      .userList-bot-bot-i {
        width: 340px;
        background-color: #fff;
        margin-top: 20px;
        padding: 20px 0;
        box-sizing: border-box;
        margin-right: 20px;
        .userList-bot-bot-i-top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 20px;
          align-items: center;
          .userList-bot-bot-i-top-lef {
            font-size: 12px;
            color: #999999;
          }
          .userList-bot-bot-i-top-rig {
            font-size: 12px;
            color: #3cb371;
            //   width: 110px;

            //   .el-input__inner {
            //     height: 30px;
            //     font-size: 12px;
            //   }
          }
          .el-select {
            width: 110px;
            height: 30px;
            font-size: 12px;
          }
          .el-select .el-input__inner {
            width: 110px;
            height: 30px;
            font-size: 12px;
          }
        }
        .userList-bot-bot-i-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 1px solid gray;
          display: block;
          margin: 0 auto;
        }
        .userList-bot-bot-i-imga {
          width: 100px;
          height: 27px;
          display: block;
          margin: -20px auto;
          position: relative;
          z-index: 999;
          text-align: center;
          line-height: 27px;
          color: #fff;
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
          }
        }
        .userList-bot-bot-i-cena {
          font-size: 16px;
          color: #333333;
          margin-top: 25px;
          text-align: center;
        }
        .userList-bot-bot-i-cenb {
          color: #999999;
          font-size: 12px;
          text-align: center;
          margin-top: 25px;
          span {
            color: #3cb371;
            padding-left: 10px;
            box-sizing: border-box;
          }
        }
        .userList-bot-bot-i-cenc {
          width: 185px;
          height: 32px;
          background: rgba(242, 242, 242, 1);
          border-radius: 16px;
          margin: 5px auto;
          font-size: 16px;
          color: #333333;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          img {
            width: 14px;
            height: 14px;
          }
          span {
            padding-left: 10px;
            box-sizing: border-box;
          }
        }
        .userList-bot-bot-i-cend {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-top: 10px;

          .userList-bot-bot-i-cend-i {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
              width: 20px;
              height: 20px;
            }
            div {
              color: #999999;
              font-size: 14px;
            }
          }
        }
        .userList-bot-bot-i-cene {
          width: 100%;
          padding: 20px 0;
          text-align: center;
          background-color: #fcfcfc;
          margin-top: 10px;
          div {
            color: #e65959;
            font-size: 24px;
            text-align: center;
          }
          p {
            font-size: 12px;
            color: #999999;
          }
          span {
            color: #999999;
            font-size: 16px;
          }
        }
        .userList-bot-bot-i-cenf {
          .userList-bot-bot-i-cend-i {
            flex-direction: row;
            div {
              color: #333333;
              font-size: 16px;
              margin-left: 4px;
            }
          }
        }
        .userList-bot-bot-i-ceng {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          padding: 0 20px;
          block-size: border-box;
          .userList-bot-bot-i-ceng-ia {
            font-size: 16px;
            color: #3cb371;
          }
          .userList-bot-bot-i-ceng-ib {
            font-size: 14px;
            color: #999999;
          }
        }
      }
    }
  }
  .box {
    .box-i {
      width: 100%;
      height: 35px;
      background: rgba(242, 242, 242, 1);
      color: rgba(51, 51, 51, 0.5);
      font-size: 14px;
      margin-top: 10px;
      line-height: 35px;
    }
    .box-ia {
      background: #3cb371;
      color: #ffffff;
    }
  }
}
</style>
