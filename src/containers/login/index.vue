<template>
  <div class="login">
    <img class="login_bg" :src="bgImg" alt />
    <div class="long-content">
      <div class="long-content-tita">伊餐网管理后台登录</div>
      <div class="long-content-titb">User login</div>
      <div class="long-content-user">
        <img :src="userImg" alt />
        <input type="text" placeholder="请输入用户名" v-model="userName" />
      </div>
      <div class="long-content-pass">
        <img :src="passImg" alt />
        <input type="password" placeholder="请输入密码" v-model="passWord" />
      </div>
      <div class="long-content-code">
        <img class="long-content-code-left" :src="codeIconImg" alt />
        <input class="long-content-code-cen" placeholder="请输入验证码" type="text" v-model="code" />
        <div class="long-content-code-rig">
          <!-- <img
            v-if="showCode"
            @click="initGetCode"
            src="http://xbm.com/index.php/admin/image_code"
            alt
          />-->
          <div @click="initGetCode">
            <SIdentify :identifyCode="identifyCode" :width="200" :height="68"></SIdentify>
          </div>
        </div>
      </div>
      <div class="long-content-remeber">
        <img
          class="long-content-remeber-img"
          :src="ifChecked?checked:unchecked"
          alt
          @click="onChecked"
        />
        <div class="long-content-remeber-con" @click="onChecked">记住用户名和密码</div>
      </div>
      <div class="long-content-login" @click="onLogin">登 录</div>
    </div>
  </div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
import { localSave, localRead } from "@/lib/local.js";
import SIdentify from "@/components/code.vue";
export default {
  name: "HelloWorld",
  components: { SIdentify },
  data() {
    return {
      userName: "",
      passWord: "",
      code: "",
      ifChecked: false,
      codeImg: "",
      showCode: false,
      identifyCode: "",
      bgImg: require("@/assets/new_images/login_bg.png"),
      userImg: require("@/assets/new_images/User.png"),
      passImg: require("@/assets/new_images/Key.png"),
      codeIconImg: require("@/assets/new_images/code.png"),
      checked: require("@/assets/new_images/checked.png"),
      unchecked: require("@/assets/new_images/unchecked.png")
    };
  },
  created() {
    if (localRead("username")) {
      this.userName = localRead("username");
      this.passWord = localRead("password");
      this.ifChecked = true;
    }
    if (localRead("token")) return this.initGetCode();
    this.initGetToken();
  },
  mounted() {},
  methods: {
    //是否记住密码
    onChecked() {
      this.ifChecked = !this.ifChecked;
      console.log(this.ifChecked, "this.ifChecked");
    },
    async initGetCode() {
      this.showCode = false;
      let url = "admin/image_code";
      let response = await get({ url });
      console.log(response);
      this.identifyCode = response.image_code.toString();
    },
    async initGetToken() {
      this.showCode = false;
      let url = "admin/token";
      let response = await get({ url });
      localSave("token", response.token);
      this.initGetCode();
    },
    async onLogin() {
      let url = "/admin/login";
      if (!this.userName) return this.$message("请先输入账号");
      if (!this.passWord) return this.$message("请先输入密码");
      if (!this.code) return this.$message("请先输入验证码");
      let data = {
        username: this.userName,
        password: this.passWord,
        image_code: this.code
      };
      let response = await post({ url, data });
      console.log(response);
      this.$router.push({ path: "/home" });
      if (!this.ifChecked) {
        this.ifChecked = false;
        localSave("username", "");
        localSave("password", "");
        return;
      } else {
        localSave("username", this.userName);
        localSave("password", this.passWord);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
body {
  margin: 0 !important;
}
.login {
  width: 100% !important;
  height: 100% !important;
  min-width: 1240px !important;
  min-height: 960px !important;
  input::-webkit-input-placeholder {
    color: rgba(93, 93, 93, 0.5);
    font-size: 20px;
  }
  input::-moz-input-placeholder {
    color: rgba(93, 93, 93, 0.5);
    font-size: 20px;
  }
  input::-ms-input-placeholder {
    color: rgba(93, 93, 93, 0.5);
    font-size: 20px;
  }
  .login_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    min-width: 1240px !important;
    min-height: 960px !important;
  }
  .long-content {
    width: 675px;
    height: 715px;
    background: #fff;
    box-shadow: 0px 14px 18px 4px rgba(0, 0, 0, 0.35);
    position: absolute;
    top: 50%;
    right: 190px;
    margin-top: -362px;
    padding: 65px;
    box-sizing: border-box;
    text-align: left;
    .long-content-tita {
      font-size: 34px;
      font-weight: 400;
      color: rgba(60, 179, 113, 1);
    }
    .long-content-titb {
      font-family: Arial;
      font-weight: 400;
      color: rgba(149, 149, 149, 0.8);
      margin-top: 5px;
    }
    .long-content-user,
    .long-content-pass,
    .long-content-code {
      width: 550px;
      height: 70px;
      border: 1px solid rgba(223, 223, 223, 1);
      display: flex;
      align-items: center;
      padding: 0 30px;
      box-sizing: border-box;
      margin-top: 50px;
      img {
        width: 32px;
        height: 33px;
      }
      input {
        padding: 0 30px;
        box-sizing: border-box;
        border: none;
        outline: medium;
        height: 30px;
        font-size: 20px;
      }
    }
    .long-content-code {
      .long-content-code-rig {
        width: 200px;
        height: 68px;
        img {
          width: 100%;
          height: 100%;
        }
        // .s-canvas {
        //   width: 190px !important;
        //   height: 68px !important;
        //   canvas {
        //     width: 200px !important;
        //     height: 68px !important;
        //   }
        // }
      }
      padding: 0 0 0 30px;
    }
    .long-content-remeber {
      width: 550px;
      height: 40px;
      display: flex;
      align-items: center;
      margin-top: 35px;
      long-content-remeber-img {
        width: 41px;
        height: 40px;
      }
      .long-content-remeber-con {
        font-size: 22px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        padding-left: 15px;
      }
    }
    .long-content-login {
      width: 550px;
      height: 80px;
      background: rgba(60, 179, 113, 1);
      line-height: 80px;
      text-align: center;
      color: #ffffff;
      font-size: 34px;
      margin-top: 40px;
    }
  }
}
</style>
