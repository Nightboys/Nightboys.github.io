```
author: zhangzf@finchina.com
update by zhangzf 2021/09/15
```

### 弹框提示类组件

##### 准备

1. 在src下级新建文件夹plugins

2. 将组件库中的plugins内的文件全部复制进项目中的plugins文件夹中

3. 在项目中的app.js中写入以下代码

   ```js
   import Model from '@/plugins/http/model';
   Vue.use(Model);
   ```

##### 使用示例

```vue
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
import UiAlertTip from '@/components/uiAlertTip';
// import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiAlertTip.md';
export default {
  components: {
    UiAlertTip,
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

```

##### 参数说明

| 参数               | 类型                    | 默认值     | 是否必填 | 说明                                                         |
| ------------------ | ----------------------- | ---------- | -------- | ------------------------------------------------------------ |
| title              | String                  | 无         | 否       | 弹出框title，若不传则为无标题弹框                            |
| message            | String                  | 无         | 否       | 弹出框展示内容                                               |
| cancelButtonText   | String                  | 无         | 否       | 取消按钮展示文本                                             |
| confirmButtonText  | String                  | “我知道了” | 否       | 确定按钮展示文本                                             |
| showConfirmButton  | Boolean                 | true       | 否       | 是否展示确认按钮                                             |
| showCancelButton   | Boolean                 | false      | 否       | 是否展示取消按钮                                             |
| confirmButtonClass | [Array, Object, String] | 无         | 否       | 确认按钮添加样式                                             |
| cancelButtonClass  | [Array, Object, String] | 无         | 否       | 取消按钮添加样式                                             |
| confirmLink        | String                  | 无         | 否       | 确定按钮点击链接，需与buttonType一起使用且buttonType为“link”，不可与beforeClose同时使用 |
| cancelLink         | String                  | 无         | 否       | 取消按钮点击链接，条件同确认按钮点击链接                                             |
| visible            | Boolean                 | false      | 否       | 弹框是否展示                                                             |
| buttonType         | String                  | “button”   | 否       | 按钮类型，取值有:”button“、”link“                            |
| onClose            | function                | 无         | 否       | 函数，会在beforeClose()函数中执行done()时调用                |
| beforeClose        | function                | 无         | 否       | （action, this, this.close, event）接收四个参数，1、action点击的按钮类型，“cancel”或“confirm”   2、this.close:函数 |



