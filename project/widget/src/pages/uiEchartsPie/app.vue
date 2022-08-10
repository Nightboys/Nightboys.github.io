<!-- 
	* @description: echarts饼图组件
	* @author: zhangzf
	* @date: 2021-09-10
!-->
<template>
  <div class="box">
    <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiEchartsPie')">
      查看说明文档
    </van-button>
    <!-- echarts饼图组件 -->
    <ui-echarts-pie
      id="echarts-pie"
      :style="{ width: '100%', height: '200px' }"
      :dataList="dataList"
      :showTooltip="showTooltip"
      :colorList="colorList"
      :showLegend="showLegend"
      :echartPieBox="echartPieBox"
    ></ui-echarts-pie>
    <div class="markdown" v-html="htmlMD"></div>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiEchartsPie from '@/components/uiEchartsPie';
// import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiEchartsPie.md';
export default {
  components: {
    uiEchartsPie,
    // VueMarkdown,
  },
  data() {
    return {
      urlConcat,
      htmlMD: md,
      dataList: [
        {
          value: 284,
          name: '上诉方',
        },
        {
          value: 270,
          name: '被诉方',
        },
        {
          value: 15,
          name: '其他',
        },
      ],
      showTooltip: true,
      colorList: ['#3986FE', '#F26279', '#F9D237', '#35CACA', '#EDB965', '#73E6BF', '#4CCA72'],
      showLegend: true,
    };
  },
  created() {
    resize();
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import '@/styles/commons.less';
@import '@/styles/github-markdown.css';
.box {
  font-size: 0.24rem;
}
</style>
