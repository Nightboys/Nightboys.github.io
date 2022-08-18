import $ from 'webpack-zepto';
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    total: {
      type: [String, Number],
      default: () => 0
    },
    tabId: {  //表格组件唯一值
      type: [String, Number],
      default: () => 0,
    },
    isWrap: {  //超出是否换行
      type: Boolean,
      default: true,
    },
    isMinHeight: {  //表格是否设置最小高度
      type: Boolean,
      default: true,
    },
    isShowPage: { //是否分页
      type: Boolean,
      default: false,
    },
    isShowExpand: { //是否显示展开剩余按钮(isShowPage为true时生效)
      type: Boolean,
      default: false,
    },
    isSticky: { //是否表头固定(吸顶)
      type: Boolean,
      default: false,
    },
    initStep: { //初次显示6条数据 (initStep <= splitStep)
      type: [String, Number],
      default: () => 6
    },
    splitStep: {  //每页显示条数
      type: [String, Number],
      default: () => 8
    },
    minStep: {  //总数小于10时不分页 (splitStep <= minStep)
      type: [String, Number],
      default: () => 10
    }
  },
  data() {
    return {
      dataList: [],
      filterColumns: {},
      currentPage: 1, //页码
      tbodyStyle: {},
      tbodyContentStyle: {
        'min-height': 'auto'
      },//表格最小高度
      isExpand: false, //展开剩余
      currentScrollDom: '', //当前滚动dom
    };
  },
  filters: {
    isUndefined(val) {
      if (typeof val === 'undefined' || val === null || val === '' || val === '-') {
        return "-";
      } else {
        return val;
      }
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(parseInt(this.total) / parseInt(this.splitStep));
    },

    // 表头是否需要吸顶处理
    handleSticky() {
      return (this.isSticky && !this.isShowPage) || (this.isSticky && this.isShowPage && !this.isWrap)
    },

    // 分页且内容禁止换行时是否开启分页动画
    handleAnimate() {
      return this.isSticky && this.isShowPage && !this.isWrap
    }
  },
  watch: {
    total: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (this.isShowExpand) {
          this.isExpand = this.isShowPage && this.total > this.minStep;
        }
      },
    },
    columns: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.getColumns(); // 处理表头数据
      },
    },
    tableData: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.currentPage = 1; //重置页码
        if (this.isShowPage) {
          if (this.isExpand) {
            let initStep = Math.min(this.initStep, this.splitStep);
            this.initStep = initStep;
            this.dataList = [...this.tableData.slice(0, initStep)];
          } else {
            if (this.handleAnimate) {
              this.dataList = [...this.tableData];
            } else {
              this.dataList = [...this.tableData.slice(0, this.splitStep)];
            }
          }
        } else {
          this.dataList = [...this.tableData];
        }

        this.$nextTick(() => {
          this.calcTabHeight(); // 计算表格主体高度
        });
      },
    }
  },
  mounted() {
  },
  methods: {
    // 数字千分位格式化
    numberFormat(str) {
      var re = /(?=(?!(\b))(\d{3})+$)/g;
      return (str + "").replace(re, ",");
    },

    // 处理表头数据
    getColumns() {
      let [fixedList, otherList] = [
        [],
        []
      ];
      let columns = this.columns.map(item => {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序
        return item;
      });

      fixedList = columns.filter(item => item.fixed);
      otherList = columns.filter(item => !item.fixed);
      this.filterColumns = {
        fixedList,
        otherList
      };
    },

    // 计算表格主体高度
    calcTabHeight() {
      // 计算表头高度
      let theads = $(`#uiTab${this.tabId} .tab-filed`), theadsList = [], iconBtns = $(`#uiTab${this.tabId} .icon-btn`);
      theads.forEach(element => {
        theadsList.push($(element).height())
      });

      let maxTheadsH = Math.max(...theadsList, 0);  //获取表头最大高度
      theads.css({ height: maxTheadsH + 'px' });
      iconBtns.css({ height: maxTheadsH + 'px' });

      // 计算表体行高度
      let rowsFixed = $(`#uiTab${this.tabId} .tab-left .tab-list-item`), rowsFixedList = [],
        rowsOther = $(`#uiTab${this.tabId} .tab-right .tab-list-item`), rowsOtherList = [],
        maxHeightList = [];
      rowsFixed.forEach(element => {
        element.style.height = '';

        rowsFixedList.push($(element).height())
      });
      rowsOther.forEach(element => {
        element.style.height = '';

        rowsOtherList.push($(element).height())
      });
      rowsFixedList.forEach((item, index) => {
        let maxVal = Math.max(rowsFixedList[index], rowsOtherList[index]) + 'px';
        maxHeightList.push(maxVal);
      });
      rowsFixed.forEach((element, index) => {
        $(element).css({ height: maxHeightList[index] });
      });
      rowsOther.forEach((element, index) => {
        $(element).css({ height: maxHeightList[index] });
      });

      if (this.isShowPage && !this.isWrap) { //分页&内容不换行
        if (this.handleAnimate) {
          this.tbodyStyle = {
            'height': Math.min(...rowsFixedList) * (!this.isExpand ? this.splitStep : this.initStep) + maxTheadsH + 'px',
            'overflow': 'hidden',
            'flex': 'none'
          }; //表格最小高度
        } else {
          this.tbodyContentStyle = {
            'height': Math.min(...rowsFixedList) * (!this.isExpand ? this.splitStep : this.initStep) + maxTheadsH + 'px'
          }; //表格最小高度
        }
      } else {
        if (this.isShowPage && this.total > this.minStep) {
          this.tbodyContentStyle = {
            'min-height': this.isMinHeight ? Math.min(...rowsFixedList) * this.initStep + maxTheadsH + 'px' : 'auto'
          }; //表格最小高度
        }
      }
    },

    // 手指触摸屏幕时触发
    handleTouchStart(e) {
      // console.log('touchStart开始====', e);
      this.currentScrollDom = '';

      if (this.handleSticky) {  //表头固定--监听当前触控区域
        if (this.$refs.tHeader.contains(e.target)) {
          this.currentScrollDom = 'tHeader';
        } else if (this.$refs.tBody.contains(e.target)) {
          this.currentScrollDom = 'tBody';
        }
      }

    },

    // 监听表格水平滚动事件
    handleHorizontalScroll(e, type) {
      // console.log('===', e.target.scrollLeft, type)
      if (this.handleSticky) {  //表头固定
        let scrollLeft = e.target.scrollLeft;

        if (this.currentScrollDom == 'tHeader') {
          this.$refs.tBody.scrollLeft = scrollLeft;
        } else if (this.currentScrollDom == 'tBody') {
          this.$refs.tHeader.scrollLeft = scrollLeft;
        }
      }
    },

    // 排序-固定列
    async handleSort1(d, i) {
      let item = Object.assign({}, d);
      await this.resetSort();
      item.sortType = item.sortType == 2 ? 0 : (item.sortType + 1);
      this.$set(this.filterColumns.fixedList, i, item);
      this.$emit('handleSort', item);
    },
    // 排序-非固定列
    async handleSort2(d, i) {
      let item = Object.assign({}, d);
      await this.resetSort();
      item.sortType = item.sortType == 2 ? 0 : (item.sortType + 1);
      this.$set(this.filterColumns.otherList, i, item);
      this.$emit('handleSort', item);
    },
    // 重置排序
    resetSort() {
      this.filterColumns.fixedList.map(item => {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序
        return item;
      });
      this.filterColumns.otherList.map(item => {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序
        return item;
      });
    },

    // 展开剩余
    handleExpand() {
      this.isExpand = false;
      if (this.handleAnimate) {
        this.dataList = [...this.tableData];
      } else {
        this.dataList = [...this.tableData.slice(0, this.splitStep)];
      }

      // 重置表格行高
      this.resetRowsHeight();
    },

    // 翻页
    jump(type, e) {
      if (e.target.classList.contains('disabled')) return;

      switch (type) {
        case 'first': //首页
          this.currentPage = 1;
          break;
        case 'pre': //上一页
          this.currentPage -= 1;
          break;
        case 'next': //下一页
          this.currentPage += 1;
          break;
        case 'last': //末页
          this.currentPage = this.totalPage;
          break;

        default:
          break;
      }

      if (this.handleAnimate) {
        let tbodyH = $(`#uiTab${this.tabId} .tab-body`).height();
        this.tbodyContentStyle = Object.assign({}, this.tbodyContentStyle, {
          top: '-' + (this.currentPage - 1) * tbodyH + 'px'
        });
      } else {
        this.dataList = [...this.tableData.slice((this.currentPage - 1) * this.splitStep, this.currentPage * this.splitStep)];

        // 重置表格行高
        this.resetRowsHeight();
      }
    },

    // 重置表格行高
    resetRowsHeight() {
      $(`#uiTab${this.tabId} .tab-filed`).css({ height: 'auto' });  //表头theader
      $(`#uiTab${this.tabId} .tab-list-item`).css({ height: 'auto' }); //表体tbody
      this.$nextTick(() => {
        this.calcTabHeight(); // 计算表格主体高度
      });
    },
  }
};
