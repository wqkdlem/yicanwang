<template>
  <div class="fileGroupManagement">
    <div class="fileGroupManagement-top">
      <div class="fileGroupManagement-top-tit">
        文件组列表
        <!-- <span style="color:#3CB371">(2)</span> -->
      </div>
      <div class="fileGroupManagement-top-con">
        <div class="fileGroupManagement-top-con-left">
          <div class="fileGroupManagement-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="fileGroupManagement-bot">
      <div class="fileGroupManagement-bot-top">
        <div class="fileGroupManagement-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>新增文件组</span>
        </div>
        <div class="fileGroupManagement-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>
      </div>
      <div class="fileGroupManagement-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="date" label="ID" width="180"></el-table-column>
          <el-table-column align="center" prop="address" label="组名">
            <div slot-scope="scope">{{scope.row.name}}</div>
          </el-table-column>
          <el-table-column align="center" prop="name" label="显示" width="180"></el-table-column>
          <el-table-column align="center" prop="address" label="操作">
            <template slot-scope="scope" style>
              <el-button
                type="text"
                @click="handleClick(scope.row)"
                size="small"
                style="color:#3CB371"
              >编辑</el-button>
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                style="color:#FB6534
                "
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    <el-dialog
      title="修改管理员"
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
    >
      <div class="box">
        <div class="box-i">
          <div class="box-left">文件组名称：</div>
          <input width type="text" placeholder="aaaa" />
        </div>
        <div class="box-i">
          <div class="box-left">是否显示：</div>
          <div class="box--right">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      tableData: this.getTableData(),
      value: "",
      dialogVisible: false,
      radio: 1
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
    },
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


<style scoped lang="less" stylus>
.fileGroupManagement {
  display: flex;
  height: 100%;
  flex-direction: column;
  .fileGroupManagement-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .fileGroupManagement-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .fileGroupManagement-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .fileGroupManagement-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .fileGroupManagement-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .fileGroupManagement-bot {
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
    .fileGroupManagement-bot-top {
      display: flex;
      justify-content: start;
      .fileGroupManagement-bot-top-i {
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
    .fileGroupManagement-bot-bot {
      margin-top: 20px;
      flex: auto;
      .block {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 10px;
      }
      .fileGroupManagement-bot-bot-operate {
        display: flex;
        justify-content: center;
        font-size: 24px;
        font-weight: 500;
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
      .el-select {
        width: 670px;
        height: 40px;
        margin-left: 10px;

        .el-input__inner {
          background-color: #f1f1f1;
        }
      }
    }
  }
}
</style>