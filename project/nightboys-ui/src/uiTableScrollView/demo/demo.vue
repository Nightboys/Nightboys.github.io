<template>
  <div class="ui-picker">
    <van-action-sheet v-model="isShowPicker" :title="title" @close="onClose">
      <uiTableScrollView
        :columns="columns"
        :tableData="tableData"
        :total="totalCount"
        :isShowPage="isShowPage"
        :isShowExpand="isShowExpand"
        :isSticky="isSticky"
        :isWrap="isWrap"
        :splitStep="splitStep"
        :minStep="minStep"
        :tabId="tabId"
        @handleSort="handleSort"
      >
        <!-- 自定义列模板 -->
        <template #tab2="{ row }">
          <span>自{{ row.tab2 }}</span>
        </template>
      </uiTableScrollView>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: () => '请选择',
    },

    //显示与隐藏
    isShow: {
      type: Boolean,
      default: () => false,
    },

    // 表头
    columns: {
      type: Array,
      default: () => [],
    },

    // 列表数据
    tableData: {
      type: Array,
      default: () => [],
    },

    totalCount: {
      type: [String, Number],
      default: () => 0,
    },
  },

  data() {
    return {
      isShowPicker: false,

      tabId: 0, //表格组件唯一值[String, Number]
      isShowPage: true, //是否分页
      isShowExpand: true, //是否显示展开剩余按钮
      isSticky: true, //是否表头固定(吸顶)
      isWrap: true, //超出是否换行
      splitStep: 8, //每页显示条数
      minStep: 8, //总数小于10时不分页
    };
  },

  watch: {
    isShow: {
      immediate: true,
      handler(val) {
        this.isShowPicker = val;
      },
    },
  },

  methods: {
    onClose() {
      this.$emit('close');
    },

    // 表格排序
    handleSort(item) {
      console.log('列排序===', item); //sortType：0默认,1降序，2升序
    },
  },
};
</script>

<style lang="less" scoped>
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

/deep/ .van-action-sheet__header {
  font-family: PingFangSC, PingFangSC-Medium;
  color: #141414;
}
.van-action-sheet {
  height: calc(100vh - 88px);
  max-height: none;
  .van-action-sheet__content {
    flex: 1;
    // overflow: hidden;
    border-top: 0.01rem solid #efefef;
  }
}
</style>
