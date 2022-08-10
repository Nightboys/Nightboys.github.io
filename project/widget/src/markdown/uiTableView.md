	author: liuch2@finchina.com
	update by liuch2 2021/09/09
	********************************
	特别说明：此组件依赖vant,需安装vant依赖，命令如下：
	/**Vue 2 项目，安装 Vant 2：**/
	npm i vant -S

	/**Vue 3 项目，安装 Vant 3：**/
	npm i vant@next -S
	********************************
	vant地址：https://youzan.github.io/vant/#/zh-CN
	组件svn地址：https://192.168.100.188/svn/FaTeam/Demo/trunk/mobile/hf/components
	组件git地址：https://git.finchina.com/hf-develop/web/1/vue_group/tree/master/app%E7%BB%84%E4%BB%B6%E6%96%87%E6%A1%A3/app_document


## 列表分页组件 uiTableView ##

使用用例：

	<ui-table-view tabRef="natureTable" isShowPage :total="list.length">
		<template #colgroup>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
         </template>
         <template #thead>
            <tr>
              <th>成交日期</th>
              <th>加权收益率</th>
              <th>加权均价</th>
              <th>成交额(万)</th>
            </tr>
         </template>
         <template #tbodyContent>
            <tr v-for="(tb, i) in list">
              <td>tb.Tdate</td>
              <td>tb.weightedYield</td>
              <td>tb.weightedPrice</td>
              <td>tb.dealAmount</td>
            </tr>
         </template>
	</ui-table-view>

	<script>
		import uiTableView from "@/components/uiTableView";
		export default {
	  		components: {
	    		uiTableView
	  		},
			data(){
				return {
					list:[]
				}
			},
			methods:{}
		}
	<script>

 
参数说明：

 参数 | 类型 | 默认值 | 说明 
 :-----| :----: | :----- | :-----
 tabRef | String | myTable | 必填项，表格唯一值ref 
 isShowPage | boolean | false | 是否分页，默认false不分页
 isWrap | boolean | false | 是否允许内容换行，默认false不换行
 isShowMore | boolean | true | 分页时，是否显示展开剩余按钮
 isAnimated | boolean | true | 是否开启分页切换动画
 step | String/Number | 8 | 每页显示条数，初始展示6条，展开后每页展示8条
 total | String/Number | 0 | 数据总条数


Slots说明：

 名称 | 说明 
 :-----| :-----
 colgroup | 列宽
 thead | 表头数据
 tbodyContent | 表体内容
 tbodyFixed | 表体固定顶部内容（预留）
