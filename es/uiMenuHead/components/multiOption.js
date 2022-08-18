import $ from 'jquery';
import scrollFix from '../director/scrollFix';
import datePicker from './datePicker';
import './multiOption-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('form', {
    staticClass: "menu-multi-option",
    class: [{
      'menu-has-scroll': _vm.hasScroll
    }, _vm.type],
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
    directives: [{
      name: "scroll-fix",
      rawName: "v-scroll-fix"
    }],
    staticClass: "menu-scroll"
  }, [_c('ul', _vm._l(_vm.list, function (obj, objIdx) {
    return _c('li', {
      key: objIdx
    }, [_c('dl', [obj.name || typeof obj.hasSelectAll === 'undefined' || obj.hasSelectAll ? _c('dt', [obj.name ? [obj.specialSingle ? _c('div', {
      staticClass: "menu-special"
    }, [_c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: obj.selected,
        expression: "obj.selected"
      }],
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(obj.selected) ? _vm._i(obj.selected, null) > -1 : obj.selected
      },
      on: {
        "change": function change($event) {
          var $a = obj.selected,
              $el = $event.target,
              $c = $el.checked ? true : false;

          if (Array.isArray($a)) {
            var $v = null,
                $i = _vm._i($a, $v);

            if ($el.checked) {
              $i < 0 && _vm.$set(obj, "selected", $a.concat([$v]));
            } else {
              $i > -1 && _vm.$set(obj, "selected", $a.slice(0, $i).concat($a.slice($i + 1)));
            }
          } else {
            _vm.$set(obj, "selected", $c);
          }
        }
      }
    }), _vm._v("\n                  " + _vm._s(obj.name) + "\n                ")])]) : _c('span', [_vm._v(_vm._s(obj.name))])] : _vm._e(), _vm._v(" "), typeof obj.hasSelectAll === 'undefined' || obj.hasSelectAll ? _c('label', {
      attrs: {
        "for": obj.name
      },
      on: {
        "change": function change($event) {
          return _vm.checkAll(obj);
        }
      }
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: obj.selectAll,
        expression: "obj.selectAll"
      }],
      attrs: {
        "type": "checkbox",
        "id": obj.name
      },
      domProps: {
        "checked": Array.isArray(obj.selectAll) ? _vm._i(obj.selectAll, null) > -1 : obj.selectAll
      },
      on: {
        "change": function change($event) {
          var $a = obj.selectAll,
              $el = $event.target,
              $c = $el.checked ? true : false;

          if (Array.isArray($a)) {
            var $v = null,
                $i = _vm._i($a, $v);

            if ($el.checked) {
              $i < 0 && _vm.$set(obj, "selectAll", $a.concat([$v]));
            } else {
              $i > -1 && _vm.$set(obj, "selectAll", $a.slice(0, $i).concat($a.slice($i + 1)));
            }
          } else {
            _vm.$set(obj, "selectAll", $c);
          }
        }
      }
    }), _vm._v(_vm._s(obj.selectAllName) + "\n            ")]) : _vm._e()], 2) : _vm._e(), _vm._v(" "), _vm._l(obj.list, function (o, i) {
      return _c('dd', {
        key: i,
        staticClass: "needsclick",
        class: [o.extraClass, {
          'menu-selected-tick': o.selected,
          'menu-disabled': o.disabled
        }],
        on: {
          "click": function click($event) {
            return _vm.selectedItem(o, obj);
          }
        }
      }, [_c('span', [_vm._v(_vm._s(o.name))])]);
    })], 2), _vm._v(" "), obj.needDatePcker ? _c('div', {
      staticClass: "special",
      class: {
        active: obj.datePickType
      }
    }, [_c('date-picker', {
      attrs: {
        "type": "datePicker",
        "idx": objIdx,
        "extraObj": obj
      },
      on: {
        "updateDate": _vm.updateDate
      }
    })], 1) : _vm._e()]);
  }), 0)]), _vm._v(" "), _c('div', {
    staticClass: "menu-btns"
  }, [_c('a', {
    on: {
      "click": _vm.resetParams
    }
  }, [_vm._v("重置")]), _vm._v(" "), _c('button', {
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("确认")])])]);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-0c8c1bf3',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  components: {
    datePicker: datePicker
  },
  props: {
    clist: Array,
    idx: Number,
    type: String
  },
  data: function data() {
    return {
      list: $.extend(true, [], this.clist),
      hasScroll: true,
      flag: false,
      datePickType: false //是否选中日期组件

    };
  },
  directives: {
    scrollFix: scrollFix
  },
  mounted: function mounted() {
    this.checkHasScroll();
  },
  watch: {
    clist: {
      deep: true,
      handler: function handler() {
        this.list = $.extend(true, [], this.clist);
        console.log('mutioption中clist改变了', this.clist);
        this.hasScroll = true;
        this.checkHasScroll();
      }
    }
  },
  methods: {
    resetParams: function resetParams() {
      this.list.forEach(function (d) {
        d.customValue && d.needDatePcker && delete d.customValue;
      });
      this.$emit('menuReset', this.idx);
    },
    updateDate: function updateDate(val, i) {
      if (this.list[i].list) {
        this.list[i].customValue = val;
        this.list[i].single && this.list[i].list.map(function (d) {
          d.selected = false;
        });
      }

      this.list[i].datePickType = true;
    },
    onSubmit: function onSubmit() {
      var selectList = [];
      this.list.forEach(function (d) {
        if (d.specialSingle) {
          //针对特殊选项
          if (d.selected) {
            selectList.push(d);
          }
        } else {
          if (d.selectAll && d.value) {
            selectList.push(d);
          } else {
            if (d.needDatePcker) {
              //处理日期组件
              var fg = false;
              d.list && d.list.forEach(function (o) {
                if (o.selected) {
                  fg = true;
                  selectList.push({
                    list: o,
                    key: d.name,
                    params: d.key
                  });
                }
              });

              if (d.datePickType) {
                selectList.push({
                  customValue: d.customValue,
                  key: d.name,
                  params: d.key
                });
              }
            } else {
              d.list && d.list.forEach(function (o) {
                if (o.selected) selectList.push({
                  list: o,
                  key: d.name,
                  params: d.key
                });
              });
            }
          }
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
    checkAll: function checkAll(obj) {
      var _this = this;

      if (obj.disabled) return;
      this.$nextTick(function () {
        obj.list.forEach(function (o) {
          if (!o.disabled) o.selected = obj.selectAll;
        });
        _this.list = $.extend(true, [], _this.list);
      });
      this.$emit('onChange', this.idx);
      this.menuStatusChange({
        changeGroup: obj
      });
    },
    selectedItem: function selectedItem(o, obj) {
      if (o.disabled) return;

      if (!o.selected && obj.needDatePcker && obj.single) {
        //日期插件
        obj.list.forEach(function (v) {
          v.selected = false;
        });
        obj.datePickType = false;
      }

      o.selected = !o.selected;

      if (obj.cancelable === false) {
        var isAllUnCheck = obj.list.every(function (item) {
          return !item.selected;
        });

        if (isAllUnCheck) {
          o.selected = true;
        }
      }

      if (o.cancelable === false) {
        o.selected = true;
      }

      if (typeof obj.hasSelectAll === 'undefined' || obj.hasSelectAll) {
        if (o.selected && !obj.selectAll) {
          var selectAll = true;
          $.each(obj.list, function (i, item) {
            if (!item.selected) {
              selectAll = false;
              return false;
            }
          });
          obj.selectAll = selectAll;
        } else if (!o.selected && obj.selectAll) {
          obj.selectAll = false;
        }
      } else if (obj.single) {
        obj.list.forEach(function (d) {
          if (d.name !== o.name) d.selected = false;
        });
      }

      if (obj.cancelable !== false || obj.cancelable === false && o.selected === false) {
        this.$emit('onChange', this.idx, o, obj);
      }

      this.menuStatusChange({
        item: o,
        changeGroup: obj
      });
    },
    menuStatusChange: function menuStatusChange(options) {
      this.$parent.menuStatusChange($.extend({
        idx: this.idx,
        list: this.list
      }, options));
    },
    checkHasScroll: function checkHasScroll() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.hasScroll = document.querySelector('.menu-scroll ul').offsetHeight + document.querySelector('.menu-btns').offsetHeight > document.querySelector('.menu-dialog').offsetHeight;
      });
    }
  }
};