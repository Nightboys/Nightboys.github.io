import $ from 'jquery';
import scrollFix from '../director/scrollFix';
import './columns-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('form', {
    staticClass: "menu-columns",
    on: {
      "click": function click($event) {
        $event.stopPropagation();
      },
      "submit": function submit($event) {
        $event.preventDefault();
        return _vm.onSubmit.apply(null, arguments);
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
      class: [o.extraClass, {
        'menu-active': i === _vm.index,
        'menu-has-selected': o.hasSelected,
        'menu-lines': o.line > 1
      }],
      on: {
        "click": function click($event) {
          _vm.index = i;
        }
      }
    }, [_vm._v("\n          " + _vm._s(o.name) + "\n        ")]);
  }), 0)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "scroll-fix",
      rawName: "v-scroll-fix"
    }],
    staticClass: "menu-second needsclick"
  }, [_c('ul', [_vm.list[_vm.index].hasSelectAll ? _c('li', {
    class: {
      'menu-selected-item': _vm.list[_vm.index].selectAll
    }
  }, [_c('label', {
    attrs: {
      "for": 'selectAll' + _vm.index
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.list[_vm.index].selectAll,
      expression: "list[index].selectAll"
    }],
    staticClass: "needsclick",
    attrs: {
      "id": 'selectAll' + _vm.index,
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.list[_vm.index].selectAll) ? _vm._i(_vm.list[_vm.index].selectAll, null) > -1 : _vm.list[_vm.index].selectAll
    },
    on: {
      "change": [function ($event) {
        var $a = _vm.list[_vm.index].selectAll,
            $el = $event.target,
            $c = $el.checked ? true : false;

        if (Array.isArray($a)) {
          var $v = null,
              $i = _vm._i($a, $v);

          if ($el.checked) {
            $i < 0 && _vm.$set(_vm.list[_vm.index], "selectAll", $a.concat([$v]));
          } else {
            $i > -1 && _vm.$set(_vm.list[_vm.index], "selectAll", $a.slice(0, $i).concat($a.slice($i + 1)));
          }
        } else {
          _vm.$set(_vm.list[_vm.index], "selectAll", $c);
        }
      }, function ($event) {
        return _vm.clickAll();
      }]
    }
  }), _vm._v("\n            " + _vm._s(_vm.list[_vm.index].selectAllName) + "\n          ")])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.list[_vm.index].list, function (item, idx) {
    return _c('li', {
      key: idx,
      class: [item.extraClass, {
        'menu-selected-item': item.selected,
        'menu-lines': item.line > 1
      }]
    }, [_c('label', {
      attrs: {
        "for": item.name + idx + _vm.index
      }
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: item.selected,
        expression: "item.selected"
      }],
      staticClass: "needsclick",
      attrs: {
        "type": "checkbox",
        "id": item.name + idx + _vm.index
      },
      domProps: {
        "checked": Array.isArray(item.selected) ? _vm._i(item.selected, null) > -1 : item.selected
      },
      on: {
        "change": [function ($event) {
          var $a = item.selected,
              $el = $event.target,
              $c = $el.checked ? true : false;

          if (Array.isArray($a)) {
            var $v = null,
                $i = _vm._i($a, $v);

            if ($el.checked) {
              $i < 0 && _vm.$set(item, "selected", $a.concat([$v]));
            } else {
              $i > -1 && _vm.$set(item, "selected", $a.slice(0, $i).concat($a.slice($i + 1)));
            }
          } else {
            _vm.$set(item, "selected", $c);
          }
        }, function ($event) {
          return _vm.checkList(_vm.list[_vm.index], item);
        }]
      }
    }), _vm._v("\n            " + _vm._s(item.name) + "\n          ")])]);
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "menu-btns"
  }, [_c('a', {
    on: {
      "click": function click($event) {
        return _vm.$emit('menuReset', _vm.idx);
      }
    }
  }, [_vm._v("重置")]), _vm._v(" "), _c('button', {
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("确认")])])]);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-0f3daed7',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  props: {
    clist: Array,
    idx: Number
  },
  directives: {
    scrollFix: scrollFix
  },
  data: function data() {
    return {
      list: this.handleData(),
      index: 0
    };
  },
  methods: {
    onSubmit: function onSubmit() {
      var selectList = [];
      this.list.forEach(function (d) {
        if (d.selectAll && d.value) {
          selectList.push(d);
        } else {
          d.list && d.list.forEach(function (o) {
            o.selected && selectList.push(o);
          });
        }
      });
      this.$emit('menuSubmit', {
        idx: this.idx,
        list: this.list,
        selectList: selectList
      });
    },
    cancel: function cancel() {
      this.$parent.cancel();
    },
    clickAll: function clickAll() {
      var _this = this;

      this.$nextTick(function () {
        var current = _this.list[_this.index];
        current.hasSelected = current.selectAll;
        current.list.forEach(function (o) {
          return o.selected = current.selectAll;
        });

        _this.menuStatusChange({
          changeGroup: _this.list[_this.index]
        });
      });
      this.$emit('menuChange', this.idx);
    },
    menuStatusChange: function menuStatusChange(options) {
      this.$parent.menuStatusChange($.extend({
        idx: this.idx,
        list: this.list
      }, options));
    },
    checkList: function checkList(o, item) {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.calcCheckAll(o);

        _this2.menuStatusChange({
          changeGroup: _this2.list[_this2.index],
          item: item
        });
      });
      this.$emit('menuChange', this.idx);
    },
    calcCheckAll: function calcCheckAll(o) {
      var selectAll = true,
          hasSelected = false;
      $.each(o.list, function (i, obj) {
        if (!obj.selected) {
          selectAll = false;
        } else {
          hasSelected = true;
        }

        if (!selectAll && hasSelected) return false;
      });
      o.hasSelected = hasSelected;
      o.selectAll = selectAll;
    },
    handleData: function handleData() {
      var _this3 = this;

      var arr = $.extend(true, [], this.clist),
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          width = document.body.clientWidth || document.documentElement.clientWidth,
          rate = width / 750,
          mainWidth = (266 - 10 - 28) * rate,
          contentWidth = (750 - 266 - 32 * 2 - 24) * rate;
      ctx.font = rate * 24 + "px 'PingFangSC-Regular','PingFang SC Regular', 'microsoft yahei', '\u5B8B\u4F53', tahoma, arial, simsun, sans-serif";
      arr.forEach(function (o) {
        o.line = Math.ceil(ctx.measureText(o.name).width / mainWidth);
        o.list.forEach(function (obj) {
          return obj.line = Math.ceil(ctx.measureText(obj.name).width / contentWidth);
        });

        _this3.calcCheckAll(o);
      });
      return arr;
    }
  },
  watch: {
    clist: {
      deep: true,
      handler: function handler() {
        this.list = this.handleData();
      }
    }
  }
};