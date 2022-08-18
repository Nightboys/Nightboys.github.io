<template>
  <div class="box">
    <div>
      <van-button
        block
        type="info"
        class="confirm-btn"
        @click="showPicker = true"
      >
        点击拉起组件
      </van-button>
    </div>

    <!-- 表格组件 -->
    <uitab
      :isShow="showPicker"
      :columns="columns"
      :tableData="dataList"
      :totalCount="dataList.length"
      @close="closePicker"
    ></uitab>
  </div>
</template>

<script>
import uitab from './demo.vue';
export default {
  components: {
    uitab,
  },
  data() {
    return {
      showPicker: false,

      columns: [
        // {
        //   key: 'index',
        //   name: '序号',
        //   fixed: true,
        //   extraStyle: {
        //     width: '0.6rem',
        //   },
        // },
        {
          key: 'city',
          name: '开发区',
          fixed: true,
          extraStyle: {
            color: '#1482f0',
          },
        },
        {
          key: 'tab1',
          name: 'GDP(元)',
          sort: true,
        },
        {
          key: 'tab2',
          name: '固定资产',
          template: 'tab2',
        },
        {
          key: 'tab3',
          name: '工业总产值',
        },
        {
          key: 'tab4',
          name: '社会消费',
        },
      ],
      dataList: [],
    };
  },
  mounted() {
    this.getColumnsData();
  },
  methods: {
    closePicker() {
      this.showPicker = false;
    },

    // 表格测试数据
    getColumnsData() {
      let arr = [];
      for (var k = 0; k < 30; k++) {
        arr.push({
          index: k + 1,
          city: '翡翠湖风景' + (k % 4 ? k : '翡翠湖风景'),
          tab1: (Math.random() * 1000 + 999).toFixed(2),
          tab2: (Math.random() * 100 + 666).toFixed(2),
          tab3: (Math.random() * 10 + 333).toFixed(2),
          tab4: (Math.random() * 100 + 111).toFixed(2),
        });
      }
      this.dataList = arr;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  font-size: 0.24rem;
}
</style>
