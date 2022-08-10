<template>
  <div class="box">
    <div>
      <van-button round type="info" class="confirm-btn" @click="showPicker = true">
        点击拉起组件
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiPicker')">
        查看说明文档
      </van-button>
    </div>

    <!-- 下拉选择组件 -->
    <ui-picker :isShow="showPicker" :columns="columns" @confirm="onConfirm" @close="onClose"></ui-picker>

    <div class="markdown" v-html="htmlMD"></div>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiPicker from '@/components/uiPicker';
import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiPicker.md';
export default {
  components: {
    uiPicker,
    VueMarkdown,
  },
  data() {
    return {
      urlConcat,
      htmlMD: md,
      showPicker: false,
      columns: [
        //https://youzan.github.io/vant/#/zh-CN/picker
        // 第一列
        {
          values: ['周一', '周二', '周三', '周四', '周五'],
          defaultIndex: 2,
        },
        // 第二列
        {
          values: ['上午', '下午', '晚上'],
          defaultIndex: 1,
        },
      ],
    };
  },
  created() {
    resize();
  },
  methods: {
    closePicker() {
      this.showPicker = false;
    },
    onConfirm(detail) {
      // console.log('选择===', detail);
      this.closePicker();
      this.$toast({
        message: detail.value.join(' '),
        icon: 'like-o',
      });
    },

    onClose() {
      // console.log("取消选择===");
      this.closePicker();
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
