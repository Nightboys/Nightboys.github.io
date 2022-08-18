"use strict";

exports.__esModule = true;
exports.default = void 0;

require("./index-sfc.css");

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visible,
      expression: "visible"
    }],
    staticClass: "indicator"
  }, [_c('div', {
    staticClass: "indicator-wrapper",
    style: "background: " + _vm.background
  }, [_c('span', {
    staticClass: "indicator-spin"
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.text,
      expression: "text"
    }],
    staticClass: "indicator-text"
  }, [_vm._v(_vm._s(_vm.text))])]), _vm._v(" "), _c('div', {
    staticClass: "indicator-mask",
    style: {
      opacity: _vm.opacity,
      top: _vm.top
    },
    on: {
      "touchmove": function touchmove($event) {
        $event.stopPropagation();
        $event.preventDefault();
      },
      "scroll": function scroll($event) {
        $event.stopPropagation();
        $event.preventDefault();
      }
    }
  })]);
};

var __vue_staticRenderFns__ = [];
var _default = {
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'uiLoading',
  data: function data() {
    return {
      visible: true
    };
  },
  props: {
    text: String,
    opacity: [Number, String],
    top: [Number, String],
    background: String
  }
};
exports.default = _default;