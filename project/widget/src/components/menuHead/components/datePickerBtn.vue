<template>
  <div @click.stop class="date-picker" :class="[{ 'menu-flex-none': !hasScroll }, this.type]">
    <div class="picker-area">
      <div class="picker-area-input">
        <input
          class="date-input"
          :value="dateValue[0]"
          :placeholder="extraObj.placeholder ? extraObj.placeholder[0] : '起始日期'"
          readonly
          @click="openDialog"
        />

        <span class="middle">—</span>
        <input
          class="date-input"
          :value="dateValue[1]"
          :placeholder="extraObj.placeholder ? extraObj.placeholder[1] : '结束日期'"
          readonly
          @click="openDialog"
        />
      </div>
      <div class="picker-ok" @click="submitDatePicker">确定</div>
    </div>

    <dateTimePicker
      ref="uiDatePicker"
      :isShow="isShowDatePicker"
      :dateRange="true"
      :dateType="extraObj.dateType || 'date'"
      :isAllowAfter="extraObj.isAllowAfter || false"
      :startDate="extraObj.dateRange ? extraObj.dateRange[0] : startDate"
      :endDate="extraObj.dateRange ? extraObj.dateRange[1] : endDate"
      @confirm="onConfirmDate"
      @close="onCloseDate"
    ></dateTimePicker>
  </div>
</template>

<script>
import scrollFix from '../director/scrollFix';
import dateTimePicker from './plugins/uiDatePicker';

let ios = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
export default {
  components: {
    dateTimePicker,
  },
  props: {
    idx: Number,
    extraObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const date = new Date();

    return {
      hasScroll: true,
      isShowDatePicker: false,
      dateValue: ['', ''], //自定义日期数据
      startDate: [date.getFullYear() - 10, date.getMonth() + 1, date.getDate()].join('-'),
      endDate: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
    };
  },
  directives: {
    scrollFix,
  },
  watch: {
    extraObj: {
      deep: true,
      immediate: true,
      handler(val) {
        // if (val.customValue) {
        this.dateValue = val.customValue || ['', ''];
        // }
      },
    },
  },
  mounted() {},
  methods: {
    openDialog() {
      this.isShowDatePicker = true;

      this.$nextTick(() => {
        // if (this.dateValue[0] && this.dateValue[1]) {
        this.$refs.uiDatePicker.setPickerValues(this.dateValue);
        // }
      });
    },
    onConfirmDate(value) {
      // console.log('日历选择====', value);
      this.dateValue = value;
    },

    onCloseDate() {
      this.isShowDatePicker = false;
    },

    submitDatePicker() {
      if (!this.dateValue[0] && !this.dateValue[1]) return;
      this.$emit('updateDate', this.dateValue, this.idx);
    },
  },
};
</script>

<style lang="less" scoped>
.picker-area {
  // padding: 0 0 0.32rem 0.32rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .middle {
    // padding-left: 0.1rem;
  }
  h4 {
    margin: 0;
    padding: 0;
    font-size: 0.26rem;
    font-weight: normal;
  }
  .picker-ok {
    width: 1.4rem;
    text-align: center;
    line-height: 0.64rem;
    height: 0.64rem;
    color: #1482f0;
    font-size: 0.28rem;
    position: relative;
    border: 0.015rem solid #1482f0;
    border-radius: 2px;
    box-sizing: border-box;
  }
  .picker-area-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .date-input {
    padding-top: 2px;
    appearance: none;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari 和 Chrome */
    box-sizing: border-box;
    display: inline-block;
    width: 2.3rem !important;
    height: 0.64rem !important;
    line-height: 0.64rem;
    border-radius: 0.06rem;
    color: #5c5c5c;
    font-size: 0.26rem;
    // padding-left: 0.26rem;
    text-align: center;
    // text-indent: 0.1rem;
    box-sizing: border-box;
    background: url('../assets/Triangle@2x.png') 90% 52% no-repeat #f6f6f6;
    background-size: 0.18rem;
    border: none;
    border-radius: 0.32rem;
  }
  span {
    color: #bbbbbb;
    padding: 0 0.2rem;
  }
  .date-button {
    width: 1.58rem;
    height: 0.64rem;
    color: #1482f0;
    border-radius: 0.04rem;
    border: 1px solid #1482f0;
    background-color: white;
    margin-left: 0.16rem;
    font-size: 0.28rem;
  }
  img {
    width: 0.2rem;
    // margin-left: -0.46rem;
    // margin-top: 0.55rem;
  }
}
</style>
