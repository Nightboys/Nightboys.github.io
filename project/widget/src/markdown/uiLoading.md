	author: liuch2@finchina.com
	update by liuch2 2021/09/09
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

## 页面加载状态组件 uiLoading ##

使用用例：

	// main.js配置
	import Loading from '@/components/uiLoading';
	Vue.use(Loading);
	
	// 用法
	this.$loading.open({
	   text: '正在加载...',
	   opacity: 1,
	   bgColor: 'none'
	});

	this.$loading.open(); //显示加载

	this.$loading.close(); //隐藏加载

 
参数说明：

 参数 | 类型 | 默认值 | 说明 
 :-----| :----: | :----- | :-----
 options | object | text: '正在加载...'<br>opacity: 1<br>bgColor: 'none'|text：文本<br>opacity：透明度<br>bgColor：背景色

methods说明：

 事件名 | 说明 
 :-----| :----: 
 open | 显示加载 
 close | 隐藏加载 

