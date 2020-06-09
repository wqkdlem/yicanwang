<template>
  <div class="purchaseNews">
    <div class="purchaseNews-top">
      <div class="purchaseNews-top-tit">
        消息列表
        <span style="color:#3CB371">(3)</span>
      </div>
      <div class="purchaseNews-top-con">
        <div class="purchaseNews-top-con-left">
          <div class="purchaseNews-top-con-i">
            分类：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="purchaseNews-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="purchaseSlideshow-bot">
      <div class="purchaseSlideshow-bot-top">
        <i class="el-icon-plus"></i>
        <span>新增消息</span>
      </div>
      <div class="purchaseSlideshow-bot-cen">
        <div class="purchaseSlideshow-bot-cen-i" v-for="(item,index) in newsData" :key="index">
          <div class="purchaseSlideshow-bot-cen-i-top">
            <div class="purchaseSlideshow-bot-cen-i-top-lef">
              <div class="purchaseSlideshow-bot-cen-i-top-lef-top">ID:{{item.id}}</div>
              <div class="purchaseSlideshow-bot-cen-i-top-lef-bot">
                {{item.type}}
                <span>({{item.typeCon}})</span>
              </div>
            </div>
            <div
              class="purchaseSlideshow-bot-cen-i-top-rig"
              :style="{background:item.content?'#E65959':'#3CB371'}"
            >
              <img :src="writeIcon" alt />
              <span>{{item.content?'修改':'编辑'}}</span>
            </div>
          </div>
          <div class="purchaseSlideshow-bot-cen-i-cen">{{item.content}}</div>
          <div class="purchaseSlideshow-bot-cen-i-bot">
            <el-switch v-model="item.start" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            <i class="el-icon-delete"></i>
            <span>{{item.date}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <span class="demonstration">每页显示</span>
      <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange"-->
      <el-pagination
        :current-page.sync="currentPage2"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="tableData.page.data_count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      writeIcon: require("@/assets/new_images/write.png"),
      newsData: [
        {
          id: "122",
          type: "微信小程序",
          typeCon: "汤料大师小程序公告信息",
          content:
            "一款专属于拉面人自己的APP，伊穆家园APP3.0版本正式更新上线啦！ 成熟完善的原生开发模式，使APP运行更快、系统更加流畅。 新增每日秒杀、今日特价，功能更加丰富优化。全新的社区优化，求职招聘、饭店转让都可进行实时评论互动、点赞分享，让找工作、找饭店更加准确方便。 新增在线客服功能，解决咨询问题，了解产品信息、让购物体验更加简单。 优化完",
          start: true,
          date: "2019-02-26 19:59:06"
        },
        {
          id: "2333",
          type: "微信小程序",
          typeCon: "汤料大师小程序公告信息",
          content: "",
          start: true,
          date: "2019-02-26 19:59:06"
        },
        {
          id: "122",
          type: "APP",
          typeCon: "汤料大师小程序公告信息",
          content:
            "一款专属于拉面人自己的APP，伊穆家园APP3.0版本正式更新上线啦！ 成熟完善的原生开发模式，使APP运行更快、系统更加流畅。 新增每日秒杀、今日特价，功能更加丰富优化。全新的社区优化，求职招聘、饭店转让都可进行实时评论互动、点赞分享，让找工作、找饭店更加准确方便。 新增在线客服功能，解决咨询问题，了解产品信息、让购物体验更加简单。 优化完",
          start: false,
          date: "2019-02-26 19:59:06"
        }
      ]
    };
  },
  created() {
    this.aaa();
  },
  methods: {
    async aaa() {
      let url = "/ssp/sheet/api/getSheetList";
      let data = "11111111111";
      let response = await fakeGet("111111111111");
      console.log(response);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.purchaseNews {
  display: flex;
  flex-direction: column;
  .el-switch__core {
    border-color: #999999 !important;
    background-color: #999999 !important;
  }
  .el-icon-delete {
    color: #e65959;
  }
  .purchaseNews-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    flex: 0.08;
    .purchaseNews-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .purchaseNews-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .purchaseNews-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .purchaseNews-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .purchaseSlideshow-bot {
    flex: 0.89;
    // flex: auto;
    // overflow-y: auto;
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    // background-color: #fff;
    flex: auto;
    text-align: left;
    padding: 20px 25px;
    box-sizing: border-box;
    .purchaseSlideshow-bot-top {
      width: 130px;
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
    .purchaseSlideshow-bot-cen {
      // background: #e8e8e8;
      width: 98%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      .purchaseSlideshow-bot-cen-i {
        background-color: #fff;
        width: 46%;
        border-radius: 4px;
        margin-top: 50px;
        .purchaseSlideshow-bot-cen-i-top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 30px 40px;
          box-sizing: border-box;
          .purchaseSlideshow-bot-cen-i-top-lef {
            .purchaseSlideshow-bot-cen-i-top-lef-top {
              font-size: 16px;
              color: rgba(153, 153, 153, 1);
              font-weight: 800;
            }
            .purchaseSlideshow-bot-cen-i-top-lef-bot {
              font-size: 30px;
              font-weight: 800;
              color: rgba(51, 51, 51, 1);
              margin-top: 5px;
              span {
                font-size: 20px;
                font-weight: 800;
                color: rgba(153, 153, 153, 1);
                text-overflow: ellipsis;
              }
            }
          }
          .purchaseSlideshow-bot-cen-i-top-rig {
            width: 120px;
            height: 48px;
            border-radius: 24px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            color: #fff;
            img {
              width: 24px;
              height: 24px;
            }
            span {
              display: inline-block;
              margin-left: 4px;
            }
          }
        }
        .purchaseSlideshow-bot-cen-i-cen {
          padding: 10px 40px;
          box-sizing: border-box;
          background: rgba(252, 252, 252, 1);
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          height: 72px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .purchaseSlideshow-bot-cen-i-bot {
          padding: 30px 48px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 20px;
            height: 21px;
          }
          span {
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
            font-weight: 400;
          }
        }
      }
    }
  }
  .block {
    flex: 0.03;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
