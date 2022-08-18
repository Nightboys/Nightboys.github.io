<template>
  <div class="box">
    <div>
      <van-button
        block
        type="info"
        class="confirm-btn"
        @click="showPicker = true"
      >
        点击拉起组件
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
          <tr v-for="(tb, i) in 30" :key="i">
            <td>2020-10-{{ String(i + 1).padStart(2, 0) }}</td>
            <td>{{ i }}%</td>
            <td>{{ i + 5 }}</td>
            <td>{{ i + 10 }}</td>
          </tr>
        </template>
      </ui-table-view>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPicker: false,
    };
  },
  methods: {
    onClose() {
      this.showPicker = false;
    },
  },
};
</script>

<style lang="less" scoped>
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
