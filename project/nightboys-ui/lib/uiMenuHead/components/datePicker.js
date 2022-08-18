"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _scrollFix = _interopRequireDefault(require("../director/scrollFix"));

var _uiDatePicker = _interopRequireDefault(require("./plugins/uiDatePicker"));

require("./datePicker-sfc.css");

var ios = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "date-picker",
    class: [{
      'menu-flex-none': !_vm.hasScroll
    }, _vm.type],
    on: {
      "click": function click($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('div', {
    staticClass: "picker-area"
  }, [_c('div', {
    staticClass: "picker-area-input"
  }, [_c('input', {
    staticClass: "date-input",
    attrs: {
      "placeholder": _vm.extraObj.placeholder ? _vm.extraObj.placeholder[0] : '起始日期',
      "readonly": ""
    },
    domProps: {
      "value": _vm.dateValue[0]
    },
    on: {
      "click": _vm.openDialog
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "middle"
  }, [_vm._v("—")]), _vm._v(" "), _c('input', {
    staticClass: "date-input",
    attrs: {
      "placeholder": _vm.extraObj.placeholder ? _vm.extraObj.placeholder[1] : '结束日期',
      "readonly": ""
    },
    domProps: {
      "value": _vm.dateValue[1]
    },
    on: {
      "click": _vm.openDialog
    }
  })])]), _vm._v(" "), _c('dateTimePicker', {
    ref: "uiDatePicker",
    attrs: {
      "isShow": _vm.isShowDatePicker,
      "dateRange": true,
      "dateType": _vm.extraObj.dateType || 'date',
      "isAllowAfter": _vm.extraObj.isAllowAfter || false,
      "startDate": _vm.extraObj.dateRange ? _vm.extraObj.dateRange[0] : _vm.startDate,
      "endDate": _vm.extraObj.dateRange ? _vm.extraObj.dateRange[1] : _vm.endDate
    },
    on: {
      "confirm": _vm.onConfirmDate,
      "close": _vm.onCloseDate
    }
  })], 1);
};

var __vue_staticRenderFns__ = [];
var _default2 = {
  _scopeId: 'data-v-0b58168a',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  components: {
    dateTimePicker: _uiDatePicker.default
  },
  props: {
    idx: Number,
    type: String,
    extraObj: {
      type: Object,
      default: function _default() {}
    }
  },
  data: function data() {
    var date = new Date();
    return {
      hasScroll: true,
      isShowDatePicker: false,
      dateValue: ['', ''],
      //自定义日期数据
      startDate: [date.getFullYear() - 10, date.getMonth() + 1, date.getDate()].join('-'),
      endDate: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
    };
  },
  directives: {
    scrollFix: _scrollFix.default
  },
  watch: {
    extraObj: {
      deep: true,
      immediate: true,
      handler: function handler(val) {
        this.dateValue = val.customValue || ['', ''];
      }
    }
  },
  mounted: function mounted() {},
  methods: {
    openDialog: function openDialog() {
      var _this = this;

      this.isShowDatePicker = true;
      this.$nextTick(function () {
        // if (this.dateValue[0] && this.dateValue[1]) {
        _this.$refs.uiDatePicker.setPickerValues(_this.dateValue); // }

      });
    },
    onConfirmDate: function onConfirmDate(value) {
      // console.log('日历选择====', value);
      this.dateValue = value;
      this.$emit('updateDate', value, this.idx);
    },
    onCloseDate: function onCloseDate() {
      this.isShowDatePicker = false;
    }
  }
};
exports.default = _default2;