import _extends from "@babel/runtime/helpers/esm/extends";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import $ from 'webpack-zepto';
export default {
  props: {
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    tableData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    total: {
      type: [String, Number],
      default: function _default() {
        return 0;
      }
    },
    tabId: {
      //表格组件唯一值
      type: [String, Number],
      default: function _default() {
        return 0;
      }
    },
    isWrap: {
      //超出是否换行
      type: Boolean,
      default: true
    },
    isMinHeight: {
      //表格是否设置最小高度
      type: Boolean,
      default: true
    },
    isShowPage: {
      //是否分页
      type: Boolean,
      default: false
    },
    isShowExpand: {
      //是否显示展开剩余按钮(isShowPage为true时生效)
      type: Boolean,
      default: false
    },
    isSticky: {
      //是否表头固定(吸顶)
      type: Boolean,
      default: false
    },
    initStep: {
      //初次显示6条数据 (initStep <= splitStep)
      type: [String, Number],
      default: function _default() {
        return 6;
      }
    },
    splitStep: {
      //每页显示条数
      type: [String, Number],
      default: function _default() {
        return 8;
      }
    },
    minStep: {
      //总数小于10时不分页 (splitStep <= minStep)
      type: [String, Number],
      default: function _default() {
        return 10;
      }
    }
  },
  data: function data() {
    return {
      dataList: [],
      filterColumns: {},
      currentPage: 1,
      //页码
      tbodyStyle: {},
      tbodyContentStyle: {
        'min-height': 'auto'
      },
      //表格最小高度
      isExpand: false,
      //展开剩余
      currentScrollDom: '' //当前滚动dom

    };
  },
  filters: {
    isUndefined: function isUndefined(val) {
      if (typeof val === 'undefined' || val === null || val === '' || val === '-') {
        return "-";
      } else {
        return val;
      }
    }
  },
  computed: {
    totalPage: function totalPage() {
      return Math.ceil(parseInt(this.total) / parseInt(this.splitStep));
    },
    // 表头是否需要吸顶处理
    handleSticky: function handleSticky() {
      return this.isSticky && !this.isShowPage || this.isSticky && this.isShowPage && !this.isWrap;
    },
    // 分页且内容禁止换行时是否开启分页动画
    handleAnimate: function handleAnimate() {
      return this.isSticky && this.isShowPage && !this.isWrap;
    }
  },
  watch: {
    total: {
      deep: true,
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (this.isShowExpand) {
          this.isExpand = this.isShowPage && this.total > this.minStep;
        }
      }
    },
    columns: {
      deep: true,
      immediate: true,
      handler: function handler(newVal, oldVal) {
        this.getColumns(); // 处理表头数据
      }
    },
    tableData: {
      deep: true,
      immediate: true,
      handler: function handler(newVal, oldVal) {
        var _this = this;

        this.currentPage = 1; //重置页码

        if (this.isShowPage) {
          if (this.isExpand) {
            var initStep = Math.min(this.initStep, this.splitStep);
            this.initStep = initStep;
            this.dataList = [].concat(this.tableData.slice(0, initStep));
          } else {
            if (this.handleAnimate) {
              this.dataList = [].concat(this.tableData);
            } else {
              this.dataList = [].concat(this.tableData.slice(0, this.splitStep));
            }
          }
        } else {
          this.dataList = [].concat(this.tableData);
        }

        this.$nextTick(function () {
          _this.calcTabHeight(); // 计算表格主体高度

        });
      }
    }
  },
  mounted: function mounted() {},
  methods: {
    // 数字千分位格式化
    numberFormat: function numberFormat(str) {
      var re = /(?=(?!(\b))(\d{3})+$)/g;
      return (str + "").replace(re, ",");
    },
    // 处理表头数据
    getColumns: function getColumns() {
      var fixedList = [],
          otherList = [];
      var columns = this.columns.map(function (item) {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序

        return item;
      });
      fixedList = columns.filter(function (item) {
        return item.fixed;
      });
      otherList = columns.filter(function (item) {
        return !item.fixed;
      });
      this.filterColumns = {
        fixedList: fixedList,
        otherList: otherList
      };
    },
    // 计算表格主体高度
    calcTabHeight: function calcTabHeight() {
      // 计算表头高度
      var theads = $("#uiTab" + this.tabId + " .tab-filed"),
          theadsList = [],
          iconBtns = $("#uiTab" + this.tabId + " .icon-btn");
      theads.forEach(function (element) {
        theadsList.push($(element).height());
      });
      var maxTheadsH = Math.max.apply(Math, theadsList.concat([0])); //获取表头最大高度

      theads.css({
        height: maxTheadsH + 'px'
      });
      iconBtns.css({
        height: maxTheadsH + 'px'
      }); // 计算表体行高度

      var rowsFixed = $("#uiTab" + this.tabId + " .tab-left .tab-list-item"),
          rowsFixedList = [],
          rowsOther = $("#uiTab" + this.tabId + " .tab-right .tab-list-item"),
          rowsOtherList = [],
          maxHeightList = [];
      rowsFixed.forEach(function (element) {
        element.style.height = '';
        rowsFixedList.push($(element).height());
      });
      rowsOther.forEach(function (element) {
        element.style.height = '';
        rowsOtherList.push($(element).height());
      });
      rowsFixedList.forEach(function (item, index) {
        var maxVal = Math.max(rowsFixedList[index], rowsOtherList[index]) + 'px';
        maxHeightList.push(maxVal);
      });
      rowsFixed.forEach(function (element, index) {
        $(element).css({
          height: maxHeightList[index]
        });
      });
      rowsOther.forEach(function (element, index) {
        $(element).css({
          height: maxHeightList[index]
        });
      });

      if (this.isShowPage && !this.isWrap) {
        //分页&内容不换行
        if (this.handleAnimate) {
          this.tbodyStyle = {
            'height': Math.min.apply(Math, rowsFixedList) * (!this.isExpand ? this.splitStep : this.initStep) + maxTheadsH + 'px',
            'overflow': 'hidden',
            'flex': 'none'
          }; //表格最小高度
        } else {
          this.tbodyContentStyle = {
            'height': Math.min.apply(Math, rowsFixedList) * (!this.isExpand ? this.splitStep : this.initStep) + maxTheadsH + 'px'
          }; //表格最小高度
        }
      } else {
        if (this.isShowPage && this.total > this.minStep) {
          this.tbodyContentStyle = {
            'min-height': this.isMinHeight ? Math.min.apply(Math, rowsFixedList) * this.initStep + maxTheadsH + 'px' : 'auto'
          }; //表格最小高度
        }
      }
    },
    // 手指触摸屏幕时触发
    handleTouchStart: function handleTouchStart(e) {
      // console.log('touchStart开始====', e);
      this.currentScrollDom = '';

      if (this.handleSticky) {
        //表头固定--监听当前触控区域
        if (this.$refs.tHeader.contains(e.target)) {
          this.currentScrollDom = 'tHeader';
        } else if (this.$refs.tBody.contains(e.target)) {
          this.currentScrollDom = 'tBody';
        }
      }
    },
    // 监听表格水平滚动事件
    handleHorizontalScroll: function handleHorizontalScroll(e, type) {
      // console.log('===', e.target.scrollLeft, type)
      if (this.handleSticky) {
        //表头固定
        var scrollLeft = e.target.scrollLeft;

        if (this.currentScrollDom == 'tHeader') {
          this.$refs.tBody.scrollLeft = scrollLeft;
        } else if (this.currentScrollDom == 'tBody') {
          this.$refs.tHeader.scrollLeft = scrollLeft;
        }
      }
    },
    // 排序-固定列
    handleSort1: function handleSort1(d, i) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var item;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                item = _extends({}, d);
                _context.next = 3;
                return _this2.resetSort();

              case 3:
                item.sortType = item.sortType == 2 ? 0 : item.sortType + 1;

                _this2.$set(_this2.filterColumns.fixedList, i, item);

                _this2.$emit('handleSort', item);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    // 排序-非固定列
    handleSort2: function handleSort2(d, i) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var item;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                item = _extends({}, d);
                _context2.next = 3;
                return _this3.resetSort();

              case 3:
                item.sortType = item.sortType == 2 ? 0 : item.sortType + 1;

                _this3.$set(_this3.filterColumns.otherList, i, item);

                _this3.$emit('handleSort', item);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 重置排序
    resetSort: function resetSort() {
      this.filterColumns.fixedList.map(function (item) {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序

        return item;
      });
      this.filterColumns.otherList.map(function (item) {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序

        return item;
      });
    },
    // 展开剩余
    handleExpand: function handleExpand() {
      this.isExpand = false;

      if (this.handleAnimate) {
        this.dataList = [].concat(this.tableData);
      } else {
        this.dataList = [].concat(this.tableData.slice(0, this.splitStep));
      } // 重置表格行高


      this.resetRowsHeight();
    },
    // 翻页
    jump: function jump(type, e) {
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

      if (this.handleAnimate) {
        var tbodyH = $("#uiTab" + this.tabId + " .tab-body").height();
        this.tbodyContentStyle = _extends({}, this.tbodyContentStyle, {
          top: '-' + (this.currentPage - 1) * tbodyH + 'px'
        });
      } else {
        this.dataList = [].concat(this.tableData.slice((this.currentPage - 1) * this.splitStep, this.currentPage * this.splitStep)); // 重置表格行高

        this.resetRowsHeight();
      }
    },
    // 重置表格行高
    resetRowsHeight: function resetRowsHeight() {
      var _this4 = this;

      $("#uiTab" + this.tabId + " .tab-filed").css({
        height: 'auto'
      }); //表头theader

      $("#uiTab" + this.tabId + " .tab-list-item").css({
        height: 'auto'
      }); //表体tbody

      this.$nextTick(function () {
        _this4.calcTabHeight(); // 计算表格主体高度

      });
    }
  }
};