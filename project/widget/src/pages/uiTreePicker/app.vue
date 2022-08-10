<template>
  <div class="box">
    <div>
      <van-button round type="info" class="confirm-btn" @click="showPicker = true">
        点击拉起组件
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiTreePicker')">
        查看说明文档
      </van-button>
    </div>

    <!-- 树组件 -->
    <uiTreePicker
      ref="myTreePicker"
      :title="extraData.title || '请选择'"
      :isShow="showPicker"
      :showInput="extraData.showInput"
      :searchUrl="extraData.searchUrl"
      :treeData="extraData.data"
      :treeProps="extraData.treeProps"
      :max="extraData.max"
      :defaultCheckdKeys="extraData.defaultCheckdKeys || []"
      :defaultExpandedKeys="extraData.defaultExpandedKeys || []"
      :styleObject="dialogObject"
      @changeTree="changeTree"
      @close="onClose"
    >
      <div>
        <div class="tree-result" v-show="extraData.showCount">
          <span>
            已选择 <b>{{ treeNodesLen }}</b> 个条件
          </span>
        </div>
        <div class="tree-group">
          <span class="btn" @click="resetTree">重置</span>
          <span class="btn btn-ok" @click="submitTree">
            确认选择
            <template v-if="extraData.showCount">
              {{ treeNodesLen > 0 ? `(${treeNodesLen})` : '' }}
            </template>
          </span>
        </div>
      </div>
    </uiTreePicker>

    <div class="markdown" v-html="htmlMD"></div>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiTreePicker from '@/components/uiTreePicker';
import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiTreePicker.md';
import dataList from './data/extraData';
export default {
  components: {
    uiTreePicker,
    VueMarkdown,
  },
  data() {
    return {
      urlConcat,
      htmlMD: md,
      showPicker: false,

      treeNodesLen: 0,
      // 设定弹窗高度
      dialogObject: {
        height: '90%',
        maxHeight: 'none',
      },
      extraData: {
        data: dataList,
        defaultCheckdKeys: ['A01', 'A0211'], //默认选中项
        defaultExpandedKeys: ['A01', 'A0211'], //默认展开项
        treeProps: {
          children: 'children',
          label: 'name',
          nodeKey: 'value',
          treeType: 'industry', //树类型--行业
        },
        title: '行业目录树',
        showInput: true, //不展示模糊搜索
        searchUrl: '/finchinaAPP/v1/finchina-search/v1/enterpriseFilter/getQualificationListSearchResult.action',
        showCount: true,
        max: 50,
      },
    };
  },
  watch: {
    showPicker(val) {
      if (val) {
        this.$nextTick(() => {
          let childNodes = this.$refs.myTreePicker.getCheckedNodes();
          this.treeNodesLen = childNodes.filter(d => !d.children || !d.children.length).length || 0;
        });
      }
    },
  },
  created() {
    resize();
  },
  methods: {
    onClose() {
      this.showPicker = false;
    },

    // 当前已选节点
    changeTree(detail) {
      console.log('当前已选节点nodes及keys====', detail);
      let childNodes = detail.sltNodes.filter(d => !d.children || !d.children.length);
      this.treeNodesLen = childNodes.length; //仅统计最细节点
    },
    // 清空已选
    resetTree() {
      this.treeNodesLen = 0;
      this.$refs.myTreePicker.resetChecked(); //清空已选
    },
    submitTree() {
      let sltNodes = this.$refs.myTreePicker.getCheckedNodes(),
        sltKeys = this.$refs.myTreePicker.getCheckedKeys();

      this.onClose();
      // this.$emit('submit', { sltNodes, sltKeys });
      console.log('确定选择节点nodes及keys====', { sltNodes, sltKeys });
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/styles/commons.less';
@import '@/styles/github-markdown.css';
.box {
  font-size: 0.24rem;
}
.tree-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.14rem 0.28rem;
  font-size: 0.24rem;
  line-height: 0.34rem;
  font-weight: 400;
  color: #5c5c5c;
  border-top: 0.01rem solid #3b7eee;
  &.disabled {
    opacity: 0.4;
  }
  b {
    color: #111111;
    font-weight: 400;
  }

  .btn-view {
    color: #ff7500;
  }
}

.tree-group {
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  .btn {
    display: block;
    flex: 1;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.28rem;
    font-weight: 400;
    border-top: 0.01rem solid #dfdfdf;
    &.btn-ok {
      color: #ffffff;
      background: #1482f0;
      border-color: #1482f0;
    }
  }
}

/deep/.van-overlay {
  // opacity: 0;
  background: rgba(0, 0, 0, 0);
}
/deep/.van-action-sheet {
  box-shadow: 0px 0px 10px 0px rgba(187, 187, 187, 0.38);
}
</style>
