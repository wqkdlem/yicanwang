
<template>
  <div class="moreUplodImg">
    <!-- <el-upload
      class="upload-pic"
      :action="domain"
      :data="QiniuData"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :before-remove="beforeRemove"
      :show-file-list="false"
      :limit="9"
      multiple
      :on-exceed="handleExceed"
      :file-list="data.uploadPicUrl"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>-->

    <el-upload
      :action="domain"
      :data="QiniuData"
      list-type="picture-card"
      :on-change="hidChange"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :file-list="data.uploadPicUrl"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- <div class="moreUplodImg-content" v-if="uploadPicUrl&&uploadPicUrl.length">
      <div class="moreUplodImg-content-i" v-for="(item,index) in data.uploadPicUrl" :key="index">
        <img class="moreUplodImg-content-i-del" :src="deleIcon" alt @click="onDele(index)" />
        <img :src="item" class="avatar" />
      </div>
    </div>-->
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import { localSave, localRead } from "@/lib/local.js";
export default {
  name: "HelloWorld",
  props: ["uploadPicUrl"],
  data() {
    return {
      formAdd: { brandLogo: "" },
      loading: false,
      QiniuData: {
        key: "", //图片名字处理
        token: "", //七牛云token
        data: {}
      },
      domain: "https://up-z2.qiniup.com", // 七牛云的上传地址（华东区）
      qiniuaddr: "res.ycw.emjiayuan.com", // 七牛云的图片外链地址 七牛云空间的外链地址
      fileList: [],
      uplodingImg: require("@/assets/new_images/uplodingImg.png"),
      deleIcon: require("@/assets/new_images/deleIcon.png"),
      data: {
        uploadPicUrl: [],
        uploadPicImg: []
      }
    };
  },
  created() {
    this.getQiniuToken();
    this.data.uploadPicUrl = this.uploadPicUrl;
  },
  watch: {
    uploadPicUrl(news, old) {
      // this.data.uploadPicUrl = news;
    }
  },
  methods: {
    async getQiniuToken() {
      let url = "/admin/qiniu_token";
      let response = await get({ url });
      console.log(response, "获取七牛云token");
      //赋值保存在本地
      this.QiniuData.token = response;
      // localRead("username")
    },
    beforeAvatarUpload(file) {
      this.QiniuData.data = file;
      this.QiniuData.key = `${file.name}`;
      console.log(this.QiniuData.key);
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.data.uploadPicUrl = fileList;
      // this.data.uploadPicUrl = [];
      // this.data.uploadPicImg = [];
      // fileList.map(item => {
      //   this.data.uploadPicUrl.push(
      //     `http://${this.qiniuaddr}/${item.response.key}`
      //   );
      //   this.data.uploadPicImg.push(item.response.key);
      // });
      // this.uploadPicUrl = this.data.uploadPicUrl;
      // this.$emit("uploadSuccess", this.data);
    },
    uploadError(err, file, fileList) {
      console.log(err);
      //图片上传失败时调用
      this.$message({
        message: "上传出错，请重试！",
        type: "error",
        center: true
      });
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
    doLookImg() {
      this.uploadDialogVisible = true;
      this.uploadDialogImg = this.editState
        ? this.mainInfo.brandLogo
        : this.formAdd.brandLogo;
    },
    handleRemove(file, fileList) {
      // this.uploadPicUrl = [];
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 9 张图片，如需更换，请删除上一张图片在重新选择！`
      );
    },
    onDele(index) {
      console.log(index);
      this.data.uploadPicUrl.splice(index, 1);
      this.data.uploadPicImg.splice(index, 1);
    },
    hidChange(file, fileList) {
      console.log(file, fileList);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.moreUplodImg {
  display: flex;
  flex-wrap: wrap;
}
img {
  width: 160px;
  height: 160px;
}
.moreUplodImg-content {
  display: flex;
  flex-wrap: wrap;
  .moreUplodImg-content-i {
    width: 160px;
    height: 160px;
    position: relative;
    margin-right: 10px;
    margin-top: 8px;
    .moreUplodImg-content-i-del {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
      width: 20px;
      height: 20px;
      display: block;
    }
    .avatar {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 888;
    }
  }
  .moreUplodImg-content-i:last-child {
    margin-right: 0px;
  }
}
</style>
