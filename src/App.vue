<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { localSave, localRead } from "@/lib/local.js";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
export default {
  name: "App",
  mounted() {
    this.getUserIP(ip => {
      this.ip = ip;
      console.log(ip);
      localSave("ip", this.ip);
    });
  },
  methods: {
    getUserIP(onNewIP) {
      let MyPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      let pc = new MyPeerConnection({
        iceServers: []
      });

      let noop = () => {};

      let localIPs = {};

      let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

      let iterateIP = ip => {
        if (!localIPs[ip]) onNewIP(ip);

        localIPs[ip] = true;
      };

      pc.createDataChannel("");
      pc.createOffer()
        .then(sdp => {
          sdp.sdp.split("\n").forEach(function(line) {
            if (line.indexOf("candidate") < 0) return;

            line.match(ipRegex).forEach(iterateIP);
          });

          pc.setLocalDescription(sdp, noop, noop);
        })
        .catch(reason => {});

      pc.onicecandidate = ice => {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return;

        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    }
  }
};
</script>

<style>
@import "./stylus/index.less";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100% !important;
  height: 100% !important;
  font-family: PingFang SC;
}
</style>
