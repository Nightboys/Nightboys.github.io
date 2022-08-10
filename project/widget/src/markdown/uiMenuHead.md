    author: liuch2@finchina.com
    update by liuch2 2022/08/08
    ********************************
    特别说明：此组件依赖vant,需安装vant依赖，命令如下：
    /**Vue 2 项目，安装 Vant 2：**/
    npm i vant -S

    /**Vue 3 项目，安装 Vant 3：**/
    npm i vant@next -S
    ********************************
    vant地址：https://youzan.github.io/vant/#/zh-CN
    组件svn地址：https://192.168.100.188/svn/FaTeam/Demo/trunk/mobile/hf/components
    组件git地址：https://git.finchina.com/hf-develop/web/1/vue_group/tree/master/app%E7%BB%84%E4%BB%B6%E6%96%87%E6%A1%A3/app_document

## 下拉选择组件 uiPicker

使用用例：

    <uiMenuHead :menus="menuData" @menuChange="menuChange" ref="menu">
        <template #right>
          <span class="right-count">999+</span>
        </template>
      </uiMenuHead>

    <script>
    	import uiMenuHead from '@/components/menuHead/menuHead';
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

参数说明：

| 参数  | 类型  | 默认值 | 说明                           |
| :---- | :---: | :----- | :----------------------------- |
| menus | Array | [ ]    | 对象数组，配置每一列显示的数据 |

Events 事件：

| 事件名     | 说明               | 回调参数               |
| :--------- | :----------------- | :--------------------- |
| menuChange | 筛选条件变化时触发 | (arr, idx, selectList) |

Methods 方法：

| 方法名     |     参数     |           说明           | 示例                                  |
| :--------- | :----------: | :----------------------: | :------------------------------------ |
| closeCover | {reset=true} | 主动关闭 menuHead 并重置 | \$refs.menu.closeCover({reset:false}) |
