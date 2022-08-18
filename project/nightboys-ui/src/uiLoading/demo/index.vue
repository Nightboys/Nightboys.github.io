<template>
  <div class="box">
    <div>
      <van-button block type="info" class="confirm-btn" @click="openLoading">
        点击拉起组件
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPicker: true,
    };
  },
  methods: {
    openLoading() {
      this.$loading.open();

      setTimeout(() => {
        this.$loading.close();
      }, 2500);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  font-size: 0.24rem;
}
</style>
