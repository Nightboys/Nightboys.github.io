# 下拉选择组件 uiPicker

### 介绍

uiPicker 是一个下拉选择组件

### 引入

```js
import Vue from 'vue';
import { uiPicker } from 'nightboys-ui';

Vue.use(uiPicker);
```

## 代码演示

### 基础用法

```html
	<ui-picker
      :isShow="showPicker"
      :columns="columns"
      @confirm="onConfirm"
      @close="onClose"
    ></ui-picker>

	<script>
		import uiPicker from "@/components/uiPicker";
		export default {
	  		components: {
	    		uiPicker
	  		},
			data(){
				return {
					showPicker: false,
					columns: [
				        {
				          values: ["周一", "周二", "周三", "周四", "周五"],
				          defaultIndex: 2,
				        },
				        {
				          values: ["上午", "下午", "晚上"],
				          defaultIndex: 1,
				        },
				      ],
				}
			},
			methods:{
				onConfirm(detail) {
			      //console.log("选择数据===", detail);
			      this.showPicker = false；
			    },

			    onClose() {
			      //console.log("取消选择===");
			      this.showPicker = false；
			    },
			}
		}
	<script>
```

## API

### Props

| 参数       |     类型      | 默认值 | 说明                                                                           |
| :--------- | :-----------: | :----- | :----------------------------------------------------------------------------- |
| isShow     |    boolean    | false  | 显示/隐藏                                                                      |
| title      |    string     | 请选择 | 顶部标题内容                                                                   |
| itemHeight | number/string | 42     | 选项高度，默认 42px                                                            |
| columns    |     Array     | [ ]    | 对象数组，配置每一列显示的数据( https://youzan.github.io/vant/#/zh-CN/picker ) |

### Events

| 事件名  | 说明               | 回调参数                                                                        |
| :------ | :----------------- | :------------------------------------------------------------------------------ |
| confirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的索引 <br/> 多列：所有列选中值，所有列选中值对应的索引 |
| close   | 点击取消按钮时触发 | 无                                                                              |

### Methods

| 方法名          |        参数        |           说明           | 示例            |
| :-------------- | :----------------: | :----------------------: | :-------------- |
| setPickerValues |       values       | 动态设置所有列默认选中值 | ['周一','下午'] |
| setColumnValue  | columnIndex, value |   动态设置指定列默认值   | (0, '周二')     |
