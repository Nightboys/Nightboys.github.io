<template>
  <div class="box">
    <div>
      <van-button round type="info" class="confirm-btn" @click="showPicker = true">
        点击拉起组件
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiTreePickerNew')">
        查看说明文档
      </van-button>
    </div>

    <!-- 树组件 -->
    <uiTreePickerNew
      ref="myTreePickerNew"
      :title="extraData.title || '请选择'"
      :isShow="showPicker"
      :showInput="extraData.showInput"
      :max="extraData.max"
      :treeData="extraData.data"
      :treeProps="extraData.treeProps"
      :defaultCheckdKeys="extraData.defaultCheckdKeys || []"
      :defaultExpandedKeys="extraData.defaultExpandedKeys || []"
      :styleObject="dialogObject"
      @changeTree="changeTreeBD"
      @close="onClose"
    >
      <div>
        <div class="tree-result" v-show="extraData.showCount">
          <span>
            已选择 <b>{{ treeNodesLen }}</b> 个条件
          </span>
        </div>
        <div class="tree-group">
          <span class="btn" @click="resetTreeBD">重置</span>
          <span class="btn btn-ok" @click="submitTreeBD">
            确认选择
            <template v-if="extraData.showCount">
              {{ treeNodesLen > 0 ? `(${treeNodesLen})` : '' }}
            </template>
          </span>
        </div>
      </div>
    </uiTreePickerNew>

    <div class="markdown" v-html="htmlMD"></div>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiTreePickerNew from '@/components/uiTreePickerNew';
import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiTreePickerNew.md';
import dataList from './data/extraData';
export default {
  components: {
    uiTreePickerNew,
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
        defaultCheckdKeys: [], //默认选中项
        defaultExpandedKeys: [], //默认展开项
        treeProps: {
          children: 'children',
          label: 'name',
          nodeKey: 'value',
          treeType: '科技型企业', //树类型--科技型企业
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
          let childNodes = this.$refs.myTreePickerNew.getCheckedNodes();
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

    changeTreeBD(detail) {
      console.log('当前已选节点nodes及keys====', detail);
      let childNodes = detail.sltNodes.filter(d => !d.children || !d.children.length);
      this.treeNodesLen = childNodes.length; //仅统计最细节点
    },

    // 触发tree组件方法
    submitTreeBD() {
      let sltNodes = this.$refs.myTreePickerNew.getCheckedNodes(),
        sltKeys = this.$refs.myTreePickerNew.getCheckedKeys();
      this.$emit('submit', { sltNodes, sltKeys });
      this.closePicker();
    },
    // 清空已选
    resetTreeBD() {
      this.treeNodesLen = 0;
      this.$refs.myTreePickerNew.resetChecked(); //清空已选
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
