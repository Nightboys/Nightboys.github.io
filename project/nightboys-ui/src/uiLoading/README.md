# 页面加载状态组件 uiLoading

### 介绍

uiLoading 是一个页面加载状态组件

### 引入

```js
import Vue from 'vue';
import { uiLoading } from 'nightboys-ui';

Vue.use(uiLoading);
```

## 代码演示

### 基础用法

```html
<uiLoading></uiLoading>

<script>
		this.$loading.open({
	   text: '正在加载...',
	   opacity: 1,
	   bgColor: 'none',
		 top: '0' //px、%...
	});

	this.$loading.open(); //显示加载

	this.$loading.close(); //隐藏加载
<script>
```

## API

### Props

| 参数    | 类型   | 默认值              | 说明             |
| ------- | ------ | ------------------- | ---------------- |
| options | object | text: '正在加载...' | 配置项，详情如下 |

### options

| 参数    | 类型          | 默认值        | 说明       |
| ------- | ------------- | ------------- | ---------- |
| text    | string        | '正在加载...' | 提示文本   |
| opacity | number        | 1             | 背景透明度 |
| bgColor | string        | '#ffffff'     | 背景色     |
| top     | string,number | 0             | 距顶部距离 |

### Methods

| 方法名 | 参数     | 说明 | 示例 |
| ------ | -------- | ---- | ---- |
| open   | 显示加载 |
| close  | 隐藏加载 |
