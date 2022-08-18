<template>
  <div
    @click.stop
    class="date-picker"
    :class="[{ 'menu-flex-none': !hasScroll }, type]"
  >
    <div class="picker-area">
      <div class="picker-area-input">
        <input
          class="date-input"
          :value="dateValue[0]"
          :placeholder="
            extraObj.placeholder ? extraObj.placeholder[0] : '起始日期'
          "
          readonly
          @click="openDialog"
        />

        <span class="middle">—</span>
        <input
          class="date-input"
          :value="dateValue[1]"
          :placeholder="
            extraObj.placeholder ? extraObj.placeholder[1] : '结束日期'
          "
          readonly
          @click="openDialog"
        />
      </div>
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
import $ from 'jquery';
import scrollFix from '../director/scrollFix';
import dateTimePicker from './plugins/uiDatePicker';

let ios = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
export default {
  components: {
    dateTimePicker,
  },
  props: {
    idx: Number,
    type: String,
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
      startDate: [
        date.getFullYear() - 10,
        date.getMonth() + 1,
        date.getDate(),
      ].join('-'),
      endDate: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(
        '-'
      ),
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
        this.dateValue = val.customValue || ['', ''];
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
      this.$emit('updateDate', value, this.idx);
    },
    onCloseDate() {
      this.isShowDatePicker = false;
    },
  },
};
</script>

<style lang="less" scoped>
.picker-area {
  // padding: 0 0 0.32rem 0.32rem;
  margin: 0;
  .middle {
    // padding-left: 0.1rem;
  }
  h4 {
    margin: 0;
    padding: 0;
    font-size: 0.26rem;
    font-weight: normal;
  }
  .picker-area-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 0.32rem);
  }
  .date-input {
    padding-top: 2px;
    appearance: none;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari 和 Chrome */
    box-sizing: border-box;
    display: inline-block;
    width: 3rem !important;
    height: 0.64rem !important;
    line-height: 0.64rem;
    border: 0.015rem solid #efefef !important;
    border-radius: 0.06rem;
    color: #5c5c5c;
    font-size: 0.26rem;
    // padding-left: 0.26rem;
    text-align: center;
    box-sizing: border-box;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAAAXNSR0IArs4c6QAAAOdJREFUKBWVUj0KwjAUNslUUGwXL+AR7GQWKUX33sBjONRF8FK2xaVuHsELOAsdhMT3hURSLWgepHnvfT+8vpaNKKqq2mmtD5QK1AGhGGNlnudHbkVTukNNIOU0wMQkeMRxXJLzCXlIQJMkyR4aM1Gapk8hREHA9V8jcKGBFhrmC9u2nXVdd6Fx537/MyeTWxRFSynl3WFuR6YGQKQNFW+CI3q34fgmwHoTOXLTNAul1JkmG7ueITP24Jyvsiz7WkFvIieyROzMvL81QV4MmQAfNAJA/wa+4pbMNA5y2wMcHnVdr3F+KV8rFEK+AXxs3gAAAABJRU5ErkJggg==')
      86% 52% no-repeat;
    background-size: 0.2rem;
    &.focus {
      border-color: #2085ed !important;
    }
  }
  span {
    color: #bbbbbb;
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
