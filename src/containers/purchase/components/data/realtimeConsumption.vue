<template>
  <div class="realtimeConsumption">
    <div class="realtimeConsumption-top">
      <div class="keyword-top-tit">
        用户真实消费统计
        <span style="color:#999999">TOP20</span>
      </div>
      <div class="realtimeConsumption-top-con">
        <div class="realtimeConsumption-top-con-left">
          <div class="realtimeConsumption-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button style="margin-left:40px" type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="realtimeConsumption-bot">
      <div class="realtimeConsumption-bot-top">
        <div class="realtimeConsumption-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>新增视频</span>
        </div>
      </div>
      <div class="realtimeConsumption-bot-bot">
        <div class="realtimeConsumption-bot-bot-i">
          <div class="realtimeConsumption-bot-bot-i-top">
            <div style="display:flex;justify-content: start;align-items: center;">
              <div class="realtimeConsumption-bot-bot-i-top-lef"></div>
              <div class="realtimeConsumption-bot-bot-i-top-cen">
                <div class="realtimeConsumption-bot-bot-i-top-cent">
                  <div>18874316241 (好好先生)</div>
                  <div class="realtimeConsumption-bot-bot-i-top-cenb">
                    <i style="font-size:10px" class="el-icon-phone-outline"></i>18874316241
                  </div>
                </div>
              </div>
            </div>
            <div class="realtimeConsumption-bot-bot-i-top-right">查看订单</div>
          </div>
          <div class="realtimeConsumption-bot-bot-i-bot">
            <div class="realtimeConsumption-bot-bot-i-bot-i">
              <div class="realtimeConsumption-bot-bot-i-bot-i-l" style="color:rgba(230,89,89,1);">
                <span>¥</span>7525.00
              </div>
              <div class="realtimeConsumption-bot-bot-i-bot-i-r">消费总额(元)</div>
            </div>
            <div class="realtimeConsumption-bot-bot-i-bot-i">
              <div class="realtimeConsumption-bot-bot-i-bot-i-l" style="color:#198FFF;">7525.00</div>
              <div class="realtimeConsumption-bot-bot-i-bot-i-r">消费次数</div>
            </div>
            <div class="realtimeConsumption-bot-bot-i-bot-i">
              <div class="realtimeConsumption-bot-bot-i-bot-i-l" style="color:#E29D39;">
                <span>¥</span>7525.00
              </div>
              <div class="realtimeConsumption-bot-bot-i-bot-i-r">消均消费(元)</div>
            </div>
          </div>
        </div>
        <div class="realtimeConsumption-bot-bot-i">
          <div class="realtimeConsumption-bot-bot-i-top">
            <div style="display:flex;justify-content: start;align-items: center;">
              <div class="realtimeConsumption-bot-bot-i-top-lef"></div>
              <div class="realtimeConsumption-bot-bot-i-top-cen">
                <div class="realtimeConsumption-bot-bot-i-top-cent">
                  <div>18874316241 (好好先生)</div>
                  <div class="realtimeConsumption-bot-bot-i-top-cenb">
                    <i style="font-size:10px" class="el-icon-phone-outline"></i>18874316241
                  </div>
                </div>
              </div>
            </div>
            <div class="realtimeConsumption-bot-bot-i-top-right">查看订单</div>
          </div>
          <div class="realtimeConsumption-bot-bot-i-bot">
            <div class="realtimeConsumption-bot-bot-i-bot-i">
              <div class="realtimeConsumption-bot-bot-i-bot-i-l" style="color:rgba(230,89,89,1);">
                <span>¥</span>7525.00
              </div>
              <div class="realtimeConsumption-bot-bot-i-bot-i-r">消费总额(元)</div>
            </div>
            <div class="realtimeConsumption-bot-bot-i-bot-i">
              <div class="realtimeConsumption-bot-bot-i-bot-i-l" style="color:#198FFF;">7525.00</div>
              <div class="realtimeConsumption-bot-bot-i-bot-i-r">消费次数</div>
            </div>
            <div class="realtimeConsumption-bot-bot-i-bot-i">
              <div class="realtimeConsumption-bot-bot-i-bot-i-l" style="color:#E29D39;">
                <span>¥</span>7525.00
              </div>
              <div class="realtimeConsumption-bot-bot-i-bot-i-r">消均消费(元)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.realtimeConsumption {
  display: flex;
  height: 100%;
  flex-direction: column;
  .realtimeConsumption-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .realtimeConsumption-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .realtimeConsumption-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .realtimeConsumption-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .realtimeConsumption-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .realtimeConsumption-bot {
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    flex: auto;
    text-align: left;
    display: flex;
    flex-direction: column;
    .realtimeConsumption-bot-top {
      display: flex;
      justify-content: start;
      .realtimeConsumption-bot-top-i {
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
    .realtimeConsumption-bot-bot {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-radius: 4px;
      .realtimeConsumption-bot-bot-i {
        margin-top: 20px;
        width: 48%;
        border-radius: 4px;
        .realtimeConsumption-bot-bot-i-top {
          background-color: #fff;
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .realtimeConsumption-bot-bot-i-top-lef {
            width: 48px;
            height: 48px;
            background: rgba(230, 230, 230, 1);
            border-radius: 50%;
          }
          .realtimeConsumption-bot-bot-i-top-cen {
            margin-left: 30px;
            .realtimeConsumption-bot-bot-i-top-cent {
              font-size: 9px;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);

              .realtimeConsumption-bot-bot-i-top-cenb {
                margin-top: 10px;
                i {
                  display: inline-block;
                  margin-right: 8px;
                }
                font-size: 9px;
                background: rgba(242, 242, 242, 1);
                border-radius: 10px;
                padding: 2px 8px;
              }
            }
            .realtimeConsumption-bot-bot-i-top-cenb {
              margin-top: 10px;
              i {
                display: inline-block;
                margin-right: 8px;
              }
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              font-size: 9px;
              background: rgba(242, 242, 242, 1);
              border-radius: 10px;
              padding: 2px 8px;
            }
          }
          .realtimeConsumption-bot-bot-i-top-right {
            width: 61px;
            height: 24px;
            background: rgba(25, 143, 255, 1);
            border-radius: 12px;
            font-size: 9px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 24px;
          }
        }
        .realtimeConsumption-bot-bot-i-bot {
          background-color: #fcfcfc;
          padding: 14px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .realtimeConsumption-bot-bot-i-bot-i {
            text-align: center;
            .realtimeConsumption-bot-bot-i-bot-i-l {
              font-size: 20px;
              font-weight: bold;
              span {
                font-size: 7px;
              }
            }
            .realtimeConsumption-bot-bot-i-bot-i-r {
              font-size: 7px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }
  }
}
</style>
