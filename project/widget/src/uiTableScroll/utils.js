export default {
  //数字千分位并保留fixed位小数
  formatNumber(value, fixed = 2) {
    // debugger
    if (isNaN(parseFloat(value)) && value === undefined) return '-';
    value = parseFloat(value)
      .toFixed(fixed)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    return value;
  },
};
