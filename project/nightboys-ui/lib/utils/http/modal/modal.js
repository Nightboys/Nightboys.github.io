"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _scrollFix = _interopRequireDefault(require("../director/scrollFix"));

require("./modal-sfc.css");

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "scale-in"
    }
  }, [_vm.visible ? _c('div', {
    staticClass: "power-hint"
  }, [_c('div', {
    directives: [{
      name: "scroll-fix",
      rawName: "v-scroll-fix"
    }],
    staticClass: "hint-content"
  }, [_c('div', {
    staticClass: "up-content"
  }, [_c('h3', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.message))])]), _vm._v(" "), _c('div', {
    staticClass: "btn-group"
  }, [_vm.showCancelButton ? _c('custom-button', {
    class: _vm.cancelButtonClass,
    attrs: {
      "type": _vm.buttonType,
      "link": _vm.getLink('cancel')
    },
    on: {
      "click": function click($event) {
        return _vm.handleAction('cancel', $event);
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.cancelButtonText) + "\n        ")]) : _vm._e(), _vm._v(" "), _vm.showConfirmButton ? _c('custom-button', {
    class: _vm.confirmButtonClass,
    attrs: {
      "type": _vm.buttonType,
      "link": _vm.getLink('confirm')
    },
    on: {
      "click": function click($event) {
        return _vm.handleAction('confirm', $event);
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.confirmButtonText) + "\n        ")]) : _vm._e()], 1)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "scroll-fix",
      rawName: "v-scroll-fix"
    }],
    staticClass: "hint-mask"
  })]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
var _default = {
  _scopeId: 'data-v-a8958814',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  directives: {
    scrollFix: _scrollFix.default
  },
  components: {
    CustomButton: {
      props: {
        type: String,
        link: String
      },
      computed: {
        eventListeners: function eventListeners() {
          return (0, _extends2.default)({}, this.$listeners);
        }
      },
      render: function render(h) {
        var isLink = this.type === 'link';
        var attrs = isLink ? {
          target: '_blank',
          href: this.link
        } : {};
        return h(!isLink ? 'button' : 'a', {
          on: this.eventListeners,
          attrs: attrs
        }, this.$slots.default);
      }
    }
  },
  props: {
    title: String,
    message: String,
    cancelButtonText: String,
    confirmButtonText: String,
    showConfirmButton: Boolean,
    showCancelButton: Boolean,
    confirmButtonClass: [Array, Object, String],
    cancelButtonClass: [Array, Object, String],
    confirmLink: String,
    cancelLink: String,
    visible: {
      type: Boolean,
      default: false
    },
    buttonType: {
      validator: function validator(v) {
        return ['button', 'link'].indexOf(v) > -1;
      },
      default: 'button'
    }
  },
  methods: {
    getLink: function getLink(action) {
      switch (action) {
        case 'confirm':
          return this.confirmLink;

        case 'cancel':
          return this.cancelLink;

        default:
          return '';
      }
    },
    getSafeClose: function getSafeClose() {
      var _this = this;

      var currentId = this._uid;
      return function () {
        _this.$nextTick(function () {
          if (currentId === _this._uid) {
            _this.doClose();
          }
        });
      };
    },
    doClose: function doClose() {
      var _this2 = this;

      if (!this.visible) return;
      this.visible = false;
      this.onClose && this.onClose();
      setTimeout(function () {
        if (_this2.action) _this2.callback(_this2.action, _this2);
      });
    },
    handleAction: function handleAction(action, event) {
      this.action = action;

      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close, event);
      } else {
        this.doClose();
      }
    }
  }
};
exports.default = _default;