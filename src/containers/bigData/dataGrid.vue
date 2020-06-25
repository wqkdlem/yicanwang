<template>
  <div class="home">
    <div class="content">
      <div class="content-right">
        <div class="content-top">
          <div class="content-top-i" style="background:#8F94FB">
            <div class="content-top-i-top">
              <div class="content-top-i-top-top">所有待发货</div>
              <div class="content-top-i-top-bot">
                <span
                  v-if="homeData.raw_data&&homeData.raw_data.waitSendOrderNum"
                >{{homeData.raw_data.waitSendOrderNum}}</span>
                <span v-else>0</span>
                <span>单</span>
              </div>
            </div>
            <div class="content-top-i-bot">
              <div class="content-top-i-bot-left">
                <div class="content-top-i-bot-left-top">今日订单数</div>
                <div class="content-top-i-bot-left-bot">
                  <span
                    v-if="homeData.raw_data&&homeData.raw_data.dayOrderNum"
                  >{{homeData.raw_data.dayOrderNum}}</span>
                  <span v-else>0</span>
                  <span>单</span>
                </div>
              </div>
              <img class="content-top-i-bot-right" :src="fahuoimg" />
            </div>
          </div>

          <div class="content-top-i" style="background:#F99636">
            <div class="content-top-i-top">
              <div class="content-top-i-top-top">所有待付款</div>
              <div class="content-top-i-top-bot">
                <span
                  v-if="homeData.raw_data&&homeData.raw_data.waitPayOrderNum"
                >{{homeData.raw_data.waitPayOrderNum}}</span>
                <span v-else>0</span>
                <span>单</span>
              </div>
            </div>
            <div class="content-top-i-bot">
              <div class="content-top-i-bot-left">
                <div class="content-top-i-bot-left-top">今日收入</div>
                <div class="content-top-i-bot-left-bot">
                  <span
                    v-if="homeData.raw_data&&homeData.raw_data.dayOrderMoney"
                  >{{homeData.raw_data.dayOrderMoney}}</span>
                  <span v-else>0</span>
                  <span>元</span>
                </div>
              </div>
              <img class="content-top-i-bot-right" :src="fahuoimg" />
            </div>
          </div>

          <div class="content-top-i" style="background:#3DD376">
            <div class="content-top-i-top">
              <div class="content-top-i-top-top">本月订单数</div>
              <div class="content-top-i-top-bot">
                <span
                  v-if="homeData.raw_data&&homeData.raw_data.monthOrderNum"
                >{{homeData.raw_data.monthOrderNum}}</span>
                <span v-else>0</span>
                <span>单</span>
              </div>
            </div>
            <div class="content-top-i-bot">
              <div class="content-top-i-bot-left">
                <div class="content-top-i-bot-left-top">昨日订单数</div>
                <div class="content-top-i-bot-left-bot">
                  <span
                    v-if="homeData.raw_data&&homeData.raw_data.yesterDayOrderNum"
                  >{{homeData.raw_data.yesterDayOrderNum}}</span>
                  <span v-else>0</span>
                  <span>单</span>
                </div>
              </div>
              <img class="content-top-i-bot-right" :src="dingdanimg" />
            </div>
          </div>

          <div class="content-top-i" style="background:#F09819">
            <div class="content-top-i-top">
              <div class="content-top-i-top-top">本月收入</div>
              <div class="content-top-i-top-bot">
                <span
                  v-if="homeData.raw_data&&homeData.raw_data.monthOrderMoney"
                >{{homeData.raw_data.monthOrderMoney}}</span>
                <span v-else>0</span>
                <span>元</span>
              </div>
            </div>
            <div class="content-top-i-bot">
              <div class="content-top-i-bot-left">
                <div class="content-top-i-bot-left-top">昨日收入</div>
                <div class="content-top-i-bot-left-bot">
                  <span
                    v-if="homeData.raw_data&&homeData.raw_data.yesterDayOrderMoney"
                  >{{homeData.raw_data.yesterDayOrderMoney}}</span>
                  <span v-else>0</span>
                  <span>元</span>
                </div>
              </div>
              <img class="content-top-i-bot-right" :src="shouruimg" />
            </div>
          </div>
        </div>

        <div class="content-center">
          <div class="content-center-top">汤料数据</div>
          <div class="content-center-bot">
            <div class="content-center-bot-i">
              <div class="content-center-bot-i-top">
                <div class="content-center-bot-i-top-top">
                  <img :src="dingdanIcon" alt />
                  <span>所有待发货</span>
                </div>
                <div class="content-center-bot-i-top-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.waitSendOrderNum"
                  >{{homeData.soup_data.waitSendOrderNum}}</span>
                  <span v-else>0</span>
                  <span>单</span>
                </div>
              </div>
              <div class="content-center-bot-i-bot">
                <div class="content-center-bot-i-bot-top">今日订单数</div>
                <div class="content-center-bot-i-bot-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.dayOrderNum"
                  >{{homeData.soup_data.dayOrderNum}}</span>
                  <span v-else>0</span>
                  <span>单</span>
                  <span>单</span>
                </div>
              </div>
            </div>

            <div class="content-center-bot-i">
              <div class="content-center-bot-i-top">
                <div class="content-center-bot-i-top-top">
                  <img :src="shouruIcon" alt />
                  <span>所有待付款</span>
                </div>
                <div class="content-center-bot-i-top-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.waitPayOrderNum"
                  >{{homeData.soup_data.waitPayOrderNum}}</span>
                  <span v-else>0</span>
                  <span>单</span>
                </div>
              </div>
              <div class="content-center-bot-i-bot">
                <div class="content-center-bot-i-bot-top">今日收入</div>
                <div class="content-center-bot-i-bot-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.dayOrderMoney"
                  >{{homeData.soup_data.dayOrderMoney}}</span>
                  <span v-else>0</span>
                  <span>元</span>
                </div>
              </div>
            </div>

            <div class="content-center-bot-i">
              <div class="content-center-bot-i-top">
                <div class="content-center-bot-i-top-top">
                  <img :src="dingdanIcon" alt />
                  <span>本月订单数</span>
                </div>
                <div class="content-center-bot-i-top-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.monthOrderNum"
                  >{{homeData.soup_data.monthOrderNum}}</span>
                  <span v-else>0</span>
                  <span>单</span>
                </div>
              </div>
              <div class="content-center-bot-i-bot">
                <div class="content-center-bot-i-bot-top">昨天订单数</div>
                <div class="content-center-bot-i-bot-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.yesterDayOrderNum"
                  >{{homeData.soup_data.yesterDayOrderNum}}</span>
                  <span v-else>0</span>
                  <span>单</span>
                </div>
              </div>
            </div>

            <div class="content-center-bot-i">
              <div class="content-center-bot-i-top">
                <div class="content-center-bot-i-top-top">
                  <img :src="shouruIcon" alt />
                  <span>本月收入</span>
                </div>
                <div class="content-center-bot-i-top-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.monthOrderMoney"
                  >{{homeData.soup_data.monthOrderMoney}}</span>
                  <span v-else>0</span>
                  <span>元</span>
                </div>
              </div>
              <div class="content-center-bot-i-bot">
                <div class="content-center-bot-i-bot-top">昨天收入</div>
                <div class="content-center-bot-i-bot-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.yesterDayOrderMoney"
                  >{{homeData.soup_data.yesterDayOrderMoney}}</span>
                  <span v-else>0</span>
                  <span>元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <div class="content-bottom-i">
            <div class="content-bottom-i-top">数据回报</div>
            <div class="content-bottom-i-cen">
              <div class="content-bottom-i-cen-lef">
                <div class="content-bottom-i-cen-lef-top">新增客户数（周）</div>
                <div class="content-bottom-i-cen-lef-bot">
                  <span
                    v-if="homeData.soup_data&&homeData.soup_data.weekUserNum"
                  >{{homeData.soup_data.weekUserNum}}</span>
                  <span v-else>0</span>
                  <p>
                    对比上周
                    <span
                      :style="{color:homeData.user_data&&homeData.user_data.is_increase?'rgba(253, 81, 81, 1)':'rgba(60, 179, 113, 1)'}"
                    >{{homeData.user_data.updateNum}}</span>
                  </p>
                  <img
                    :src="homeData.user_data&&homeData.user_data.is_increase?contrastUp:contrastNext"
                    alt
                  />
                </div>
              </div>
              <div class="content-bottom-i-cen-rig">
                <div class="content-bottom-i-cen-rig-left">总客户数量</div>
                <div class="content-bottom-i-cen-rig-right">
                  <span
                    v-if="homeData.user_data&&homeData.user_data.sumNum"
                  >{{homeData.user_data.sumNum}}</span>
                  <span v-else>0</span>
                </div>
              </div>
            </div>
            <div class="content-bottom-i-bot">
              <p>新增客户数量</p>
            </div>
          </div>
          <div class="content-bottom-i">
            <div class="content-bottom-i-top">订单提交</div>
            <div class="content-bottom-i-cen">
              <div class="content-bottom-i-cen-lef">
                <div class="content-bottom-i-cen-lef-top">本周订单数（周）</div>
                <div class="content-bottom-i-cen-lef-bot">
                  <span
                    v-if="homeData.order_data&&homeData.order_data.weekOrderNum"
                  >{{homeData.order_data.weekOrderNum}}</span>
                  <span v-else>0</span>
                  <p>
                    对比上周
                    <span
                      :style="{color:homeData.order_data&&homeData.order_data.is_increase?'rgba(253, 81, 81, 1)':'rgba(60, 179, 113, 1)'}"
                    >{{homeData.order_data.updateOrderNum}}</span>
                  </p>
                  <img
                    :src="homeData.order_data&&homeData.order_data.is_increase?contrastUp:contrastNext"
                    alt
                  />
                </div>
              </div>
              <div class="content-bottom-i-cen-rig">
                <div class="content-bottom-i-cen-rig-left">总订单数</div>
                <div class="content-bottom-i-cen-rig-right">
                  <span
                    v-if="homeData.order_data&&homeData.order_data.sumOrderNum"
                  >{{homeData.order_data.sumOrderNum}}</span>
                  <span v-else>0</span>
                </div>
              </div>
            </div>
            <div class="content-bottom-i-bot">
              <p>订单数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "home",
  data() {
    return {
      contrastUp: require("@/assets/new_images/contrastUp.png"),
      contrastNext: require("@/assets/new_images/contrastNext.png"),
      fahuoimg: require("@/assets/new_images/dingdan.png"),
      fukuanimg: require("@/assets/new_images/shouru.png"),
      dingdanimg: require("@/assets/new_images/dingdan.png"),
      shouruimg: require("@/assets/new_images/shouru.png"),
      dingdanIcon: require("@/assets/new_images/dingdanIcon.png"),
      shouruIcon: require("@/assets/new_images/dingdanIcon.png"),
      homeData: ""
    };
  },
  created() {
    this.initHomeData();
  },
  methods: {
    async initHomeData() {
      let params = {
        data_type: "index"
      };
      let url = "/admin/data";
      let response = await get({ url, params });
      if (response.msg) return this.$message(response.msg);
      this.homeData = response;
    }
  }
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
          position: relative;
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
              width: 85px;
              height: 85px;
              position: absolute;
              right: 0;
              bottom: 0;
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
