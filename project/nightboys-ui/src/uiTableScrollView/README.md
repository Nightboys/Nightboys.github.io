# 表格组件-滚动+分页 uiTableScrollView

### 介绍

uiTableScrollView 是一个表格组件-滚动+分页

### 引入

```js
import Vue from 'vue';
import { uiTableScrollView } from 'nightboys-ui';

Vue.use(uiTableScrollView);
```

## 代码演示

### 基础用法

```html
    <uiTableScrollView
        :columns="columns"
        :tableData="tableData"
        :total="totalCount"
        :tabId="tabId"
        @handleSort="handleSort"
      >
        <!-- 自定义列模板 -->
        <template #custom="{ row }">
          <span>自{{ row.tab2 }}</span>
        </template>
     </uiTableScrollView>

    <script>
    	import uiTableScrollView from '@/components/uiTableScrollView';
    	export default {
      		components: {
        		uiTableScrollView
      		},
    		data(){
    			return {
    				  tabId: 0, //表格组件唯一值[String, Number]
    				  columns: [{
    			          key: 'city',
    			          name: '开发区',
    			          fixed: true,
    			          extraStyle: {
    			            color: '#1482f0',
    			          },
    			        },
    			        {
    			          key: 'tab1',
    			          name: 'GDP(元)',
    			          sort: true,
    			        },
    			        {
    			          key: 'tab2',
    			          name: '固定资产',
    			          template: 'custom',
    			        },
    			        {
    			          key: 'tab3',
    			          name: '工业总产值',
    			      }],
    				  totalCount: 0,
    				  tableData:[]
    			}
    		},
    		mounted() {
    		    this.getColumnsData();
    		},
    		methods:{
    			// 表格测试数据
    		    getColumnsData() {
    		      let arr = [];
    		      for (var k = 0; k < 50; k++) {
    		        arr.push({
    		          city: '翡翠湖风景' + k,
    		          tab1: k + '923.45',
    		          tab2: k + '35.68',
    		          tab3: k + '25.89',
    		          tab4: k + '1.00',
    		        });
    		      }
    		      this.dataList = arr;
    		    },

    			// 表格排序
    		    handleSort(item) {
    		      console.log('列排序===', item); //sortType：0默认,1降序，2升序
    		    },
    		}
    	}
    <script>
```

## API

### Props

| 参数         |     类型      | 默认值 | 说明                                                                     |
| :----------- | :-----------: | :----- | :----------------------------------------------------------------------- |
| columns      |     Array     | [ ]    | 表头（见下文 columns）                                                   |
| tableData    |     Array     | [ ]    | 列表内容                                                                 |
| total        | number/string | 0      | 数据总条数                                                               |
| tabId        | number/string | -      | 表格组件唯一值                                                           |
| isWrap       |    Boolean    | true   | 内容超出是否换行                                                         |
| isMinHeight  |    Boolean    | true   | 表格是否设置最小高度                                                     |
| isShowPage   |    Boolean    | false  | 是否分页                                                                 |
| isShowExpand |    Boolean    | false  | 是否显示展开剩余按钮(isShowPage 为 true 时生效)                          |
| isSticky     |    Boolean    | false  | 是否表头固定(吸顶，isSticky&&isShowPage&&!isWrap 条件满足时开启分页动画) |
| initStep     | number/string | 6      | 初次显示 6 条数据 (initStep <= splitStep)                                |
| splitStep    | number/string | 8      | 每页显示条数                                                             |
| minStep      | number/string | 10     | 总数小于 10 时不分页 (splitStep <= minStep)                              |

### Events

| 事件名     | 说明         | 回调参数                        |
| :--------- | :----------- | :------------------------------ |
| handleSort | 表格排序方式 | sortType：0 默认,1 降序，2 升序 |

### columns

| 方法名     |  参数   |            说明            | 示例               |
| :--------- | :-----: | :------------------------: | :----------------- |
| key        | string  |         键值对 key         | 'city'             |
| name       | string  |         键值对 val         | '城市'             |
| fixed      | Boolean | 是否固定在左侧，默认 false | -                  |
| extraStyle | object  |        自定义列样式        | {color: '#1482f0'} |
| template   | string  |        自定义列模板        | 'custom'           |
