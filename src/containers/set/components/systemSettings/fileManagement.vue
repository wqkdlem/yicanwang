<template>
  <div class="fileManagement">
    <div class="fileManagement-top">
      <div class="fileManagement-top-tit">
        文件管理
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="fileManagement-top-con">
        <div class="fileManagement-top-con-left">
          <div class="fileManagement-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button style="margin-left:40px" type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="fileManagement-bot">
      <div class="fileManagement-bot-top">
        <div class="fileManagement-bot-top-a">
          <i class="el-icon-plus"></i>
          <span>新增文件组</span>
        </div>
        <div class="fileManagement-bot-top-c"></div>
        <div class="fileManagement-bot-top-i">
          <span>批量删除</span>
        </div>
        <div class="fileManagement-bot-top-i fileManagement-bot-top-ia">
          <span>批量删除</span>
        </div>
      </div>
      <div class="fileManagement-bot-bot">
        <div class="fileManagement-bot-bot-top">
          <div class="fileManagement-bot-bot-top-lef">默认</div>
          <div class="fileManagement-bot-bot-top-rig">
            <el-radio v-model="radio" label="1">全选</el-radio>
            <div class="fileManagement-bot-bot-top-rig-i" @click="onDelect">
              <i class="el-icon-delete"></i>
              <span>批量删除</span>
            </div>
            <div class="fileManagement-bot-bot-top-rig-i" @click="onUploadImg">
              <i class="el-icon-folder-add"></i>
              <span>上传图片</span>
            </div>
          </div>
        </div>
        <div class="fileManagement-bot-bot-con">
          <div class="fileManagement-bot-bot-con-i">
            <img class="fileManagement-bot-bot-con-i-imga" src alt />
            <img class="fileManagement-bot-bot-con-i-imgb" :src="tuoyuan" alt />
            <div class="fileManagement-bot-bot-con-i-cona">西北梦.jpg</div>
            <div class="fileManagement-bot-bot-con-i-conb">2019年7月20日</div>
            <div class="fileManagement-bot-bot-con-i-conc">
              <i style="color:#999999" class="el-icon-sort-up"></i>
              <i style="color:#999999" class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <!-- <div class="block"> -->
        <!-- <span class="demonstration">每页显示</span> -->
        <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        :current-page.sync="currentPage2" :total="tableData.page.data_count"-->
        <!-- <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="sizes, prev, pager, next"
        ></el-pagination>-->
        <!-- </div> -->
      </div>
    </div>
    <el-dialog
      title="修改管理员"
       class="abow_dialog" :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
    >
      <div class="box">
        <div class="box-i">
          <div class="box-left">用户名称：</div>
          <input width type="text" placeholder="aaaa" />
        </div>
        <div class="box-i box-img">
          <div class="box-left">上传图片：</div>
          <img style="width:180px;height:180px" :src="uplodingImg" alt />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button style="margin-left:40px" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改管理员"  class="abow_dialog" :visible.sync="ifShowDele" width="900px" :before-close="handleClose">
      <div class="box">
        <div class="box-con">确认删除这10张图片吗</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ifShowDele = false">取 消</el-button>
          <el-button style="margin-left:40px" type="primary" @click="ifShowDele = false">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      value: "",
      dialogVisible: false,
      ifShowDele: false,
      radio: 3,
      tuoyuan: require("@/assets/new_images/tuoyuan.png"),
      tuoyuanOn: require("@/assets/new_images/tuoyuanOn.png"),
      uplodingImg: require("@/assets/new_images/uplodingImg.png")
    };
  },
  created() {},
  methods: {
    handleClick(data) {
      console.log(data, "data");
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.ifShowDele = false;
    },
    onUploadImg() {
      this.dialogVisible = true;
    },
    onDelect() {
      this.ifShowDele = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped lang="less" stylus>
.fileManagement {
  display: flex;
  height: 100% !important;
  flex-direction: column;
  .fileManagement-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 20px;
    text-align: left;
    box-sizing: border-box;
    .fileManagement-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .fileManagement-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .fileManagement-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .fileManagement-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .fileManagement-bot {
    border-radius: 4px;
    width: 100%;
    flex: auto;
    text-align: left;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    .fileManagement-bot-top {
      background-color: #fff;
      width: 180px;
      height: 100%;
      padding: 20px 15px;
      box-sizing: border-box;
      .fileManagement-bot-top-a,
      .fileManagement-bot-top-i {
        cursor: pointer;
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        background: rgba(60, 179, 113, 1);
        color: #ffffff;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 5px;

        span {
          display: inline-block;
          margin-left: 8px;
        }
      }
      .fileManagement-bot-top-ia {
        background: #fff;
        border: 1px solid #979797;
        color: #979797;
      }
      .fileManagement-bot-top-a {
        height: 30px;
      }
      .fileManagement-bot-top-c {
        width: 100%;
        height: 1px;
        background-color: #d8d8d8;
        margin: 20px 0;
      }
    }
    .fileManagement-bot-bot {
      flex: auto;
      background-color: #fff;
      margin-left: 20px;
      height: 100%;
      flex: auto;
      padding: 20px;
      box-sizing: border-box;
      .fileManagement-bot-bot-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .fileManagement-bot-bot-top-lef {
          font-size: 18px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .fileManagement-bot-bot-top-rig {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          .fileManagement-bot-bot-top-rig-i {
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
            font-size: 14px;
            span {
              display: inline-block;
              margin-left: 5px;
            }
          }
        }
      }
      .fileManagement-bot-bot-con {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .fileManagement-bot-bot-con-i {
          margin-top: 20px;
          position: relative;
          width: 200px;
          box-shadow: 3px 14px 18px 1px rgba(231, 231, 231, 1);
          padding-bottom: 10px;
          .fileManagement-bot-bot-con-i-imga {
            display: inline-block;
            width: 200px;
            height: 200px;
            border: 1px solid red;
            box-sizing: border-box;
          }
          .fileManagement-bot-bot-con-i-imgb {
            width: 45px;
            height: 45px;
            display: inline-block;
            border: 1px solid red;
            box-sizing: border-box;
            position: absolute;
            top: 10px;
            right: 10px;
          }
          .fileManagement-bot-bot-con-i-cona {
            font-size: 18px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-top: 3px;
            padding: 0 10px;
            box-sizing: border-box;
          }
          .fileManagement-bot-bot-con-i-conb {
            font-size: 16px;
            color: #999999;
            margin-top: 3px;
            padding: 0 10px;
            box-sizing: border-box;
          }
          .fileManagement-bot-bot-con-i-conc {
            padding: 0 10px;
            box-sizing: border-box;
            text-align: right;
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
  .box {
    .box-i {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .box-left {
        font-size: 14px;
        color: #333333;
        width: 100px;
      }
      .box--right {
        margin-left: 10px;
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
}
</style>