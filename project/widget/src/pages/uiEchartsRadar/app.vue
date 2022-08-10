<template>
  <div class="box">
    <van-button round type="info" class="confirm-btn" @click="show = true">
      点击拉起组件
    </van-button>
    <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiEchartsRadar')">
      查看说明文档
    </van-button>
    <van-popup v-model="show" closeable position="right" :style="{ width: '100%', height: '100%' }">
      <ui-echarts-Radar class="echartsRadar" :echartsData="echartsData" :showTooltip="showTooltip"></ui-echarts-Radar
    ></van-popup>

    <div class="markdown" v-html="htmlMD"></div>
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import uiEchartsRadar from '../../components/uiEchartsRadar';
import md from '@/markdown/uiEchartsRadar.md';
import { urlConcat } from '@/utils/urls';

export default {
  data() {
    return {
      htmlMD: md,
      show: false,
      urlConcat,
      echartsData: {
        name: ['政府支持力度', '经营实力', '债务负担', '偿债能力', '市场因素', '舆情'],
        value: ['1', '3', '2', '1', '4', '5'],
      },
      showTooltip: true,
    };
  },
  mounted() {
    resize();
  },
  components: { uiEchartsRadar },
};
</script>

<style lang="less" scoped>
// @import '@/styles/commons.less';
@import '@/styles/github-markdown.css';
.echartsRadar {
  width: 100%;
  height: 6rem;
  box-sizing: border-box;
  margin-top: 1.6rem;
  padding: 0 0.32rem;
}
</style>
