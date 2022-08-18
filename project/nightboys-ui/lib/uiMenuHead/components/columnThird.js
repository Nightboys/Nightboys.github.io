"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _scrollFix = _interopRequireDefault(require("../director/scrollFix"));

require("./columnThird-sfc.css");

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('form', {
    staticClass: "menu-columns-third",
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
    staticClass: "menu-second"
  }, [_c('ul', [_c('li', {
    class: {
      'menu-selected-item': _vm.list[_vm.index].selectAll
    }
  }, [_c('div', [_c('label', {
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
        return _vm.clickAll(_vm.list[_vm.index]);
      }]
    }
  }), _vm._v("\n              " + _vm._s(_vm.list[_vm.index].selectAllName) + "\n            ")])])]), _vm._v(" "), _vm._l(_vm.list[_vm.index].list, function (item, idx) {
    return _c('li', {
      key: idx,
      class: [item.extraClass, {
        'menu-selected-item': item.selected,
        'menu-lines': item.line > 1
      }]
    }, [_c('div', [item.list && item.list.length ? _c('a', {
      staticClass: "menu-arrow",
      class: {
        'menu-open': item.open
      },
      on: {
        "click": function click($event) {
          item.open = !item.open;
        }
      }
    }, [_c('span')]) : _vm._e(), _vm._v(" "), _c('label', {
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
    }), _vm._v("\n              " + _vm._s(item.name) + "\n              "), item.list && item.list.length ? _c('span', {
      attrs: {
        "id": item.name + idx + _vm.index
      }
    }, [_vm._v("市本级")]) : _vm._e()])]), _vm._v(" "), item.open ? _c('ul', [_c('li', {
      class: {
        'menu-selected-item': item.selectAll
      }
    }, [_c('label', {
      attrs: {
        "for": 'sSelectAll' + _vm.index + idx
      }
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: item.selectAll,
        expression: "item.selectAll"
      }],
      staticClass: "needsclick",
      attrs: {
        "id": 'sSelectAll' + _vm.index + idx,
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(item.selectAll) ? _vm._i(item.selectAll, null) > -1 : item.selectAll
      },
      on: {
        "change": [function ($event) {
          var $a = item.selectAll,
              $el = $event.target,
              $c = $el.checked ? true : false;

          if (Array.isArray($a)) {
            var $v = null,
                $i = _vm._i($a, $v);

            if ($el.checked) {
              $i < 0 && _vm.$set(item, "selectAll", $a.concat([$v]));
            } else {
              $i > -1 && _vm.$set(item, "selectAll", $a.slice(0, $i).concat($a.slice($i + 1)));
            }
          } else {
            _vm.$set(item, "selectAll", $c);
          }
        }, function ($event) {
          return _vm.clickAll(item);
        }]
      }
    }), _vm._v("\n                " + _vm._s(item.selectAllName) + "\n              ")])]), _vm._v(" "), _vm._l(item.list, function (node, k) {
      return _c('li', {
        key: k,
        class: [node.extraClass, {
          'menu-selected-item': node.selected,
          'menu-lines': node.line > 1
        }]
      }, [_c('label', {
        attrs: {
          "for": node.name + idx + _vm.index + k
        }
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: node.selected,
          expression: "node.selected"
        }],
        staticClass: "needsclick",
        attrs: {
          "type": "checkbox",
          "id": node.name + idx + _vm.index + k
        },
        domProps: {
          "checked": Array.isArray(node.selected) ? _vm._i(node.selected, null) > -1 : node.selected
        },
        on: {
          "change": [function ($event) {
            var $a = node.selected,
                $el = $event.target,
                $c = $el.checked ? true : false;

            if (Array.isArray($a)) {
              var $v = null,
                  $i = _vm._i($a, $v);

              if ($el.checked) {
                $i < 0 && _vm.$set(node, "selected", $a.concat([$v]));
              } else {
                $i > -1 && _vm.$set(node, "selected", $a.slice(0, $i).concat($a.slice($i + 1)));
              }
            } else {
              _vm.$set(node, "selected", $c);
            }
          }, function ($event) {
            return _vm.checkList(_vm.list[_vm.index], item);
          }]
        }
      }), _vm._v("\n                " + _vm._s(node.name) + "\n              ")])]);
    })], 2) : _vm._e()]);
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
var _default = {
  _scopeId: 'data-v-c6ac916e',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  props: {
    clist: Array,
    idx: Number
  },
  directives: {
    scrollFix: _scrollFix.default
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
            if (o.list && o.selectAll && o.value) {
              selectList.push(o);
            } else {
              o.list && o.list.forEach(function (obj) {
                if (o.selectAll && o.value) {
                  selectList.push(obj);
                } else {
                  obj.selected && selectList.push(obj);
                }
              });
            }

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
    menuStatusChange: function menuStatusChange(options) {
      this.$parent.menuStatusChange(_jquery.default.extend({
        idx: this.idx,
        list: this.list
      }, options));
    },
    clickAll: function clickAll(obj) {
      var _this = this;

      // console.log(obj, 'obj');
      this.$nextTick(function () {
        obj.list.forEach(function (o) {
          o.selected = obj.selectAll;

          if (o.list) {
            o.list.forEach(function (val) {
              val.selected = obj.selectAll;
            });
          }
        });

        _this.calcCheckAll(_this.list[_this.index]);

        _this.menuStatusChange({
          changeGroup: _this.list[_this.index]
        });
      });
      this.$emit('menuChange', this.idx);
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
      // console.log('columnthird calcCheckAll', o);
      var selectAll = true,
          hasSelected = false;
      o.list.forEach(function (obj) {
        if (!obj.selected) {
          selectAll = false;
        } else {
          hasSelected = true;
        }

        if (obj.list) {
          var sSelectAll = true;
          obj.list.forEach(function (v) {
            if (!v.selected) {
              sSelectAll = false;
              selectAll = false;
            } else {
              hasSelected = true;
            }
          });
          obj.selectAll = sSelectAll;
        }
      });
      o.hasSelected = hasSelected;
      o.selectAll = selectAll;
    },
    handleData: function handleData() {
      var _this3 = this;

      // console.log('columnthird handleData')
      // console.log('list',this.clist)
      //debugger
      var arr = _jquery.default.extend(true, [], this.clist);

      arr.forEach(function (o) {
        _this3.calcCheckAll(o);
      }); // console.log('handleData arr')
      // console.log(arr)

      return arr;
    }
  },
  watch: {
    clist: {
      deep: true,
      handler: function handler() {
        //console.log('watch clist')
        this.list = this.handleData();
      }
    }
  }
};
exports.default = _default;