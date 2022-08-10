<template>
  <div class="box">
    <div>
      <van-button round type="info" class="confirm-btn" @click="openDialog(1)">
        示例一
      </van-button>
      <van-button round type="info" class="confirm-btn" @click="openDialog(2)">
        示例二
      </van-button>
      <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiPicker')">
        查看说明文档
      </van-button>
    </div>

    <!-- <ui-picker :isShow="showPicker" :columns="columns" @confirm="onConfirm" @close="onClose"></ui-picker> -->
    <van-action-sheet v-model="showPicker" :title="title" @close="onClose">
      <uiMenuHead :menus="menuData" @menuChange="menuChange" ref="menu">
        <template #right>
          <span class="right-count">999+</span>
        </template>
      </uiMenuHead>
    </van-action-sheet>

    <div class="markdown" v-html="htmlMD"></div>
  </div>
</template>

<script>
import { resize } from '@/utils/dom';
import { urlConcat } from '@/utils/urls';
import uiMenuHead from '@/components/menuHead/menuHead';
import VueMarkdown from 'vue-markdown';
import md from '@/markdown/uiMenuHead.md';
import { menuData1, menuData2 } from './menus';

import Vue from 'vue';
import { ActionSheet, Picker, Button, Dialog } from 'vant';
Vue.use(ActionSheet)
  .use(Picker)
  .use(Button)
  .use(Dialog);

export default {
  components: {
    uiMenuHead,
    VueMarkdown,
  },
  data() {
    return {
      urlConcat,
      htmlMD: md,
      showPicker: false,
      title: 'menuHead组件应用示例',
      menuData: menuData1,
      menuParams: {}, //筛选结果参数
    };
  },
  created() {
    resize();
  },
  methods: {
    openDialog(type) {
      this.currentMenuIndex = type;
      this.showPicker = true;
      switch (type) {
        case 1:
          this.menuData = menuData1;
          break;
        case 2:
          this.menuData = menuData2;
          break;

        default:
          break;
      }
    },
    closePicker() {
      this.showPicker = false;
    },
    onConfirm(detail) {
      // console.log('选择===', detail);
      this.closePicker();
      this.$toast({
        message: detail.value.join(' '),
        icon: 'like-o',
      });
    },

    onClose() {
      // console.log("取消选择===");
      this.closePicker();
    },

    menuChange(arr, idx, selectList = []) {
      console.log('筛选条件===', arr, idx, selectList);
      this.menus = arr;

      if (this.currentMenuIndex == 1) {
        switch (idx) {
          case 0: //地区、行业
            this.menuParams['area'] = selectList.map(d => d.value).join(',');
            break;
          case 2: //发布年份
            arr[idx].list.forEach(d => {
              this.menuParams[d.key] = '';
            });

            if (selectList.length) {
              let params = {};
              selectList.forEach(d => {
                if (!Array.isArray(params[d.params])) params[d.params] = [];
                params[d.params].push(d.list.value);
              });
              Object.keys(params).forEach(key => {
                this.menuParams[key] = params[key].join(',');
              });
            }

            break;
          case 1: //履行情况
          case 3: //日期范围
            arr[idx].list.forEach(o => {
              this.menuParams[o.key] = selectList.map(d => d.customValue || d.value).join(',');
            });
            break;
        }
      } else if (this.currentMenuIndex == 2) {
        switch (idx) {
          case 0: //收益率
            this.menuParams['area'] = selectList.map(d => d.value).join(',');
            break;
          case 1: //筛选
            arr[idx].list.forEach(d => {
              this.menuParams[d.key] = '';
            });

            if (selectList.length) {
              let params = {};
              selectList.forEach(d => {
                if (!Array.isArray(params[d.params])) params[d.params] = [];
                params[d.params].push(d.customValue || d.list.value);
              });
              Object.keys(params).forEach(key => {
                this.menuParams[key] = params[key].join(',');
              });
            }

            break;
          case 2: //违约状况
            this.menuParams['scenarios'] = selectList.map(d => d.value).join(',');
            break;
          case 3: //过滤
            arr[idx].list.forEach(o => {
              this.menuParams[o.key] = selectList.map(d => d.value).join(',');
            });
            break;
        }
      }

      console.log('筛选条件参数====', this.menuParams);
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
.van-action-sheet {
  height: 90vh;
  max-height: none;
  .van-action-sheet__content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    /deep/.menu-containerBP,
    .menu-container {
      height: 100%;
      position: relative;
      #menu-cover {
        position: absolute;
        .fill-blank {
          height: auto;
        }
      }
      ul.menu-titles li a:after {
        top: calc(50% - 3px);
      }
      .right-count {
        line-height: 0.64rem;
      }
    }
  }
}

/deep/ .van-action-sheet__header {
  font-family: PingFangSC, PingFangSC-Medium;
  color: #141414;
  line-height: 1.08rem;
}
</style>
