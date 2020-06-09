<template>
  <div class="userListDetail">
    <div class="userListDetail-top">
      <div class="userListDetail-top-tit">用户操作</div>
      <div class="userListDetail-top-con" @click="onShowUserList">返回</div>
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
              <div class="userListDetail-bot-rig-i-left">用户名</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.username}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">真实姓名</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.realname}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">手机号</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.mobilePhone}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">等级</div>
              <div
                class="userListDetail-bot-rig-i-right"
              >{{basicInformation.level&&basicInformation.level.level_name?basicInformation.level.level_name:''}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">头像</div>
              <img style="border:1px solid red;" :src="basicInformation.headImg" alt />
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">余额</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.balance}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">积分</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.integral}}</div>
            </div>
            <!-- <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">最后登录时间</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.integral}}</div>
            </div>
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">最后登录ip</div>
              <div class="userListDetail-bot-rig-i-right">{{basicInformation.integral}}</div>
            </div>-->
            <div class="userListDetail-bot-rig-i">
              <div class="userListDetail-bot-rig-i-left">是否可用</div>
              <div class="userListDetail-bot-rig-i-right">
                <el-radio v-model="basicInformation.status" :label="1">是</el-radio>
                <el-radio v-model="basicInformation.status" :label="2">否</el-radio>
              </div>
            </div>
          </div>
          <div v-if="navLeftId===1">
            <div class="submit" @click="changeContent">提交</div>
          </div>
          <div v-if="navLeftId==2">
            <el-table :data="addressList" border :height="500" style="width: 100%;">
              <el-table-column align="center" prop="date" label="收货人">
                <div slot-scope="slot">
                  <div>{{slot.row.username}}</div>
                  <div v-if="slot.row.is_default" style="font-size:13px;color:#3CB371">默认地址</div>
                </div>
              </el-table-column>
              <el-table-column align="center" prop="telphone" label="电话"></el-table-column>
              <el-table-column align="center" prop="address" label="地址"></el-table-column>
              <el-table-column align="center" prop="createtime" label="创建时间"></el-table-column>
            </el-table>
          </div>
          <div v-if="navLeftId===3||navLeftId===4">
            <el-table :data="userinfo" border :height="500" style="width: 100%;">
              <el-table-column align="center" prop="date" label="充值金额" width="180"></el-table-column>
              <el-table-column align="center" prop="address" label="充值平台"></el-table-column>
              <el-table-column align="center" prop="name" label="充值时间" width="180"></el-table-column>
              <el-table-column align="center" prop="address" label="状态"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="userListDetail-bot-bot" v-if="navLeftId!==1">
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
export default {
  name: "HelloWorld",
  props: ["userDetailData"],
  data() {
    return {
      value: "",
      radio: 1,
      navLeft: [
        { title: "基本信息", id: 1 },
        { title: "收货地址", id: 2 },
        { title: "充值记录", id: 3 },
        { title: "消费记录", id: 4 }
      ],
      userinfo: "",
      addressList: [],
      navLeftId: 1,
      basicInformation: {},
      page: 1,
      limit: 10
    };
  },
  created() {
    this.getUserinfo();
    this.getAddress();
  },
  methods: {
    getNavLeftId(id) {
      this.navLeftId = id;
      this.page = 1;
    },
    //获取用户基本信息
    async getUserinfo() {
      let url = "/admin/member/";
      let params = {
        id: this.userDetailData.id
      };
      let response = await get({ url, params });
      this.basicInformation = response;
    },
    //用户基本信息修改
    async changeContent() {
      let data = {
        id: this.userDetailData.id,
        status: this.basicInformation.status
      };
      let url = "/admin/member/";
      let response = await put({ url, data });
      console.log(response.msg);
      if (response.msg) return this.$message(response.msg);
      this.getUserinfo();
      this.$message("修改成功");
    },
    onShowUserList() {
      this.$emit("onShowUserList");
    },
    async getAddress() {
      let url = "/admin/address";
      let params = {
        id: this.userDetailData.id,
        page: this.page,
        limit: this.limit
      };
      let response = await get({ url, params });
      this.addressList = response.data;
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
          }
          img {
            width: 80px;
            height: 80px;
            display: inline-block;
            margin-left: 30px;
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
