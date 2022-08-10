<!-- 
	* @description: echarts地图组件
	* @author: zhangzf
	* @date: 2021-09-10
!-->
<template>
  <div class="box">
    <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiEchartsPie')"> 查看说明文档 </van-button>
    <!-- echarts饼图组件 -->
    <ui-echarts-map
      :style="{ width: '100%', height: '300px' }"
      :dataList="dataList"
      :showTooltip="showTooltip"
      :showLegend="showLegend"
      :showVisualMap="showVisualMap"
      :inRangeColor="inRangeColor"
      :seriesNames="seriesNames"
    ></ui-echarts-map>
    <div class="markdown" v-html="htmlMD"></div>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiEchartsMap from '@/components/uiEchartsMap';
// import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiEchartsMap.md';
export default {
  components: {
    uiEchartsMap,
    // VueMarkdown,
  },
  data() {
    return {
      urlConcat,
      htmlMD: md,
      dataList: {
        countList: [
          {
            name: '合计',
            value: '528',
          },
          {
            name: '上海',
            value: '176',
          },
          {
            name: '北京',
            value: '176',
          },
          {
            name: '新疆',
            value: '176',
          },
          {
            name: '黑龙江',
            value: '176',
          },
          {
            name: '云南',
            value: '176',
          },
          {
            name: '广东',
            value: 100,
          },
          {
            name: '青海',
            value: 11,
          },
        ],
        preList: [
          {
            name: '合计',
            value: '100',
          },
          {
            name: '上海',
            value: '20',
          },
          {
            name: '北京',
            value: '20',
          },
          {
            name: '新疆',
            value: '20',
          },
          {
            name: '黑龙江',
            value: '20',
          },
          {
            name: '云南',
            value: '20',
          },
        ],
      },
      showTooltip: true,
      showLegend: true,
      showVisualMap: true,
      inRangeColor: ['#ff998d', '#d62700'],
      seriesNames: [
        {
          name: '数量',
          unit: '家',
        },
        {
          name: '占比',
          unit: '%',
        },
      ],
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
