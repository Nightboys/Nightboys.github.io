	author: renmj@finchina.com
	update by liuch2 2022/03/28

	********************************
	vant地址：https://youzan.github.io/vant/#/zh-CN
	组件svn地址：https://192.168.100.188/svn/FaTeam/Demo/trunk/mobile/hf/components
	组件git地址：https://git.finchina.com/hf-develop/web/1/vue_group/tree/master/app%E7%BB%84%E4%BB%B6%E6%96%87%E6%A1%A3/app_document


## 列表分页组件 uiTableView ##

使用用例：

	<ui-table-scroll :table="tableData" :tableType="type"></ui-table-scroll>

	<script>
		import uiTableScroll from '../../components/uiTableScroll';
		export default {
	  		components: {
	    		uiTableView
	  		},
			data(){
				return {
					tableData:[],
					type: 1
				}
			},
			methods:{}
		}
	<script>

 
参数说明：

 参数 | 类型 | 默认值 | 说明 
 :-----| :----: | :----- | :-----
 tableData | Array | [ ] | 必填项，表格数据 
 tableType | Number | 1 | 表格展示类型


Slots说明：

 名称 | 说明 
 :-----| :-----
