import _extends from "@babel/runtime/helpers/esm/extends";
import $ from 'jquery';
import scrollFix from '../director/scrollFix';
import datePicker from './datePickerBtn';
import './singleDatePicker-sfc.css';

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
    }, [_c('dl', {
      staticClass: "btn-group"
    }, _vm._l(obj.list, function (o, i) {
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
    }), 0), _vm._v(" "), obj.needDatePcker ? _c('dl', [obj.name ? _c('dt', [_c('span', [_vm._v(_vm._s(obj.name))])]) : _vm._e(), _vm._v(" "), _c('date-picker', {
      attrs: {
        "type": "datePicker",
        "idx": idx,
        "extraObj": obj
      },
      on: {
        "updateDate": _vm.updateDate
      }
    })], 1) : _vm._e()]);
  }), 0)])]);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-6b7b8afd',
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
      showtips: false,
      flag: false
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
        this.hasScroll = true;
        this.checkHasScroll();
      }
    }
  },
  methods: {
    cancel: function cancel() {
      this.$parent.cancel();
    },
    selectedItem: function selectedItem(o, obj) {
      if (o.disabled) return; // !o.selected && (o.selected = !o.selected);

      o.selected = !o.selected;
      obj.customValue = ['', '']; //重置自定义日期

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
      }, 'singleDatePicker');

      if (obj.cancelable !== false || obj.cancelable === false && o.selected === false) {
        this.$emit('onChange', o, obj, 'singleDatePicker');
      }
    },
    checkHasScroll: function checkHasScroll() {
      var _this = this;

      this.$nextTick(function () {
        _this.hasScroll = document.querySelector('.menu-dialog').offsetHeight < document.querySelector('.menu-scroll ul').offsetHeight;
      });
    },
    showTip: function showTip(v) {
      this.showtips = v;
      this.$emit('showTips', this.showtips);
    },
    updateDate: function updateDate(val, i) {
      var selectList = [];

      if (this.list[i].list) {
        this.list[i].customValue = val;
        this.list[i].list.map(function (d) {
          d.selected = false;
        });
      }

      selectList.push({
        customValue: val,
        name: this.list[i].name,
        params: this.list[i].key
      });
      this.$emit('menuSubmit', {
        idx: this.idx,
        list: this.list,
        selectList: selectList
      }, 'singleDatePicker');
    }
  }
};