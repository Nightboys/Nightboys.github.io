/** * @Author: renmj * @Date: 2022/3/28 17:02 * @Last Modified by: renmj * @Last Modified time: 2022/3/28 17:02 *
@module: 财务同业对比表格 */
<template>
  <div class="table-view">
    <div class="menu">menuHead</div>
    <header>
      <div class="head-title">
        <div class="top-title" :class="!screenVertical && 'screen-transverse-padding-20'">
          <div class="left">
            <div>序号</div>
            <div>
              公司简称
              <img src="../../../assets/images/left.png" alt="" />
            </div>
          </div>
          <div class="right">
            <div class="head-right-colunm">
              <div
                class="right-column1"
                :class="[
                  {
                    'after-sort': item.sort === 1,
                    'after-sort trans_rotate': item.sort === 2,
                  },
                ]"
                v-for="(item, index) in tableData.topData"
                :key="index"
                :style="{ width: screenVerticalWidth }"
                @click="handleDataSort(item, index)"
              >
                {{ item.name }}
              </div>
            </div>
            <img src="../../../assets/images/right.png" alt="" />
          </div>
        </div>
        <div class="top-value">
          <div class="left" ref="header">
            <div>{{ tableData.firstRow.number }}</div>
            <div>{{ tableData.firstRow.name }}</div>
          </div>
          <div class="right">
            <div class="right-column2" v-for="(item, w) in tableData.firstRow.data" :key="w">
              <span :style="{ width: screenVerticalWidth }">{{ item[0] | handleFixed }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="top"></div>
    </header>
    <div class="content" :class="!screenVertical && 'screen-transverse-padding-20'">
      <div class="fixed-left">
        <div class="first-column">
          <div
            v-for="(item, k) in tableData.leftData"
            :key="k"
            :style="{ height: maxHeight[k] + 'px' }"
            :class="k === serialNumber - 2 && 'line-bottom'"
          >
            {{ item.code ? k - 2 : '' }}
          </div>
        </div>
        <div class="second-column">
          <div class="second-row" v-for="(item, j) in tableData.leftData" :key="j" :class="j === 2 && 'line-bottom'">
            {{ item.name }} <a :class="j > 2 ? 'display_show' : 'dispaly_none'" class="zhe_xian_icon"></a>
          </div>
        </div>
      </div>
      <div class="scroll-right">
        <div
          class="columns"
          v-for="(item, index) in tableData.mainData"
          :key="index"
          :style="{ width: screenVerticalWidth }"
        >
          <div
            v-for="(o, i) in item"
            :key="i"
            :style="{ height: maxHeight[i] + 'px' }"
            :class="i === 2 && 'line-bottom'"
          >
            {{ o | handleFixed }}
          </div>
        </div>
      </div>
    </div>
    <div v-show="isScreenSwitchShow" :class="isIOS ? 'display-box' : 'display-box-android'" @click="switchScreenMode">
      <i></i>
    </div>
  </div>
</template>
<script>
import utils from './utils';
const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
const adoutScreen = window.screen;
export default {
  props: {
    tableDatas: {
      type: Object,
      require: true,
      default: () => {},
    },
    tableType: {
      type: Number,
      default: 1,
    },
    isScreenSwitchShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isIOS,
      tableData: {
        topData: [],
        leftData: [],
        mainData: [],
        firstRow: {},
      },
      screenVerticalWidth: Math.floor((adoutScreen.width - 175) / 2) + 'px', // 竖屏状态下的列宽
      serialNumber: 0, // 展示指标数据，判断是否添加横线
      maxHeight: [], // 表格高度
      screenVertical: true, // 竖屏状态
    };
  },
  mounted() {
    this.togetherscroll();
    this.calcCellsHeight();
  },
  watch: {
    tableDatas: {
      handler(value) {
        this.hanleData(value.data);
      },
      deep: true,
      immediate: true,
    },
  },
  filters: {
    handleFixed(value) {
      return utils.formatNumber(value);
    },
  },
  methods: {
    // 屏幕旋转
    switchScreenMode() {
      this.screenVertical = !this.screenVertical;
      // 横屏
      if (!this.screenVertical) {
        if (this.tableData.topData?.length >= 4) {
          this.screenVerticalWidth = Math.floor((896 - 180) / 4) + 'px';
        } else {
          this.screenVerticalWidth = Math.floor((896 - 180) / this.tableData.topData?.length) + 'px';
        }
      } else {
        // 竖屏
        this.screenVerticalWidth = Math.floor((adoutScreen.width - 175) / 2) + 'px';
      }
    },
    // 排序
    handleDataSort(item, index) {
      let sort = ++item.sort;
      this.$set(this.tableData.topData[index], 'sort', sort > 2 ? 0 : sort);
      this.$emit('handleChangeSort', item);
    },
    // 设置表格左右的高度
    calcCellsHeight() {
      this.$nextTick(() => {
        let secondEL = $('.second-row'),
          heightArr = [];
        secondEL.forEach(cell => heightArr.push($(cell).height()));
        this.maxHeight = heightArr;
      });
    },
    // 处理数据
    hanleData(data) {
      let tableData = {
        topData: [],
        mainData: [],
        leftData: [],
        firstRow: {},
      };
      let serialNumber = 0;
      serialNumber = data.code.lastIndexOf('');
      // 有指标筛选（最大值，最小值，平均值）
      if (serialNumber > 0) this.serialNumber = serialNumber;
      // 头部数据
      data.value.forEach(item => {
        tableData.topData.push({
          name: item[0],
          sort: 0,
        });
      });
      // 表格主体数据
      tableData.mainData = data.value.map(item =>
        item.filter((itemChild, index) => {
          if (index != 0 && index != 1) return itemChild || '0';
        })
      );
      // 表格主体左部份名称数据
      data.name.forEach((item, index) => {
        if (index != 0 && index != 1) {
          tableData.leftData.push({
            name: item,
            code: data.code[index],
          });
        }
      });
      let defaultNumber = 0;
      tableData.leftData.forEach((item, index) => {
        if (item.name === data.name[1]) defaultNumber = index;
      });
      // 表格头部固定第一行数据
      tableData.firstRow = {
        name: data.name[1],
        number: defaultNumber - 2,
        data: data.value.map(item =>
          item.filter((itemChild, index) => {
            if (index == 1) return itemChild || '0';
          })
        ),
      };
      this.tableData = tableData;
    },
    // 上下联动
    togetherscroll() {
      let top = document.querySelector('.top-title .right'),
        middle = document.querySelector('.top-value .right'),
        bottom = document.querySelector('.scroll-right'),
        scrollFrom = '';
      top.addEventListener('touchstart', () => {
        if (scrollFrom === 'topScroll') return;
        scrollFrom = 'topScroll';
      });
      if (middle) {
        middle.addEventListener('touchstart', () => {
          if (scrollFrom === 'middleScroll') return;
          scrollFrom = 'middleScroll';
        });
      }
      bottom.addEventListener('touchstart', () => {
        if (scrollFrom === 'bottomScroll') return;
        scrollFrom = 'bottomScroll';
      });
      top.addEventListener('scroll', () => {
        if (scrollFrom === 'middleScroll' || scrollFrom === 'bottomScroll') return;
        if (middle) middle.scrollLeft = top.scrollLeft;
        bottom.scrollLeft = top.scrollLeft;
      });
      if (middle) {
        middle.addEventListener('scroll', () => {
          if (scrollFrom === 'topScroll' || scrollFrom === 'bottomScroll') return;
          top.scrollLeft = bottom.scrollLeft = middle.scrollLeft;
        });
      }
      bottom.addEventListener('scroll', () => {
        if (scrollFrom === 'topScroll' || scrollFrom === 'middleScroll') return;
        if (middle) middle.scrollLeft = bottom.scrollLeft;
        top.scrollLeft = bottom.scrollLeft;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import 'index';
.menu {
  width: 100%;
  height: 0.64rem;
  position: fixed;
  background: #ffffff;
  z-index: 1;
}
.table-view {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
