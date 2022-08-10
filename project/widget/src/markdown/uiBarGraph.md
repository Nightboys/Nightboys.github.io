```
author: liaowei@finchina.com
update by liaowei 2021/09/15
```
### 柱状图组件

说明：此组件依赖echarts，需先安装echarts，命令如下：

```js
yarn add echarts

// 1.全局引入
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

// 2.按需引入
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
	LegendComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
	LegendComponent,
  BarChart,
	LineChart,
  CanvasRenderer
]);
Vue.prototype.$echarts = echarts

```

##### 使用用例
使用用例：

	<ui-bar-graph 
		type="ver-bar-graph"
		 domId="ver-bar-graph"
		ref="barGraph"
		:options="echartsOption">
	</ui-bar-graph>
	
	特别说明：暂无
		
	<script>
	import uiBarGraph from '@/components/uiBarGraph';
	export default {
		components: {
			uiBarGraph
		},
		data() {
			return {
				echartsOption: {}
			}
		},
		mounted() {
			this.initEchartsDataByAjax()
			setTimeout(() => {
				this.changeEchartsDataByAjax()
			}, 3000)
		},
		methods:{
			/**
			 * @description 获取数据并初始化
			 */
			initEchartsDataByAjax() {
				setTimeout(() => {
					this.echartsOption = {
						xAxis: [
							{
								data: ['201', '211', '212', '213', '214', '215', '216', '217', '218', '219']
							}
						],
						series: [
							{
								name: '余额',
								type: 'bar',
								data: [48, 33, 45, 23, 47, 34, 41, 23, 32, 49]
							}
						]
					}
				}, 1000)
			},
			
			/**
			 * @description 获取数据并更新echarts
			 */
			changeEchartsDataByAjax() {
				let rootFontSize = 50 // 这里实际是根元素fontSize
				setTimeout(() => {
					this.echartsOption = {
						xAxis: [
							{
								data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
							}
						],
						series: [
							{
								name: '基础货币余额',
								type: 'bar',
								barWidth: 0.24 * rootFontSize,
								data: [181, 231, 151, 121, 171, 141, 311, 121, 121, 191]
							}
						]
					}
				}, 1000)
			}
		}
	}
	<script>

 
参数说明：

 参数 | 类型 | 默认值 | 说明 
 :-----| :----: | :----- | :-----
 <div style="width:41px">type</div> | <div style="width:47px">String</div> | <div style="width:75px">ver-bar-graph</div> | 详细类型见下表
 options | Object | {} | echarts表配置对象,详细配置查阅echarts官网
 isDownSort | Boolean | null | true表示降序,false表示正序,此参数只有type为hor-bar-graph有效
 domId | String | 无 | 必须携带此prop
 
 type类型详情：

 类型名 | 说明 
 :-----| :----
 ver-bar-graph | 竖向柱状图
 hor-bar-graph | 横向柱状图
 line-bar-graph | 柱状图+折线图 
 
 Function：
 
 方法名 | 参数 | 说明 |
 :-----| :----: | :-----
 initComponent | 无 | 初始化柱状图组件
 updateBarGraph | 配置对象 | 更新柱状图配置




