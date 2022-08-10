	author: liuch2@finchina.com
	update by liuch2 2022/03/15


## 地区组件 uiCityPicker ##

###menuHead中使用cityPicker组件

	//首先，从src\components\uiCityPicker\cityPicker.vue将文件拷贝至src\components\menuHead\components目录下；
	（需修改cityPicker.vue中依赖库引入路径： import scrollFix from '../director/scrollFix';）

	//然后，menuHead.vue中引入cityPicker组件；
	
	/****menuHead.vue******/
	<cityPicker
		@menuSubmit="submit"
		v-if="menus[currentMenuIdx].type === 'cityPicker'"
		:idx="currentMenuIdx"
		:clist="items"
		:cityType="menus[currentMenuIdx].style || 'v1'"
	></cityPicker>
	
	<script>
		import cityPicker from "./components/cityPicker"; 
		export default {
	  		components: {
	    		cityPicker
	  		},
			data(){
				return { }
			},
			methods:{
				// menuHead.vue中对应方法
				checkSelect(){
					......
					if ((o.type === "columnThird" || o.type === "cityPicker") && item.list){
						......
					}
				}
			}
		}
	<script>

	地区接口数据示例（参考：src\pages\uiCityPicker\json\city.js）：
	[{
		"name": "全国",
	    "level": "0",
	    "value": "",
	    "list":[...]
	},{
		"name": "安徽省",
	    "level": "1",
	    "value": "",
	    "list":[...]
	}]

###单独使用cityPicker组件
	
	<!-- 省市区筛选组件 -->
    <uiProvincePicker
      ref="myProvincePicker"
      :isShow="showPicker"
      :styleObject="dialogObject"
      :areaData="provinceData"
      :cityType="cityType"
      @submit="submitArea"
      @reset="resetArea"
      @close="closePicker"
    ></uiProvincePicker>

	<script>
		import uiProvincePicker from '@/components/uiCityPicker';
		import { cityData, areaData } from './json/city.js';
		export default {
	  		components: {
	    		uiProvincePicker
	  		},
			data(){
				return {
				  showPicker: false, //隐藏下拉选择控件

			      // 省市区
			      provinceData: cityData,
			      cityType: 'v1', //v1、v2、v3
			
			      // 设定弹窗高度
			      dialogObject: {
			        height: '90vh',
			        maxHeight: 'none',
			      },
				}
			},
			methods:{
				submitArea(detail) {
			      console.log('已选地区数据===', detail);
			    },

			    resetArea() {},

				closePicker() {
				      this.showPicker = false;
				},
			}
		}
	<script>
 
参数说明：

 参数 | 类型 | 默认值 | 说明 
 :-----| :----: | :----- | :-----
 isShow | boolean | false | 显示/隐藏 
 cityType | string | 请选择 | 组件类型v1、v2、v3
 areaData | Array | [ ] | 地区数据

Events事件：

 事件名 | 说明 | 回调参数
 :-----| :---- | :-----
 submitArea | 点击确定按钮时触发 | 已选地区数据
 close | 点击取消按钮时触发 | 无
 resetArea  | 点击重置按钮时触发 | 无
