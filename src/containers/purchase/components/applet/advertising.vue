<template>
  <div class="keyword">
    <div class="keyword-top">
      <div class="keyword-top-tit">
        小程序广告位
        <span style="color:#3CB371">(2)</span>
      </div>
      <div class="keyword-top-con">
        <div class="keyword-top-con-left">
          <div class="keyword-top-con-i">
            关键字：
            <el-input style="width:230px;" placeholder="请输入关键字"></el-input>
          </div>
        </div>

        <el-button style="margin-left:40px" type="primary" class="el-button" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="keyword-bot">
      <div class="keyword-bot-top">
        <div class="keyword-bot-top-i">
          <i class="el-icon-plus"></i>
          <span>新增轮播图</span>
        </div>
        <!-- <div class="keyword-bot-top-i">
          <i class="el-icon-delete"></i>
          <span>批量删除</span>
        </div>-->
      </div>
      <div class="keyword-bot-bot">
        <el-table :data="tableData.data" border :height="700" style="width: 100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="date" label="ID" width="180"></el-table-column>
          <el-table-column align="center" prop="address" label="图片" width="200">
            <div
              slot-scope="scope"
              style="width:180px;height:70px;display:inline-block;"
            >{{scope.row.name}}</div>
          </el-table-column>
          <el-table-column align="center" prop="name" label="标题" width="180"></el-table-column>
          <el-table-column align="center" prop="address" label="位置"></el-table-column>
          <el-table-column align="center" prop="address" label="排序"></el-table-column>
          <el-table-column align="center" prop="value" label="启用">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-table-column>
          <el-table-column align="center" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
import { get, post, del, put, fakeGet } from "@/utils/request.js";
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
.keyword {
  display: flex;
  height: 100%;
  flex-direction: column;
  .keyword-top {
    border-radius: 4px;
    width: 100%;
    height: 120px;
    background-color: #fff;
    padding: 20px 25px;
    text-align: left;
    box-sizing: border-box;
    .keyword-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .keyword-top-con {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .keyword-top-con-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .keyword-top-con-i {
          margin-right: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .keyword-bot {
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
    .keyword-bot-top {
      display: flex;
      justify-content: start;
      .keyword-bot-top-i {
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
    .keyword-bot-bot {
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
