<template>
  <div class="box">
    <div class="btn-group">
      <van-button type="info" class="confirm-btn" @click="showPicker = true">
        点击拉起组件
      </van-button>
      <van-button type="warning" class="confirm-btn" @click="setPickerValues">
        设置选中日期
      </van-button>
    </div>

    <!-- 日期选择组件 -->
    <ui-date-picker
      ref="myDatePicker"
      startDate="2010-05-15"
      endDate="2022-05-01"
      :isShow="showPicker"
      :title="title"
      :dateRange="isDateRange"
      :dateType="dateType"
      @confirm="onConfirm"
      @close="onClose"
    ></ui-date-picker>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      showPicker: false,
      title: '请选择日期',
      isDateRange: true,
      dateType: 'date',
    };
  },
  methods: {
    closePicker() {
      this.showPicker = false;
    },
    onConfirm(value) {
      // console.log("选择===", value);
      this.closePicker();
      Toast({
        message: value.join('至'),
        icon: 'like-o',
      });
    },

    onClose() {
      // console.log("取消选择===");
      this.closePicker();
    },

    // 动态设置所有列默认选中日期
    setPickerValues() {
      this.showPicker = true;
      this.$nextTick(() => {
        this.$refs.myDatePicker.setPickerValues(['2020-08-01', '2020-10-01']); //['2020-08-01']、['2020-08-01','2020-10-01']
      });
    },

    // 动态设置指定列默认选中日期
    setColumnPickerValues() {
      this.showPicker = true;
      this.$nextTick(() => {
        this.$refs.myDatePicker.setColumnValue(0, '2020');
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  font-size: 0.24rem;
}
.btn-group {
  button {
    margin: 0 16px 0 0;
  }
}
</style>
