<template>
  <div class="box">
    <div>
      <van-button round type="info" class="confirm-btn" @click="setUiNotFoundShow">
        点击拉起组件
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiNotFound')">
        查看说明文档
      </van-button>
    </div>
		
		<van-popup
		  v-model="canShowUiNotFound"
		  closeable
		  position="right"
		  :style="{ height: '30%' }">
			<div class="to-type-html">
				<van-icon :name="canShowPreImg ? 'closed-eye' : 'eye-o'" size="22" color="#c8c9cc" @click="canShowPreImg = !canShowPreImg"/>
				<ul v-show="canShowPreImg" @click="jumpToType">
					<li data-type="no-data" :class="pageType === 'no-data' ? 'active' : ''">暂无相关数据</li>
					<li data-type="no-msg" :class="pageType === 'no-msg' ? 'active' : ''">暂无消息通知</li>
					<li data-type="load-fail" :class="pageType === 'load-fail' ? 'active' : ''">页面加载失败</li>
					<li data-type="no-network" :class="pageType === 'no-network' ? 'active' : ''">网络已断开</li>
					<li data-type="no-filter-data" :class="pageType === 'no-filter-data' ? 'active' : ''">筛选条件无结果</li>
					<li data-type="no-search-data" :class="pageType === 'no-search-data' ? 'active' : ''">无搜索结果</li>
					<li data-type="no-group-member" :class="pageType === 'no-group-member' ? 'active' : ''">组合内无成员</li>
					<li data-type="no-collection" :class="pageType === 'no-collection' ? 'active' : ''">无收藏记录</li>
					<li data-type="in-developing" :class="pageType === 'in-developing' ? 'active' : ''">开发中</li>
					<li data-type="have-deleted" :class="pageType === 'have-deleted' ? 'active' : ''">资讯已删除</li>
					<li data-type="no-authority" :class="pageType === 'no-authority' ? 'active' : ''">无估值查看权限</li>
					<li data-type="have-cancelled" :class="pageType === 'have-cancelled' ? 'active' : ''">企业已注销</li>
					<li data-type="have-default" :class="pageType === 'have-default' ? 'active' : ''">债券已违约</li>
					<li data-type="have-expired" :class="pageType === 'have-expired' ? 'active' : ''">债券已到期</li>
				</ul>
			</div>
			<div class="split-html" id="have-expired"></div>
			<ui-not-found :type="pageType"></ui-not-found>
		</van-popup>

    <div class="markdown" v-html="htmlMD"></div>
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiNotFound from '@/components/uiNotFound';
import md from '@/markdown/uiNotFound.md';
export default {
  components: {
		uiNotFound
  },
  data() {
    return {
			pageType: 'no-data',
			canShowUiNotFound: false,
			canShowPreImg: true,
      urlConcat,
      htmlMD: md,
    };
  },
  created() {
    resize();
  },
  methods: {
		/**
		 * @description 显示组件
		 */
    setUiNotFoundShow() {
      this.canShowUiNotFound = true
    },
		
		/**
		 * @description 跳转
		 */
		jumpToType(e) {
			let type = e.target.getAttribute('data-type')
			if(!type) return
			this.pageType = type
		}
  },
};
</script>

<style lang="less" scoped>
@import '@/styles/commons.less';
@import '@/styles/github-markdown.css';
.box {
  font-size: 0.24rem;
	
	.to-type-html {
		position: fixed;
		top: 0.8rem;
		right: 0;
		text-align: right;
		
		& /deep/ .van-icon {
			right: 0.32rem;
		}
		ul {
			font-size: 0.26rem;
			color: #888;
			padding-right: 0.32rem;
			li {
				margin: 0.2rem 0;
				height: 0.36rem;
				line-height: 0.36rem;
			}
			.active {
				color: #1683F0;
			}
		}
	}
	
	& /deep/ .van-popup {
		height: 100% !important;
		width: 100% !important;
		overflow: hidden;
		
		.van-icon-close {
			position: fixed;
		}
		
		.split-html {
			height: 0.16rem;
			background-color: #F8F8F8;
		}
	}
} 
</style>
