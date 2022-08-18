import slotList from "./slot";
import './tree-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "tree-box"
  }, [_c('slotList', {
    attrs: {
      "cList": _vm.treeData
    }
  })], 1);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-09ea9c96',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  components: {
    slotList: slotList
  },
  props: {
    // 树节点
    treeData: []
  },
  data: function data() {
    return {};
  },
  mounted: function mounted() {// console.log("treeData=====", this.treeData);
  },
  methods: {}
};