<template>
  <div class="moreUplodImg">
    <el-upload
      class="upload-pic"
      :action="domain"
      :data="QiniuData"
      :on-remove="handleRemove"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :before-remove="beforeRemove"
      :before-upload="beforeAvatarUpload"
      :show-file-list="false"
      :limit="9"
      multiple
      :on-exceed="handleExceed"
      :file-list="uploadPicUrla"
      ref="foreignPersonUploadItem"
    >
      <!-- <div>
        <img :src="uplodingImg" style="margin-right:10px;margin-top:8px;" />
      </div>-->
      <!-- <el-button size="small" type="primary">选择图片</el-button> -->

      <img style="margin:10px 10px 0 0;" :src="uplodingImg" />
    </el-upload>
    <div class="moreUplodImg-content" v-if="uploadPicUrla&&uploadPicUrla.length">
      <div class="moreUplodImg-content-i" v-for="(item,index) in uploadPicUrla" :key="index">
        <img class="moreUplodImg-content-i-del" :src="deleIcon" alt @click="onDele(index)" />
        <img :src="item.url" class="avatar" />
      </div>
    </div>
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
      },
      uploadPicUrla: []
    };
  },
  created() {
    this.getQiniuToken();
    if (!this.uploadPicUrl || !this.uploadPicUrl.length) return;
    this.uploadPicUrla = this.uploadPicUrl;
    console.log(this.uploadPicUrla, this.uploadPicUrl, "this.uploadPicUrla");
  },
  watch: {
    uploadPicUrl(news, old) {
      this.uploadPicUrla = news;
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
      console.log(this.QiniuData.data);
      this.QiniuData.key = `${file.uid}${file.name}`;
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "jpg" ||
        testmsg === "JPG" ||
        testmsg === "jpeg" ||
        testmsg === "JPEG" ||
        testmsg === "png" ||
        testmsg === "PNG" ||
        testmsg === "bmp" ||
        testmsg === "BMP";
      const isLt50M = file.size / 1024 / 1024 < 10;
      if (!extension) {
        this.$message({
          message: "上传图片只能是jpg / jpeg / png / bmp格式!",
          type: "error"
        });
        return false; //必须加上return false; 才能阻止
      }
      if (!isLt50M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "error"
        });
        return false;
      }
      return extension || isLt50M;
    },
    uploadSuccess(response, file, fileList) {
      console.log(file, fileList);
      this.data.uploadPicUrl = [];
      this.data.uploadPicImg = [];
      this.uploadPicUrla = [];
      if (!fileList.length) return false;
      console.log(fileList);
      fileList.map(item => {
        this.data.uploadPicUrl.push(`http://${this.qiniuaddr}/${item.name}`);
        this.data.uploadPicImg.push(item.name);
        this.uploadPicUrla.push({
          name: item.name,
          url: `http://${this.qiniuaddr}/${item.name}`,
          uid: item.uid,
          status: item.status
        });
      });
      console.log(this.uploadPicUrla);
      this.$emit("uploadSuccess", this.data);
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
      this.uploadPicUrl = [];
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
      this.uploadPicUrla.splice(index, 1);
      console.log(this.$refs);
      this.$refs.foreignPersonUploadItem.uploadFiles.splice(index, 1);
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
  width: 180px;
  height: 180px;
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