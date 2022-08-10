<!--
使用用例：
import uiDatePicker from "@/components/uiDatePicker";

<ui-date-picker
  startDate="2020-05-13"
  :isShow="isShowDatePicker"
  :title="datePickerTitle"
  :dateRange="isDateRange"
  :dateType="dateType"
  @confirm="onConfirm"
  @close="onClose"
></ui-date-picker>
-->
<template>
  <div class="ui-date-picker">
    <van-action-sheet v-model="isShowDatePicker" :title="title" @close="onClose">
      <van-picker
        ref="datePicker"
        :show-toolbar="false"
        :columns="columns"
        :item-height="itemHeight"
        :visible-item-count="5"
        :class="{ 'spc-date-picker': dateRange && dateType == 'date' }"
        @change="onChange"
        @confirm="onConfirm"
      >
        <template #option="option">
          <span :style="{ color: option == '—' ? '#8C8C8C' : '#141414' }">{{ option }}</span>
        </template>
      </van-picker>
      <van-button round type="info" native-type="button" class="confirm-btn" @click="confirmPicker">
        确认
      </van-button>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from 'vue';
import { ActionSheet, Picker, Button, Dialog } from 'vant';
Vue.use(ActionSheet)
  .use(Picker)
  .use(Button)
  .use(Dialog);
import { alertNative } from '@/utils/appAssist.js';

const padZero = num => {
  num = num + '';
  return num[1] ? num : '0' + num;
};

const isLeapYear = year => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

export default {
  name: 'uiDatePicker',

  props: {
    // 标题
    title: {
      type: String,
      default: () => '请选择日期',
    },

    // 提示文本
    label: {
      type: Array,
      default: () => ['起始日期', '结束日期'],
    },

    //显示与隐藏
    isShow: {
      type: Boolean,
      default: () => false,
    },

    //是否允许选择当前日期之后的时间
    isAllowAfter: {
      type: Boolean,
      default: () => false,
    },

    //是否为日期范围选择
    dateRange: {
      type: Boolean,
      default: () => false,
    },

    //选择器类型
    //年月日:date, 年月:month, 年:year
    dateType: {
      type: String,
      default: () => 'date',
    },

    // 最小日期范围
    startDate: {
      type: [String, Number], //2020、2020-01、2020-01-01
      default: () => {
        let date = new Date(new Date().getFullYear() - 10, 0, 1);
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
      },
    },

    // 最大日期范围
    endDate: {
      type: [String, Number], //2020、2020-01、2020-01-01
      default: () => {
        let date = new Date();
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
      },
    },

    //单项高度px
    itemHeight: {
      type: Number,
      default: () => 43,
    },
  },

  data() {
    return {
      isShowDatePicker: false,
      monthArr: Array.from(Array(12).keys()).map(i => padZero(i + 1)),
      dateArr: Array.from(Array(31).keys()).map(i => padZero(i + 1)),
      minDate: new Date(new Date().getFullYear() - 10, 0, 1), // 最小日期范围
      maxDate: new Date(), // 最大日期范围
    };
  },

  computed: {
    yearArr() {
      let minYear = this.minDate.getFullYear();
      let maxYear = this.maxDate.getFullYear();
      let yearArr = [];

      let i = 0;
      while (i < maxYear - minYear + 1) {
        yearArr.push(maxYear - i + '');
        i++;
      }

      return yearArr;
    },

    columns() {
      let curMonth = this.maxDate.getMonth();
      let curDate = this.maxDate.getDate();
      let columns = [];

      switch (this.dateType) {
        case 'year':
          columns = this.dateRange
            ? [{ values: this.yearArr, defaultIndex: 0 }, { values: ['—'] }, { values: this.yearArr, defaultIndex: 0 }]
            : [{ values: this.yearArr, defaultIndex: 0 }];
          break;
        case 'month':
          columns = this.dateRange
            ? [
                { values: this.yearArr, defaultIndex: 0 },
                { values: this.monthArr, defaultIndex: curMonth },
                { values: ['—'] },
                { values: this.yearArr, defaultIndex: 0 },
                { values: this.monthArr, defaultIndex: curMonth },
              ]
            : [
                { values: this.yearArr, defaultIndex: 0 },
                { values: this.monthArr, defaultIndex: curMonth },
              ];
          break;
        case 'date':
          let dates = [];
          if (curMonth + 1 === 2) {
            const dayNum = isLeapYear(+this.yearArr[0]) ? 29 : 28; //判断二月2月天数
            dates = this.dateArr.slice(0, dayNum);
          } else if ([1, 3, 5, 7, 8, 10, 12].includes(curMonth + 1)) {
            dates = this.dateArr.slice(0, 31);
          } else {
            dates = this.dateArr.slice(0, 30);
          }
          columns = this.dateRange
            ? [
                { values: this.yearArr, defaultIndex: 0 },
                { values: this.monthArr, defaultIndex: curMonth },
                { values: dates, defaultIndex: curDate - 1 },
                { values: ['—'] },
                { values: this.yearArr, defaultIndex: 0 },
                { values: this.monthArr, defaultIndex: curMonth },
                { values: dates, defaultIndex: curDate - 1 },
              ]
            : [
                { values: this.yearArr, defaultIndex: 0 },
                { values: this.monthArr, defaultIndex: curMonth },
                { values: dates, defaultIndex: curDate - 1 },
              ];
          break;
        default:
          break;
      }

      return columns;
    },
  },

  watch: {
    isShow: {
      immediate: true,
      handler(val) {
        this.isShowDatePicker = val;
      },
    },
    startDate: {
      deep: true,
      immediate: true,
      handler(val) {
        let list = val.split('-');
        if (list.length > 1) list[1] = Number(list[1]) - 1;
        this.minDate = new Date(...list);
      },
    },
    endDate: {
      deep: true,
      immediate: true,
      handler(val) {
        let list = val.split('-');
        if (list.length > 1) list[1] = Number(list[1]) - 1;
        this.maxDate = new Date(...list);
      },
    },
  },

  methods: {
    onChange(picker, value, index) {
      const _this = this;
      if (this.dateRange && this.dateType === 'date') {
        //日期区间且类型为日期
        this.resetMonthDate(picker, 2);
        this.resetMonthDate(picker, 6);
      } else if (!this.dateRange && this.dateType === 'date') {
        // 单选日期且类型为日期
        this.resetMonthDate(picker, 2);
      }

      //开始时间不大于结束时间
      if (this.dateRange) {
        const i = value.indexOf('—');
        const start = +value.slice(0, i).join('');
        const end = +value.slice(i + 1).join('');
        if (start > end && i === 1) {
          //dateType为year
          picker.setColumnValue(2, value[0]);
        } else if (start > end && i === 2) {
          //dateType为month
          picker.setColumnValue(3, value[0]);
          picker.setColumnValue(4, value[1]);
        } else if (start > end && i === 3) {
          //dateType为date
          picker.setColumnValue(4, value[0]);
          picker.setColumnValue(5, value[1]);
          picker.setColumnValue(6, value[2]);

          this.resetMonthDate(picker, 6);
        }
      }
    },

    // 重置年月日
    resetMonthDate(picker, index) {
      const _this = this;
      let value = picker.getValues();

      //月份变化后判断相应日期的变化
      const month = +value[index - 1];
      if (month === 2) {
        const dayNum = isLeapYear(+value[index - 2]) ? 29 : 28;
        picker.setColumnValues(index, _this.dateArr.slice(0, dayNum));
      } else {
        if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
          picker.setColumnValues(index, _this.dateArr.slice(0, 31));
        } else {
          picker.setColumnValues(index, _this.dateArr.slice(0, 30));
        }
      }
    },

    // 设置对应列选中的值
    setColumnValue(columnIndex, value) {
      let picker = this.$refs.datePicker;
      picker.setColumnValue(columnIndex, value);
    },

    // 设置所有列选中的值
    setPickerValues(values) {
      if (!values || typeof values != 'object') {
        console.error("日期参数需传数组类型，如['2020-08-01']、['2020-08-01','2020-10-01']");
        return;
      }
      let picker = this.$refs.datePicker;
      let val = values.length > 1 ? [...values[0].split('-'), '', ...values[1].split('-')] : [...values[0].split('-')];
      // console.log('val====', val);

      picker.setValues(val);
    },

    onConfirm(value) {
      let finalVal,
        picker = this.$refs.datePicker;

      let maxDate = this.maxDate,
        minDate = this.minDate,
        maxArray = [
          maxDate.getFullYear(),
          String(maxDate.getMonth() + 1).padStart(2, 0),
          String(maxDate.getDate()).padStart(2, 0),
        ],
        minArray = [
          minDate.getFullYear(),
          String(minDate.getMonth() + 1).padStart(2, 0),
          String(minDate.getDate()).padStart(2, 0),
        ];

      if (this.dateRange) {
        const i = value.indexOf('—');
        const startDate = value.slice(0, i).join('-');
        const endDate = value.slice(i + 1).join('-');
        finalVal = [startDate, endDate];

        if (!this.isAllowAfter) {
          let startValue = value.slice(0, i),
            endValue = value.slice(i + 1),
            minValue = minArray.slice(0, startValue.length),
            maxValue = maxArray.slice(0, endValue.length);
          if (endValue.join('') > maxValue.join('')) {
            //开发环境
            if (process.env.NODE_ENV === 'development') {
              this.$dialog
                .alert({
                  message: `结束日期最大为${maxValue.join('-')}`,
                  confirmButtonColor: '#108EE9',
                })
                .then(() => {
                  if (this.dateType == 'year') {
                    picker.setColumnValue(2, maxValue[0]);
                  } else if (this.dateType == 'month') {
                    picker.setColumnValue(4, maxValue[0]);
                    picker.setColumnValue(5, maxValue[1]);
                  } else {
                    picker.setColumnValue(4, maxValue[0]);
                    picker.setColumnValue(5, maxValue[1]);
                    picker.setColumnValue(6, maxValue[2]);

                    this.resetMonthDate(picker, 6);
                  }
                });
            } else {
              alertNative({
                message: `结束日期最大为${maxValue.join('-')}`,
                canceledOnTouchOutside: false,
                textAlignment: 'center',
                buttons: [
                  {
                    title: '我知道了',
                    titleColor: '#3B7EEE',
                    fontSize: 15,
                  },
                ],
                onButtonTap: res => {
                  if (res.code == 1) {
                    if (this.dateType == 'year') {
                      picker.setColumnValue(2, maxValue[0]);
                    } else if (this.dateType == 'month') {
                      picker.setColumnValue(4, maxValue[0]);
                      picker.setColumnValue(5, maxValue[1]);
                    } else {
                      picker.setColumnValue(4, maxValue[0]);
                      picker.setColumnValue(5, maxValue[1]);
                      picker.setColumnValue(6, maxValue[2]);

                      this.resetMonthDate(picker, 6);
                    }
                  }
                },
              });
            }

            return;
          } else if (startValue.join('') < minValue.join('')) {
            //开发环境
            if (process.env.NODE_ENV === 'development') {
              this.$dialog
                .alert({
                  message: `起始日期最小为${minValue.join('-')}`,
                  confirmButtonColor: '#108EE9',
                })
                .then(() => {
                  if (this.dateType == 'year') {
                    picker.setColumnValue(0, minValue[0]);
                  } else if (this.dateType == 'month') {
                    picker.setColumnValue(0, minValue[0]);
                    picker.setColumnValue(1, minValue[1]);
                  } else {
                    picker.setColumnValue(0, minValue[0]);
                    picker.setColumnValue(1, minValue[1]);
                    picker.setColumnValue(2, minValue[2]);

                    this.resetMonthDate(picker, 2);
                  }
                });
            } else {
              alertNative({
                message: `起始日期最小为${minValue.join('-')}`,
                canceledOnTouchOutside: false,
                textAlignment: 'center',
                buttons: [
                  {
                    title: '我知道了',
                    titleColor: '#3B7EEE',
                    fontSize: 15,
                  },
                ],
                onButtonTap: res => {
                  if (res.code == 1) {
                    if (this.dateType == 'year') {
                      picker.setColumnValue(0, minValue[0]);
                    } else if (this.dateType == 'month') {
                      picker.setColumnValue(0, minValue[0]);
                      picker.setColumnValue(1, minValue[1]);
                    } else {
                      picker.setColumnValue(0, minValue[0]);
                      picker.setColumnValue(1, minValue[1]);
                      picker.setColumnValue(2, minValue[2]);

                      this.resetMonthDate(picker, 2);
                    }
                  }
                },
              });
            }

            return;
          } else if (startValue.join('') > endValue.join('')) {
            //开发环境
            if (process.env.NODE_ENV === 'development') {
              this.$dialog
                .alert({
                  message: `起始日期不能大于结束日期`,
                  confirmButtonColor: '#108EE9',
                })
                .then(() => {
                  if (this.dateType == 'year') {
                    picker.setColumnValue(0, endValue[0]);
                  } else if (this.dateType == 'month') {
                    picker.setColumnValue(0, endValue[0]);
                    picker.setColumnValue(1, endValue[1]);
                  } else {
                    picker.setColumnValue(0, endValue[0]);
                    picker.setColumnValue(1, endValue[1]);
                    picker.setColumnValue(2, endValue[2]);

                    this.resetMonthDate(picker, 2);
                  }
                });
            } else {
              alertNative({
                message: `起始日期不能大于结束日期`,
                canceledOnTouchOutside: false,
                textAlignment: 'center',
                buttons: [
                  {
                    title: '我知道了',
                    titleColor: '#3B7EEE',
                    fontSize: 15,
                  },
                ],
                onButtonTap: res => {
                  if (res.code == 1) {
                    if (this.dateType == 'year') {
                      picker.setColumnValue(0, endValue[0]);
                    } else if (this.dateType == 'month') {
                      picker.setColumnValue(0, endValue[0]);
                      picker.setColumnValue(1, endValue[1]);
                    } else {
                      picker.setColumnValue(0, endValue[0]);
                      picker.setColumnValue(1, endValue[1]);
                      picker.setColumnValue(2, endValue[2]);

                      this.resetMonthDate(picker, 2);
                    }
                  }
                },
              });
            }

            return;
          }
        }
      } else {
        finalVal = [value.join('-')];

        let minValue = minArray.slice(0, value.length),
          maxValue = maxArray.slice(0, value.length);
        if (value.join('') < minValue.join('')) {
          //开发环境
          if (process.env.NODE_ENV === 'development') {
            this.$dialog
              .alert({
                message: `${this.label[0] || '起始日期'}最小为${minValue.join('-')}`,
                confirmButtonColor: '#108EE9',
              })
              .then(() => {
                if (this.dateType == 'year') {
                  picker.setColumnValue(0, minValue[0]);
                } else if (this.dateType == 'month') {
                  picker.setColumnValue(0, minValue[0]);
                  picker.setColumnValue(1, minValue[1]);
                } else {
                  picker.setColumnValue(0, minValue[0]);
                  picker.setColumnValue(1, minValue[1]);
                  picker.setColumnValue(2, minValue[2]);

                  this.resetMonthDate(picker, 2);
                }
              });
          } else {
            alertNative({
              message: `${this.label[0] || '起始日期'}最小为${minValue.join('-')}`,
              canceledOnTouchOutside: false,
              textAlignment: 'center',
              buttons: [
                {
                  title: '我知道了',
                  titleColor: '#3B7EEE',
                  fontSize: 15,
                },
              ],
              onButtonTap: res => {
                if (res.code == 1) {
                  if (this.dateType == 'year') {
                    picker.setColumnValue(0, minValue[0]);
                  } else if (this.dateType == 'month') {
                    picker.setColumnValue(0, minValue[0]);
                    picker.setColumnValue(1, minValue[1]);
                  } else {
                    picker.setColumnValue(0, minValue[0]);
                    picker.setColumnValue(1, minValue[1]);
                    picker.setColumnValue(2, minValue[2]);

                    this.resetMonthDate(picker, 2);
                  }
                }
              },
            });
          }

          return;
        }

        if (!this.isAllowAfter) {
          if (value.join('') > maxValue.join('')) {
            //开发环境
            if (process.env.NODE_ENV === 'development') {
              this.$dialog
                .alert({
                  message: `${this.label[1] || '结束日期'}最大为${maxValue.join('-')}`,
                  confirmButtonColor: '#108EE9',
                })
                .then(() => {
                  if (this.dateType == 'year') {
                    picker.setColumnValue(0, maxValue[0]);
                  } else if (this.dateType == 'month') {
                    picker.setColumnValue(0, maxValue[0]);
                    picker.setColumnValue(1, maxValue[1]);
                  } else {
                    picker.setColumnValue(0, maxValue[0]);
                    picker.setColumnValue(1, maxValue[1]);
                    picker.setColumnValue(2, maxValue[2]);

                    this.resetMonthDate(picker, 2);
                  }
                });
            } else {
              alertNative({
                message: `${this.label[1] || '结束日期'}最大为${maxValue.join('-')}`,
                canceledOnTouchOutside: false,
                textAlignment: 'center',
                buttons: [
                  {
                    title: '我知道了',
                    titleColor: '#3B7EEE',
                    fontSize: 15,
                  },
                ],
                onButtonTap: res => {
                  if (res.code == 1) {
                    if (this.dateType == 'year') {
                      picker.setColumnValue(0, maxValue[0]);
                    } else if (this.dateType == 'month') {
                      picker.setColumnValue(0, maxValue[0]);
                      picker.setColumnValue(1, maxValue[1]);
                    } else {
                      picker.setColumnValue(0, maxValue[0]);
                      picker.setColumnValue(1, maxValue[1]);
                      picker.setColumnValue(2, maxValue[2]);

                      this.resetMonthDate(picker, 2);
                    }
                  }
                },
              });
            }

            return;
          }
        }
      }
      this.isShowDatePicker = false;
      this.$emit('confirm', finalVal);
    },

    onClose() {
      this.$emit('close');
    },

    confirmPicker() {
      this.$refs.datePicker.confirm();
    },
  },
};
</script>

<style lang="less" scoped>
.ui-date-picker {
  width: 100%;
  .confirm-btn {
    margin: 0.4rem 0.48rem;
    width: calc(100% - 0.96rem);
    height: 0.76rem;
    font-size: 0.3rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    background: #1482f0;
  }
}

// 针对范围区间特殊处理样式
.spc-date-picker {
  /deep/.van-picker-column:nth-child(4n + 1) {
    min-width: 1.2rem;
  }
}

/deep/ .van-action-sheet__header {
  font-family: PingFangSC, PingFangSC-Medium;
  color: #141414;
  line-height: 1.08rem;
}
</style>
