"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _scrollFix = _interopRequireDefault(require("../director/scrollFix"));

require("./cityPicker-sfc.css");

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('form', {
    staticClass: "menu-columns-third",
    attrs: {
      "id": "city-picker-view"
    },
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
  }, [_c('ul', _vm._l(_vm.areaList, function (o, i) {
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
  }, [_c('ul', {
    staticClass: "second-ul"
  }, [_c('li', {
    class: {
      'menu-selected-item': _vm.areaList[_vm.index].selectAll
    }
  }, [_c('div', [_c('label', {
    class: {
      'justify-right': _vm.cityType == 'v3'
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.areaList[_vm.index].selectAll,
      expression: "areaList[index].selectAll"
    }],
    staticClass: "needsclick",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.areaList[_vm.index].selectAll) ? _vm._i(_vm.areaList[_vm.index].selectAll, null) > -1 : _vm.areaList[_vm.index].selectAll
    },
    on: {
      "change": [function ($event) {
        var $a = _vm.areaList[_vm.index].selectAll,
            $el = $event.target,
            $c = $el.checked ? true : false;

        if (Array.isArray($a)) {
          var $v = null,
              $i = _vm._i($a, $v);

          if ($el.checked) {
            $i < 0 && _vm.$set(_vm.areaList[_vm.index], "selectAll", $a.concat([$v]));
          } else {
            $i > -1 && _vm.$set(_vm.areaList[_vm.index], "selectAll", $a.slice(0, $i).concat($a.slice($i + 1)));
          }
        } else {
          _vm.$set(_vm.areaList[_vm.index], "selectAll", $c);
        }
      }, function ($event) {
        return _vm.clickAll(_vm.areaList[_vm.index]);
      }]
    }
  }), _vm._v("\n              " + _vm._s(_vm.areaList[_vm.index].selectAllName) + "\n            ")])])]), _vm._v(" "), _vm._l(_vm.areaList[_vm.index].list, function (item, idx) {
    return _c('li', {
      key: idx,
      class: [item.extraClass, {
        'menu-selected-item': item.selected,
        'menu-lines': item.line > 1
      }]
    }, [_c('div', {
      class: {
        'justify-text': _vm.cityType == 'v3'
      }
    }, [item.list && item.list.length && _vm.cityType == 'v3' ? _c('a', {
      staticClass: "menu-arrow",
      class: {
        'menu-open': item.expand,
        'justify-left': _vm.cityType == 'v3'
      },
      on: {
        "click": function click($event) {
          item.expand = !item.expand;
        }
      }
    }, [_c('span')]) : _vm._e(), _vm._v(" "), _c('label', {
      class: {
        'justify-right': _vm.cityType == 'v3',
        'spc-left': _vm.cityType == 'v3' && !item.list
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
        "type": "checkbox"
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
          return _vm.checkList(_vm.areaList[_vm.index], item);
        }]
      }
    }), _vm._v("\n              " + _vm._s(item.name) + "\n\n              "), item.list && item.list.length && _vm.cityType == 'v3' ? _c('span', {
      staticClass: "badge",
      attrs: {
        "id": item.name + idx + _vm.index
      }
    }, [_vm._v("\n                市本级\n              ")]) : _vm._e()]), _vm._v(" "), item.list && item.list.length && _vm.cityType != 'v3' ? _c('a', {
      staticClass: "menu-arrow",
      class: {
        'menu-open': item.expand
      },
      on: {
        "click": function click($event) {
          item.expand = !item.expand;
        }
      }
    }, [_c('span')]) : _vm._e()]), _vm._v(" "), item.expand ? _c('ul', {
      staticClass: "third-ul"
    }, [_vm.cityType != 'v1' ? _c('li', {
      class: {
        'menu-selected-item': item.selectAll
      }
    }, [_c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: item.selectAll,
        expression: "item.selectAll"
      }],
      staticClass: "needsclick",
      attrs: {
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
    }), _vm._v("\n                " + _vm._s(item.selectAllName) + "\n              ")])]) : _vm._e(), _vm._v(" "), _vm._l(item.list, function (node, k) {
      return _c('li', {
        key: k,
        class: [node.extraClass, {
          'menu-selected-item': node.selected,
          'menu-lines': node.line > 1
        }]
      }, [_c('label', [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: node.selected,
          expression: "node.selected"
        }],
        staticClass: "needsclick",
        attrs: {
          "type": "checkbox"
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
            return _vm.checkList(_vm.areaList[_vm.index], node, item);
          }]
        }
      }), _vm._v("\n                " + _vm._s(node.name) + "\n              ")])]);
    })], 2) : _vm._e()]);
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "menu-btns"
  }, [_c('span', {
    staticClass: "btn",
    on: {
      "click": _vm.onReset
    }
  }, [_vm._v("重置")]), _vm._v(" "), _c('span', {
    staticClass: "btn btn-ok",
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v(" 确认 ")])])]);
};

var __vue_staticRenderFns__ = [];
var _default = {
  _scopeId: 'data-v-0c651d86',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  props: {
    clist: Array,
    idx: Number,
    defaultCheckCitys: [],
    //默认选中城市

    /*
     *	https://app.mockplus.cn/app/PHIsG8_Yb-/develop/design/1_XHgHUMpdXm
     *	@v1：一、筛选-多层级多选（勾选选中下面层级,无'全部'选项）
     *	@v2：二、筛选-多层级多选（勾选只选中本身）
     *	@v3：三、筛选-多层级多选（勾选只选中本身，省本级概念）
     */
    cityType: {
      type: String,
      default: 'v1'
    }
  },
  directives: {
    scrollFix: _scrollFix.default
  },
  data: function data() {
    return {
      areaList: [],
      index: 0
    };
  },
  watch: {
    clist: {
      deep: true,
      immediate: true,
      handler: function handler(val) {
        var value = _jquery.default.extend(true, [], val),
            list = this.handleAreaList(value);

        this.areaList = _jquery.default.extend(true, [], list);
        this.initList = _jquery.default.extend(true, [], this.initAreaList(val));
      }
    }
  },
  mounted: function mounted() {},
  methods: {
    /**
     * 切换节点选中状态
     * @root: 根节点
     * @parent: 父节点
     * @node: 子节点
     */
    checkList: function checkList(root, node, parent) {
      var _this = this;

      if (this.cityType == 'v1') {
        this.$nextTick(function () {
          _this.changeNodeStatus(root, node, parent);
        });
      } else {
        this.$nextTick(function () {
          _this.calcCheckAll(root);
        });
      }

      this.$nextTick(function () {
        _this.calcCountryList(node);
      });
    },
    // 切换当前节点状态
    changeNodeStatus: function changeNodeStatus(root, node, parent) {
      var _this2 = this;

      if (node) {
        this.$nextTick(function () {
          node.selectAll = node.selected;
          node.list && node.list.forEach(function (d) {
            d.selected = node.selected;
          });
        });
      }

      if (parent && parent.list) {
        var sltList = parent.list.filter(function (d) {
          return d.selected;
        });
        parent.selected = sltList.length == parent.list.length;
        parent.selectAll = parent.selected;
      }

      this.$nextTick(function () {
        _this2.calcCheckAll(root);
      });
    },
    // 点击全选
    clickAll: function clickAll(obj) {
      var _this3 = this;

      this.$nextTick(function () {
        obj.list && obj.list.forEach(function (o) {
          o.selected = obj.selectAll;

          if (o.list) {
            o.list.forEach(function (val) {
              val.selected = obj.selectAll;
            });
          }
        });

        _this3.calcCheckAll(_this3.areaList[_this3.index]);

        _this3.$nextTick(function () {
          _this3.calcCountryList(obj);
        });
      });
    },
    // 处理父子节点全选半选状态
    calcCheckAll: function calcCheckAll(o) {
      var selectAll = true,
          hasSelected = false;
      o.list && o.list.forEach(function (obj) {
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
    // 全国-省市区联动
    calcCountryList: function calcCountryList(node) {
      var _this4 = this;

      // console.log('node====', node);
      // if (this.cityType != 'v1') return;  //禁止（全国-省市区联动）
      if (this.areaList[0].name == '全国') {
        //全国存在的情况下
        var ourCountry = this.areaList[0]; //全国下面数据

        if (this.index) {
          // 直接选中省份中市区
          ourCountry.list.forEach(function (province, idx) {
            if (province.value == _this4.areaList[_this4.index].value) {
              _this4.$nextTick(function () {
                province.selected = _this4.areaList[_this4.index].selectAll;
                province.selectAll = _this4.areaList[_this4.index].selectAll;
              });
            }
          });
          this.$nextTick(function () {
            ourCountry.hasSelected = ourCountry.list.filter(function (d) {
              return d.selected;
            }).length > 0;
            ourCountry.selectAll = ourCountry.list.filter(function (d) {
              return d.selected;
            }).length == ourCountry.list.length;
          });
        } else {
          if (node.name == '全国') {
            // 选中全国中的'全部'
            if (node.selectAll) {
              this.areaList.forEach(function (province, idx) {
                if (province.name != '全国') {
                  province.hasSelected = true;
                  province.selectAll = true;
                  province.selected = true;

                  _this4.handleSelectAll(province);
                }
              });
            } else {
              this.onReset();
            }
          } else {
            // 选中全国中的省份
            this.areaList.forEach(function (province, idx) {
              if (province.value == node.value) {
                province.selected = node.selected;
                province.selectAll = node.selected;
                province.hasSelected = node.selected;
                province.list && province.list.forEach(function (o) {
                  o.selected = province.selectAll;
                  o.selectAll = province.selectAll;

                  if (o.list) {
                    o.list.forEach(function (val) {
                      val.selected = province.selectAll;
                    });
                  }
                });
              }
            });
          }
        }
      }
    },
    // 执行‘全国’全部操作
    handleSelectAll: function handleSelectAll(obj) {
      var _this5 = this;

      obj.list && obj.list.forEach(function (o) {
        o.selected = obj.selectAll;
        o.selectAll = obj.selectAll;

        if (o.list) {
          _this5.handleSelectAll(o);
        }
      });
    },
    // 初始化数据
    handleAreaList: function handleAreaList(list, parent) {
      var _this6 = this;

      if (!list) return;
      list.forEach(function (item) {
        item.selected = item.selected ? item.selected : false;
        item.expand = item.expand ? item.expand : false;
        item.hasSelected = item.hasSelected ? item.hasSelected : false;
        item.selectAll = item.selectAll ? item.selectAll : false;
        item.selectAllName = item.selectAllName ? item.selectAllName : '全部';

        if (_this6.defaultCheckCitys && _this6.defaultCheckCitys.includes(item.value)) {
          //默认选中项处理
          item.selected = true;

          if (item.key == 'ProvinceCode') {
            item.selectAll = true;
            item.hasSelected = true;
            item.list && item.list.forEach(function (o) {
              o.selected = true;
              o.selectAll = true;

              if (o.list) {
                o.list.forEach(function (val) {
                  val.selected = true;
                });
              }
            });
          }

          if (parent) {
            parent.hasSelected = true;

            if (parent.list) {
              var childSlt = parent.list.filter(function (d) {
                return d.selected;
              });
              parent.selectAll = parent.list.length == childSlt.length;
            }
          }
        }

        if (item.list) {
          _this6.handleAreaList(item.list, item);
        }
      });
      return list;
    },
    // 清空整个地区已选数据
    initAreaList: function initAreaList(list, parent) {
      var _this7 = this;

      if (!list) return;
      list.forEach(function (item) {
        item.selected = false;
        item.expand = false;
        item.hasSelected = false;
        item.selectAll = false;
        item.selectAllName = item.selectAllName ? item.selectAllName : '全部';

        if (item.list) {
          _this7.initAreaList(item.list, item);
        }
      });
      return list;
    },
    // 确定选中
    onSubmit: function onSubmit() {
      var _this8 = this;

      var selectList = []; // console.log("areaList", this.areaList);

      this.areaList.forEach(function (d) {
        if (_this8.cityType != 'v1') {
          // if (d.selectAll && d.value) {
          //   selectList.push(d);
          // }
          d.list && d.list.forEach(function (o) {
            o.list && o.list.forEach(function (obj) {
              obj.selected && selectList.push(obj);
            });
            o.selected && selectList.push(o);
          });
        } else {
          if (d.selectAll && d.value) {
            selectList.push(d);
          } else {
            d.list && d.list.forEach(function (o) {
              if (o.list && o.selectAll && o.value) {
                selectList.push(o);
              } else {
                o.list && o.list.forEach(function (obj) {
                  if (obj.selectAll && obj.value) {
                    selectList.push(obj);
                  } else {
                    obj.selected && selectList.push(obj);
                  }
                });
              }

              o.selected && selectList.push(o);
            });
          }
        }
      });
      this.$nextTick(function () {
        var ary = [];

        _this8.$emit('menuSubmit', {
          idx: _this8.idx,
          list: _this8.areaList,
          selectList: selectList.filter(function (d) {
            return !ary.includes(d.value) && ary.push(d.value); //数组过滤并去重
          })
        }, 'cityPicker');
      });
    },
    // 重置数据
    onReset: function onReset() {
      this.areaList = _jquery.default.extend(true, [], this.initList);
    }
  }
};
exports.default = _default;