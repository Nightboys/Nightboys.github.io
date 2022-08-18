# 筛选组件 uiMenuHead

### 介绍

uiMenuHead 是一个数据筛选组件

### 引入

```js
import Vue from 'vue';
import { uiMenuHead } from 'nightboys-ui';

Vue.use(uiMenuHead);
```

## 代码演示

### 基础用法

```html
<uiMenuHead :menus="menuData" @menuChange="menuChange" ref="menu">
  <template #right>
    <span class="right-count">999+</span>
  </template>
</uiMenuHead>

<script>
  import menuData from './menus';
  export default {
    components: {
      uiMenuHead
    },
    data(){
      return {
        menuData,
        menuParams: {}, //筛选结果参数
      }
    },
    methods:{
      /*
      *@arr: 更新后的menu数据
      *@idx: 当前选择筛选项下表面
      *@selectList: 当前筛选项已选条件
      */
      menuChange(arr, idx, selectList = []){
          this.menuData = arr;
      }
    }
  }
<script>
```

## API

### Props

| 参数  | 类型  | 默认值 | 说明                           |
| ----- | ----- | ------ | ------------------------------ |
| menus | Array | [ ]    | 对象数组，配置每一列显示的数据 |

### Events

| 事件名     | 说明               | 回调参数               |
| ---------- | ------------------ | ---------------------- |
| menuChange | 筛选条件变化时触发 | (arr, idx, selectList) |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |

### Methods

| 方法名     | 参数         | 说明                     | 示例                                 |
| ---------- | ------------ | ------------------------ | ------------------------------------ |
| closeCover | {reset=true} | 主动关闭 menuHead 并重置 | $refs.menu.closeCover({reset:false}) |
