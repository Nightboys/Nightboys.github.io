<template>
  <div id="default-comp">
    <img class="default-img" :class="type + '-img'" :src="getImgByType" />
    <div class="default-msg" :class="type + '-msg'" @click="filterClickEvent">
			<slot>
				<div v-html="htmlMsg"></div>
			</slot>
		</div>
  </div>
</template>

<script>
/**
 * @property {String} type 缺省类型
 * @property {Function} reloadHTML 重新加载页面方法 仅load-fail类型有用
 * @property {Function} addMembers 添加组内成员方法 仅no-group-member类型有用
 */
export default {
  props: {
    type: {
      type: String,
      default: "no-data",
    },
		reloadHTML: {
			type: Function,
			default: () => {
				console.log('刷新页面');
			}
		},
		addMembers: {
			type: Function,
			default: () => {
				console.log('添加成员');
			}
		}
  },
	data() {
		return {
			htmlMsg: '',
		}
	},
	methods: {
		filterClickEvent(e) {
			let type = e.target.getAttribute('data-type')
			
			if(!type) return
			switch(type) {
				case 'load-fail':
					this.reloadHTML()
					break
				case 'no-group-member':
					this.addMembers()
					break
			}
		}
	},
  computed: {
		getImgByType() {
			switch(this.type) {
				case 'no-data':
					this.htmlMsg = '暂无相关数据'
					return require('./no-data.png')
				case 'no-msg':
					this.htmlMsg = '暂无任何消息通知'
					return require('./no-msg.png')
				case 'load-fail':
					this.htmlMsg = '页面加载失败<br />请重新 <span class="span-a" data-type="load-fail">刷新页面</span>'
					return require('./load-fail.png')
				case 'no-network':
					this.htmlMsg = '网络已断开,请检查网络设置'
					return require('./no-network.png')
				case 'no-filter-data':
					this.htmlMsg = '此筛选条件下无结果,<br />请重新筛选'
					return require('./no-filter-data.png')
				case 'no-search-data':
					this.htmlMsg = '没有搜索结果？<a href="fcnews://chat/feedback">点击反馈</a>'
					return require('./no-search-data.png')
				case 'no-group-member':
					this.htmlMsg = '组合内暂无成员,请添加成员<br /><button @click="addMembers" data-type="no-group-member">添加成员</button>'
					return require('./no-group-member.png')
				case 'no-collection':
					this.htmlMsg = '暂无收藏记录'
					return require('./no-collection.png')
				case 'in-developing':
					this.htmlMsg = '披星戴月开发中,敬请期待!'
					return require('./in-developing.png')
				case 'have-deleted':
					this.htmlMsg = '此资讯已被删除'
					return require('./have-deleted.png')
				case 'no-authority':
					this.htmlMsg = '暂无估值查看权限'
					return require('./no-authority.png')
				case 'have-cancelled':
					this.htmlMsg = '该企业已经注销无信息'
					return require('./have-cancelled.png')
				case 'have-default':
					this.htmlMsg = '此债券已违约,无信息'
					return require('./have-default.png')
				case 'have-expired':
					this.htmlMsg = '此债券已到期,无信息'
					return require('./have-expired.png')
			}
		},
  },
};
</script>

<style lang="less" scoped>
#default-comp {
	height: 100%;
  display: flex;
	flex-direction: column;
	align-items: center;

  .default-img {
    margin-top: 1.2rem;
		width: 3.2rem;
		height: 3.2rem;
  }

  .default-msg {
    font-size: 0.24rem;
		font-family: 'PingFangSC', 'PingFangSC-Regular';
		font-weight: 400;
		color: #888;
		line-height: 0.34rem;
		margin-top: 0.26rem;
		opacity: 0.8;
		text-align: center;
		
    & /deep/ a, /deep/ .span-a {
      color: #459CF3;
    }
		
		& /deep/ button {
			margin-top: 0.18rem;
			color: #fff;
			background-color: #1683F0;
			font-size: 0.28rem;
			line-height: 0.4rem;
			height: 0.48rem;
			width: 1.6rem;
			border: none;
			border-radius: 0.04rem;
		}
  }
	
	// .no-data-msg, .in-developing-msg, 
	// .have-default-msg, .have-expired-msg {
	// 	font-size: 0.26rem;
	// 	line-height: 0.36rem;
	// 	margin-top: 0.26rem;
	// }
	
	// .in-developing-img {
	// 	margin-top: 2.8rem;
	// }
	
	// .have-deleted-msg {
	// 	margin-top: 0.26rem;
	// }
	
	// .no-authority-msg {
	// 	margin-top: 0.1rem;
	// }
	
	// .have-default-img, .have-expired-img {
	// 	margin-top: 2.4rem;
	// }
}
</style>
