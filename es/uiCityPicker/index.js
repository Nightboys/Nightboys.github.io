import cityPicker from './cityPicker';
import './index-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "ui-picker"
  }, [_c('van-action-sheet', {
    style: _vm.styleObject,
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
  }, [_c('cityPicker', {
    ref: "myCityPicker",
    attrs: {
      "clist": _vm.areaData,
      "defaultCheckCitys": _vm.defaultCheckCitys,
      "cityType": _vm.cityType
    },
    on: {
      "menuSubmit": _vm.submit,
      "menuReset": _vm.reset
    }
  })], 1)], 1);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-84b35cce',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'uiCityPicker',
  components: {
    cityPicker: cityPicker
  },
  props: {
    // 标题
    title: {
      type: String,
      default: function _default() {
        return '请选择';
      }
    },
    // 地区组件类别
    cityType: {
      type: String,
      default: function _default() {
        return 'v1';
      }
    },
    //显示与隐藏
    isShow: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    // 自定义样式
    styleObject: {
      type: Object,
      default: function _default() {}
    },
    areaData: [],
    //地区数据
    defaultCheckCitys: [] //默认选中城市

  },
  data: function data() {
    return {
      isShowPicker: false // areaData: provinceAndCityData,
      // defaultCheckCitys: [
      // 	"340100",
      // 	"340102",
      // 	"340103",
      // 	"340104",
      // 	"340111",
      // 	"340121",
      // 	"340122",
      // 	"340123",
      // 	"340124",
      // 	"340181",
      // 	"340202",
      // ],

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
  mounted: function mounted() {// console.log("kkkkk===", this.areaData);
  },
  methods: {
    submit: function submit(detail) {
      this.isShowPicker = false;
      this.$emit('submit', detail);
    },
    reset: function reset(detail) {
      this.$emit('reset', detail);
    },
    onClose: function onClose() {
      this.$refs.myCityPicker.onReset();
      this.$emit('close');
    }
  }
};