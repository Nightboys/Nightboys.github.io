<template>
  <div class="box">
    <div v-if="!canShowBarGraph">
      <van-button round type="info" class="confirm-btn" @click="canShowBarGraph = true">
        点击拉起组件
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiBarGraph')">
        查看说明文档
      </van-button>
    </div>
		<van-popup v-model="canShowBarGraph" closeable position="right">
			<div class="split-html">竖向柱状图</div>
			<div class="graph-container">
				<ui-bar-graph ref="verBarGraph" domId="ver-bar-graph" :options="echartsOption"></ui-bar-graph>
			</div>
			<div class="split-html">柱状图+折线图</div>
			<div class="graph-container">
				<ui-bar-graph ref="LineBarGraph" domId="line-bar-graph"  type="line-bar-graph" :options="echartsOption"></ui-bar-graph>
			</div>
			<div class="split-html">横向柱状图</div>
			<div class="graph-container">
				<ui-bar-graph ref="HorBarGraph" domId="hor-bar-graph" type="hor-bar-graph" :options="echartsOption"></ui-bar-graph>
			</div>
			<div class="split-html">横向柱状图、降序</div>
			<div class="graph-container">
				<ui-bar-graph ref="HorDownBarGraph" domId="sorthor-bar-graph" type="hor-bar-graph" :isDownSort="true" :options="echartsOption"></ui-bar-graph>
			</div>
		</van-popup>
    <div class="markdown" v-html="htmlMD"></div>
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import md from '@/markdown/uiBarGraph.md';
import uiBarGraph from '@/components/uiBarGraph';
export default {
  components: {
		uiBarGraph
  },
  data() {
    return {
			canShowBarGraph: false,
      urlConcat,
      htmlMD: md,
			echartsOption: {}
    };
  },
  created() {
    resize();
  },
	watch: {
	},
	mounted() {
	},
  methods: {
  },
};
</script>

<style lang="less" scoped>
@import '@/styles/commons.less';
@import '@/styles/github-markdown.css';
.box {
  font-size: 0.24rem;
	& /deep/ .van-popup {
		height: 100% !important;
		width: 100% !important;
		
		.split-html {
			height: 0.32rem;
			background-color: #F8F8F8;
			margin-top: 0.42rem;
		}
		
		.graph-container {
			margin-top: 0.8rem;
			padding: 0 0.32rem;
			width: 100%;
			height: 6.3rem;
			box-sizing: border-box;
		}
		
	}
} 
</style>
