<template>
  <div class="box">
    <div>
      <van-button
        block
        type="info"
        class="confirm-btn"
        @click="setUiNotFoundShow"
      >
        点击拉起组件
      </van-button>
    </div>

    <van-popup
      v-model="canShowUiNotFound"
      closeable
      position="right"
      :style="{ height: '30%' }"
    >
      <div class="split-html" id="have-expired"></div>
      <ui-not-found :type="pageType"></ui-not-found>

      <van-grid clickable>
        <van-grid-item
          v-for="(item, i) in typeList"
          :text="item.name"
          :key="i"
          :class="currentIndex == i ? 'active' : ''"
          @click="jumpToType(item, i)"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Popup, Icon, Grid, GridItem } from 'vant';
Vue.use(Popup).use(Icon).use(Grid).use(GridItem);

export default {
  data() {
    return {
      pageType: 'no-data',
      canShowUiNotFound: false,
      canShowPreImg: true,
      typeList: [
        {
          name: '暂无相关数据',
          value: 'no-data',
        },
        {
          name: '暂无消息通知',
          value: 'no-msg',
        },
        {
          name: '页面加载失败',
          value: 'load-fail',
        },
        {
          name: '网络已断开',
          value: 'no-network',
        },
        {
          name: '筛选无结果',
          value: 'no-filter-data',
        },
        {
          name: '无搜索结果',
          value: 'no-search-data',
        },
        {
          name: '组合内无成员',
          value: 'no-group-member',
        },
        {
          name: '无收藏记录',
          value: 'no-collection',
        },
        {
          name: '开发中',
          value: 'in-developing',
        },
        {
          name: '资讯已删除',
          value: 'have-deleted',
        },
        {
          name: '无查看权限',
          value: 'no-authority',
        },
        {
          name: '企业已注销',
          value: 'have-cancelled',
        },
        {
          name: '债券已违约',
          value: 'have-default',
        },
        {
          name: '债券已到期',
          value: 'have-expired',
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    /**
     * @description 显示组件
     */
    setUiNotFoundShow() {
      this.canShowUiNotFound = true;
    },

    /**
     * @description 跳转
     */
    jumpToType(item, index) {
      this.pageType = item.value;
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  font-size: 0.24rem;

  & /deep/ .van-popup {
    height: 100% !important;
    width: 100% !important;
    overflow: hidden;

    .van-icon-close {
      position: fixed;
    }

    .split-html {
      height: 0.16rem;
      background-color: #f8f8f8;
    }

    .van-grid {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      .active .van-grid-item__text {
        color: blue;
      }
    }
  }
}
</style>
