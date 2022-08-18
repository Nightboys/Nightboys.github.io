"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

require("vant/lib/dialog/style");

var _dialog = _interopRequireDefault(require("vant/lib/dialog"));

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

require("./index-sfc.css");

var padZero = function padZero(num) {
  num = num + '';
  return num[1] ? num : '0' + num;
};

var isLeapYear = function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "ui-date-picker"
  }, [_c('van-action-sheet', {
    attrs: {
      "title": _vm.title
    },
    on: {
      "close": _vm.onClose
    },
    model: {
      value: _vm.isShowDatePicker,
      callback: function callback($v) {
        _vm.isShowDatePicker = $v;
      },
      expression: "isShowDatePicker"
    }
  }, [_c('van-picker', {
    ref: "datePicker",
    class: {
      'spc-date-picker': _vm.dateRange && _vm.dateType == 'date'
    },
    attrs: {
      "show-toolbar": false,
      "columns": _vm.columns,
      "item-height": _vm.itemHeight,
      "visible-item-count": 5
    },
    on: {
      "change": _vm.onChange,
      "confirm": _vm.onConfirm
    },
    scopedSlots: _vm._u([{
      key: "option",
      fn: function fn(option) {
        return [_c('span', {
          style: {
            color: option == '—' ? '#8C8C8C' : '#141414'
          }
        }, [_vm._v(_vm._s(option))])];
      }
    }])
  }), _vm._v(" "), _c('van-button', {
    staticClass: "confirm-btn",
    attrs: {
      "round": "",
      "type": "info",
      "native-type": "button"
    },
    on: {
      "click": _vm.confirmPicker
    }
  }, [_vm._v("\n      确认\n    ")])], 1)], 1);
};

var __vue_staticRenderFns__ = [];
var _default2 = {
  _scopeId: 'data-v-7c2c39eb',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'uiDatePicker',
  props: {
    // 标题
    title: {
      type: String,
      default: function _default() {
        return '请选择日期';
      }
    },
    // 提示文本
    label: {
      type: Array,
      default: function _default() {
        return ['起始日期', '结束日期'];
      }
    },
    //显示与隐藏
    isShow: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    //是否允许选择当前日期之后的时间
    isAllowAfter: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    //是否为日期范围选择
    dateRange: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    //选择器类型
    //年月日:date, 年月:month, 年:year
    dateType: {
      type: String,
      default: function _default() {
        return 'date';
      }
    },
    // 最小日期范围
    startDate: {
      type: [String, Number],
      //2020、2020-01、2020-01-01
      default: function _default() {
        var date = new Date(new Date().getFullYear() - 10, 0, 1);
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
      }
    },
    // 最大日期范围
    endDate: {
      type: [String, Number],
      //2020、2020-01、2020-01-01
      default: function _default() {
        var date = new Date();
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
      }
    },
    //单项高度px
    itemHeight: {
      type: Number,
      default: function _default() {
        return 43;
      }
    }
  },
  data: function data() {
    return {
      isShowDatePicker: false,
      monthArr: Array.from(Array(12).keys()).map(function (i) {
        return padZero(i + 1);
      }),
      dateArr: Array.from(Array(31).keys()).map(function (i) {
        return padZero(i + 1);
      }),
      minDate: new Date(new Date().getFullYear() - 10, 0, 1),
      // 最小日期范围
      maxDate: new Date() // 最大日期范围

    };
  },
  computed: {
    yearArr: function yearArr() {
      var minYear = this.minDate.getFullYear();
      var maxYear = this.maxDate.getFullYear();
      var yearArr = [];
      var i = 0;

      while (i < maxYear - minYear + 1) {
        yearArr.push(maxYear - i + '');
        i++;
      }

      return yearArr;
    },
    columns: function columns() {
      var curMonth = this.maxDate.getMonth();
      var curDate = this.maxDate.getDate();
      var columns = [];

      switch (this.dateType) {
        case 'year':
          columns = this.dateRange ? [{
            values: this.yearArr,
            defaultIndex: 0
          }, {
            values: ['—']
          }, {
            values: this.yearArr,
            defaultIndex: 0
          }] : [{
            values: this.yearArr,
            defaultIndex: 0
          }];
          break;

        case 'month':
          columns = this.dateRange ? [{
            values: this.yearArr,
            defaultIndex: 0
          }, {
            values: this.monthArr,
            defaultIndex: curMonth
          }, {
            values: ['—']
          }, {
            values: this.yearArr,
            defaultIndex: 0
          }, {
            values: this.monthArr,
            defaultIndex: curMonth
          }] : [{
            values: this.yearArr,
            defaultIndex: 0
          }, {
            values: this.monthArr,
            defaultIndex: curMonth
          }];
          break;

        case 'date':
          var dates = [];

          if (curMonth + 1 === 2) {
            var dayNum = isLeapYear(+this.yearArr[0]) ? 29 : 28; //判断二月2月天数

            dates = this.dateArr.slice(0, dayNum);
          } else if ([1, 3, 5, 7, 8, 10, 12].includes(curMonth + 1)) {
            dates = this.dateArr.slice(0, 31);
          } else {
            dates = this.dateArr.slice(0, 30);
          }

          columns = this.dateRange ? [{
            values: this.yearArr,
            defaultIndex: 0
          }, {
            values: this.monthArr,
            defaultIndex: curMonth
          }, {
            values: dates,
            defaultIndex: curDate - 1
          }, {
            values: ['—']
          }, {
            values: this.yearArr,
            defaultIndex: 0
          }, {
            values: this.monthArr,
            defaultIndex: curMonth
          }, {
            values: dates,
            defaultIndex: curDate - 1
          }] : [{
            values: this.yearArr,
            defaultIndex: 0
          }, {
            values: this.monthArr,
            defaultIndex: curMonth
          }, {
            values: dates,
            defaultIndex: curDate - 1
          }];
          break;

        default:
          break;
      }

      return columns;
    }
  },
  watch: {
    isShow: {
      immediate: true,
      handler: function handler(val) {
        this.isShowDatePicker = val;
      }
    },
    startDate: {
      deep: true,
      immediate: true,
      handler: function handler(val) {
        var list = val.split('-');
        if (list.length > 1) list[1] = Number(list[1]) - 1;
        this.minDate = (0, _construct2.default)(Date, list);
      }
    },
    endDate: {
      deep: true,
      immediate: true,
      handler: function handler(val) {
        var list = val.split('-');
        if (list.length > 1) list[1] = Number(list[1]) - 1;
        this.maxDate = (0, _construct2.default)(Date, list);
      }
    }
  },
  methods: {
    onChange: function onChange(picker, value, index) {
      var _this = this;

      if (this.dateRange && this.dateType === 'date') {
        //日期区间且类型为日期
        this.resetMonthDate(picker, 2);
        this.resetMonthDate(picker, 6);
      } else if (!this.dateRange && this.dateType === 'date') {
        // 单选日期且类型为日期
        this.resetMonthDate(picker, 2);
      } //开始时间不大于结束时间


      if (this.dateRange) {
        var i = value.indexOf('—');
        var start = +value.slice(0, i).join('');
        var end = +value.slice(i + 1).join('');

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
    resetMonthDate: function resetMonthDate(picker, index) {
      var _this2 = this;

      var _this = this;

      var value = picker.getValues(); //月份变化后判断相应日期的变化

      var month = +value[index - 1];
      var dayNum = 31;

      if (month === 2) {
        dayNum = isLeapYear(+value[index - 2]) ? 29 : 28;
      } else {
        if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
          dayNum = 31;
        } else {
          dayNum = 30;
        }
      }

      picker.setColumnValues(index, _this.dateArr.slice(0, dayNum));
      this.$nextTick(function () {
        // console.log('val=====', value);
        if (value[index] && value[index] <= dayNum) {
          _this2.setColumnValue(index, value[index]);
        } else {
          _this2.$refs.datePicker.setColumnIndex(index, 0);
        }
      });
    },
    // 设置对应列选中的值
    setColumnValue: function setColumnValue(columnIndex, value) {
      var picker = this.$refs.datePicker;
      picker.setColumnValue(columnIndex, value);
    },
    // 设置所有列选中的值
    setPickerValues: function setPickerValues(values) {
      if (!values || typeof values != 'object') {
        console.error("日期参数需传数组类型，如['2020-08-01']、['2020-08-01','2020-10-01']");
        return;
      }

      var picker = this.$refs.datePicker;
      var val = values.length > 1 ? [].concat(values[0].split('-'), [''], values[1].split('-')) : [].concat(values[0].split('-')); // console.log('val====', val);

      picker.setValues(val);
    },
    onConfirm: function onConfirm(value) {
      var _this3 = this;

      var finalVal,
          picker = this.$refs.datePicker;
      var maxDate = this.maxDate,
          minDate = this.minDate,
          maxArray = [maxDate.getFullYear(), String(maxDate.getMonth() + 1).padStart(2, 0), String(maxDate.getDate()).padStart(2, 0)],
          minArray = [minDate.getFullYear(), String(minDate.getMonth() + 1).padStart(2, 0), String(minDate.getDate()).padStart(2, 0)];

      if (this.dateRange) {
        var i = value.indexOf('—');
        var startDate = value.slice(0, i).join('-');
        var endDate = value.slice(i + 1).join('-');
        finalVal = [startDate, endDate];

        if (!this.isAllowAfter) {
          var startValue = value.slice(0, i),
              endValue = value.slice(i + 1),
              minValue = minArray.slice(0, startValue.length),
              maxValue = maxArray.slice(0, endValue.length);

          if (endValue.join('') > maxValue.join('')) {
            _dialog.default.alert({
              message: "\u7ED3\u675F\u65E5\u671F\u6700\u5927\u4E3A" + maxValue.join('-'),
              confirmButtonColor: '#108EE9'
            }).then(function () {
              if (_this3.dateType == 'year') {
                picker.setColumnValue(2, maxValue[0]);
              } else if (_this3.dateType == 'month') {
                picker.setColumnValue(4, maxValue[0]);
                picker.setColumnValue(5, maxValue[1]);
              } else {
                picker.setColumnValue(4, maxValue[0]);
                picker.setColumnValue(5, maxValue[1]);
                picker.setColumnValue(6, maxValue[2]);

                _this3.resetMonthDate(picker, 6);
              }
            });

            return;
          } else if (startValue.join('') < minValue.join('')) {
            _dialog.default.alert({
              message: "\u8D77\u59CB\u65E5\u671F\u6700\u5C0F\u4E3A" + minValue.join('-'),
              confirmButtonColor: '#108EE9'
            }).then(function () {
              if (_this3.dateType == 'year') {
                picker.setColumnValue(0, minValue[0]);
              } else if (_this3.dateType == 'month') {
                picker.setColumnValue(0, minValue[0]);
                picker.setColumnValue(1, minValue[1]);
              } else {
                picker.setColumnValue(0, minValue[0]);
                picker.setColumnValue(1, minValue[1]);
                picker.setColumnValue(2, minValue[2]);

                _this3.resetMonthDate(picker, 2);
              }
            });

            return;
          } else if (startValue.join('') > endValue.join('')) {
            _dialog.default.alert({
              message: "\u8D77\u59CB\u65E5\u671F\u4E0D\u80FD\u5927\u4E8E\u7ED3\u675F\u65E5\u671F",
              confirmButtonColor: '#108EE9'
            }).then(function () {
              if (_this3.dateType == 'year') {
                picker.setColumnValue(0, endValue[0]);
              } else if (_this3.dateType == 'month') {
                picker.setColumnValue(0, endValue[0]);
                picker.setColumnValue(1, endValue[1]);
              } else {
                picker.setColumnValue(0, endValue[0]);
                picker.setColumnValue(1, endValue[1]);
                picker.setColumnValue(2, endValue[2]);

                _this3.resetMonthDate(picker, 2);
              }
            });

            return;
          }
        }
      } else {
        finalVal = [value.join('-')];

        var _minValue = minArray.slice(0, value.length),
            _maxValue = maxArray.slice(0, value.length);

        if (value.join('') < _minValue.join('')) {
          _dialog.default.alert({
            message: (this.label[0] || '起始日期') + "\u6700\u5C0F\u4E3A" + _minValue.join('-'),
            confirmButtonColor: '#108EE9'
          }).then(function () {
            if (_this3.dateType == 'year') {
              picker.setColumnValue(0, _minValue[0]);
            } else if (_this3.dateType == 'month') {
              picker.setColumnValue(0, _minValue[0]);
              picker.setColumnValue(1, _minValue[1]);
            } else {
              picker.setColumnValue(0, _minValue[0]);
              picker.setColumnValue(1, _minValue[1]);
              picker.setColumnValue(2, _minValue[2]);

              _this3.resetMonthDate(picker, 2);
            }
          });

          return;
        }

        if (!this.isAllowAfter) {
          if (value.join('') > _maxValue.join('')) {
            _dialog.default.alert({
              message: (this.label[1] || '结束日期') + "\u6700\u5927\u4E3A" + _maxValue.join('-'),
              confirmButtonColor: '#108EE9'
            }).then(function () {
              if (_this3.dateType == 'year') {
                picker.setColumnValue(0, _maxValue[0]);
              } else if (_this3.dateType == 'month') {
                picker.setColumnValue(0, _maxValue[0]);
                picker.setColumnValue(1, _maxValue[1]);
              } else {
                picker.setColumnValue(0, _maxValue[0]);
                picker.setColumnValue(1, _maxValue[1]);
                picker.setColumnValue(2, _maxValue[2]);

                _this3.resetMonthDate(picker, 2);
              }
            });

            return;
          }
        }
      }

      this.isShowDatePicker = false;
      this.$emit('confirm', finalVal);
    },
    onClose: function onClose() {
      this.$emit('close');
    },
    confirmPicker: function confirmPicker() {
      this.$refs.datePicker.confirm();
    }
  }
};
exports.default = _default2;