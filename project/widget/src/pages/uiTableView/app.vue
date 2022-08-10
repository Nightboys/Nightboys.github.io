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
      <ui-table-view tabRef="natureTable" isShowPage :total="30">
        <template #colgroup>
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
        </template>
        <template #thead>
          <tr>
            <th>成交日期</th>
            <th>加权收益率</th>
            <th>加权均价</th>
            <th>成交额(万)</th>
          </tr>
        </template>
        <template #tbodyContent>
          <tr v-for="(tb, i) in 30">
            <td>2020-10-{{ String(i + 1).padStart(2, 0) }}</td>
            <td>{{ i }}%</td>
            <td>{{ i + 5 }}</td>
            <td>{{ i + 10 }}</td>
          </tr>
        </template>
      </ui-table-view>
    </van-popup>

    <div class="markdown" v-html="htmlMD"></div>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiTableView from '@/components/uiTableView';
import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiTableView.md';
export default {
  components: {
    uiTableView,
    VueMarkdown,
  },
  data() {
    return {
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
  padding: 1rem 0.32rem;
  box-sizing: border-box;
  // .table-view {
  //   /deep/.table-modal {
  //     overflow-x: auto;

  //     .table-header,
  //     .table-body {
  //       width: 500px;
  //       table {
  //         tr th:first-child,
  //         tr td:first-child {
  //           background: #f2f2f2;
  //           position: sticky;
  //           left: 0;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
