<!--
使用用例：
import uiTreePicker from "@/components/uiTreePicker";
<uiTreePicker ref="myTreePicker" :isShow="true"></uiTreePicker>
-->
<template>
  <div class="ui-picker">
    <van-action-sheet v-model="isShow" :title="title" :style="styleObject" @close="onClose">
      <div class="tree-modal">
        <el-input
          class="filter-input"
          v-if="showInput"
          prefix-icon="el-icon-search"
          clearable
          placeholder="请输入关键字"
          v-model="filterText"
          :maxlength="100"
          @clear="loadingStatus2 = false"
        >
        </el-input>

        <template>
          <van-skeleton :row-width="rowWidth" :animate="false" :row="8" :loading="loadingStatus">
            <div class="filter-tree">
              <el-tree
                v-if="isShow"
                :data="treeData"
                :props="treeProps"
                :default-expanded-keys="defaultExpandedKeys"
                :node-key="treeProps.nodeKey"
                :default-checked-keys="defaultCheckdKeys"
                check-on-click-node
                :expand-on-click-node="false"
                show-checkbox
                :indent="25"
                @check="checkNodeHandler"
                ref="tree"
              >
              </el-tree>
            </div>
          </van-skeleton>

          <slot></slot>
        </template>

        <!-- 榜单资质层级树搜索特殊处理 -->
        <div class="search-modal" v-if="isShowSearch">
          <van-skeleton :row-width="rowWidth" :animate="false" :row="8" :loading="loadingStatus2">
            <uiNoDatas v-if="!resultTotal"></uiNoDatas>

            <div class="search-list" v-else>
              <div class="search-content">
                <div
                  class="list"
                  :class="{ check: item.selected }"
                  v-for="item in resultList"
                  :key="item"
                  @click="changeSearchType(item)"
                >
                  <div class="search-title" v-html="item.title"></div>
                  <div class="search-detail" v-if="item.fromRank">来自层级：{{ item.fromRank }}</div>
                </div>
              </div>
              <van-button round type="info" native-type="button" class="searchOk-btn" @click="confirmSearch">
                确认
              </van-button>
            </div>
          </van-skeleton>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from 'vue';
import { ActionSheet, Picker, Button, Dialog, Skeleton } from 'vant';
Vue.use(ActionSheet)
  .use(Picker)
  .use(Button)
  .use(Skeleton)
  .use(Dialog);

import { Input as elInput, Tree as elTree } from 'element-ui';
Vue.use(elInput).use(elTree);

import { getUrlSearches, urlQueriesSerialize } from '@/utils/urls';
import { removeObjectNil, replaceSepcialTxt } from '@/utils/utils';

import uiNoDatas from '@/components/uiNotFound';

let queryParams = getUrlSearches();
queryParams.pageCode = 'enterpriseScreening'; //企业筛选模块名称唯一值
queryParams.moduleCode = '/enterprise/enterpriseScreening';

export default {
  components: { uiNoDatas },
  props: {
    // 标题
    title: {
      type: String,
      default: () => '请选择',
    },
    //显示与隐藏
    isShow: {
      type: Boolean,
      default: false,
    },

    // 是否模糊搜索
    showInput: {
      type: Boolean,
      default: false,
    },

    searchUrl: '', //搜索接口

    // 自定义样式
    styleObject: {
      type: Object,
      default: () => {},
    },

    //最大选中节点
    max: 0,
    // 最多可选xxx条
    maxTips: '',

    // 树节点
    treeData: [],

    // 默认选中节点
    defaultCheckdKeys: [],

    // 默认展开项
    defaultExpandedKeys: [],

    // 树节点配置项
    treeProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label',
          nodeKey: 'id',
          treeType: '',
        };
      },
    },
  },

  data() {
    return {
      isShowPicker: false,
      isShowSearch: false, //展示搜索结果

      filterText: '',
      loadingStatus: false, //骨架屏
      loadingStatus2: true,
      rowWidth: ['40%', '100%', '100%', '80%', '40%', '100%', '100%', '80%'],
      resultList: [],
      resultTotal: 0,
    };
  },

  watch: {
    isShow: {
      immediate: true,
      handler(val) {
        this.isShowPicker = val;
        // console.log("treeData=====", this.treeData);
      },
    },
    filterText(val) {
      // this.$refs.tree.filter(val);
      this.filterText = val.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
      this.$nextTick(() => {
        if (this.filterText.length >= 2) {
          this.isShowSearch = true;
          this.getSearchHandler();
        } else {
          this.isShowSearch = false;
          this.loadingStatus2 = false;
        }
      });
    },
    defaultCheckdKeys(value) {
      // console.log("defaultCheckdKeys====", this.defaultCheckdKeys);
    },
  },

  mounted() {
    this.$toast.setDefaultOptions({ forbidClick: true }); //背景不可点击
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data[this.treeProps.label].indexOf(value) !== -1;
    },

    // 搜索
    getSearchHandler() {
      // this.timerSearch && clearTimeout(this.timerSearch);
      // this.timerSearch = null;
      // this.timerSearch = setTimeout(() => {
      // 	this.loadingStatus2 = true;
      // }, 500);
      if (process.env.NODE_ENV === 'development') {
        queryParams.user = 'dev';
        queryParams.token = '000000';
      }
      this.loadingStatus2 = true;
      this.$get(
        this.searchUrl,
        removeObjectNil(
          Object.assign({}, queryParams, {
            qualificationListType: this.treeProps.treeType,
            content: this.filterText,
          })
        )
      )
        .then(res => {
          // participleResult: "朝鲜"
          let participleResult = res.data.participleResult.split(',');
          this.resultTotal = res.data.total;
          let resultList = res.data.resultList || [];
          this.resultList = resultList.map(item => {
            item.selected = false;
            item.title = this.highlight(participleResult, item.title);
            return item;
          });
        })
        .finally(() => {
          this.loadingStatus2 = false;
        });
    },

    // 关键字高亮
    highlight(keywords, val) {
      if (!keywords) return val;
      keywords.forEach(d => {
        let replaceReg = new RegExp(replaceSepcialTxt(d), 'g'), // 匹配关键字正则
          replaceString = '<i class="highlight-text">' + d + '</i>'; // 高亮替换v-html值

        if (val.indexOf(d) > -1) {
          val = val.replace(replaceReg, replaceString);
        }
      });
      return val;
    },

    handlerTreeData(item, parent) {
      if (!item) return;
      if (Array.isArray(item)) {
        return item.map(d => {
          let test = d;
          if (test.children) {
            test.children = this.handlerTreeData(test.children, test);
          }

          return {
            ...test,
            levelsNames: [d[this.treeProps.label]],
          };
        });
      }
    },

    // 当复选框被点击的时候触发
    checkNodeHandler(node, obj) {
      // console.log("node====", node);
      // console.log("obj====", obj);
      if (obj.checkedNodes) {
        // 获取最细层级节点
        this.calcCheckedNodes(obj.checkedNodes, node);

        this.$nextTick(() => {
          let sltNodes = this.getCheckedNodes(),
            sltKeys = this.getCheckedKeys();
          this.$emit('changeTree', { sltNodes, sltKeys });
        });
      }
    },

    // 已选最细层级数量判断
    calcCheckedNodes(nodes, curNode, callback) {
      let lastList = nodes.filter(d => !d[this.treeProps.children]);
      if (lastList.length > this.max && this.max) {
        this.$refs.tree.setChecked(curNode, false, true);
        // let sltKeys = this.getCheckedKeys(); // 通过 key 获取
        // this.resetChecked(); // 清空已选
        // this.setCheckedKeys(sltKeys.slice(0, this.max)); //默认选择前max条
        this.$toast({
          message: this.maxTips ? this.maxTips : `最多可选${this.max}条${this.title != '请选择' ? this.title : ''}`,
          onClose: () => {
            callback && callback();
          },
        });
      }
    },

    // 通过 node 获取
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes();
      // let nodes = this.$refs.tree.getCheckedNodes();
      // return nodes.filter((d) => !d[this.treeProps.children]); //返回最细层级节点集合
    },

    // 通过 key 获取
    getCheckedKeys() {
      return this.$refs.tree.getCheckedKeys();
      // let nodes = this.getCheckedNodes();
      // return nodes.map((d) => d[this.treeProps.nodeKey]); //返回最细层级节点key集合
    },

    // 通过 node 设置
    setCheckedNodes(nodes) {
      this.$refs.tree.setCheckedNodes(nodes);
    },

    // 通过 key 设置
    setCheckedKeys(keys) {
      this.$refs.tree.setCheckedKeys(keys);
    },

    // 清空已选
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },

    // 设置全选
    alwaysChecked() {
      this.$refs.tree.setCheckedNodes(this.treeData);
    },

    // 通过 key / data 设置某个节点的勾选状态 @params:节点、节点是否选中、是否设置子节点
    setChecked(node, isChecked = true, isChild = false) {
      this.$refs.tree.setChecked(node, isChecked, isChild);
    },

    onClose() {
      this.filterText = '';
      this.isShowSearch = false;
      this.$emit('close');
    },

    changeSearchType(item) {
      item.selected = !item.selected;
      this.$nextTick(() => {
        this.setChecked(item.key, item.selected, true);

        this.calcCheckedNodes(this.getCheckedNodes(), item.key, () => {
          item.selected = false;
        });

        this.$nextTick(() => {
          this.$emit('changeTree', {
            sltNodes: this.getCheckedNodes(),
            sltKeys: this.getCheckedKeys(),
          });
        });
      });
    },

    confirmSearch() {
      this.filterText = '';
      this.isShowSearch = false;
      this.loadingStatus2 = false;
    },
  },
};
</script>

<style lang="less" scoped>
.tree-modal {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  .van-skeleton,
  /deep/.filter-tree {
    flex: 1;
    overflow: hidden auto;
    .el-tree > .el-tree-node {
      > .el-tree-node__content {
        > .el-checkbox {
          position: static !important;
        }
      }
    }
  }
  .filter-input {
    & ~ .filter-tree {
      margin-top: 12px;
    }
  }
  /deep/.van-skeleton {
    margin-top: 0.2rem;
    .van-skeleton__row {
      margin-top: 14px;
      background: #f9f9f9;
      &:nth-child(5) {
        margin-top: 11.5%;
      }
    }
  }
}
.ui-picker {
  width: 100%;
  .confirm-btn {
    margin: 0.4rem 0.48rem;
    width: calc(100% - 0.96rem);
    height: 0.76rem;
    font-size: 0.3rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    background: #1482f0;
  }
}
.van-action-sheet {
  height: calc(100vh - 88px);
  max-height: none;
  overflow: hidden;
}
/deep/.el-input {
  width: calc(100% - 0.64rem);
  margin: 0 auto;
  .el-input__inner {
    height: 32px;
    line-height: 32px;
    background: #f9f9f9;
    border: none;
    color: #111;
  }
  .el-input__icon {
    line-height: 32px;
  }
  .el-input__suffix {
    .el-input__icon {
      background: url('./images/clear.png') no-repeat center center;
      background-size: 14px;
      &::before {
        content: '';
      }
    }
  }
}
/deep/ .van-action-sheet__header {
  font-family: PingFangSC, PingFangSC-Medium;
  color: #141414;
  line-height: 1.08rem;
}
/deep/.van-action-sheet__content {
  flex: 1;
  overflow: hidden;
}

/deep/ .el-tree {
  .el-checkbox__original {
    width: 100%;
    height: 100%;
    z-index: 2;
    left: 0;
    top: 0;
  }
  .el-tree-node {
    white-space: normal;
  }
  .el-tree-node__content {
    width: calc(100% - 0.32rem);
    height: auto;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-right: 0.7rem;
    box-sizing: border-box;
    position: relative;
    left: 0.32rem;
    &:hover,
    &:active {
      background: none;
    }
    &::before {
      content: '';
      width: 200%;
      height: 0;
      border-top: 1px solid #dfdfdf;
      transform: scaleY(0.5);
      position: absolute;
      top: 0;
      left: -50%;
    }
    .el-tree-node__label {
      font-size: 0.24rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 0.32rem;
    }
    .el-tree-node__expand-icon {
      position: absolute;
      right: 0;
      top: calc(50% - 0.24rem);
      z-index: 2;
      padding: 0.12rem 0.32rem;
      color: transparent;
      background: url('./images/open.png') no-repeat center center;
      background-size: 0.24rem;
      &::before {
        color: transparent;
      }
    }
    .el-tree-node__expand-icon.is-leaf {
      color: transparent;
      cursor: default;
      background: none;

      & ~ .el-checkbox {
        position: absolute;
        top: calc(50% - 0.16rem);
        right: 0.12rem;
        z-index: 5;
      }
      & ~ .el-tree-node__label {
        // padding-left: 0.32rem;
      }
    }

    .el-tree-node__expand-icon.expanded {
      transform: rotate(-180deg);
    }
    .el-checkbox__inner {
      border: none;
      border-radius: none;
      background: url('./images/ico_cancel.png') no-repeat left center;
      background-size: 0.24rem;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      // border-color: #1482f0;
      // background-color: #1482f0;
      background: url('./images/ico_xuanze.png') no-repeat left center;
      background-size: 0.24rem;
      &::before,
      &::after {
        background: none;
        border: none;
      }
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border: none;
      background: url('./images/harf.png') no-repeat center center;
      background-size: 0.24rem;
      &::before,
      &::after {
        background: none;
        border: none;
      }
    }
  }

  .is-checked {
    .el-tree-node__content .el-tree-node__label {
      color: #1482f0;
    }
  }
}

.search-modal {
  width: 100%;
  height: calc(100% - 45px);
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 6;
  .search-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-content {
      flex: 1;
      overflow-y: auto;
    }
  }
  .list {
    padding: 0.2rem 0.32rem 0.2rem 0;
    .border-bottom-1px(#dfdfdf);
    .search-title {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #3c3c3c;
      line-height: 16px;
      padding-left: 0.72rem;
      background: url('./images/ico_cancel.png') no-repeat 0.32rem center;
      background-size: 12px;
    }
    &.check {
      .search-title {
        background: url('./images/ico_xuanze.png') no-repeat 0.32rem center;
        background-size: 12px;
      }
    }
    .search-detail {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #8c8c8c;
      line-height: 16px;
      padding-left: 0.72rem;
    }
    /deep/ .highlight-text {
      font-style: normal;
      color: #ef2f31;
    }
  }
}

.searchOk-btn {
  margin: 0.4rem 0.48rem;
  width: calc(100% - 0.96rem);
  height: 0.76rem;
  font-size: 0.3rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  background: #1482f0;
}

.border-bottom-1px(@color: #ccc, @style: solid) {
  position: relative;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    transform-origin: 0 0;
  }

  &::after {
    border-bottom: 0.5px @style @color;
    left: 0;
    bottom: 0;
    width: 100%;
    transform-origin: 0 bottom;
  }

  @media (min-resolution: 2dppx) {
    &::after {
      width: 200%;
      transform: scale(0.5);
    }
  }

  @media (min-resolution: 3dppx) {
    &::after {
      width: 300%;
      transform: scale(0.333);
    }
  }
}
</style>
