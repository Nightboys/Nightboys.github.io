<!-- 
	* @description: 弹框提示类组件
	* @author: zhangzf
	* @date: 2021-09-13
!-->
<template>
  <div class="box">
    <div class="box-btns">
      <!-- <van-button round type="info" class="confirm-btn" @click="showAlertTip">
        点击拉起组件
      </van-button> -->

      <van-button round type="info" class="confirm-btn" @click="showAlertTipHasTitle">
        常规有标题
      </van-button>
      <van-button round type="info" class="confirm-btn" @click="showAlertTipHasNoTitle">
        常规无标题
      </van-button>
      <van-button round type="info" class="confirm-btn" @click="showAlertTipHasTwoBtns">
        弹框-常规，选择性（两个按钮）
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiEchartsPie')">
        查看说明文档
      </van-button>

      <!-- echarts饼图组件 -->

      <div class="markdown" v-html="htmlMD"></div>
      <!-- <vue-markdown :source="htmlMD"></vue-markdown> -->
    </div>
    <ui-alert-tip ref="uiAlertTip"></ui-alert-tip>
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
// import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiAlertTip.md';
export default {
  components: {
    // VueMarkdown,
  },
  data() {
    return {
      urlConcat,
      htmlMD: md,
    };
  },
  created() {
    resize();
  },
  methods: {
    showAlertTip() {
      this.$refs.uiAlertTip.openDialog();
    },
    showAlertTipHasTitle() {
      let _message =
        '解直锟，男，1961年1月出生于黑龙江省，大学学历，中植企业集团创始人。曾任中植企业集团有限公司董事局主席。';
      this.$alert({
        message: _message,
        title: '简介',
        maskClose: true,
      });
    },
    showAlertTipHasNoTitle() {
      let _message =
        '解直锟，男，1961年1月出生于黑龙江省，大学学历，中植企业集团创始人。曾任中植企业集团有限公司董事局主席。';
      this.$alert({
        message: _message,
        maskClose: true,
      });
    },
    showAlertTipHasTwoBtns() {
      let _message = '您绑定的PC终端账号已被其他终端解除绑定，已同步的PC终端自选股组合已被删除';
      this.$alert({
        message: _message,
        title: '提示',
        maskClose: true,
        confirmButtonText: '绑定终端',
        cancelButtonText: '稍后绑定',
        showCancelButton: true,
        showConfirmButton: true,
        // buttonType: 'link',
        // cancelLink: location.origin + '/finchinaAPP/member.html' + location.search,
        onClose() {
          console.log('稍后执行我');
        },
        beforeClose(action, instance, done, event) {
          if (action === 'confirm') {
            // todo 确认按钮跳转
            event.preventDefault();
          } else if (action === 'cancel') {
            // todo 取消按钮操作
            event.preventDefault();
          }
          // 调用以往下执行
          done();
        },
      });
    },
  },
};
</script>

<style lang="less">
@import '~@/styles/commons';
@import '@/styles/github-markdown.css';
</style>

<style lang="less" scoped>
.box {
  font-size: 0.24rem;
  // padding: 0.4rem;
  .box-btns {
    padding: 0.4rem;
    .confirm-btn {
      margin-bottom: 0.2rem;
    }
  }
}
</style>
