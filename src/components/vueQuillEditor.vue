<template>
  <div>
    <quill-editor class="quill" v-model="progs" @change="change"></quill-editor>
  </div>
</template>
<script>
import { get, post, del, put, fakeGet } from "@/utils/request.js";
export default {
  name: "HelloWorld",
  props: ["goods_content"],
  data() {
    return {
      progs: ""
    };
  },
  created() {
    this.progs = this.goods_content;
  },
  methods: {
    change() {
      this.$emit("change", this.progs);
    }
  }
};
</script>
<style  scoped lang="less">
.quill {
  width: 100%;
  height: 540px;
}
</style>