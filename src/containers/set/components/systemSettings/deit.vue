<template>
  <div class="deit">
    <div class="deit-top">
      <div class="deit-top-tit">
        角色名称
        <span style="color:#3CB371"></span>
      </div>
      <div class="deit-top-con" @click="onShowCharacterName">返回</div>
    </div>
    <div class="deit-bot">
      <div class="deit-bot-top">
        <span>角色名称：</span>
        <input
          type="text"
          v-model="jurisdictionData.role_name"
          style="width:90%"
          placeholder="请输入角色名称"
          :disabled="true"
        />
      </div>
      <el-tree
        ref="tree"
        :data="dataList.auth"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        :render-content="renderContent"
        :default-checked-keys="dataList.checks"
        @check-change="handleCheckChange"
      ></el-tree>
      <!-- <div class="deit-bot-bot">
        <span>是否显示：</span>
        <div>
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </div>
      </div>-->
      <div class="deit-bot-button" @click="onToSubmit">提交</div>
    </div>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      value: "",
      radio: 1,
      dataList: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      pickOnArray: [], //所有选中的节点
      jurisdictionData: ""
    };
  },
  created() {
    let { query } = this.$route;
    this.jurisdictionData = query;
    console.log(this.jurisdictionData);
    this.$nextTick(() => {
      this.initDataList();
    });
  },
  mounted() {
    var _levelname = document.getElementsByClassName("levelname"); //levelname是上面的最底层节点的名字，查询，新增。。
    console.log(_levelname);
    setTimeout(function() {
      //等到树都加载完了再去执行的这里
      for (var i = 0; i < _levelname.length; i++) {
        _levelname[i].parentNode.style.cssFloat = "left"; //最底层的节点，包括多选框和名字都让他左浮动
        _levelname[i].parentNode.style.styleFloat = "left";
      }
    }, 580);
  },
  methods: {
    onShowCharacterName() {
      this.$router.go(-1);
    },
    //获取角色权限列表
    async initDataList() {
      console.log(this.jurisdictionData);
      let url = "/admin/role_access/";
      console.log(url);
      let params = {
        id: this.jurisdictionData.id
      };
      let response = await get({ url, params });
      console.log(response);
      this.dataList = response;
    },
    renderContent(h, { node, data, store }) {
      let classname = "";
      if (node.level === 3) {
        classname = "levelname";
      }
      // 由于项目中有二级菜单也有三级菜单，就要在此做出判断。
      if (node.level === 2 && node.childNodes.length === 0) {
        classname = "levelname";
      }
      return <p class={classname}>{node.label}</p>;
    },

    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes();
      res.forEach(item => {
        this.pickOnArray.push(item.id);
      });
    },
    async onToSubmit() {
      let url = "/admin/role_access";
      let data = {
        id: this.jurisdictionData.id,
        rules: this.pickOnArray.toString()
      };
      let response = await put({ url, data });
      this.$message("修改成功");
      if (response.msg) return this.$message(response.msg);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.deit {
  display: flex;
  height: 100%;
  flex-direction: column;
  .deit-top {
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    padding: 20px 25px;
    box-sizing: border-box;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .deit-top-tit {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .deit-top-con {
      font-size: 20px;
      color: #3cb371;
    }
  }
  .deit-bot {
    margin-top: 30px;
    background-color: #fff;

    .deit-bot-top {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      padding: 20px 25px;
      box-sizing: border-box;
      span {
        width: 100px;
      }
      input {
        flex: auto;
        height: 40px;
        line-height: 50px;
        border: 1px solid rgba(151, 151, 151, 1);
        padding: 0 20px;
        box-sizing: border-box;
      }
    }
    .el-tree {
      padding: 20px 40px;
      box-sizing: border-box;
    }
    .deit-bot-bot {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-top: 1px solid rgba(216, 216, 216, 1);
      border-bottom: 1px solid rgba(216, 216, 216, 1);
      height: 60px;
      div {
        margin-left: 30px;
      }
    }
    .deit-bot-button {
      width: 372px;
      height: 40px;
      background: rgba(60, 179, 113, 1);
      line-height: 40px;
      text-align: center;
      margin: 30px auto;
      color: #ffffff;
      font-size: 18px;
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
        width: 140px;
        padding-right: 10px;
        box-sizing: border-box;
        text-align: right;
      }
      .box--right {
        margin-left: 10px;
      }
      input {
        width: 630px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        margin-left: 10px;
        background-color: #f1f1f1;
        border: none;
      }
      .el-select {
        width: 630px;
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
