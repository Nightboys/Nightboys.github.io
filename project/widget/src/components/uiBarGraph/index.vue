<template>
	<div :id="domId" style="width: 100%;height: 100%;;"></div>
</template>

<script>
/**
 * @property {String} type 柱状图类型
 * @property {Object} options 柱状图配置
 */
import getBarGraphOption from './difBarGraphOptions.js';
export default {
	props: {
		domId: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: 'ver-bar-graph'
		},
		options: {
			type: Object,
			default: {}
		},
		isDownSort: {
			type: Boolean,
			default: null
		}
	},
	data() {
		return {
			barGraphInstance: null, // 柱状图实例
			barGraphOptions: {}, // 配置项
		}
	},
	created() {
	},
	destroyed() {
		if(this.barGraphInstance) {
			this.barGraphInstance.dispose()
		}
	},
	watch: {
		options: {
			handler:function(valObj) {
				this.updateBarGraph(valObj)
			},
			deep: true
		}
	},
	mounted() {
		this.initComponent()
	},
	methods: {
		/**
		 * @description 初始化组件
		 */
		initComponent() {
			let _rootFontSize = Number(document.documentElement.style.fontSize.split('p')[0])
			let _barGraphOptions = getBarGraphOption(this.type, _rootFontSize, this.isDownSort)
			this.barGraphInstance = this.$echarts.init(document.getElementById(this.domId))
			this.barGraphInstance.setOption(_barGraphOptions)
			this.barGraphInstance.setOption(this.options)
			this.barGraphOptions = this.barGraphInstance.getOption()
			
		},
		
		/**
		 * @description 更新配置
		 * @param {Object} valObj 配置项 
		 */
		updateBarGraph(valObj) {
			this.barGraphInstance.setOption(valObj)
		}
	}
}
</script>

<style lang="less" scoped>
</style>
