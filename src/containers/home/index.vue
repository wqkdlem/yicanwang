<template>
  <div class="home">
    <navTit :vid="1"></navTit>
    <div class="content">
      <div class="content-left">
        <div class="content-left-i">
          <img src alt />
          <span>首页</span>
        </div>
      </div>
      <div class="content-right">
        <div class="content-top">
          <div
            class="content-top-i"
            v-for="(item,index) in allData"
            :key="index"
            :style="{background:item.color}"
          >
            <div class="content-top-i-top">
              <div class="content-top-i-top-top">{{item.committed}}</div>
              <div class="content-top-i-top-bot">
                {{item.committedNum}}
                <span>{{item.committedUnit}}</span>
              </div>
            </div>
            <div class="content-top-i-bot">
              <div class="content-top-i-bot-left">
                <div class="content-top-i-bot-left-top">{{item.todayOrder}}</div>
                <div class="content-top-i-bot-left-bot">
                  {{item.todayOrderUnm}}
                  <span>{{item.todayOrderUnit}}</span>
                </div>
              </div>
              <img class="content-top-i-bot-right" :src="item.img" />
            </div>
          </div>
        </div>
        <div class="content-center">
          <div class="content-center-top">汤料数据</div>
          <div class="content-center-bot">
            <div class="content-center-bot-i" v-for="(item,index) in soupBasesData" :key="index">
              <div class="content-center-bot-i-top">
                <div class="content-center-bot-i-top-top">
                  <img :src="item.img" alt />
                  <span>{{item.committed}}</span>
                </div>
                <div class="content-center-bot-i-top-bot">
                  {{item.committedNum}}
                  <span>{{item.committedUnit}}</span>
                </div>
              </div>
              <div class="content-center-bot-i-bot">
                <div class="content-center-bot-i-bot-top">{{item.todayOrder}}</div>
                <div class="content-center-bot-i-bot-bot">
                  {{item.todayOrderUnm}}
                  <span>{{item.todayOrderUnit}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <div class="content-bottom-i" v-for="(item,index) in lookBackData" :key="index">
            <div class="content-bottom-i-top">{{item.title}}</div>
            <div class="content-bottom-i-cen">
              <div class="content-bottom-i-cen-lef">
                <div class="content-bottom-i-cen-lef-top">{{item.realTime}}</div>
                <div class="content-bottom-i-cen-lef-bot">
                  {{item.realTimeNum}}
                  <p>
                    对比上周
                    <span
                      :style="{color:item.regulation?'rgba(253, 81, 81, 1)':'rgba(60, 179, 113, 1)'}"
                    >{{item.realTimeContrast}}</span>
                  </p>
                  <img :src="item.regulation?contrastUp:contrastNext" alt />
                </div>
              </div>
              <div class="content-bottom-i-cen-rig">
                <div class="content-bottom-i-cen-rig-left">{{item.overall}}</div>
                <div class="content-bottom-i-cen-rig-right">{{item.overallNum}}</div>
              </div>
            </div>
            <div class="content-bottom-i-bot">
              <p>{{item.addData}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import navTit from "@/components/navTit";
export default {
  components: { navTit },
  name: "home",
  data() {
    return {
      contrastUp: require("@/assets/new_images/contrastUp.png"),
      contrastNext: require("@/assets/new_images/contrastNext.png"),
      allData: [
        {
          committed: "所有待发货",
          committedNum: "25345",
          committedUnit: "单",
          todayOrder: "昨日订单数",
          todayOrderUnm: "543",
          todayOrderUnit: "单",
          img: require("@/assets/new_images/dingdan.png"),
          color: "#8F94FB"
        },
        {
          committed: "所有待发货",
          committedNum: "25345",
          committedUnit: "单",
          todayOrder: "昨日订单数",
          todayOrderUnm: "543",
          todayOrderUnit: "单",
          img: require("@/assets/new_images/shouru.png"),
          color: "#F99636"
        },
        {
          committed: "所有待发货",
          committedNum: "25345",
          committedUnit: "单",
          todayOrder: "昨日订单数",
          todayOrderUnm: "543",
          todayOrderUnit: "单",
          img: require("@/assets/new_images/dingdan.png"),
          color: "#3DD376"
        },
        {
          committed: "所有待发货",
          committedNum: "25345",
          committedUnit: "单",
          todayOrder: "昨日订单数",
          todayOrderUnm: "543",
          todayOrderUnit: "单",
          img: require("@/assets/new_images/shouru.png"),
          color: "#F09819"
        }
      ],
      soupBasesData: [
        {
          committed: "所有待发货",
          committedNum: "25345",
          committedUnit: "单",
          todayOrder: "昨日订单数",
          todayOrderUnm: "543",
          todayOrderUnit: "单",
          img: require("@/assets/new_images/dingdanIcon.png")
        },
        {
          committed: "所有待发货",
          committedNum: "25345",
          committedUnit: "单",
          todayOrder: "昨日订单数",
          todayOrderUnm: "543",
          todayOrderUnit: "单",
          img: require("@/assets/new_images/shouruIcon.png")
        },
        {
          committed: "所有待发货",
          committedNum: "25345",
          committedUnit: "单",
          todayOrder: "昨日订单数",
          todayOrderUnm: "543",
          todayOrderUnit: "单",
          img: require("@/assets/new_images/dingdanIcon.png")
        },
        {
          committed: "所有待发货",
          committedNum: "25345",
          committedUnit: "单",
          todayOrder: "昨日订单数",
          todayOrderUnm: "543",
          todayOrderUnit: "单",
          img: require("@/assets/new_images/shouruIcon.png")
        }
      ],
      lookBackData: [
        {
          title: "数据汇报",
          realTime: "新增客户（周）",
          realTimeNum: "2333",
          realTimeContrast: "2222",
          regulation: true,
          overall: "总客户数量",
          overallNum: "2334555",
          addData: "新增客户数据"
        },
        {
          title: "订单提交",
          realTime: "今日订单数（日）",
          realTimeNum: "29",
          realTimeContrast: "22",
          regulation: false,
          overall: "总客户数量",
          overallNum: "2334555",
          addData: "订单数据"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.home {
  height: 100% !important;
  display: flex;
  flex-direction: column;
  .content {
    background-color: #fafafa;
    display: flex;
    .content-left {
      width: 245px !important;
      height: 100%;
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      .content-left-i {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        height: 56px;
        img {
          width: 24px;
          height: 18px;
          display: inline-block;
          border: 1px solid red;
        }
        span {
          font-size: 18px;
          color: #909399;
          display: inline-block;
          margin-left: 15px;
        }
      }
    }
    .content-right {
      padding: 48px;
      box-sizing: border-box;
      flex: auto;
      background-color: rgba(242, 242, 242, 1);
      overflow-y: auto;
      .content-top {
        width: 100%;
        height: 250px;
        display: flex;
        justify-content: space-between;

        .content-top-i {
          text-align: left;
          padding: 26px 0 0 20px;
          box-sizing: border-box;
          width: 23%;
          height: 100%;
          color: #fff;
          background-color: rgba(143, 148, 251, 1);
          border-radius: 4px;
          .content-top-i-top {
            .content-top-i-top-top {
              font-size: 18px;
              color: rgba(255, 255, 255, 0.8);
            }
            .content-top-i-top-bot {
              margin-top: 8px;
              font-size: 36px;
              span {
                font-size: 18px;
                color: rgba(255, 255, 255, 0.8);
              }
            }
          }

          .content-top-i-bot {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            .content-top-i-bot-left {
              .content-top-i-bot-left-top {
                margin-top: 5px;
                font-size: 18px;
                color: rgba(255, 255, 255, 0.8);
              }
              .content-top-i-bot-left-bot {
                margin-top: 8px;
                font-size: 36px;
                span {
                  font-size: 18px;
                  color: rgba(255, 255, 255, 0.8);
                }
              }
            }
            .content-top-i-bot-right {
              width: 95px;
              height: 95px;
            }
          }
        }
      }
      .content-center {
        margin-top: 60px;
        border-radius: 4px;
        background-color: #fff;
        .content-center-top {
          width: 100%;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          color: rgba(153, 153, 153, 1);
          text-align: left;
          padding-left: 30px;
          box-sizing: border-box;
        }
        .content-center-bot {
          width: 100%;
          height: 225px;
          display: flex;
          justify-content: space-between;
          .content-center-bot-i {
            width: 24%;
            padding-top: 30px;
            box-sizing: border-box;
            text-align: center;
            .content-center-bot-i-top {
              .content-center-bot-i-top-top {
                font-size: 18px;
                color: rgba(153, 153, 153, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                  vertical-align: middle;
                  display: inline-block;
                  margin-left: 8px;
                }
              }
              .content-center-bot-i-top-bot {
                color: #fd5151;
                font-size: 36px;
                margin-top: 5px;
                span {
                  font-size: 18px;
                }
              }
            }
            .content-center-bot-i-bot {
              margin-top: 8px;
              .content-center-bot-i-bot-top {
                font-size: 18px;
                color: rgba(153, 153, 153, 1);
              }
              .content-center-bot-i-bot-bot {
                margin-top: 5px;
                font-size: 36px;
                color: rgba(51, 51, 51, 1);
                span {
                  font-size: 18px;
                }
              }
            }
          }
        }
      }
      .content-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .content-bottom-i {
          background-color: #fff;
          margin-top: 20px;
          width: 48%;
          border-radius: 4px;
          .content-bottom-i-top {
            width: 100%;
            height: 50px;
            background-color: rgba(250, 250, 250, 1);
            padding: 0 20px;
            box-sizing: border-box;
            line-height: 50px;
            text-align: left;
          }
          .content-bottom-i-cen {
            padding: 45px 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: center;
            .content-bottom-i-cen-lef,
            .content-bottom-i-cen-rig {
              width: 50%;
            }
            .content-bottom-i-cen-lef {
              .content-bottom-i-cen-lef-top {
                font-size: 18px;
                color: rgba(153, 153, 153, 0.8);
              }
              .content-bottom-i-cen-lef-bot {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                font-size: 36px;
                color: rgba(51, 51, 51, 1);
                p {
                  display: inline-block;
                  margin-left: 8px;
                  margin-right: 5px;
                  font-size: 12px;
                  color: rgba(153, 153, 153, 1);
                  span {
                    font-size: 18px;
                    vertical-align: middle;
                    display: inline-block;
                    margin-left: 5px;
                  }
                }
                img {
                  width: 20px;
                  height: 20px;
                }
              }
            }
            .content-bottom-i-cen-rig {
              .content-bottom-i-cen-rig-left {
                font-size: 18px;
                color: rgba(153, 153, 153, 1);
              }
              .content-bottom-i-cen-rig-right {
                font-size: 36px;
                color: rgba(51, 51, 51, 1);
              }
            }
          }
          .content-bottom-i-bot {
            padding: 0 25px 20px 25px;
            box-sizing: border-box;
            height: 250px;
            p {
              width: 100%;

              background: rgba(242, 242, 242, 1);
              font-size: 54px;
              color: rgba(51, 51, 51, 1);
              text-align: center;
              line-height: 230px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
</style>
