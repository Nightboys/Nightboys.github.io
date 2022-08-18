import $ from 'jquery';
import './index-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "table-view",
    class: {
      wrap: _vm.isWrap
    }
  }, [_c('div', {
    staticClass: "table-modal"
  }, [_c('div', {
    staticClass: "table-header"
  }, [_c('table', [_vm._t("colgroup"), _vm._v(" "), _vm._t("thead")], 2)]), _vm._v(" "), _c('div', {
    staticClass: "table-body",
    style: {
      height: _vm.tableHeight != 'auto' ? _vm.tableHeight + 'px' : 'auto'
    }
  }, [_c('table', {
    attrs: {
      "id": _vm.tabRef
    }
  }, [_vm._t("colgroup"), _vm._v(" "), _vm._t("tbody-fixed"), _vm._v(" "), _vm._t("tbodyContent")], 2)])]), _vm._v(" "), _vm.isShowPage && _vm.total > _vm.splitStep && _vm.total > _vm.minStep ? _c('div', {
    staticClass: "table-page"
  }, [!_vm.isExpand ? _c('div', {
    staticClass: "page-collapse",
    on: {
      "click": function click($event) {
        _vm.isExpand = !_vm.isExpand;
        _vm.splitStep = Math.max(_vm.splitStep, _vm.minStep);
      }
    }
  }, [_c('span', [_vm._v("展开剩余" + _vm._s(_vm.total - _vm.splitStep) + "条")])]) : _c('div', {
    staticClass: "page-div"
  }, [_c('span', {
    class: {
      disabled: _vm.currentPage == 1
    },
    on: {
      "click": function click($event) {
        return _vm.jump('first', $event);
      }
    }
  }, [_vm._v("\n        首页\n      ")]), _vm._v(" "), _c('span', {
    class: {
      disabled: _vm.currentPage == 1
    },
    on: {
      "click": function click($event) {
        return _vm.jump('pre', $event);
      }
    }
  }, [_vm._v("\n        上一页\n      ")]), _vm._v(" "), _c('span', {
    staticClass: "page-number"
  }, [_vm._v("\n        " + _vm._s((_vm.currentPage + '').padStart(2, 0)) + "/" + _vm._s((_vm.totalPage + '').padStart(2, 0)) + "\n      ")]), _vm._v(" "), _c('span', {
    class: {
      disabled: _vm.currentPage == _vm.totalPage
    },
    on: {
      "click": function click($event) {
        return _vm.jump('next', $event);
      }
    }
  }, [_vm._v("\n        下一页\n      ")]), _vm._v(" "), _c('span', {
    class: {
      disabled: _vm.currentPage == _vm.totalPage
    },
    on: {
      "click": function click($event) {
        return _vm.jump('last', $event);
      }
    }
  }, [_vm._v("\n        末页\n      ")])])]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-7a4c267f',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'uiTableView',
  props: {
    tabRef: {
      type: String,
      default: 'myTable',
      require: true
    },
    isShowPage: {
      //是否分页
      type: Boolean,
      default: false
    },
    step: {
      //每页显示条数
      type: [Number, String],
      default: 6
    },
    total: {
      //总条数
      type: [Number, String],
      default: 0
    },
    isWrap: {
      //是否允许内容换行
      type: Boolean,
      default: false
    },
    isShowMore: {
      //是否显示展开剩余按钮
      type: Boolean,
      default: true
    },
    isAnimated: {
      //是否执行切换动画
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      tableHeight: 'auto',
      //表格高度自适应
      isExpand: false,
      //开启分页功能
      currentPage: 1,
      //页码
      splitStep: 6,
      //每页显示条数
      minStep: 8 //总数小于8时不分页

    };
  },
  watch: {
    isShowMore: {
      deep: true,
      immediate: true,
      handler: function handler(val, oldVal) {
        if (!val) {
          this.isExpand = true;
          this.splitStep = Math.max(this.splitStep, this.minStep); // this.resizeTabHt();
        }
      }
    },
    step: {
      deep: true,
      immediate: true,
      handler: function handler(val, oldVal) {
        this.splitStep = val;
      }
    },
    total: {
      deep: true,
      immediate: true,
      handler: function handler(val, oldVal) {
        this.currentPage = 1;
        $("#" + this.tabRef).css({
          top: 0
        });
      }
    }
  },
  filters: {
    // 金额千分位,并保留2位小数
    splitNumber: function splitNumber(num) {
      return num && parseFloat(num).toFixed(2).toString().replace(/\d+/, function (s) {
        return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      });
    }
  },
  computed: {
    totalPage: function totalPage() {
      if (this.isWrap) {
        //内容换行，根据表格高度计算分页
        var ht = $("#" + this.tabRef).height();
        return Math.ceil(ht / parseInt(this.tableHeight)) + '';
      } else {
        return Math.ceil(parseInt(this.total) / parseInt(this.splitStep)) + '';
      }
    }
  },
  mounted: function mounted() {
    this.resizeTabHt();
  },
  updated: function updated() {
    this.resizeTabHt();
  },
  methods: {
    // 重置表格高度
    resizeTabHt: function resizeTabHt() {
      var _this = this;

      if (this.isShowPage) {
        this.$nextTick(function () {
          var h = $("#" + _this.tabRef + " tr").first().height();

          if (_this.total > _this.splitStep && _this.total > _this.minStep) {
            _this.tableHeight = h * _this.splitStep;
          } else {
            _this.tableHeight = 'auto';
          }
        });
      }
    },
    // 翻页
    jump: function jump(type, e) {
      // console.log("kkk===", e);
      if (e.target.classList.contains('disabled')) return;

      switch (type) {
        case 'first':
          //首页
          this.currentPage = 1;
          break;

        case 'pre':
          //上一页
          this.currentPage -= 1;
          break;

        case 'next':
          //下一页
          this.currentPage += 1;
          break;

        case 'last':
          //末页
          this.currentPage = this.totalPage;
          break;

        default:
          break;
      }

      $("#" + this.tabRef).css({
        top: '-' + (this.currentPage - 1) * this.tableHeight + 'px',
        transition: this.isAnimated ? '' : 'none'
      });
    }
  }
};