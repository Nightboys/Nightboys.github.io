"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

require("vant/lib/action-sheet/style");

var _actionSheet = _interopRequireDefault(require("vant/lib/action-sheet"));

require("vant/lib/picker/style");

var _picker = _interopRequireDefault(require("vant/lib/picker"));

require("vant/lib/button/style");

var _button = _interopRequireDefault(require("vant/lib/button"));

require("vant/lib/dialog/style");

var _dialog = _interopRequireDefault(require("vant/lib/dialog"));

var _vue = _interopRequireDefault(require("vue"));

require("./index-sfc.css");

_vue.default.use(_actionSheet.default).use(_picker.default).use(_button.default).use(_dialog.default);

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "ui-picker"
  }, [_c('van-action-sheet', {
    attrs: {
      "title": _vm.title
    },
    on: {
      "close": _vm.onClose
    },
    model: {
      value: _vm.isShowPicker,
      callback: function callback($v) {
        _vm.isShowPicker = $v;
      },
      expression: "isShowPicker"
    }
  }, [_c('van-picker', {
    ref: "vanPicker",
    attrs: {
      "show-toolbar": false,
      "columns": _vm.columns,
      "item-height": _vm.itemHeight,
      "visible-item-count": 5
    },
    on: {
      "change": _vm.onChange,
      "confirm": _vm.onConfirm
    }
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
  _scopeId: 'data-v-7d59dbc0',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'uiPicker',
  props: {
    // 标题
    title: {
      type: String,
      default: function _default() {
        return '请选择';
      }
    },
    //显示与隐藏
    isShow: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    //单项高度px
    itemHeight: {
      type: Number,
      default: function _default() {
        return 43;
      }
    },
    columns: {
      type: Array,
      default: [] //https://youzan.github.io/vant/#/zh-CN/picker

    }
  },
  data: function data() {
    return {
      isShowPicker: false
    };
  },
  watch: {
    isShow: {
      immediate: true,
      handler: function handler(val) {
        this.isShowPicker = val;
      }
    }
  },
  methods: {
    onChange: function onChange(picker, value, index) {},
    onConfirm: function onConfirm(value, index) {
      this.isShowPicker = false;
      this.$emit('confirm', {
        value: value,
        index: index
      });
    },
    onClose: function onClose() {
      this.$emit('close');
    },
    confirmPicker: function confirmPicker() {
      this.$refs.vanPicker.confirm();
    },
    // 设置对应列选中的值
    setColumnValue: function setColumnValue(columnIndex, value) {
      var picker = this.$refs.vanPicker;
      picker.setColumnValue(columnIndex, value);
    },
    // 设置所有列选中的值
    setPickerValues: function setPickerValues(values) {
      if (!values || typeof values != 'object') {
        console.error("参数需传数组类型，如['周一','下午']");
        return;
      }

      var picker = this.$refs.vanPicker;
      picker.setValues(values);
    }
  }
};
exports.default = _default2;