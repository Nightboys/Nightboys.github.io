# 页面缺省组件 uiNotFound

### 介绍

uiNotFound 是一个页面缺省组件

### 引入

```js
import Vue from 'vue';
import { uiNotFound } from 'nightboys-ui';

Vue.use(uiNotFound);
```

## 代码演示

### 基础用法

```html
<ui-not-found type="load-fail" :reloadHTML="setHtmlReload"></ui-not-found>

特别说明：
		type为load-fail可以传reloadHTML回调
		type为no-group-member可以传addMembers回调

<script>
	import uiNotFound from "@/components/uiNotFound";
	export default {
			components: {
				uiNotFound
			},
			methods:{
			/**
			 * @description 重新加载页面
			 */
			setHtmlReload() {
				console.log('重新加载页面')
			},
		}
	}
<script>
```

## API

### Props

| 参数       | 类型     | 默认值                             | 说明                            |
| ---------- | -------- | ---------------------------------- | ------------------------------- |
| type       | string   | no-data                            | 详细类型见下表                  |
| reloadHTML | Function | () => { console.log('刷新页面'); } | 仅 type 为 load-fail 有用       |
| addMembers | Function | () => { console.log('添加成员');   | 仅 type 为 no-group-member 有用 |

### type

| 类型名          | 说明           |
| --------------- | -------------- |
| no-data         | 暂无相关数据   |
| no-msg          | 暂无消息通知   |
| load-fail       | 页面加载失败   |
| no-network      | 网络已断开     |
| no-data         | 筛选条件无结果 |
| no-filter-data  | 无搜索结果     |
| no-search-data  | 组合内无成员   |
| no-group-member | 无收藏记录     |
| no-collection   | 开发中         |
| in-developing   | 资讯已删除     |
| have-deleted    | 无估值查看权限 |
| no-authority    | 企业已注销     |
| have-cancelled  | 暂无相关数据   |
| have-default    | 债券已违约     |
| have-expired    | 债券已到期     |

### Slots

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 自定义图片下方的内容 |
