```
author: zhangzf@finchina.com
update by zhangzf 2021/09/15
```

### 图表饼图组件



说明：此组件依赖echarts，需先安装echarts,推荐安装版本4.7.0，命令如下：

```js
yarn add echarts@4.7.0
```

##### 使用用例

```vue
<template>
  <div class="box">
    <!-- echarts地图组件 -->
    <ui-echarts-map
      :style="{ width: '100%', height: '300px' }"
      :dataList="dataList"
      :showTooltip="showTooltip"
      :showLegend="showLegend"
      :showVisualMap="showVisualMap"
      :inRangeColor="inRangeColor"
      :seriesNames="seriesNames"
    ></ui-echarts-map>
  </div>
</template>

<script>
import uiEchartsMap from '@/components/uiEchartsMap';

export default {
  components: {
    uiEchartsMap,
  },
  data() {
    return {
      dataList: {
        countList: [
          {
            name: '合计',
            value: '528',
          },
          {
            name: '上海',
            value: '176',
          },
          {
            name: '北京',
            value: '176',
          },
          {
            name: '新疆',
            value: '176',
          },
          {
            name: '黑龙江',
            value: '176',
          },
          {
            name: '云南',
            value: '176',
          },
          {
            name: '广东',
            value: 100,
          },
          {
            name: '青海',
            value: 11,
          },
        ],
        preList: [
          {
            name: '合计',
            value: '100',
          },
          {
            name: '上海',
            value: '20',
          },
          {
            name: '北京',
            value: '20',
          },
          {
            name: '新疆',
            value: '20',
          },
          {
            name: '黑龙江',
            value: '20',
          },
          {
            name: '云南',
            value: '20',
          },
        ],
      },
      showTooltip: true,
      showLegend: true,
      showVisualMap: true,
      inRangeColor: ['#ff998d', '#d62700'],
      seriesNames: [
        {
          name: '数量',
          unit: '家',
        },
        {
          name: '占比',
          unit: '%',
        },
      ],
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
| dataList     | Object   | {}                               | 否       | 对象 |
| showTooltip  | Boolean | true                             | 否       | 提示框是否展示，true为展示，false不展示           |
| inRangeColor    | Array   | ['#3986FE', '#F26279']       | 否       | 视觉映射组件颜色值                                      |
| showLegend   | Boolean | true                             | 否       | 图例标记是否展示，true为展示，false不展示         |
| showVisualMap | Boolean  | true | 否       | 是否展示视觉映射组件                                |
| geoColor | String  | '#ffdf33' |  否      |  鼠标点击区域高亮颜色                                |
| isSwitchMap | Boolean  | false |  否      |  点击省份是否跳转到省级地图                                |
| seriesNames | Array  | [{name: '数量',unit: '家'},{name: '占比',unit: '%'}] |  否      |  tooltip展示内容及单位                                |
| geoLabel | Object  | 无 |  否      |  是否在地图中展示省市名    {show: true, fontSize: 8}                                 |


