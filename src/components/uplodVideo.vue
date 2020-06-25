<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="domain"
      :data="QiniuData"
      v-bind:on-progress="uploadVideoProcess"
      v-bind:on-success="handleVideoSuccess"
      v-bind:before-upload="beforeUploadVideo"
      v-bind:show-file-list="false"
      :limit="1"
    >
      <video
        style="width:180px;height:180px;"
        v-if="uploadVideos && !videoFlag"
        v-bind:src="uploadVideos"
        class="avatar video-avatar"
        controls="controls"
      >您的浏览器不支持视频播放</video>
      <el-progress
        v-if="videoFlag == true"
        type="circle"
        v-bind:percentage="videoUploadPercent"
        style="margin-top:7px;"
      ></el-progress>
      <img
        v-if="!uploadVideos && !videoFlag"
        :src="uplodVideo"
        alt
        style="width:180px;height:180px;"
      />
    </el-upload>
  </div>
</template>

<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
import { localSave, localRead } from "@/lib/local.js";
export default {
  name: "HelloWorld",
  props: ["uploadVideo"],
  data() {
    return {
      domain: "https://up-z2.qiniup.com",
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      },
      qiniuaddr: "res.ycw.emjiayuan.com", // 七牛云的图片外链地址 七牛云空间的外链地址
      uplodVideo: require("@/assets/new_images/uplodVideo.png"),
      QiniuData: {
        key: "", //图片名字处理
        token: "", //七牛云token
        data: {}
      },
      uploadVideos: ""
    };
  },
  created() {
    this.uploadVideos = this.uploadVideo || "";
    console.log(this.uploadVideos, "初始化获取视频");
    this.getQiniuToken();
  },
  watch: {
    uploadVideo(news, old) {
      this.uploadVideos = news;
    }
  },
  methods: {
    async getQiniuToken() {
      let url = "/admin/qiniu_token";
      let response = await get({ url });
      console.log(response);
      this.QiniuData.token = response;
      console.log(this.QiniuData);
    },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      //  "video/ogg",
      // "video/flv",
      // "video/avi",
      // "video/wmv",
      // "video/rmvb",
      // "video/mov"
      if (["video/mp4"].indexOf(file.type) == -1) {
        this.$message("请上传mp4格式的");
        return false;
      }
      if (!fileSize) {
        this.$message("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
      this.QiniuData.data = file;
      this.QiniuData.key = `${file.uid}${file.name}`;
      // console.log(this.QiniuData);
      console.log(file, "file");
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.videoFlag = false;
      this.uploadVideos = `http://${this.qiniuaddr}/${file.name}`;
      console.log(this.uploadVideos, "传给后端的视频地址");
      let data = {
        uploadVideo: this.uploadVideos,
        uploadPicImg: file.name
      };

      this.$emit("uploadVideoA", data);
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
