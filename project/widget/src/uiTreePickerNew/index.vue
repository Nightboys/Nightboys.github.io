<!--
使用用例：
import uiTreePickerNew from "@/components/uiTreePickerNew";
<uiTreePickerNew ref="myTreePickerNew" :isShow="true"></uiTreePickerNew>
-->
<template>
  <div class="ui-picker">
    <van-action-sheet v-model="isShow" :title="title" :style="styleObject" @close="onClose">
      <div class="tree-modal">
        <div class="search-field" v-if="showInput">
          <van-field
            class="search-input"
            v-if="showInput"
            clearable
            :border="false"
            left-icon="search"
            placeholder="请输入关键字"
            v-model="filterText"
            :maxlength="100"
            @focus="showExpandBtn = false"
            @blur="showExpandBtn = true"
            @clear="loadingStatus2 = false"
          />
          <span class="expand-btn" v-if="showExpandBtn && !isShowSearch" @click="changeExpandAll">
            {{ !expandAll ? '一键展开' : '一键收起' }}
          </span>
        </div>

        <template>
          <van-skeleton :row-width="rowWidth" :animate="false" :row="8" :loading="loadingStatus">
            <div class="filter-tree">
              <treeView :treeData="dataList"></treeView>
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
                确定
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
import { ActionSheet, Picker, Button, Dialog, Skeleton, Field } from 'vant';
Vue.use(ActionSheet)
  .use(Picker)
  .use(Button)
  .use(Skeleton)
  .use(Field)
  .use(Dialog);

import { getUrlSearches, urlQueriesSerialize } from '@/utils/urls';
import { removeObjectNil, replaceSepcialTxt } from '@/utils/utils';

import uiNoDatas from '@/components/uiNotFound';
import treeView from './tree';

let queryParams = getUrlSearches();
queryParams.pageCode = 'enterpriseScreening'; //企业筛选模块名称唯一值
queryParams.moduleCode = '/enterprise/enterpriseScreening';

export default {
  components: { uiNoDatas, treeView },
  provide() {
    return {
      maxLen: () => this.max, //允许选中最大节点数
      selectListLen: () => this.selectListLen, //已选最细层级节点数
      maxTips: () => this.maxTips, //超出最大已选节点数时提示信息
      changeTree: this.checkNodeHandler,
      title: () => this.title,
      treeProps: this.treeProps,
    };
  },
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
    treeData: {
      type: Array,
      default: [],
    },

    // 默认选中节点
    defaultCheckdKeys: {
      type: Array,
      default: [],
    },

    // 默认展开项
    defaultExpandedKeys: {
      type: Array,
      default: [],
    },

    // 树节点配置项
    treeProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name',
          nodeKey: 'value',
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
      resultList: [], //搜索匹配结果
      resultTotal: 0,
      dataList: [], //初始数据
      initList: [], //重置数据
      selectList: [], //已选数据
      selectKeysList: [], //已选数据对应value/id
      selectListLen: 0, //已选最细层级节点数量
      expandAll: false, //一键收起/展开
      showExpandBtn: true, //是否显示'收起/展开'
    };
  },

  watch: {
    isShow: {
      immediate: true,
      handler(val) {
        this.isShowPicker = val;
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

    treeData: {
      deep: true,
      immediate: true,
      handler(val) {
        let value = $.extend(true, [], val),
          list = this.handlerTreeData(value);

        this.dataList = $.extend(true, [], list);
        this.initList = $.extend(true, [], this.initTreeData(val));

        this.selectKeysList = Array.from(new Set([...this.selectKeysList, ...this.defaultCheckdKeys]));
      },
    },

    defaultCheckdKeys: {
      handler(val) {
        let list = $.extend(true, [], this.initList);
        this.dataList = $.extend(true, [], this.handlerTreeData(list));

        this.selectKeysList = Array.from(new Set([...this.selectKeysList, ...this.defaultCheckdKeys]));
      },
    },

    defaultExpandedKeys: {
      immediate: true,
      handler(val) {
        if (val.length) {
          this.expandAll = true;
        }
      },
    },
  },

  mounted() {
    this.$toast.setDefaultOptions({ forbidClick: true }); //背景不可点击
  },

  methods: {
    // 搜索
    getSearchHandler() {
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
          // participleResult: "朝鲜";	//匹配关键词
          let participleResult = res.data.participleResult.split(',');
          this.resultTotal = res.data.total;
          let resultList = res.data.resultList || [];
          this.resultList = resultList.map(item => {
            // item.selected = this.selectKeysList.includes(item.key);
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

    // 处理数据格式
    handlerTreeData(item, parent) {
      if (!item) return;

      let _child = this.treeProps['children'],
        _childKey = this.treeProps['nodeKey'];

      return item.map(m => {
        m.expand = m.expand || this.defaultExpandedKeys.includes(m[_childKey]) || false;
        m.selected =
          m.selected || (this.defaultCheckdKeys.includes(m[_childKey]) && (!m[_child] || !m[_child].length)) || false;

        if (parent) {
          parent.selected =
            parent[_child].length == parent[_child].filter(t => t.selected && (!t[_child] || !t[_child].length)).length; //是否默认勾选‘全部’
        }

        if (m[_child] && m[_child].length) {
          this.handlerTreeData(m[_child], m);
        }
        return m;
      });
    },

    // 重置数据
    initTreeData(item, parent) {
      if (!item) return;

      let _child = this.treeProps['children'],
        _childKey = this.treeProps['nodeKey'];
      return item.map(m => {
        m.expand = this.defaultExpandedKeys.includes(m[_childKey]) || false;
        m.selected = false;

        if (m[_child] && m[_child].length) {
          this.initTreeData(m[_child]);
        }
        return m;
      });
    },

    // 一键收起/展开
    changeExpandAll() {
      this.expandAll = !this.expandAll;
      this.$nextTick(() => {
        this.changeExpandNode(this.dataList, this.expandAll, true);
      });
    },
    /**
     * 展开指定节点
     * @list:节点
     * @isOpen:收起/展开
     * @deep: 是否深度(递归)展开
     */
    changeExpandNode(list = [], isOpen, deep = false) {
      let _child = this.treeProps['children'];
      list.forEach(item => {
        item.expand = isOpen;
        if (item[_child] && deep) {
          this.changeExpandNode(item[_child], isOpen, deep);
        }
      });
    },

    // 获取所有已选节点--通过 node 获取
    getCheckedNodes() {
      this.selectList = [];
      this.calcCheckedNode(this.dataList);

      return this.selectList;
    },
    calcCheckedNode(list = []) {
      let _child = this.treeProps['children'];
      list.forEach(d => {
        d.selected && (!d[_child] || !d[_child].length) && this.selectList.push(d); //仅返回最细层级节点
        if (d[_child]) {
          this.calcCheckedNode(d[_child]);
        }
      });
    },

    // 获取所有已选节点--通过 key 获取
    getCheckedKeys() {
      let sltNodes = this.getCheckedNodes();
      return sltNodes.map(d => d[this.treeProps['nodeKey']]);
    },

    // 当复选框被点击的时候触发
    checkNodeHandler() {
      let _child = this.treeProps['children'],
        sltNodes = this.getCheckedNodes(),
        sltKeys = sltNodes.map(d => d[this.treeProps['nodeKey']]);

      this.selectKeysList = sltKeys;
      this.selectListLen = sltNodes.filter(d => !d[_child] || !d[_child].length).length; //已选最细层级节点数量
      this.$emit('changeTree', { sltNodes, sltKeys });
    },

    /**
     * 通过 key/vulue 设置节点选中
     * @keys: 节点的value/id集合
     * @checked: 是否选中
     */
    setCheckedKeys(keys, checked = true) {
      keys = typeof keys == 'string' ? [keys] : keys || [];
      try {
        this.setCheckedNode(this.dataList, keys, {}, checked);

        this.$nextTick(() => {
          this.checkNodeHandler();
        });
      } catch (error) {
        console.error('keys数据类型为String或Array');
      }
    },
    setCheckedNode(list = [], keys = [], parent = {}, checked) {
      let _child = this.treeProps['children'],
        _childKey = this.treeProps['nodeKey'];
      list.forEach(item => {
        //判断当前节点为最细节点
        if (keys.includes(item[_childKey]) && (!item[_child] || !item[_child].length)) {
          item.selected = checked;
        }

        if (parent && parent[_child]) {
          parent.selected = parent[_child].filter(d => d.selected).length == parent[_child].length;
        }
        if (item[_child]) {
          this.setCheckedNode(item[_child], keys, item, checked);
        }
      });
    },

    // 重置选项
    resetChecked() {
      this.dataList = JSON.parse(JSON.stringify(this.initList));
      this.selectListLen = 0; //已选最细层级节点数量
    },

    // 设置全选/取消全选
    alwaysChecked(checked = true) {
      this.alwaysCheckedNodes(this.dataList, checked);
    },
    alwaysCheckedNodes(list = [], checked) {
      let _child = this.treeProps['children'];
      list.forEach(item => {
        item.selected = checked;
        if (item[_child]) {
          this.alwaysCheckedNodes(item[_child]);
        }
      });
    },

    onClose() {
      this.filterText = '';
      this.isShowSearch = false;
      this.$emit('close');
    },

    // 切换搜索树节点选中状态
    changeSearchType(item) {
      item.selected = !item.selected;
    },

    confirmSearch() {
      let searchList = this.resultList.filter(d => d.selected).map(d => d.key), //搜索树已选节点
        checkedKeysList = Array.from(new Set([...this.selectKeysList, ...searchList]));

      if (this.max && this.max < checkedKeysList.length) {
        this.$toast({
          message: this.maxTips ? this.maxTips : `最多可选${this.max}条${this.title != '请选择' ? this.title : ''}`,
        });
      } else {
        this.filterText = '';
        this.isShowSearch = false;
        this.loadingStatus2 = false;

        this.setCheckedKeys(searchList, true);
      }
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
    position: relative;
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
  }

  .search-field {
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
/deep/ .van-action-sheet__header {
  font-family: PingFangSC, PingFangSC-Medium;
  color: #141414;
  line-height: 1.08rem;
}
/deep/.van-action-sheet__content {
  flex: 1;
  overflow: hidden;
}

.search-field {
  padding: 0 0.32rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  /deep/.search-input {
    color: #111;
    // width: 5.34rem;
    flex: 1;
    padding: 4px 8px;
    background: #f9f9f9;
    border-radius: 2px;
    font-family: PingFangSC, PingFangSC-Regular;
    .van-icon-search {
      background: url('./images/ico_search.png') no-repeat center center;
      background-size: 14px;
      &::before {
        content: '';
      }
    }
    .van-field__control::placeholder {
      color: #bbbbbb;
    }
    .van-icon-clear {
      margin-right: 0px;
      background: url('./images/clear.png') no-repeat center center;
      background-size: 14px;
      &::before {
        opacity: 0;
      }
    }
  }
  .expand-btn {
    font-size: 1em;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #1482f0;
    padding-left: 0.4rem;
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
