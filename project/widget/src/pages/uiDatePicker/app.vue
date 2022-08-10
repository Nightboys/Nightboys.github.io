<template>
  <div class="box">
    <div>
      <van-button round type="info" class="confirm-btn" @click="showPicker = true">
        点击拉起组件
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiDatePicker')">
        查看说明文档
      </van-button>
      <van-button round type="warning" class="confirm-btn" @click="setPickerValues">
        设置选中日期
      </van-button>
    </div>

    <!-- 日期选择组件 -->
    <ui-date-picker
      ref="myDatePicker"
      startDate="2020-05-15"
      endDate="2099-05-01"
      :isShow="showPicker"
      :title="title"
      :dateRange="isDateRange"
      :dateType="dateType"
      @confirm="onConfirm"
      @close="onClose"
    ></ui-date-picker>

    <div class="markdown" v-html="htmlMD"></div>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiDatePicker from '@/components/uiDatePicker';
import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiDatePicker.md';
export default {
  components: {
    uiDatePicker,
    VueMarkdown,
  },
  data() {
    return {
      urlConcat,
      htmlMD: md,
      showPicker: false,
      title: '请选择日期',
      isDateRange: true,
      dateType: 'date',
    };
  },
  created() {
    resize();
  },
  methods: {
    closePicker() {
      this.showPicker = false;
    },
    onConfirm(value) {
      // console.log("选择===", value);
      this.closePicker();
      this.$toast({
        message: value.join('至'),
        icon: 'like-o',
      });
    },

    onClose() {
      // console.log("取消选择===");
      this.closePicker();
    },

    // 动态设置所有列默认选中日期
    setPickerValues() {
      this.showPicker = true;
      this.$nextTick(() => {
        this.$refs.myDatePicker.setPickerValues(['2020-08-01', '2020-10-01']); //['2020-08-01']、['2020-08-01','2020-10-01']
      });
    },

    // 动态设置指定列默认选中日期
    setColumnPickerValues() {
      this.showPicker = true;
      this.$nextTick(() => {
        this.$refs.myDatePicker.setColumnValue(0, '2020');
      });
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
</style>
