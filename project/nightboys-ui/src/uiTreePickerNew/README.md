# 目录树 Tree uiTreePickerNew

### 介绍

uiTreePickerNew 是一个目录树 Tree,区别于 uiTreePicker

### 引入

```js
import Vue from 'vue';
import { uiTreePickerNew } from 'nightboys-ui';

Vue.use(uiTreePickerNew);
```

## 代码演示

### 基础用法

```html
	<uiTreePickerNew
      ref="myTreePickerNew"
      :title="extraData.title || '请选择'"
      :isShow="showPicker"
      :showInput="extraData.showInput"
      :max="extraData.max"
      :treeData="extraData.data"
      :treeProps="extraData.treeProps"
      :defaultCheckdKeys="extraData.defaultCheckdKeys || []"
      :defaultExpandedKeys="extraData.defaultExpandedKeys || []"
      :styleObject="dialogObject"
      @changeTree="changeTreeBD"
      @close="onClose"
    >
      <div>
        <div class="tree-result" v-show="extraData.showCount">
          <span>
            已选择 <b>{{ treeNodesLen }}</b> 个条件
          </span>
        </div>
        <div class="tree-group">
          <span class="btn" @click="resetTreeBD">重置</span>
          <span class="btn btn-ok" @click="submitTreeBD">
            确认选择
            <template v-if="extraData.showCount">
              {{ treeNodesLen > 0 ? `(${treeNodesLen})` : '' }}
            </template>
          </span>
        </div>
      </div>
    </uiTreePickerNew>

	<script>
		import uiTreePicker from '@/components/uiTreePicker';
		export default {
	  		components: {
	    		uiTreePicker
	  		},
			data(){
				return {
					  treeNodesLen: 0,
				      // 设定弹窗高度
				      dialogObject: {
				        height: '90%',
				        maxHeight: 'none',
				      },
				      extraData: {
				        data: dataList,
				        defaultCheckdKeys: ['A01', 'A0211'], //默认选中项
				        defaultExpandedKeys: ['A01', 'A0211'], //默认展开项
				        treeProps: {
				          children: 'children',
				          label: 'name',
				          nodeKey: 'value',
				          treeType: 'industry', //树类型--行业
				        },
				        title: '行业目录树',
				        showInput: true, //不展示模糊搜索
						searchUrl: '/finchinaAPP/v1/finchina-search/v1/enterpriseFilter/getQualificationListSearchResult.action',
				        showCount: true,
				        max: 50,
				      },
				}
			},
			watch: {
			    showPicker(val) {
			      if (val) {
			        this.$nextTick(() => {
				          let childNodes = this.$refs.myTreePickerNew.getCheckedNodes();
				          this.treeNodesLen = childNodes.filter(d => !d.children || !d.children.length).length || 0;
				        });
			      }
			    },
			},
			methods: {
			    onClose() {
			      this.showPicker = false;
			    },

			    // 当前已选节点
			    changeTree(detail) {
			      console.log('当前已选节点nodes及keys====', detail);
			      let childNodes = detail.sltNodes.filter(d => !d.children || !d.children.length);
			      this.treeNodesLen = childNodes.length; //仅统计最细节点
			    },
			    // 清空已选
			    resetTree() {
			      this.treeNodesLen = 0;
			      this.$refs.myTreePicker.resetChecked(); //清空已选
			    },
			    submitTree() {
			      let sltNodes = this.$refs.myTreePicker.getCheckedNodes(),
			        sltKeys = this.$refs.myTreePicker.getCheckedKeys();

			      this.onClose();
			      // this.$emit('submit', { sltNodes, sltKeys });
			      console.log('确定选择节点nodes及keys====', { sltNodes, sltKeys });
			    },
			 },
		}
	<script>
```

## API

### Props

| 参数                |  类型   | 默认值          | 说明                                             |
| :------------------ | :-----: | :-------------- | :----------------------------------------------- |
| isShow              | boolean | false           | 显示/隐藏                                        |
| title               | string  | 请选择          | 顶部标题内容                                     |
| showInput           | boolean | false           | 是否模糊搜索                                     |
| searchUrl           | string  | ''              | 搜索接口                                         |
| styleObject         | Object  | { }             | 自定义弹框样式                                   |
| max                 | number  | 0               | 最大选中节点>0                                   |
| maxTips             | string  | 最多可选 xxx 条 | 超出最大限制时提示信息                           |
| treeData            |  array  | [ ]             | 树节点                                           |
| defaultCheckdKeys   |  array  | [ ]             | 默认选中节点                                     |
| defaultExpandedKeys |  array  | [ ]             | 默认展开项                                       |
| treeProps           | Object  | { }             | 树节点配置项(children、label、nodeKey、treeType) |

### Events

| 事件名     | 说明               | 回调参数                      |
| :--------- | :----------------- | :---------------------------- |
| changeTree | 当前已选节点       | {} 当前已选节点 nodes 及 keys |
| resetTree  | 清空已选           | 无                            |
| submitTree | 点击确定按钮时触发 | 确定选择节点 nodes 及 keys    |
| close      | 点击取消按钮时触发 | 无                            |

### Methods

| 方法名          | 参数 |           说明            | 示例 |
| :-------------- | :--: | :-----------------------: | :--- |
| getCheckedNodes |  -   |  通过 node 获取已选节点   |
| getCheckedKeys  |  -   |   通过 key 获取已选节点   |
| setCheckedKeys  | keys | 通过 key 设置节点选择状态 |
| resetChecked    |  -   |         清空已选          |
| alwaysChecked   |  -   |         设置全选          |
