<template>
  <div class="box">
    <van-button round type="info" class="confirm-btn" @click="handleSowModel">
      点击拉起组件
    </van-button>
    <van-button round type="primary" class="confirm-btn" :url="urlConcat('uiRefreshBottom')">
      查看说明文档
    </van-button>
    <van-popup v-model="show" closeable position="right" :style="{ width: '100%', height: '100%' }">
      <!--测试滚动-->
      <div class="scroll-content">
        <div class="scroll-list" id="scroll_List" :style="{ height: setHeight() }">
          <div class="item" v-for="(item, index) in testData" :key="index">
            <div><span>开庭时间</span><span>{{ item.courtTime }}</span></div>
            <div><span>案 号</span><span>{{ item.caseName }}</span></div>
            <div><span>案 由</span><span>{{ item.caseReason }}</span></div>
            <div><span>原 告</span><span>{{ item.plaintiff }}</span></div>
            <div><span>被 告</span><span>{{ item.defendant }}</span></div>
            <div><span>立案日期</span><span>{{ item.filingDate }}</span></div>
          </div>
          <!--      展示滚动加载组件样式-->
          <ui-refresh-bottom v-show="testData.length >= 8" :status="loadingType"></ui-refresh-bottom>
        </div>

      </div>
    </van-popup>
    <div class="markdown" v-html="htmlMD"></div>
  </div>
</template>

<script>
  import { resize } from '@/utils/dom';
  import uiRefreshBottom from '../../components/uiRefreshBottom';
  import md from '@/markdown/uiRefreshBottom.md';
  import { urlConcat } from '@/utils/urls';
let data = [{
  courtTime: '2019-05-24 09:20',
  caseName: '(2019)皖0191民初1739号',
  caseReason: '合同纠纷',
  plaintiff: '科大讯飞股份有限公司',
  defendant: '桂平市特写科技有限公司',
  filingDate: '2019-05-14'
}, {
  courtTime: '2019-05-24 09:20',
  caseName: '(2019)皖0191民初1739号',
  caseReason: '合同纠纷',
  plaintiff: '科大讯飞股份有限公司',
  defendant: '桂平市特写科技有限公司',
  filingDate: '2019-05-14'
}, {
  courtTime: '2019-05-24 09:20',
  caseName: '(2019)皖0191民初1739号',
  caseReason: '合同纠纷',
  plaintiff: '科大讯飞股份有限公司',
  defendant: '桂平市特写科技有限公司',
  filingDate: '2019-05-14'
},{
  courtTime: '2019-05-24 09:20',
  caseName: '(2019)皖0191民初1739号',
  caseReason: '合同纠纷',
  plaintiff: '科大讯飞股份有限公司',
  defendant: '桂平市特写科技有限公司',
  filingDate: '2019-05-14'
},{
  courtTime: '2019-05-24 09:20',
  caseName: '(2019)皖0191民初1739号',
  caseReason: '合同纠纷',
  plaintiff: '科大讯飞股份有限公司',
  defendant: '桂平市特写科技有限公司',
  filingDate: '2019-05-14'
},{
  courtTime: '2019-05-24 09:20',
  caseName: '(2019)皖0191民初1739号',
  caseReason: '合同纠纷',
  plaintiff: '科大讯飞股份有限公司',
  defendant: '桂平市特写科技有限公司',
  filingDate: '2019-05-14'
},{
  courtTime: '2019-05-24 09:20',
  caseName: '(2019)皖0191民初1739号',
  caseReason: '合同纠纷',
  plaintiff: '科大讯飞股份有限公司',
  defendant: '桂平市特写科技有限公司',
  filingDate: '2019-05-14'
},{
  courtTime: '2019-05-24 09:20',
  caseName: '(2019)皖0191民初1739号',
  caseReason: '合同纠纷',
  plaintiff: '科大讯飞股份有限公司',
  defendant: '桂平市特写科技有限公司',
  filingDate: '2019-05-14'
}]
  export default {
    data() {
      return {
        htmlMD: md,
        show: false,
        loading: false,
        loadingType: true,
        urlConcat,
        testData:JSON.parse(JSON.stringify(data)),
      };
    },
    mounted() {
      resize();
    },
    components: { uiRefreshBottom },
    methods:{
      setHeight() {},
      handleSowModel() {
        this.show = true
        this.$nextTick(() =>{
          let wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
          let content = document.querySelector('.scroll-list')
          this.subScrollPage = () => {
            let scrollTop = content.scrollTop,
              conHeight = content.scrollHeight
            if ( this.testData.length >= 40) this.loadingType = false
            if (!this.loading && conHeight < wHeight + scrollTop + 20 && this.testData.length < 40) {
              // 伪造网络请求
              this.loading = true
              let p = new Promise((resolve) =>{
                setTimeout(() =>{
                  resolve('执行完毕')
                }, 5000)
              })
              p.then((result) =>{
                this.loading = false
                this.testData = [...this.testData,...data ]
              })
            }
          }
          document.getElementById('scroll_List').addEventListener('scroll', this.subScrollPage)
        })
      },
    },
  };
</script>

<style lang="less" scoped>
  @import '@/styles/github-markdown.css';
  .echartsTree {
    margin-top: 1.6rem;
    padding: 0 0.32rem;
  }
  .scroll-content {
    .scroll-list {
      margin-top: 50px;
      width: 100%;
      height: 600px;
      overflow-y: scroll;
      .item {
        margin-bottom: 0.16rem;
        padding: 0 0.32rem;
        border-bottom: 1px solid #efefef;
        >div {
          margin-bottom: 0.2rem;
          >span:first-child {
            width: 1.12rem;
            font-size: 0.28rem;
            font-family: PingFangSC, PingFangSC-Light;
            font-weight: 300;
            color: #5c5c5c;
            line-height: 0.4rem;
            margin-right: 0.48rem;
          }
          >span:last-child {
            font-size: 0.28rem;
            font-family: PingFangSC, PingFangSC-Regular;
            color: #111111;
            line-height: 0.4rem;
          }
        }
      }
    }
  }
</style>
