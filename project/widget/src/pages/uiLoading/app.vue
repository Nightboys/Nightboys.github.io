<template>
  <div class="box">
    <div>
      <van-button round type="info" class="confirm-btn" @click="openLoading">
        点击拉起组件
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiLoading')">
        查看说明文档
      </van-button>
    </div>

    <div class="markdown" v-html="htmlMD"></div>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiLoading.md';
export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      urlConcat,
      htmlMD: md,
      showPicker: true,
    };
  },
  created() {
    resize();
  },
  methods: {
    openLoading() {
      this.$loading.open();

      setTimeout(() => {
        this.$loading.close();
      }, 2500);
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/styles/commons.less';
@import '@/styles/github-markdown.css';
.box {
  font-size: 0.24rem;
}
</style>
