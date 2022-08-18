import "vant/es/toast/style";
import _Toast from "vant/es/toast";
import './slot-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ul', {
    staticClass: "tree-list"
  }, [_vm.calcLastNode(_vm.cList) ? _c('li', {
    staticClass: "tree-node"
  }, [_c('div', {
    staticClass: "label",
    class: {
      active: _vm.parentNode.selected
    },
    on: {
      "click": function click($event) {
        return _vm.sltCurrentNode(_vm.parentNode);
      }
    }
  }, [_c('i', {
    staticClass: "icon checkbox",
    class: {
      check: _vm.parentNode.selected
    }
  }), _vm._v("全部\n    ")])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.cList, function (item, fx) {
    return _c('li', {
      key: fx,
      staticClass: "tree-node"
    }, [_c('div', {
      staticClass: "label",
      class: {
        active: item.selected
      },
      on: {
        "click": function click($event) {
          return _vm.changeNode(item, _vm.parentNode);
        }
      }
    }, [[item[_vm.treeProps.children] && item[_vm.treeProps.children].length ? _c('i', {
      staticClass: "icon arrow",
      class: {
        open: item.expand
      }
    }) : _c('i', {
      staticClass: "icon checkbox",
      class: {
        check: item.selected
      }
    })], _vm._v("\n      " + _vm._s(item[_vm.treeProps.label]) + "\n    ")], 2), _vm._v(" "), item[_vm.treeProps.children] && item[_vm.treeProps.children].length ? [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: item.expand,
        expression: "item.expand"
      }],
      staticClass: "content"
    }, [_c('slotList', {
      attrs: {
        "cList": item[_vm.treeProps.children],
        "parentNode": item,
        "treeProps": _vm.treeProps
      }
    })], 1)] : _vm._e()], 2);
  })], 2);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-f5caae74',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'slotList',
  inject: {
    maxLen: {
      default: function _default() {
        return 0;
      }
    },
    selectListLen: {
      default: function _default() {}
    },
    maxTips: {
      default: function _default() {
        return '已选项超出最大限制';
      }
    },
    changeTree: {
      default: function _default() {}
    },
    title: {
      default: function _default() {
        return '请选择';
      }
    },
    treeProps: {
      default: function _default() {
        return {
          children: 'children',
          label: 'name',
          nodeKey: 'id',
          treeType: ''
        };
      }
    }
  },
  props: {
    // 树节点
    cList: {
      type: Array,
      default: []
    },
    // 当前节点的父节点
    parentNode: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {};
  },
  mounted: function mounted() {// console.log("====provide====", this.maxLen(), this.treeProps, this.title());
  },
  methods: {
    // 最细节点下层增加“全部”，当最细节点下只有一条数据，不需展示“全部”
    calcLastNode: function calcLastNode(list) {
      if (list === void 0) {
        list = [];
      }

      var _child = this.treeProps.children,
          lastList = list.filter(function (d) {
        return d[_child] && d[_child].length;
      });
      return !lastList.length && list.length > 1;
    },
    // '全选'当前节点下子节点
    sltCurrentNode: function sltCurrentNode(parentNode) {
      var _this = this;

      var _child = this.treeProps.children,
          unCheckList = [];

      if (parentNode) {
        unCheckList = parentNode[_child].filter(function (d) {
          return !d.selected;
        });
      }

      if (!parentNode.selected && this.maxLen() && this.maxLen() < this.selectListLen() + unCheckList.length) {
        _Toast({
          message: this.maxTips() ? this.maxTips() : "\u6700\u591A\u53EF\u9009" + this.maxLen() + "\u6761" + (this.title() != '请选择' ? this.title() : '')
        });

        return;
      }

      parentNode.selected = !parentNode.selected;
      this.$nextTick(function () {
        parentNode[_child] && parentNode[_child].forEach(function (node) {
          node.selected = parentNode.selected;
        });

        _this.changeTreeNodes();
      });
    },
    // 节点状态发生变化
    changeNode: function changeNode(node, parentNode) {
      var _this2 = this;

      if (parentNode === void 0) {
        parentNode = {};
      }

      var _child = this.treeProps.children;

      if (node[_child] && node[_child].length) {
        node.expand = !node.expand;
      } else {
        if (!node.selected && this.maxLen() && this.maxLen() <= this.selectListLen()) {
          _Toast({
            message: this.maxTips() ? this.maxTips() : "\u6700\u591A\u53EF\u9009" + this.maxLen() + "\u6761" + (this.title() != '请选择' ? this.title() : '')
          });

          return;
        }

        node.selected = !node.selected;
        this.$nextTick(function () {
          if (parentNode[_child]) {
            parentNode.selected = parentNode[_child].filter(function (d) {
              return d.selected;
            }).length == parentNode[_child].length;
          }

          _this2.changeTreeNodes();
        });
      }
    },
    // 触发目录树change事件
    changeTreeNodes: function changeTreeNodes() {
      this.changeTree();
    }
  }
};