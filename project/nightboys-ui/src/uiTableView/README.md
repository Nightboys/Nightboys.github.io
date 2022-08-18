# 列表分页组件 uiTableView

### 介绍

uiTableView 是一个列表分页组件

### 引入

```js
import Vue from 'vue';
import { uiTableView } from 'nightboys-ui';

Vue.use(uiTableView);
```

## 代码演示

### 基础用法

```html

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
```

## API

### Props

| 参数       |     类型      | 默认值  | 说明                                             |
| :--------- | :-----------: | :------ | :----------------------------------------------- |
| tabRef     |    String     | myTable | 必填项，表格唯一值 ref                           |
| isShowPage |    boolean    | false   | 是否分页，默认 false 不分页                      |
| isWrap     |    boolean    | false   | 是否允许内容换行，默认 false 不换行              |
| isShowMore |    boolean    | true    | 分页时，是否显示展开剩余按钮                     |
| isAnimated |    boolean    | true    | 是否开启分页切换动画                             |
| step       | String/Number | 8       | 每页显示条数，初始展示 6 条，展开后每页展示 8 条 |
| total      | String/Number | 0       | 数据总条数                                       |

### Slots

| 名称         | 说明                     |
| :----------- | :----------------------- |
| colgroup     | 列宽                     |
| thead        | 表头数据                 |
| tbodyContent | 表体内容                 |
| tbodyFixed   | 表体固定顶部内容（预留） |
