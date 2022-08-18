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

    <!-- 下拉选择组件 -->
    <ui-picker
      :isShow="showPicker"
      :columns="columns"
      @confirm="onConfirm"
      @close="onClose"
    ></ui-picker>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      showPicker: false,
      columns: [
        //https://youzan.github.io/vant/#/zh-CN/picker
        // 第一列
        {
          values: ['周一', '周二', '周三', '周四', '周五'],
          defaultIndex: 2,
        },
        // 第二列
        {
          values: ['上午', '下午', '晚上'],
          defaultIndex: 1,
        },
      ],
    };
  },
  methods: {
    closePicker() {
      this.showPicker = false;
    },
    onConfirm(detail) {
      // console.log('选择===', detail);
      this.closePicker();
      Toast({
        message: detail.value.join(' '),
        icon: 'like-o',
      });
    },

    onClose() {
      // console.log("取消选择===");
      this.closePicker();
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  font-size: 0.24rem;
}
</style>
