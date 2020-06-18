<template>
  <div>
    <el-upload
      class="upload-pic"
      :action="domain"
      :data="QiniuData"
      :on-remove="handleRemove"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :before-remove="beforeRemove"
      :before-upload="beforeAvatarUpload"
      :limit="1"
      multiple
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <div>
        <img v-if="uploadPicUrl" :src="uploadPicUrl||uplodingImg" class="avatar" />
        <img v-else :src="uplodingImg" />
      </div>
      <!-- <el-button size="small" type="primary">选择图片</el-button> -->
    </el-upload>
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
      uplodingImg: require("@/assets/new_images/uplodingImg.png")
    };
  },
  created() {
    this.getQiniuToken();
  },
  watch: {
    uploadPicUrl(news, old) {
      console.log(news, old);
    }
  },
  methods: {
    async getQiniuToken() {
      let url = "/admin/qiniu_token";
      let response = await get({ url });
      this.QiniuData = response;
      console.log(this.QiniuData);
    },
    beforeAvatarUpload(file) {
      this.QiniuData.data = file;
      this.QiniuData.key = `${file.name}`;
      console.log(this.QiniuData.key);
    },
    uploadSuccess(response, file, fileList) {
      this.uploadPicUrl = `http://${this.qiniuaddr}/${response.key}`;
      console.log(this.uploadPicUrl, "传给后端的图片地址");
      let data = {
        uploadPicUrl: this.uploadPicUrl,
        uploadPicImg: response.key
      };
      this.$emit("uploadSuccess", data);
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
      this.uploadPicUrl = "";
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 张图片，如需更换，请删除上一张图片在重新选择！`
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-upload {
  div {
    img {
      width: 160px;
      height: 160px;
    }
  }
}
</style>
