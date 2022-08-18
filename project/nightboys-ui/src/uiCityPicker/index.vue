<!--
使用用例：
<uiProvincePicker
			ref="myProvincePicker"
			:isShow="componentName == 'uiProvincePicker'"
			:styleObject="dialogObject"
			@submit="submitArea"
			@reset="resetArea"
		></uiProvincePicker>
-->
<template>
  <div class="ui-picker">
    <van-action-sheet
      v-model="isShowPicker"
      :title="title"
      @close="onClose"
      :style="styleObject"
    >
      <cityPicker
        ref="myCityPicker"
        :clist="areaData"
        :defaultCheckCitys="defaultCheckCitys"
        :cityType="cityType"
        @menuSubmit="submit"
        @menuReset="reset"
      ></cityPicker>
    </van-action-sheet>
  </div>
</template>

<script>
import cityPicker from './cityPicker.vue';
export default {
  name: 'uiCityPicker',
  components: { cityPicker },
  props: {
    // 标题
    title: {
      type: String,
      default: () => '请选择',
    },

    // 地区组件类别
    cityType: {
      type: String,
      default: () => 'v1',
    },

    //显示与隐藏
    isShow: {
      type: Boolean,
      default: () => false,
    },
    // 自定义样式
    styleObject: {
      type: Object,
      default: () => {},
    },
    areaData: [], //地区数据
    defaultCheckCitys: [], //默认选中城市
  },

  data() {
    return {
      isShowPicker: false,
      // areaData: provinceAndCityData,
      // defaultCheckCitys: [
      // 	"340100",
      // 	"340102",
      // 	"340103",
      // 	"340104",
      // 	"340111",
      // 	"340121",
      // 	"340122",
      // 	"340123",
      // 	"340124",
      // 	"340181",
      // 	"340202",
      // ],
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

  mounted() {
    // console.log("kkkkk===", this.areaData);
  },

  methods: {
    submit(detail) {
      this.isShowPicker = false;
      this.$emit('submit', detail);
    },
    reset(detail) {
      this.$emit('reset', detail);
    },

    onClose() {
      this.$refs.myCityPicker.onReset();
      this.$emit('close');
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

.van-action-sheet {
  height: calc(100vh - 88px);
  max-height: none;
  .van-action-sheet__content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}

/deep/ .van-action-sheet__header {
  font-family: PingFangSC, PingFangSC-Medium;
  color: #141414;
  line-height: 1.08rem;
}
</style>
