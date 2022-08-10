<template>
  <div class="box">
    <div>
      <van-button round type="info" class="confirm-btn" @click="showPicker = true">
        点击拉起组件
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiTableView')">
        查看说明文档
      </van-button>
    </div>

    <!-- 列表分页组件 -->
    <van-popup
      closeable
      v-model="showPicker"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      @close="onClose"
    >
      <ui-table-scroll
        :tableDatas="tableData"
        :tableType="tableType"
        @handleChangeSort="handleChangeSort"
      ></ui-table-scroll>
    </van-popup>

    <div class="markdown" v-html="htmlMD"></div>
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiTableScroll from '../../components/uiTableScroll';
import md from '@/markdown/uiTableScroll.md';
import data1 from './jiashuju-1';
import data2 from './jiashuju-2';
export default {
  components: {
    uiTableScroll,
  },
  data() {
    return {
      tableType: 1,
      tableData: data2,
      urlConcat,
      htmlMD: md,
      showPicker: false,
    };
  },
  created() {
    resize();
  },
  methods: {
    onClose() {
      this.showPicker = false;
    },
    // 排序
    handleChangeSort(data) {
      console.log('data:::', data);
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/styles/commons.less';
@import '@/styles/github-markdown.css';
.box {
  font-size: 0.24rem;
}
.van-popup {
  padding: 0;
}
</style>
