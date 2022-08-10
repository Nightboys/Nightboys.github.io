	author: renmj@finchina.com
	update by renmj 2021/09/23

	组件git地址：https://git.finchina.com/hf-develop/web/1/vue_group/tree/master/app%E7%BB%84%E4%BB%B6%E6%96%87%E6%A1%A3/app_document


## 底部上拉加载组件 uiRefreshBottom ##

使用用例：

	 <ui-refresh-bottom
	  v-show="isShow"
	  :status="loadingType"
	  >
	  </ui-refresh-bottom>

	<script>
		import uiRefreshBottom from '../../components/uiRefreshBottom';
		export default {
	  	  components: { uiRefreshBottom },
			data() {
				return {
					 loading: false,
                     loadingType: true,
                     num: 1,
				}
			},
			mounted() {
			    // 绑定滚动监听事件
			   let scrollTop = document.documentElement.scrollTop || window.pageYOffset,
               onHeight = content.scrollHeight
               if (!this.loading && this.status && conHeight < wHeight + scrollTop + 20) {
                 this.loading = true
                 this.num++
                 // 请求接口
                 this.getData()
               }
               window.addEventListener('scroll', this.subScrollPage)
            },
		}
	<script>


参数说明：

 参数 | 类型 | 默认值 | 说明
 :-----| :----: | :----- | :-----
 isShow | boolean | false | 显示/隐藏
 status | String, Number, Boolean | false | 加载中/无数据



