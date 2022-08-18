# 日历组件 uiDatePicker

### 介绍

uiDatePicker 是一个日历组件

### 引入

```js
import Vue from 'vue';
import { uiDatePicker } from 'nightboys-ui';

Vue.use(uiDatePicker);
```

## 代码演示

### 基础用法

```html
<ui-date-picker
  ref="myDatePicker"
  startDate="2020-01-01"
  :isShow="showDatePicker"
  :title="title"
  :dateRange="isDateRange"
  :dateType="dateType"
  @confirm="onConfirm"
  @close="onClose"
></ui-date-picker>

<script>
		import uiDatePicker from "@/components/uiDatePicker";
		export default {
	  		components: {
	    		uiDatePicker
	  		},
			data(){
				return {
					showDatePicker: false,
					title: '请选择日期',
					isDateRange: true,
					dateType: 'date'
				}
			},
			methods:{
				onConfirm(value) {
			      //console.log("选择日期===", value);
			      this.showDatePicker = false；
			    },

			    onClose() {
			      //console.log("取消选择===");
			      this.showDatePicker = false；
			    },

				// 动态设置所有列默认选中日期
			    setPickerValues() {
			      this.showPicker = true;
			      this.$nextTick(() => {
			        this.$refs.myDatePicker.setPickerValues(['2020-08-01', '2021-10-02']);
			      });
			    },

			    // 动态设置指定列默认选中日期
			    setColumnPickerValues() {
			      this.showPicker = true;
			      this.$nextTick(() => {
			        this.$refs.myDatePicker.setColumnValue(0, '2020');
			      });
			    },
			}
		}
	<script>
```

## API

### Props

| 参数         | 类型          | 默认值                 | 说明                                                          |
| ------------ | ------------- | ---------------------- | ------------------------------------------------------------- |
| isShow       | boolean       | false                  | 显示/隐藏                                                     |
| title        | string        | 请选择日期             | 顶部标题内容                                                  |
| label        | array         | 【起始日期，结束日期】 | 提示文本                                                      |
| startDate    | string        | 2011-01-01             | 起始时间，默认为最近 10 年；取值示例：2010/2010-01/2010-01-01 |
| endDate      | string        | new Date()             | 截止时间，默认为今天；取值示例：2010/2010-01/2010-01-01       |
| dateRange    | boolean       | false                  | 是否为日期范围选择                                            |
| dateType     | string        | date                   | 选择器类型: 日:date, 月:month, 年:year                        |
| itemHeight   | number/string | 42                     | 选项高度，默认 42px                                           |
| isAllowAfter | boolean       | false                  | 是否允许选择当前日期之后的时间                                |

### Events

| 事件名  | 说明               | 回调参数 |
| ------- | ------------------ | -------- |
| confirm | 点击完成按钮时触发 | value    |
| close   | 点击取消按钮时触发 | 无       |

### Methods

| 方法名          | 参数               | 说明                       | 示例                                        |
| --------------- | ------------------ | -------------------------- | ------------------------------------------- |
| setPickerValues | values             | 动态设置所有列默认选中日期 | ['2020-08-01']、['2020-08-01','2020-10-01'] |
| setColumnValue  | columnIndex, value | 动态设置指定列默认选中日期 | (0, '2020')                                 |
