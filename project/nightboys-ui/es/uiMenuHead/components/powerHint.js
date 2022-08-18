import $ from 'jquery';
import './powerHint-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": "power-hint"
    }
  }, [_c('div', {
    staticClass: "hint-content"
  }, [_c('div', {
    staticClass: "up-content"
  }, [_c('h3', [_vm._v("提示")]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.hintText))])]), _vm._v(" "), _c('div', {
    staticClass: "btn-group"
  }, [_c('div', {
    on: {
      "click": _vm.hideHintPage
    }
  }, [_vm._v("确定")])])]), _vm._v(" "), _c('div', {
    staticClass: "hint-mask"
  })]);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-2f59fc9f',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'powerHint',
  props: ['hintText'],
  data: function data() {
    return {};
  },
  watch: {},
  created: function created() {// window.history.pushState(null, '', 'hintPage.html')
  },
  methods: {
    hideHintPage: function hideHintPage() {
      this.$emit('changeHintShow');
    },
    goPromote: function goPromote() {
      var url = '../../user_rights_and_interests.html',
          searchStr = location.search;
      return url + searchStr;
    }
  }
};