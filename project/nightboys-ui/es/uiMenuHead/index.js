import $ from 'jquery';
import multiOption from './components/multiOption';
import columns from './components/columns';
import columnSingle from './components/columnSingle';
import columnSingleWithoutBtn from './components/columnSingleWithoutBtn';
import columnThird from './components/columnThird';
import single from './components/single';
import singleDatePicker from './components/singleDatePicker';
import datePicker from './components/datePicker';
import cityPicker from './components/cityPicker';
var values = [];
import './index-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "menu-containerBP"
  }, [_c('ul', {
    staticClass: "menu-titles"
  }, [_vm._t("left"), _vm._v(" "), _vm._l(_vm.list, function (o, i) {
    return _c('li', {
      key: i,
      class: [{
        'menu-active': i === _vm.currentMenuIdx,
        'menu-has-selected': o.selectName || o.showName,
        'menu-head-disabled': o.disabled,
        'menu-order': o.type === 'lineSingle'
      }, o.extraClass]
    }, [_c('a', {
      on: {
        "click": function click($event) {
          return _vm.menuClick(o, i);
        }
      }
    }, [o.showName ? _c('span', {
      attrs: {
        "x1": ""
      }
    }, [_vm._v(_vm._s(_vm.showList[i].showName.join('')))]) : o.single && o.selectName ? _c('span', {
      attrs: {
        "x2": ""
      }
    }, [_vm._v("\n          " + _vm._s(o.selectName) + "\n        ")]) : o.name && (!o.selectName || !o.single) ? _c('span', {
      attrs: {
        "x3": ""
      }
    }, [_vm._v(_vm._s(o.name))]) : _vm._e()])]);
  }), _vm._v(" "), _vm._t("right")], 2), _vm._v(" "), _c('div', {
    class: {
      animated: _vm.showCover
    },
    attrs: {
      "id": "menu-cover"
    },
    on: {
      "touchmove": function touchmove($event) {
        $event.preventDefault();
      },
      "click": _vm.cancel
    }
  }, [_c('transition', {
    attrs: {
      "name": "slide-down"
    }
  }, [_vm.menus[_vm.currentMenuIdx] && _vm.menus[_vm.currentMenuIdx].type !== 'picker' ? _c('div', {
    staticClass: "menu-dialog"
  }, [_vm.list[_vm.currentMenuIdx].type === 'single' || _vm.list[_vm.currentMenuIdx].type === 'lineSingle' ? _c('single', {
    attrs: {
      "type": _vm.menus[_vm.currentMenuIdx].type,
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items
    },
    on: {
      "menuSubmit": _vm.submit
    }
  }) : _vm._e(), _vm._v(" "), _vm.menus[_vm.currentMenuIdx].type === 'singleDatePicker' ? _c('singleDatePicker', {
    attrs: {
      "type": _vm.menus[_vm.currentMenuIdx].type,
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items
    },
    on: {
      "menuSubmit": _vm.submit
    }
  }) : _vm._e(), _vm._v(" "), /multiOption/i.test(_vm.menus[_vm.currentMenuIdx].type) ? _c('multi-option', {
    attrs: {
      "type": _vm.menus[_vm.currentMenuIdx].type,
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items
    },
    on: {
      "menuSubmit": _vm.submit,
      "onChange": _vm.change,
      "menuReset": _vm.reset,
      "getson": _vm.getson
    }
  }) : _vm._e(), _vm._v(" "), _vm.menus[_vm.currentMenuIdx].type === 'columns' ? _c('columns', {
    attrs: {
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items
    },
    on: {
      "menuSubmit": _vm.submit,
      "menuChange": _vm.change,
      "menuReset": _vm.reset
    }
  }) : _vm._e(), _vm._v(" "), _vm.menus[_vm.currentMenuIdx].type === 'columnSingle' ? _c('column-single', {
    attrs: {
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items,
      "columIndex": _vm.columIndex
    },
    on: {
      "menuSubmit": _vm.submit,
      "menuReset": _vm.reset
    }
  }) : _vm._e(), _vm._v(" "), _vm.menus[_vm.currentMenuIdx].type === 'columnSingleWithoutBtn' ? _c('columnSingleWithoutBtn', {
    attrs: {
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items,
      "columIndex": _vm.columIndex
    },
    on: {
      "menuSubmit": _vm.submit,
      "menuReset": _vm.reset
    }
  }) : _vm._e(), _vm._v(" "), _vm.menus[_vm.currentMenuIdx].type === 'columnThird' ? _c('column-third', {
    attrs: {
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items
    },
    on: {
      "menuSubmit": _vm.submit,
      "menuReset": _vm.reset,
      "menuChange": _vm.change
    }
  }) : _vm._e(), _vm._v(" "), _vm.menus[_vm.currentMenuIdx].type === 'datePicker' ? _c('date-picker', {
    attrs: {
      "type": _vm.menus[_vm.currentMenuIdx].type,
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items
    },
    on: {
      "menuSubmit": _vm.submit
    }
  }) : _vm._e(), _vm._v(" "), _vm.menus[_vm.currentMenuIdx].type === 'cityPicker' ? _c('cityPicker', {
    attrs: {
      "idx": _vm.currentMenuIdx,
      "clist": _vm.items,
      "cityType": _vm.menus[_vm.currentMenuIdx].style || 'v1'
    },
    on: {
      "menuSubmit": _vm.submit
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _vm.menus[_vm.currentMenuIdx] && _vm.menus[_vm.currentMenuIdx].type === 'picker' ? _c('div', {
    staticClass: "menu-picker",
    on: {
      "click": function click($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('div', {
    staticClass: "menu-picker-head"
  }, [_c('a', {
    on: {
      "click": function click($event) {
        return _vm.clickPicker();
      }
    }
  }, [_vm._v("完成")])]), _vm._v(" "), _c('mt-picker', {
    attrs: {
      "slots": _vm.items
    },
    on: {
      "change": _vm.onValuesChange
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "fill-blank"
  })], 1)]);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-1db135ab',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'uiMenuHead',
  props: {
    menus: Array,
    regionCode: String,
    menuToggle: Boolean
  },
  created: function created() {
    this.init();
  },
  mounted: function mounted() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) $('.menu-container').addClass('ios');
  },
  components: {
    columns: columns,
    columnSingle: columnSingle,
    columnSingleWithoutBtn: columnSingleWithoutBtn,
    columnThird: columnThird,
    multiOption: multiOption,
    single: single,
    singleDatePicker: singleDatePicker,
    datePicker: datePicker,
    cityPicker: cityPicker
  },
  data: function data() {
    return {
      showList: [],
      list: [],
      currentMenuIdx: -1,
      showCover: false,
      flag: true,
      arr: {},
      first_list: [],
      init_time: 0,
      dateRange: {},
      //日期区间
      // 针对columnSingle组件
      columIndex: 0
    };
  },
  computed: {
    items: function items() {
      return this.currentMenuIdx !== -1 ? $.extend(true, [], this.list[this.currentMenuIdx].list) : [];
    }
  },
  watch: {
    menus: {
      deep: true,
      handler: function handler() {
        if (this.showList.length === 0) {
          this.init();
        }

        this.list = this.checkSelect();
        this.listCopy = $.extend(true, [], this.list);
      }
    },
    menuToggle: {
      handler: function handler() {
        console.log(this.menuToggle);
        this.showCover = false;
        this.currentMenuIdx = -1;
      }
    },
    showCover: function showCover(value) {
      this.$emit('onMenuToggle', value);
    }
  },
  methods: {
    getson: function getson(m, f) {
      this.dateRange = m;
      this.showList[1].canReset = true; //重置
    },
    init: function init() {
      var _this = this;

      this.init_time += 1;
      this.menus.forEach(function (menu, index) {
        _this.$set(_this.showList, index, {
          showName: [],
          list: [],
          canReset: true,
          disabled: false
        });
      });
      this.list = this.checkSelect(); //debugger

      $.extend(true, [], this.list).forEach(function (item, i) {
        _this.showList[i].list = item;
      }); //debugger

      if (this.init_time === 1) {
        this.first_list = [].concat(this.showList);
      }
    },
    reset: function reset(index) {
      if (this.showList[index].canReset) {
        //this.listCopy = $.extend(true, [], this.list);
        this.showList[index].list = this.first_list[index].list;
        this.$set(this.list, index, $.extend(true, {}, this.showList[index].list));
        this.showList[index].canReset = false;
      }
    },
    menuClick: function menuClick(o, i) {
      var _this2 = this;

      // console.log('kkk===', o, i);
      this.showList.forEach(function (o) {
        return o.canReset = true;
      });
      if (this.listCopy) this.list = this.listCopy;

      if (o.disabled || i === this.currentMenuIdx) {
        this.currentMenuIdx = -1;
        this.$nextTick(function () {
          _this2.showCover = false;
          $('html').removeClass('noscroll');
        });
      } else {
        this.showCover = true;
        $('html').addClass('noscroll');

        if (this.currentMenuIdx === -1) {
          this.$nextTick(function () {
            _this2.currentMenuIdx = i;
          });
        } else {
          this.currentMenuIdx = -1;
          this.$nextTick(function () {
            _this2.currentMenuIdx = i;
          });
        }
      }
    },
    menuStatusChange: function menuStatusChange(o) {
      this.$emit('menuStatusChange', o);
    },
    clickPicker: function clickPicker() {
      this.list[this.currentMenuIdx].name = values[0];
      var idx = 0;
      this.list[this.currentMenuIdx].list.forEach(function (o) {
        if (o.values) {
          o.defaultIndex = o.values.indexOf(values[idx]);
          idx++;
        }
      });
      this.submit({
        idx: this.currentMenuIdx,
        list: this.list[this.currentMenuIdx].list,
        selectList: values
      });
    },
    onValuesChange: function onValuesChange(picker, vals) {
      values = vals;
    },
    checkSelect: function checkSelect() {
      var _this3 = this;

      var arr = $.extend(true, [], this.menus);
      if (arr.length > 4) arr.length = 4;
      arr.forEach(function (o, index) {
        if (o.name) {
          o.single = /single/i.test(o.type); //单选页面type包含single

          var selectName = '';
          if (typeof o.extraClass === 'undefined') o.extraClass = ''; // 默认选中

          if (o.type == 'columnThird' && _this3.regionCode && _this3.flag) {
            o.list.forEach(function (item) {
              if (item.parent == '') {
                o.list[0].list.forEach(function (item) {
                  if (item.value == _this3.regionCode) {
                    console.log(item);
                    item.selected = true;
                  }
                });
                o.list[0].list.map(function (o) {
                  if (o.selected == true) _this3.arr = o;
                });
              } // 市级默认选中


              if (item.parent != '') {
                item.list.map(function (o) {
                  if (o.list && o.value == _this3.regionCode) {
                    o.selected = true;
                    o.list.map(function (k) {
                      k.selected = true;
                    });
                  }
                });
              } // 县级默认选中


              if (item.parent != '') {
                item.list.map(function (o) {
                  if (o.list) {
                    o.list.forEach(function (k) {
                      if (k.value == _this3.regionCode) {
                        k.selected = true;
                      }
                    });
                  }
                });
              }
            });
          }

          if (o.type !== 'picker') {
            o.list.forEach(function (obj, idx) {
              if (!o.single && typeof obj.hasSelectAll === 'undefined') obj.hasSelectAll = true;
              obj.extraClass = obj.extraClass || '';
              obj.selectAllName = obj.selectAllName || '全部';

              if (obj.list) {
                var selectAll = true;
                obj.list.forEach(function (item) {
                  if (typeof item.selected === 'undefined') item.selected = false;

                  if (item.selected) {
                    selectName = item.name;

                    if (o.type == 'columnSingleWithoutBtn' || o.type == 'columnSingle') {
                      selectName = obj.name ? obj.name + item.name : item.name;
                    }

                    if (!o.single) {
                      _this3.showList[index].showName[idx] = typeof o.showName === 'function' ? o.showName.call(null, o, index, item) : o.showName;
                    } else {
                      _this3.showList[index].showName = [typeof o.showName === 'function' ? o.showName.call(null, o, index, item) : o.showName];
                    }
                  } else {
                    selectAll = false;
                  }

                  obj.selectAll = selectAll;

                  if ((o.type === 'columnThird' || o.type === 'cityPicker') && item.list) {
                    if (typeof item.hasSelectAll === 'undefined') item.hasSelectAll = true;
                    item.selectAllName = item.selectAllName || '全部';
                    item.open = false;
                    item.list.forEach(function (node) {
                      if (typeof node.selected === 'undefined') node.selected = false;

                      if (node.selected) {
                        selectName = node.name;
                      } else {
                        selectAll = false;
                      }
                    });
                  }
                });
                o.selectName = selectAll ? o.name : selectName; //datePicker显示名称的特殊处理

                if (o.type === 'datePicker') {
                  if (o.list.dateDuration && o.list.dateDuration.length > 0) {
                    o.showName = o.name;
                  } else {
                    o.showName = o.selectName;
                  }

                  _this3.showList[index].showName = [o.showName];
                }
              }
            });
          }
        }
      });
      return arr;
    },
    submit: function submit(o, cmType) {
      // console.log('menuHead返回数据=====', $.extend(true, {}, o));
      this.flag = false;
      var csList = ['columnSingle', 'columnSingleWithoutBtn'],
          spcList = ['single', 'singleDatePicker'].concat(csList);

      if (typeof o.selectList != 'undefined') {
        if (spcList.includes(this.list[o.idx].type)) {
          //单选组件
          this.list[o.idx].selectName = o.selectList[0] ? o.selectList[0].name : '';

          if (csList.includes(this.list[o.idx].type)) {
            this.list[o.idx].selectName = o.selectList[0] ? o.selectList[0].paramsName ? o.selectList[0].paramsName + o.selectList[0].name : o.selectList[0].name : '';
          }
        } else {
          this.list[o.idx].selectName = o.selectList[0] ? o.selectList[0].name || o.selectList[0].key || '' : ''; //多选组件
        }
      }

      this.list[o.idx].list = o.list;

      if (this.dateRange.key && (this.list[o.idx].list.length == 9 || this.list[o.idx].list.length == 3)) {
        //修改this.list，保存结果
        this.list[o.idx].list[0].dateRange[0] = this.dateRange.list.value[0];
        this.list[o.idx].list[0].dateRange[1] = this.dateRange.list.value[1];
        o.selectList.push(this.dateRange);
      }

      this.$emit('menuChange', $.extend(true, [], this.list), o.idx, o.selectList);
      this.showList[o.idx].canReset = true;
      this.showCover = false;
      $('html').removeClass('noscroll');
      this.currentMenuIdx = -1;
      this.dateRange = {};
    },
    change: function change(index) {
      this.showList[index].canReset = true;
    },
    closeCover: function closeCover(_temp) {
      var _this4 = this;

      var _ref = _temp === void 0 ? {} : _temp,
          _ref$reset = _ref.reset,
          reset = _ref$reset === void 0 ? true : _ref$reset;

      this.showCover = false;
      this.currentMenuIdx = -1;

      if (reset) {
        this.list.forEach(function (_, index) {
          _this4.reset(index);
        });
      }
    },
    cancel: function cancel() {
      this.showCover = false;
      $('html').removeClass('noscroll');
      this.currentMenuIdx = -1;
      this.showList.forEach(function (o) {
        return o.canReset = true;
      });

      if (this.listCopy) {
        this.list = this.listCopy;
      }
    }
  }
};