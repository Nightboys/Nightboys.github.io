# 地区组件 uiCityPicker

### 介绍

uiCityPicker 是一个地区组件，包含省、市、区及直辖市等；

### 引入

```js
import Vue from 'vue';
import { uiCityPicker } from 'nightboys-ui';

Vue.use(uiCityPicker);
```

## 代码演示

### 基础用法

```html
<uiCityPicker
  ref="myProvincePicker"
  :isShow="showPicker"
  :styleObject="dialogObject"
  :areaData="provinceData"
  :cityType="cityType"
  @submit="submitArea"
  @reset="resetArea"
  @close="closePicker"
></uiCityPicker>

<script>
		import uiCityPicker from '@/components/uiCityPicker';
		import { cityData, areaData } from './json/city.js';
		export default {
	  		components: {
	    		uiCityPicker
	  		},
			data(){
				return {
				  showPicker: false, //隐藏下拉选择控件

			      // 省市区
			      provinceData: cityData,
			      cityType: 'v1', //v1、v2、v3

			      // 设定弹窗高度
			      dialogObject: {
			        height: '90vh',
			        maxHeight: 'none',
			      },
				}
			},
			methods:{
				submitArea(detail) {
			      console.log('已选地区数据===', detail);
			    },

			    resetArea() {},

				closePicker() {
				      this.showPicker = false;
				},
			}
		}
	<script>

```

### 地区接口数据示例

```html
[{ "name": "全国", "level": "0", "value": "", "list":[...] },{ "name": "安徽省",
"level": "1", "value": "", "list":[...] }]
```

## API

### Props

| 参数     | 类型    | 默认值 | 说明                |
| -------- | ------- | ------ | ------------------- |
| isShow   | boolean | false  | 显示/隐藏           |
| cityType | string  | 请选择 | 组件类型 v1、v2、v3 |
| areaData | Array   | [ ]    | 地区数据            |

### Events

| 事件名     | 说明               | 回调参数     |
| ---------- | ------------------ | ------------ |
| submitArea | 点击确定按钮时触发 | 已选地区数据 |
| close      | 点击取消按钮时触发 | 无           |
| resetArea  | 点击重置按钮时触发 | 无           |
