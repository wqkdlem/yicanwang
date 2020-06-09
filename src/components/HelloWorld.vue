<template>
  <div class></div>
</template>

<script>
import { get, post, del,put,fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  created() {
    this.aaa();
  },
  methods: {
    async aaa() {
      let url = "/ssp/sheet/api/getSheetList";
      let data = "11111111111";
      let response = await fakeGet("111111111111");
      console.log(response);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
