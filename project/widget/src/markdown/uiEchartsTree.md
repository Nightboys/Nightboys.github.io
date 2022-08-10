#### 特别说明：此组件需要安装 [echarts](https://echarts.apache.org/zh/index.html) 

```
author: guopf@finchina.com
update by guopf 2021/09/13

1 按需引入
// 加载 echarts，注意引入文件的路径
import echarts from 'echarts/lib/echarts'
// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/treemap'
import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
Vue.prototype.$echarts = echarts

2 全局引入
在 main.js 中
// 引入 echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

组件git地址：https://git.finchina.com/hf-develop/web/1/vue_group/tree/master/app%E7%BB%84%E4%BB%B6%E6%96%87%E6%A1%A3/app_document
```

## 矩形树图组件

使用示例

```

<ui-echarts-tree :echartsData="echartsData"
 :echartsColor="echartsColor"
></ui-echarts-tree>

<script>
import { resize } from '@/utils/dom';
import uiEchartsTree from '../../components/uiEchartsTree';
export default {
  data() {
    return {
      showTooltip:true,
      echartsData: [
        {
          name: '第一', // First tree
          value: 40,
        },
        {
          name: '第二', // Second tree
          value: 30,
        },
        {
          name: '第三', // Second tree
          value: 28,
        },
        {
          name: '第四', // Second tree
          value: 20,
        },
        {
          name: '第五', // Second tree
          value: 17,
        },
        {
          name: '第六', // Second tree
          value: 16,
        },
        {
          name: '第七', // Second tree
          value: 13,
        },
        {
          name: '第八', // Second tree
          value: 10,
        },
      ],
      echartsColor: ['#3986FE', '#F26279', '#F9D237', '#4CCA72', '#73E6BF', '#F57F50', '#DB80D1', '#9D8AEE'],
    };
  },
  mounted() {
    resize();
  },
  components: { uiEchartsTree },
};
</script>
```

## 参数说明

| 参数         | 类型    | 是否必填 | 说明         |
| ------------ | ------- | -------- | ------------ |
| echartsData  | Array   | 是       | 图表数据     |
| echartsColor | Array   | 是       | 图表颜色     |
| showTooltip  | Boolean | 否       | 是否显示图例 |
