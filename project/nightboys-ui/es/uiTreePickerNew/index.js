import _extends from "@babel/runtime/helpers/esm/extends";
import "vant/es/toast/style";
import _Toast from "vant/es/toast";
import "vant/es/skeleton/style";
import _Skeleton from "vant/es/skeleton";
import "vant/es/field/style";
import _Field from "vant/es/field";
import $ from 'webpack-zepto';
import Vue from 'vue';
import { http } from '../utils/http/index';
Vue.use(http);
Vue.use(_Skeleton).use(_Field);
import { getUrlSearches, urlQueriesSerialize } from '../utils/urls';
import { removeObjectNil, replaceSepcialTxt } from '../utils/utils';
import uiNoDatas from '../uiNotFound';
import treeView from './tree';
var queryParams = getUrlSearches();
import './index-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "ui-picker"
  }, [_c('van-action-sheet', {
    style: _vm.styleObject,
    attrs: {
      "title": _vm.title
    },
    on: {
      "close": _vm.onClose
    },
    model: {
      value: _vm.isShowPicker,
      callback: function callback($v) {
        _vm.isShowPicker = $v;
      },
      expression: "isShowPicker"
    }
  }, [_c('div', {
    staticClass: "tree-modal"
  }, [_vm.showInput ? _c('div', {
    staticClass: "search-field"
  }, [_vm.showInput ? _c('van-field', {
    staticClass: "search-input",
    attrs: {
      "clearable": "",
      "border": false,
      "left-icon": "search",
      "placeholder": "请输入关键字",
      "maxlength": 100
    },
    on: {
      "focus": function focus($event) {
        _vm.showExpandBtn = false;
      },
      "blur": function blur($event) {
        _vm.showExpandBtn = true;
      },
      "clear": function clear($event) {
        _vm.loadingStatus2 = false;
      }
    },
    model: {
      value: _vm.filterText,
      callback: function callback($v) {
        _vm.filterText = $v;
      },
      expression: "filterText"
    }
  }) : _vm._e(), _vm._v(" "), _vm.showExpandBtn && !_vm.isShowSearch ? _c('span', {
    staticClass: "expand-btn",
    on: {
      "click": _vm.changeExpandAll
    }
  }, [_vm._v("\n          " + _vm._s(!_vm.expandAll ? '一键展开' : '一键收起') + "\n        ")]) : _vm._e()], 1) : _vm._e(), _vm._v(" "), [_c('van-skeleton', {
    attrs: {
      "row-width": _vm.rowWidth,
      "animate": false,
      "row": 8,
      "loading": _vm.loadingStatus
    }
  }, [_c('div', {
    staticClass: "filter-tree"
  }, [_c('treeView', {
    attrs: {
      "treeData": _vm.dataList
    }
  })], 1)]), _vm._v(" "), _vm._t("default")], _vm._v(" "), _vm.isShowSearch ? _c('div', {
    staticClass: "search-modal"
  }, [_c('van-skeleton', {
    attrs: {
      "row-width": _vm.rowWidth,
      "animate": false,
      "row": 8,
      "loading": _vm.loadingStatus2
    }
  }, [!_vm.resultTotal ? _c('uiNoDatas') : _c('div', {
    staticClass: "search-list"
  }, [_c('div', {
    staticClass: "search-content"
  }, _vm._l(_vm.resultList, function (item) {
    return _c('div', {
      key: item,
      staticClass: "list",
      class: {
        check: item.selected
      },
      on: {
        "click": function click($event) {
          return _vm.changeSearchType(item);
        }
      }
    }, [_c('div', {
      staticClass: "search-title",
      domProps: {
        "innerHTML": _vm._s(item.title)
      }
    }), _vm._v(" "), item.fromRank ? _c('div', {
      staticClass: "search-detail"
    }, [_vm._v("\n                  来自层级：" + _vm._s(item.fromRank) + "\n                ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('van-button', {
    staticClass: "searchOk-btn",
    attrs: {
      "round": "",
      "type": "info",
      "native-type": "button"
    },
    on: {
      "click": _vm.confirmSearch
    }
  }, [_vm._v("\n              确定\n            ")])], 1)], 1)], 1) : _vm._e()], 2)])], 1);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-b2ffadc0',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'uiTreePickerNew',
  components: {
    uiNoDatas: uiNoDatas,
    treeView: treeView
  },
  provide: function provide() {
    var _this = this;

    return {
      maxLen: function maxLen() {
        return _this.max;
      },
      //允许选中最大节点数
      selectListLen: function selectListLen() {
        return _this.selectListLen;
      },
      //已选最细层级节点数
      maxTips: function maxTips() {
        return _this.maxTips;
      },
      //超出最大已选节点数时提示信息
      changeTree: this.checkNodeHandler,
      title: function title() {
        return _this.title;
      },
      treeProps: this.treeProps
    };
  },
  props: {
    // 标题
    title: {
      type: String,
      default: function _default() {
        return '请选择';
      }
    },
    //显示与隐藏
    isShow: {
      type: Boolean,
      default: false
    },
    // 是否模糊搜索
    showInput: {
      type: Boolean,
      default: false
    },
    searchUrl: '',
    //搜索接口
    // 自定义样式
    styleObject: {
      type: Object,
      default: function _default() {}
    },
    //最大选中节点
    max: 0,
    // 最多可选xxx条
    maxTips: '',
    // 树节点
    treeData: {
      type: Array,
      default: []
    },
    // 默认选中节点
    defaultCheckdKeys: {
      type: Array,
      default: []
    },
    // 默认展开项
    defaultExpandedKeys: {
      type: Array,
      default: []
    },
    // 树节点配置项
    treeProps: {
      type: Object,
      default: function _default() {
        return {
          children: 'children',
          label: 'name',
          nodeKey: 'value',
          treeType: ''
        };
      }
    }
  },
  data: function data() {
    return {
      isShowPicker: false,
      isShowSearch: false,
      //展示搜索结果
      filterText: '',
      loadingStatus: false,
      //骨架屏
      loadingStatus2: true,
      rowWidth: ['40%', '100%', '100%', '80%', '40%', '100%', '100%', '80%'],
      resultList: [],
      //搜索匹配结果
      resultTotal: 0,
      dataList: [],
      //初始数据
      initList: [],
      //重置数据
      selectList: [],
      //已选数据
      selectKeysList: [],
      //已选数据对应value/id
      selectListLen: 0,
      //已选最细层级节点数量
      expandAll: false,
      //一键收起/展开
      showExpandBtn: true //是否显示'收起/展开'

    };
  },
  watch: {
    isShow: {
      immediate: true,
      handler: function handler(val) {
        this.isShowPicker = val;
      }
    },
    filterText: function filterText(val) {
      var _this2 = this;

      // this.$refs.tree.filter(val);
      this.filterText = val.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
      this.$nextTick(function () {
        if (_this2.filterText.length >= 2) {
          _this2.isShowSearch = true;

          _this2.getSearchHandler();
        } else {
          _this2.isShowSearch = false;
          _this2.loadingStatus2 = false;
        }
      });
    },
    treeData: {
      deep: true,
      immediate: true,
      handler: function handler(val) {
        var value = $.extend(true, [], val),
            list = this.handlerTreeData(value);
        this.dataList = $.extend(true, [], list);
        this.initList = $.extend(true, [], this.initTreeData(val));
        this.selectKeysList = Array.from(new Set([].concat(this.defaultCheckdKeys)));
      }
    },
    defaultCheckdKeys: {
      handler: function handler(val) {
        var _this3 = this;

        var list = $.extend(true, [], this.initList);
        this.dataList = $.extend(true, [], this.handlerTreeData(list));
        this.selectKeysList = Array.from(new Set([].concat(this.defaultCheckdKeys)));
        this.$nextTick(function () {
          _this3.selectListLen = _this3.selectKeysList.length;
        });
      }
    },
    defaultExpandedKeys: {
      immediate: true,
      handler: function handler(val) {
        if (val.length) {
          this.expandAll = true;
        }
      }
    }
  },
  mounted: function mounted() {
    _Toast.setDefaultOptions({
      forbidClick: true
    }); //背景不可点击

  },
  methods: {
    // 搜索
    getSearchHandler: function getSearchHandler() {
      var _this4 = this;

      this.loadingStatus2 = true;
      if (!this.searchUrl) return;
      this.$get(this.searchUrl, removeObjectNil(_extends({}, queryParams, {
        qualificationListType: this.treeProps.treeType,
        content: this.filterText
      }))).then(function (res) {
        // participleResult: "朝鲜";	//匹配关键词
        var participleResult = res.data.participleResult.split(',');
        _this4.resultTotal = res.data.total;
        var resultList = res.data.resultList || [];
        _this4.resultList = resultList.map(function (item) {
          // item.selected = this.selectKeysList.includes(item.key);
          item.selected = false;
          item.title = _this4.highlight(participleResult, item.title);
          return item;
        });
      }).finally(function () {
        _this4.loadingStatus2 = false;
      });
    },
    // 关键字高亮
    highlight: function highlight(keywords, val) {
      if (!keywords) return val;
      keywords.forEach(function (d) {
        var replaceReg = new RegExp(replaceSepcialTxt(d), 'g'),
            // 匹配关键字正则
        replaceString = '<i class="highlight-text">' + d + '</i>'; // 高亮替换v-html值

        if (val.indexOf(d) > -1) {
          val = val.replace(replaceReg, replaceString);
        }
      });
      return val;
    },
    // 处理数据格式
    handlerTreeData: function handlerTreeData(item, parent) {
      var _this5 = this;

      if (!item) return;
      var _child = this.treeProps['children'],
          _childKey = this.treeProps['nodeKey'];
      return item.map(function (m) {
        m.expand = m.expand || _this5.defaultExpandedKeys.includes(m[_childKey]) || false;
        m.selected = m.selected || _this5.defaultCheckdKeys.includes(m[_childKey]) && (!m[_child] || !m[_child].length) || false;

        if (parent) {
          parent.selected = parent[_child].length == parent[_child].filter(function (t) {
            return t.selected && (!t[_child] || !t[_child].length);
          }).length; //是否默认勾选‘全部’
        }

        if (m[_child] && m[_child].length) {
          _this5.handlerTreeData(m[_child], m);
        }

        return m;
      });
    },
    // 重置数据
    initTreeData: function initTreeData(item, parent) {
      var _this6 = this;

      if (!item) return;
      var _child = this.treeProps['children'],
          _childKey = this.treeProps['nodeKey'];
      return item.map(function (m) {
        m.expand = _this6.defaultExpandedKeys.includes(m[_childKey]) || false;
        m.selected = false;

        if (m[_child] && m[_child].length) {
          _this6.initTreeData(m[_child]);
        }

        return m;
      });
    },
    // 一键收起/展开
    changeExpandAll: function changeExpandAll() {
      var _this7 = this;

      this.expandAll = !this.expandAll;
      this.$nextTick(function () {
        _this7.changeExpandNode(_this7.dataList, _this7.expandAll, true);
      });
    },

    /**
     * 展开指定节点
     * @list:节点
     * @isOpen:收起/展开
     * @deep: 是否深度(递归)展开
     */
    changeExpandNode: function changeExpandNode(list, isOpen, deep) {
      var _this8 = this;

      if (list === void 0) {
        list = [];
      }

      if (deep === void 0) {
        deep = false;
      }

      var _child = this.treeProps['children'];
      list.forEach(function (item) {
        item.expand = isOpen;

        if (item[_child] && deep) {
          _this8.changeExpandNode(item[_child], isOpen, deep);
        }
      });
    },
    // 获取所有已选节点--通过 node 获取
    getCheckedNodes: function getCheckedNodes() {
      this.selectList = [];
      this.calcCheckedNode(this.dataList);
      return this.selectList;
    },
    calcCheckedNode: function calcCheckedNode(list) {
      var _this9 = this;

      if (list === void 0) {
        list = [];
      }

      var _child = this.treeProps['children'];
      list.forEach(function (d) {
        d.selected && (!d[_child] || !d[_child].length) && _this9.selectList.push(d); //仅返回最细层级节点

        if (d[_child]) {
          _this9.calcCheckedNode(d[_child]);
        }
      });
    },
    // 获取所有已选节点--通过 key 获取
    getCheckedKeys: function getCheckedKeys() {
      var _this10 = this;

      var sltNodes = this.getCheckedNodes();
      return sltNodes.map(function (d) {
        return d[_this10.treeProps['nodeKey']];
      });
    },
    // 当复选框被点击的时候触发
    checkNodeHandler: function checkNodeHandler() {
      var _this11 = this;

      var _child = this.treeProps['children'],
          sltNodes = this.getCheckedNodes(),
          sltKeys = sltNodes.map(function (d) {
        return d[_this11.treeProps['nodeKey']];
      });
      this.selectKeysList = sltKeys;
      this.selectListLen = sltNodes.filter(function (d) {
        return !d[_child] || !d[_child].length;
      }).length; //已选最细层级节点数量

      this.$emit('changeTree', {
        sltNodes: sltNodes,
        sltKeys: sltKeys
      });
    },

    /**
     * 通过 key/vulue 设置节点选中
     * @keys: 节点的value/id集合
     * @checked: 是否选中
     */
    setCheckedKeys: function setCheckedKeys(keys, checked) {
      var _this12 = this;

      if (checked === void 0) {
        checked = true;
      }

      keys = typeof keys == 'string' ? [keys] : keys || [];

      try {
        this.setCheckedNode(this.dataList, keys, {}, checked);
        this.$nextTick(function () {
          _this12.checkNodeHandler();
        });
      } catch (error) {
        console.error('keys数据类型为String或Array');
      }
    },
    setCheckedNode: function setCheckedNode(list, keys, parent, checked) {
      var _this13 = this;

      if (list === void 0) {
        list = [];
      }

      if (keys === void 0) {
        keys = [];
      }

      if (parent === void 0) {
        parent = {};
      }

      var _child = this.treeProps['children'],
          _childKey = this.treeProps['nodeKey'];
      list.forEach(function (item) {
        //判断当前节点为最细节点
        if (keys.includes(item[_childKey]) && (!item[_child] || !item[_child].length)) {
          item.selected = checked;
        }

        if (parent && parent[_child]) {
          parent.selected = parent[_child].filter(function (d) {
            return d.selected;
          }).length == parent[_child].length;
        }

        if (item[_child]) {
          _this13.setCheckedNode(item[_child], keys, item, checked);
        }
      });
    },
    // 重置选项
    resetChecked: function resetChecked() {
      this.dataList = JSON.parse(JSON.stringify(this.initList));
      this.selectListLen = 0; //已选最细层级节点数量
    },
    // 设置全选/取消全选
    alwaysChecked: function alwaysChecked(checked) {
      if (checked === void 0) {
        checked = true;
      }

      this.alwaysCheckedNodes(this.dataList, checked);
    },
    alwaysCheckedNodes: function alwaysCheckedNodes(list, checked) {
      var _this14 = this;

      if (list === void 0) {
        list = [];
      }

      var _child = this.treeProps['children'];
      list.forEach(function (item) {
        item.selected = checked;

        if (item[_child]) {
          _this14.alwaysCheckedNodes(item[_child]);
        }
      });
    },
    onClose: function onClose() {
      this.filterText = '';
      this.isShowSearch = false;
      this.$emit('close');
    },
    // 切换搜索树节点选中状态
    changeSearchType: function changeSearchType(item) {
      item.selected = !item.selected;
    },
    confirmSearch: function confirmSearch() {
      var searchList = this.resultList.filter(function (d) {
        return d.selected;
      }).map(function (d) {
        return d.key;
      }),
          //搜索树已选节点
      checkedKeysList = Array.from(new Set([].concat(this.selectKeysList, searchList)));

      if (this.max && this.max < checkedKeysList.length) {
        _Toast({
          message: this.maxTips ? this.maxTips : "\u6700\u591A\u53EF\u9009" + this.max + "\u6761" + (this.title != '请选择' ? this.title : '')
        });
      } else {
        this.filterText = '';
        this.isShowSearch = false;
        this.loadingStatus2 = false;
        this.setCheckedKeys(searchList, true);
      }
    }
  }
};