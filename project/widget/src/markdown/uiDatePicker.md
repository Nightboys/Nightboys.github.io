	update by liuch2 2021/11/23
	log：新增截止日期
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

## 日历组件 uiDatePicker ##

使用用例：

	<ui-date-picker
		ref="myDatePicker"
  		startDate="2020-01-01"
  		:isShow="showDatePicker"
  		:title="title"
  		:dateRange="isDateRange"
  		:dateType="dateType"
  		@confirm="onConfirm"
  		@close="onClose"
	></ui-date-picker>

	<script>
		import uiDatePicker from "@/components/uiDatePicker";
		export default {
	  		components: {
	    		uiDatePicker
	  		},
			data(){
				return {
					showDatePicker: false,
					title: '请选择日期',
					isDateRange: true,
					dateType: 'date'
				}
			},
			methods:{
				onConfirm(value) {
			      //console.log("选择日期===", value);
			      this.showDatePicker = false；
			    },
			
			    onClose() {
			      //console.log("取消选择===");
			      this.showDatePicker = false；
			    },

				// 动态设置所有列默认选中日期
			    setPickerValues() {
			      this.showPicker = true;
			      this.$nextTick(() => {
			        this.$refs.myDatePicker.setPickerValues(['2020-08-01', '2021-10-02']);
			      });
			    },
			
			    // 动态设置指定列默认选中日期
			    setColumnPickerValues() {
			      this.showPicker = true;
			      this.$nextTick(() => {
			        this.$refs.myDatePicker.setColumnValue(0, '2020');
			      });
			    },
			}
		}
	<script>

 
参数说明：

 参数 | 类型 | 默认值 | 说明 
 :-----| :----: | :----- | :-----
 isShow | boolean | false | 显示/隐藏 
 title | string | 请选择日期 | 顶部标题内容 
 label | array | 【起始日期，结束日期】 | 提示文本
 startDate | string | 2011-01-01 | 起始时间，默认为最近10年；取值示例：2010/2010-01/2010-01-01
 endDate | string | new Date() | 截止时间，默认为今天；取值示例：2010/2010-01/2010-01-01
 dateRange | boolean | false | 是否为日期范围选择
 dateType | string | date | 选择器类型: 日:date, 月:month, 年:year
 itemHeight | number/string | 42 | 选项高度，默认 42px
 isAllowAfter | boolean | false | 是否允许选择当前日期之后的时间

Events事件：

 事件名 | 说明 | 回调参数
 :-----| :----: | :-----
 confirm | 点击完成按钮时触发 | value
 close | 点击取消按钮时触发 | 无
 

Methods方法：

 方法名| 参数 | 说明 | 示例
 :-----| :----: | :----: | :-----
 setPickerValues| values | 动态设置所有列默认选中日期 | ['2020-08-01']、['2020-08-01','2020-10-01']
 setColumnValue | columnIndex, value | 动态设置指定列默认选中日期 | (0, '2020')
