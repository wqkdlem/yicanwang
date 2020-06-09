<template>
  <div class="shoppingCart">
    <div class="shoppingCart-top">
      <div class="shoppingCart-top-tit">
        购物车推荐产品列表
        <span style="color:#3CB371">（1）</span>
      </div>
      <div class="shoppingCart-top-con">
        <div class="shoppingCart-top-con-left">
          <div class="shoppingCart-top-con-i">
            上架：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="shoppingCart-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="shoppingCart-bot">
      <div class="shoppingCart-bot-top">
        <div class="shoppingCart-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>新增产品</span>
        </div>
        <div class="shoppingCart-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>加入推荐产品</span>
        </div>
      </div>
      <div class="shoppingCart-bot-bot">
        <div class="shoppingCart-bot-bot-w">
          <div class="shoppingCart-bot-bot-wa">
            <i class="el-icon-plus el-icon-plusb"></i>
            <div>添加商品</div>
          </div>
          <div class="shoppingCart-bot-bot-wi">
            <div class="shoppingCart-bot-bot-wi-top">精选和田大枣</div>
            <div class="shoppingCart-bot-bot-wi-cen">
              <div class="shoppingCart-bot-bot-wi-cena">
                <img src alt />
              </div>
              <div class="shoppingCart-bot-bot-wi-cenb">
                <div class="shoppingCart-bot-bot-wi-cenb-l">
                  ¥ {{}}
                  <i class="el-icon-edit-outline" style="color:#999999;font-size:20px"></i>
                </div>
                <div class="shoppingCart-bot-bot-wi-cenb-r">
                  最后{{}}个
                  <i class="el-icon-edit-outline" style="color:#fff;font-size:20px"></i>
                </div>
              </div>
              <div class="shoppingCart-bot-bot-wi-cenc">
                <div>ID：</div>
                <!-- <div>分类：</div> -->
                <div>规格/款式：</div>
              </div>
            </div>
            <div class="shoppingCart-bot-bot-wi-bot">
              <div class="shoppingCart-bot-bot-wi-bot-lef">
                <img :src="collectb" />
                <span>1</span>
              </div>
              <div class="shoppingCart-bot-bot-wi-bot-lefta">
                <img :src="message" />
                <span>1</span>
              </div>
              <img :src="shensuo" class="shoppingCart-bot-bot-wi-bot-rig" />
              <i class="el-icon-delete" style="color:red;font-size: 25px;"></i>
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
    </div>
  </div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: this.getTableData(),
      value: ""
    };
  },
  created() {},
  methods: {
    getTableData() {
      return [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          value: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.shoppingCart {
  display: flex;
  height: 100%;
  flex-direction: column;
  .shoppingCart-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .shoppingCart-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .shoppingCart-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .shoppingCart-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .shoppingCart-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .shoppingCart-bot {
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    // background-color: #fff;
    flex: auto;
    text-align: left;
    padding: 20px 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .shoppingCart-bot-top {
      display: flex;
      justify-content: start;
      .shoppingCart-bot-top-i {
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
    }
    .shoppingCart-bot-bot {
      margin-top: 20px;
      flex: auto;
      .shoppingCart-bot-bot-w {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        .shoppingCart-bot-bot-wa,
        .shoppingCart-bot-bot-wb,
        .shoppingCart-bot-bot-wi {
          border-radius: 8px;
          height: 580px;
          width: 340px;
        }
        .shoppingCart-bot-bot-wa {
          border: 1px solid rgba(153, 153, 153, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          div {
            margin-top: 10px;
            font-size: 24px;
            color: rgba(153, 153, 153, 1);
          }
        }
        .shoppingCart-bot-bot-wb,
        .shoppingCart-bot-bot-wi {
          background-color: #fff;
          position: relative;
          .shoppingCart-bot-bot-wb-top,
          .shoppingCart-bot-bot-wi-top {
            height: 60px;
            padding: 20px;
            box-sizing: border-box;
            font-size: 18px;
            color: rgba(153, 153, 153, 1);
          }
          .shoppingCart-bot-bot-wb-cen {
            padding: 20px;
            box-sizing: border-box;
            .shoppingCart-bot-bot-wb-cen-i {
              height: 60px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
              padding: 0 20px;
              box-sizing: border-box;
              border-bottom: 1px solid #fff2f2f2;
              span {
                font-size: 18px;
                color: rgba(51, 51, 51, 1);
              }
            }
          }
          .shoppingCart-bot-bot-wb-bot,
          .shoppingCart-bot-bot-wi-bot {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0 30px;
            box-sizing: border-box;
            height: 57px;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            align-items: center;
            img {
              width: 19px;
              height: 21px;
            }
            .shoppingCart-bot-bot-wb-bot-lef,
            .shoppingCart-bot-bot-wb-bot-lefta,
            .shoppingCart-bot-bot-wi-bot-lef,
            .shoppingCart-bot-bot-wi-bot-lefta {
              position: relative;
              span {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background-color: red;
                display: inline-block;
                position: absolute;
                top: -10px;
                left: 8px;
                font-size: 10px !important;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                line-height: 14px;
              }
            }
          }
        }
        .shoppingCart-bot-bot-wi {
          .shoppingCart-bot-bot-wi-top {
            color: #333;
          }
          .shoppingCart-bot-bot-wi-cen {
            width: 100%;
            height: 450px;
            .shoppingCart-bot-bot-wi-cena {
              padding: 10px 30px 0;
              box-sizing: border-box;
              width: 100%;
              text-align: center;
              img {
                width: 252px;
                height: 252px;
                border: 1px solid red;
                display: inline-block;
              }
            }
            .shoppingCart-bot-bot-wi-cenb {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding: 20px;
              box-sizing: border-box;
              .shoppingCart-bot-bot-wi-cenb-l {
                font-size: 24px;
                font-weight: 800;
                color: rgba(51, 51, 51, 1);
              }
              .shoppingCart-bot-bot-wi-cenb-r {
                padding: 3px 10px;
                box-sizing: border-box;
                background: #e28a0c;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 24px;
                text-align: center;
              }
            }
            .shoppingCart-bot-bot-wi-cenc {
              padding: 10px 20px;
              box-sizing: border-box;
              background: rgba(252, 252, 252, 1);
              div {
                margin-top: 5px;
                font-size: 16px;
                font-weight: 800;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
        }
      }
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
