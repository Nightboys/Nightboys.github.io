<template>
  <div class="box">
    <van-button round type="info" class="confirm-btn" @click="show = true">
      点击拉起组件
    </van-button>
    <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiEchartsTree')">
      查看说明文档
    </van-button>
    <van-popup v-model="show" closeable position="right" :style="{ width: '100%', height: '100%' }">
      <ui-echarts-tree
        :echartsData="echartsData"
        :echartsColor="echartsColor"
        :showTooltip="showTooltip"
        class="echartsTree"
      ></ui-echarts-tree
    ></van-popup>

    <div class="markdown" v-html="htmlMD"></div>
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import uiEchartsTree from '../../components/uiEchartsTree';
import md from '@/markdown/uiEchartsTree.md';
import { urlConcat } from '@/utils/urls';

export default {
  data() {
    return {
      htmlMD: md,
      show: false,
      urlConcat,
      showTooltip: true,

      echartsData: [
        {
          name: '第一', // First tree
          value: 40,
        },
        {
          name: '第二', // Second tree
          value: 30,
        },
        {
          name: '第三', // Second tree
          value: 28,
        },
        {
          name: '第四', // Second tree
          value: 20,
        },
        {
          name: '第五', // Second tree
          value: 17,
        },
        {
          name: '第六', // Second tree
          value: 16,
        },
        {
          name: '第七', // Second tree
          value: 13,
        },
        {
          name: '第八', // Second tree
          value: 10,
        },
      ],
      echartsColor: ['#3986FE', '#F26279', '#F9D237', '#4CCA72', '#73E6BF', '#F57F50', '#DB80D1', '#9D8AEE'],
    };
  },
  mounted() {
    resize();
  },
  components: { uiEchartsTree },
};
</script>

<style lang="less" scoped>
// @import '@/styles/commons.less';
@import '@/styles/github-markdown.css';
.echartsTree {
  margin-top: 1.6rem;
  padding: 0 0.32rem;
}
</style>
