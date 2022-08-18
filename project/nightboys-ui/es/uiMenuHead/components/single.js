import _extends from "@babel/runtime/helpers/esm/extends";
import $ from 'jquery';
import scrollFix from '../director/scrollFix';
import './single-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "menu-single",
    class: [{
      'menu-has-scroll': _vm.hasScroll
    }, this.type],
    on: {
      "click": function click($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('div', {
    directives: [{
      name: "scroll-fix",
      rawName: "v-scroll-fix"
    }],
    staticClass: "menu-scroll"
  }, [_c('ul', _vm._l(_vm.list, function (obj, idx) {
    return _c('li', {
      key: idx
    }, [_c('dl', [obj.name ? _c('dt', [obj.name ? _c('span', [_vm._v(_vm._s(obj.name))]) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm._l(obj.list, function (o, i) {
      return _c('dd', {
        key: i,
        staticClass: "needsclick",
        class: [o.extraClass, {
          'menu-selected': o.selected,
          'menu-disabled': o.disabled
        }],
        on: {
          "click": function click($event) {
            return _vm.selectedItem(o, obj);
          }
        }
      }, [_vm._v("\n            " + _vm._s(o.name) + "\n          ")]);
    })], 2)]);
  }), 0)])]);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-58b3dde2',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  props: {
    clist: Array,
    idx: Number,
    type: String
  },
  data: function data() {
    return {
      list: $.extend(true, [], this.clist),
      hasScroll: true
    };
  },
  directives: {
    scrollFix: scrollFix
  },
  methods: {
    cancel: function cancel() {
      this.$parent.cancel();
    },
    selectedItem: function selectedItem(o, obj) {
      if (o.disabled) return;
      o.selected = !o.selected;

      if (obj.cancelable === false) {
        var isAllUnCheck = obj.list.every(function (item) {
          return !item.selected;
        });

        if (isAllUnCheck) {
          o.selected = true;
        }
      }

      this.list.forEach(function (sub) {
        sub.list && sub.list.forEach(function (node) {
          if (node !== o) node.selected = false;
        });
      });
      var selectList = o.selected ? [_extends({}, o, {
        params: obj.key
      })] : [];
      this.$emit('menuSubmit', {
        idx: this.idx,
        list: this.list,
        selectList: selectList
      });

      if (obj.cancelable !== false || obj.cancelable === false && o.selected === false) {
        this.$emit('onChange', o, obj);
      }
    },
    checkHasScroll: function checkHasScroll() {
      var _this = this;

      this.$nextTick(function () {
        _this.hasScroll = document.querySelector('.menu-dialog').offsetHeight < document.querySelector('.menu-scroll ul').offsetHeight;
      });
    }
  },
  mounted: function mounted() {
    this.checkHasScroll();
  },
  watch: {
    clist: {
      deep: true,
      handler: function handler() {
        this.list = $.extend(true, [], this.clist);
        this.hasScroll = true;
        this.checkHasScroll();
      }
    }
  }
};