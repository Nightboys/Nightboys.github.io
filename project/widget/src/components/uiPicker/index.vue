<!--
使用用例：
import uiPicker from "@/components/uiPicker";
<ui-picker
    :isShow="showPicker"
    :columns="columns"
    @confirm="onConfirm"
    @close="onClose"
></ui-picker>
-->
<template>
  <div class="ui-picker">
    <van-action-sheet v-model="isShowPicker" :title="title" @close="onClose">
      <van-picker
        ref="vanPicker"
        :show-toolbar="false"
        :columns="columns"
        :item-height="itemHeight"
        :visible-item-count="5"
        @change="onChange"
        @confirm="onConfirm"
      ></van-picker>
      <van-button round type="info" native-type="button" class="confirm-btn" @click="confirmPicker">
        确认
      </van-button>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from 'vue';
import { ActionSheet, Picker, Button, Dialog } from 'vant';
Vue.use(ActionSheet)
  .use(Picker)
  .use(Button)
  .use(Dialog);
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

    //单项高度px
    itemHeight: {
      type: Number,
      default: () => 43,
    },

    columns: {
      type: Array,
      default: [], //https://youzan.github.io/vant/#/zh-CN/picker
    },
  },

  data() {
    return {
      isShowPicker: false,
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
    onChange(picker, value, index) {},
    onConfirm(value, index) {
      this.isShowPicker = false;
      this.$emit('confirm', { value, index });
    },
    onClose() {
      this.$emit('close');
    },
    confirmPicker() {
      this.$refs.vanPicker.confirm();
    },

    // 设置对应列选中的值
    setColumnValue(columnIndex, value) {
      let picker = this.$refs.vanPicker;
      picker.setColumnValue(columnIndex, value);
    },

    // 设置所有列选中的值
    setPickerValues(values) {
      if (!values || typeof values != 'object') {
        console.error("参数需传数组类型，如['周一','下午']");
        return;
      }
      let picker = this.$refs.vanPicker;
      picker.setValues(values);
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
</style>
