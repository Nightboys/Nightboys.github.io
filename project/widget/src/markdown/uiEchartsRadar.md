#### 特别说明：此组件需要安装 [echarts](https://echarts.apache.org/zh/index.html) 

```
author: guopf@finchina.com
update by guopf 2021/09/15

1 按需引入
// 加载 echarts，注意引入文件的路径
import echarts from 'echarts/lib/echarts'
// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/Radar'
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

## 雷达图组件

使用示例

```

  <ui-echarts-Radar class="echartsRadar"
  :echartsData="echartsData"
  :showTooltip="showTooltip",
  ></ui-echarts-Radar>


<script>
import { resize } from '@/utils/dom';
import uiEchartsRadar from '../../components/uiEchartsRadar';


export default {
  data() {
    return {
      show: false,
      echartsData: {
        name: ['政府支持力度', '经营实力', '债务负担', '偿债能力', '市场因素', '舆情'],
        value: ['1', '3', '2', '1', '4', '5'],
      },
      showTooltip:true
    };
  },
  mounted() {
    resize();
  },
  components: { uiEchartsRadar },
};
</script>
```

## 参数说明

| 参数        | 类型    | 是否必填 | 说明         |
| ----------- | ------- | -------- | ------------ |
| echartsData | Object  | 是       | 图表数据     |
| showTooltip | Boolean | 否       | 是否显示图例 |
