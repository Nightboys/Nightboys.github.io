<!-- create by lch 2021/07/02 只做数据处理，请求放到父组件处理-->
<template>
  <div class="table-view" :class="{ wrap: isWrap }">
    <div class="table-modal">
      <div class="table-header">
        <table>
          <slot name="colgroup">
            <!-- <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup> -->
          </slot>
          <slot name="thead">
            <!-- <tr>
              <th class="text-left">行业</th>
              <th>数量(只)</th>
              <th>成交规模(亿)</th>
              <th>规模占比(%)</th>
            </tr> -->
          </slot>
        </table>
      </div>
      <!-- <div class="table-body">
              <table>
                <slot name="colgroup"></slot>
                <slot name="tbody-fixed">
                  <tr>
                    <td class="text-left">合计</td>
                    <td>2955</td>
                    <td>6,910.00</td>
                    <td>100.00</td>
                  </tr>
                </slot>
              </table>
            </div> -->
      <div class="table-body" :style="{ height: tableHeight != 'auto' ? tableHeight + 'px' : 'auto' }">
        <table :id="tabRef">
          <slot name="colgroup"></slot>
          <slot name="tbody-fixed">
            <!-- <tr>
                    <td class="text-left">合计</td>
                    <td>2955</td>
                    <td>6,910.00</td>
                    <td>100.00</td>
                  </tr> -->
          </slot>

          <slot name="tbodyContent">
            <!-- <tr>
                    <td class="text-left">合计</td>
                    <td>2955</td>
                    <td>6,910.00</td>
                    <td>100.00</td>
                  </tr> -->
          </slot>

          <!-- <template>
                  <template v-if="$slots.tbodyContent">
                    <slot name="tbodyContent"></slot>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="text-left">合计</td>
                      <td>2955</td>
                      <td>6,910.00</td>
                      <td>100.00</td>
                    </tr>
                  </template>
                </template> -->
        </table>
      </div>
    </div>

    <div class="table-page" v-if="isShowPage && total > splitStep && total > minStep">
      <div
        class="page-collapse"
        v-if="!isExpand"
        @click="
          isExpand = !isExpand;
          splitStep = Math.max(splitStep, minStep);
        "
      >
        <span>展开剩余{{ total - splitStep }}条</span>
      </div>
      <div class="page-div" v-else>
        <span :class="{ disabled: currentPage == 1 }" @click="jump('first', $event)">
          首页
        </span>
        <span :class="{ disabled: currentPage == 1 }" @click="jump('pre', $event)">
          上一页
        </span>
        <span class="page-number"> {{ (currentPage + '').padStart(2, 0) }}/{{ (totalPage + '').padStart(2, 0) }} </span>
        <span :class="{ disabled: currentPage == totalPage }" @click="jump('next', $event)">
          下一页
        </span>
        <span :class="{ disabled: currentPage == totalPage }" @click="jump('last', $event)">
          末页
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabRef: {
      type: String,
      default: 'myTable',
      require: true,
    },
    isShowPage: {
      //是否分页
      type: Boolean,
      default: false,
    },
    step: {
      //每页显示条数
      type: [Number, String],
      default: 6,
    },
    total: {
      //总条数
      type: [Number, String],
      default: 0,
    },
    isWrap: {
      //是否允许内容换行
      type: Boolean,
      default: false,
    },
    isShowMore: {
      //是否显示展开剩余按钮
      type: Boolean,
      default: true,
    },
    isAnimated: {
      //是否执行切换动画
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableHeight: 'auto', //表格高度自适应
      isExpand: false, //开启分页功能
      currentPage: 1, //页码
      splitStep: 6, //每页显示条数
      minStep: 8, //总数小于8时不分页
    };
  },
  watch: {
    isShowMore: {
      deep: true,
      immediate: true,
      handler: function(val, oldVal) {
        if (!val) {
          this.isExpand = true;
          this.splitStep = Math.max(this.splitStep, this.minStep);
          // this.resizeTabHt();
        }
      },
    },
    step: {
      deep: true,
      immediate: true,
      handler: function(val, oldVal) {
        this.splitStep = val;
      },
    },
    total: {
      deep: true,
      immediate: true,
      handler: function(val, oldVal) {
        this.currentPage = 1;
        $(`#${this.tabRef}`).css({
          top: 0,
        });
      },
    },
  },
  filters: {
    // 金额千分位,并保留2位小数
    splitNumber(num) {
      return (
        num &&
        parseFloat(num)
          .toFixed(2)
          .toString()
          .replace(/\d+/, function(s) {
            return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
          })
      );
    },
  },
  computed: {
    totalPage() {
      if (this.isWrap) {
        //内容换行，根据表格高度计算分页
        let ht = $(`#${this.tabRef}`).height();
        return Math.ceil(ht / parseInt(this.tableHeight)) + '';
      } else {
        return Math.ceil(parseInt(this.total) / parseInt(this.splitStep)) + '';
      }
    },
  },
  mounted() {
    this.resizeTabHt();
  },
  updated() {
    this.resizeTabHt();
  },
  methods: {
    // 重置表格高度
    resizeTabHt() {
      if (this.isShowPage) {
        this.$nextTick(() => {
          let h = $(`#${this.tabRef} tr`)
            .first()
            .height();

          if (this.total > this.splitStep && this.total > this.minStep) {
            this.tableHeight = h * this.splitStep;
          } else {
            this.tableHeight = 'auto';
          }
        });
      }
    },
    // 翻页
    jump(type, e) {
      // console.log("kkk===", e);
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

      $(`#${this.tabRef}`).css({
        top: '-' + (this.currentPage - 1) * this.tableHeight + 'px',
        transition: this.isAnimated ? '' : 'none',
      });
    },
  },
};
</script>
<style lang="less" scoped>
.text-left {
  text-align: left !important;
}
.text-center {
  text-align: center !important;
}
.text-right {
  text-align: right !important;
}
.table-view {
  width: 100%;
  font-family: PingFangSC, PingFangSC-Light, Arial;
  &.wrap {
    td {
      white-space: normal !important;
    }
  }
  .table-modal {
    width: 100%;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border: none;
    td {
      border-collapse: collapse;
      border: none;
      text-align: right;
      font-family: ArialMT, ArialMT-Regular, PingFangSC, PingFangSC-Regular;
      padding-left: 5px;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
    }
    tr {
      line-height: 2;
      td:first-child {
        padding-left: 0;
      }
    }
  }
}
.table-header {
  th {
    font-size: 0.28rem;
    font-weight: 500;
    color: #333333;
    line-height: 2;
    text-align: right;
    vertical-align: top;
  }
}
.table-body {
  overflow: hidden;
  font-size: 0.26rem;
  > table {
    position: relative;
    top: 0;
    transition: top 0.2s;
    table-layout: fixed;
  }
}
.table-page {
  padding: 0.16rem 0;
  position: relative;
  z-index: 10;
  .page-collapse {
    text-align: right;
    color: #1482f0;
    font-size: 0.26rem;
    font-family: PingFangSC, PingFangSC-Regular, Arial;
    font-weight: 400;
    line-height: 0.36rem;
  }
  .page-div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.24rem;
    font-family: PingFangSC, PingFangSC-Regular, Arial;
    font-weight: 400;
    line-height: 0.32rem;
    span {
      color: #1482f0;
      margin-left: 0.4rem;
      &.page-number {
        color: #3c3c3c;
        width: 0.8rem;
      }
    }
    .disabled {
      color: #8c8c8c;
      // pointer-events: none;
    }
  }
}
</style>
