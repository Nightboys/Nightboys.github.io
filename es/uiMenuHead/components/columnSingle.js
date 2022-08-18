import _extends from "@babel/runtime/helpers/esm/extends";
import $ from 'jquery';
import scrollFix from '../director/scrollFix';
import './columnSingle-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "menu-columns-single",
    on: {
      "click": function click($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('div', {
    staticClass: "menu-content"
  }, [_c('div', {
    directives: [{
      name: "scroll-fix",
      rawName: "v-scroll-fix"
    }],
    staticClass: "menu-main"
  }, [_c('ul', _vm._l(_vm.list, function (o, i) {
    return _c('li', {
      key: i,
      staticClass: "needsclick",
      class: [o.extraClass, {
        'menu-active': i === _vm.columIndex,
        'menu-has-selected': o.hasSelected,
        'menu-lines': o.line > 1
      }],
      on: {
        "click": function click($event) {
          return _vm.changeColumn(i);
        }
      }
    }, [_vm._v("\n          " + _vm._s(o.name) + "\n        ")]);
  }), 0)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "scroll-fix",
      rawName: "v-scroll-fix"
    }],
    staticClass: "menu-second"
  }, [_c('ul', _vm._l(_vm.list[_vm.columIndex].list, function (item, idx) {
    return _c('li', {
      key: idx,
      staticClass: "needsclick",
      class: [item.extraClass, {
        'menu-selected-item': item.selected,
        'menu-lines': item.line > 1
      }],
      on: {
        "click": function click($event) {
          return _vm.selectItem(item, _vm.list[_vm.columIndex]);
        }
      }
    }, [_vm._v("\n          " + _vm._s(item.name) + "\n        ")]);
  }), 0)])]), _vm._v(" "), _c('div', {
    staticClass: "menu-btns"
  }, [_c('a', {
    on: {
      "click": _vm.resetParams
    }
  }, [_vm._v("重置")]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("确认")])])]);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-d4621070',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  props: {
    clist: Array,
    idx: Number,
    columIndex: [String, Number]
  },
  directives: {
    scrollFix: scrollFix
  },
  data: function data() {
    return {
      list: this.handleData()
    };
  },
  watch: {
    clist: {
      deep: true,
      handler: function handler() {
        this.list = this.handleData();
      }
    }
  },
  methods: {
    changeColumn: function changeColumn(i) {
      this.$parent.columIndex = i;
    },
    onSubmit: function onSubmit() {
      this.$emit('menuSubmit', {
        idx: this.idx,
        list: this.list,
        selectList: this.results
      });
    },
    cancel: function cancel() {
      this.$parent.cancel();
    },
    selectItem: function selectItem(item, parent) {
      var results = [];

      if (item.selected) {
        item.selected = false;
      } else {
        this.list.forEach(function (o) {
          o.hasSelected = false;
          o.list.forEach(function (obj) {
            obj.selected = obj.value == item.value;
          });
        });
        results.push(_extends({}, item, {
          params: parent.key,
          paramsName: parent.name
        }));
      }

      this.calcCheckAll(this.list[this.columIndex]); // this.onSubmit(results);

      this.results = results;
    },
    calcCheckAll: function calcCheckAll(o) {
      var hasSelected = false;
      $.each(o.list, function (i, obj) {
        if (obj.selected) {
          hasSelected = true;
          return false;
        }
      });
      o.hasSelected = hasSelected;
    },
    handleData: function handleData() {
      var _this = this;

      var arr = $.extend(true, [], this.clist),
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          width = document.body.clientWidth || document.documentElement.clientWidth,
          rate = width / 750,
          mainWidth = (266 - 10 - 28) * rate,
          contentWidth = (750 - 266 - 32 - 10) * rate;
      ctx.font = rate * 24 + "px 'PingFangSC-Regular','PingFang SC Regular', 'microsoft yahei', '\u5B8B\u4F53', tahoma, arial, simsun, sans-serif";
      arr.forEach(function (o) {
        o.line = Math.ceil(ctx.measureText(o.name).width / mainWidth);
        o.list.forEach(function (obj) {
          return obj.line = Math.ceil(ctx.measureText(obj.name).width / contentWidth);
        });

        _this.calcCheckAll(o);
      });
      return arr;
    },
    resetParams: function resetParams() {
      // this.$emit("menuReset", this.idx);
      var results = [];
      this.$parent.columIndex = 0;
      this.list.map(function (item) {
        item.hasSelected = false;
        item.list.map(function (d) {
          d.selected = false;

          if (d.searchParams) {
            d.selected = true;
            results.push(d);
          }
        });
      });
      this.results = results;
    }
  }
};