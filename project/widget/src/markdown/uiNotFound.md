	author: liaowei@finchina.com
	update by liaowei 2021/09/15
	
	组件svn地址：https://192.168.100.188/svn/FaTeam/Demo/trunk/mobile/hf/components
	组件git地址：https://git.finchina.com/hf-develop/web/1/vue_group/tree/master/app%E7%BB%84%E4%BB%B6%E6%96%87%E6%A1%A3/app_document

## 页面缺省组件 uiNotFound ##

使用用例：

	<ui-not-found
		type="load-fail"
		:reloadHTML="setHtmlReload"
	></ui-not-found>
	
	特别说明：
		type为load-fail可以传reloadHTML回调
		type为no-group-member可以传addMembers回调
		
	<script>
	import uiNotFound from "@/components/uiNotFound";
	export default {
			components: {
				uiNotFound
			},
			methods:{
			/**
			 * @description 重新加载页面
			 */
			setHtmlReload() {
				console.log('重新加载页面')
			},
		}
	}
	<script>

 
参数说明：

 参数 | 类型 | 默认值 | 说明 
 :-----| :----: | :----- | :-----
 <div style="width:71px">type</div> | <div style="width:47px">String</div> | no-data | 详细类型见下表
 <div style="width:71px">reloadHTML</div> | <div style="width:47px">Function</div> | () => { console.log('刷新页面'); } | 仅type为<br/>load-fail有用
 <div style="width:71px">addMembers</div> | <div style="width:47px">Function</div> | () => { console.log('添加成员'); } | 仅type为<br/>no-group-member有用

 type类型详情：

 类型名 | 说明 
 :-----| :----
 no-data | 暂无相关数据 
 no-msg | 暂无消息通知 
 load-fail | 页面加载失败 
 no-network | 网络已断开 
 no-data | 筛选条件无结果 
 no-filter-data | 无搜索结果 
 no-search-data | 组合内无成员 
 no-group-member | 无收藏记录 
 no-collection | 开发中 
 in-developing | 资讯已删除 
 have-deleted | 无估值查看权限 
 no-authority | 企业已注销 
 have-cancelled | 暂无相关数据 
 have-default | 债券已违约 
 have-expired | 债券已到期 
 
 Slots:
 
 名称 | 说明
 :----| :-----
 default | 自定义图片下方的内容


