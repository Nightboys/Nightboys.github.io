<template>
  <div class="container">
    <div class="btn-group">
      <van-button
        type="primary"
        @click="openDialog('v1', '省市区1~类别一', '1')"
      >
        省市区1~类别一
      </van-button>
      <van-button type="info" @click="openDialog('v1', '省市区2~类别一', '2')">
        省市区2~类别一
      </van-button>
      <van-button type="info" @click="openDialog('v2', '省市区~类别二')">
        省市区~类别二
      </van-button>
      <van-button type="primary" @click="openDialog('v3', '省市区~类别三')">
        省市区~类别三
      </van-button>
    </div>

    <!-- 省市区筛选组件 -->
    <uiCityPicker
      ref="myProvincePicker"
      :isShow="showPicker"
      :styleObject="dialogObject"
      :areaData="provinceData"
      :cityType="cityType"
      :title="titleName"
      @submit="submitArea"
      @reset="resetArea"
      @close="closePicker"
    ></uiCityPicker>
  </div>
</template>

<script>
import { cityData, areaData } from './json/city.js';

export default {
  data() {
    return {
      showPicker: false, //隐藏下拉选择控件

      // 省市区
      provinceData: cityData,
      cityType: 'v1', //v1、v2、v3
      titleName: '',

      // 设定弹窗高度
      dialogObject: {
        height: '90vh',
        maxHeight: 'none',
      },
    };
  },
  methods: {
    openDialog(type = 'v1', title = '请选择', dataType = '1') {
      this.showPicker = true;
      this.cityType = type;
      this.provinceData = type == 'v1' && dataType == '1' ? areaData : cityData;
      this.titleName = title;
    },

    closePicker() {
      this.showPicker = false;
    },

    /******以下方法针对地区-省市区组件******/
    submitArea(detail) {
      console.log('已选地区数据===', detail);
    },
    resetArea() {},
    /******以上方法针对地区-省市区组件******/
  },
};
</script>

<style lang="less" scoped>
.btn-group {
  button {
    margin: 16px 0 0 16px;
  }
}
</style>
