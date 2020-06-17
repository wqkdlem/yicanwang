<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="domain"
      v-bind:data="QiniuData"
      v-bind:on-progress="uploadVideoProcess"
      v-bind:on-success="handleVideoSuccess"
      v-bind:before-upload="beforeUploadVideo"
      v-bind:show-file-list="false"
    >
      <video
        style="width:180px;height:180px;"
        v-if="videoForm.showVideoPath !='' && !videoFlag"
        v-bind:src="videoForm.showVideoPath"
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
        v-else-if="videoForm.showVideoPath =='' && !videoFlag"
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
  props: ["uploadPicUrl"],
  data() {
    return {
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
      }
    };
  },
  created() {},
  watch: {
    uploadPicUrl(news, old) {
      console.log(news, old);
    }
  },
  methods: {
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        layer.msg("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        layer.msg("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(response, file, fileList) {
      this.uplodVideo = `http://${this.qiniuaddr}/${response.key}`;
      console.log(this.uploadPicUrl, "传给后端的视频地址");
      let data = {
        uploadPicUrl: this.uploadPicUrl,
        uploadPicImg: response.key
      };
      this.$emit("uploadSuccess", data);
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
