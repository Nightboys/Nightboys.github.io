```
author: zhangzf@finchina.com
update by zhangzf 2021/09/15
```
### 图表饼图组件

说明：此组件依赖echarts，需先安装echarts，命令如下：

```js
yarn add echarts
```

##### 使用用例

```vue
<template>
  <div class="box">
    <!-- echarts饼图组件 -->
    <ui-echarts-pie
      :dataList="dataList"
      :showTooltip="showTooltip"
      :colorList="colorList"
      :showLegend="showLegend"
      :echartPieBox="echartPieBox"
    ></ui-echarts-pie>
  </div>
</template>

<script>
import uiEchartsPie from '@/components/uiEchartsPie';
export default {
  components: {
    uiEchartsPie,
  },
  data() {
    return {
      dataList: [
        {
          value: 284,
          name: '上诉方',
        },
        {
          value: 270,
          name: '被诉方',
        },
        {
          value: 15,
          name: '其他',
        },
      ],
      showTooltip: true,
      colorList: ['#3986FE', '#F26279', '#F9D237', '#35CACA', '#EDB965', '#73E6BF', '#4CCA72'],
      showLegend: true,
      echartPieBox: {
        width: '100%',
        height: '200px',
      },
    };
  },
  created() {
  },
  methods: {},
};
</script>

```

##### 参数说明

| 参数         | 类型    | 默认值                           | 是否必填 | 说明                                              |
| ------------ | ------- | -------------------------------- | -------- | ------------------------------------------------- |
| id | String  |  | 是       | 图表渲染div的id                                 |
| dataList     | Array   | []                               | 否       | 对象数组，对象由{name: String; value: Number}构成 |
| showTooltip  | Boolean | true                             | 否       | 提示框是否展示，true为展示，false不展示           |
| colorList    | Array   | ['#3986FE', '#F26279',...]       | 否       | 图表展示颜色                                      |
| showLegend   | Boolean | true                             | 否       | 图例标记是否展示，true为展示，false不展示         |
| seriesRadius   | Array、Numbre、String | ['40%', '55%']                             | 否       | 设置饼图半径，若为全饼图可设置为['0%','55%']         |


