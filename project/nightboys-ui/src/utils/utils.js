/**
 * 去除对象中为空或undefined的值
 * @param object 指定对象
 * @return {{}}
 */
export const removeObjectNil = object => {
  if (!object) return {};
  const newObject = {};
  Object.keys(object).forEach(key => {
    if (object[key] !== undefined && object[key] !== '') {
      newObject[key] = object[key];
    }
  });
  return newObject;
};
/**
 * 是否包含
 * @param value 指定值
 * @param list 全部值
 * @return {Boolean}
 */
export const isNull = val => val === null;

export const isEmpty = val => isNull(val) || !(Object.keys(val) || val).length;

export const oneOf = (val, list) => list.indexOf(val) > -1;

export const isUndefined = (val, unit = "", num = 2) => {
  if (
    typeof val === "undefined" ||
    val === null ||
    val === "" ||
    val === "-"
  ) {
    return "-";
  } else {
    // return (typeof val == "number" ? val.toFixed(num) : val) + "" + unit;
    return val + "" + unit;
  }
};

// 不同时间间隔-时间提示  2020-05-22 17:58:45
/**
 * 时间格式处理成
 * 刚刚、5分钟前、10分钟前、半小时前、n小时前、月日、年月日
 * @param value:'2019-04-26 12:12:12'
 * @returns {string}
 */
export const dateDesc = value => {
  if (!value) return '';
  let dataFormat =
    value.substr(0, 4) +
    '/' +
    value.substr(4, 2) +
    '/' +
    value.substr(6, 2) +
    ' ' +
    value.substr(8, 2) +
    ':' +
    value.substr(10, 2) +
    ':' +
    value.substr(12, 2);
  const now = new Date(),
    time = new Date(dataFormat),
    endTime = now.getTime(),
    startTime = time.getTime();
  let str = '',
    second = (endTime - startTime) / 1000; //秒
  if (second <= 5 * 60) {
    // 5分钟内（含5分钟）
    str = '刚刚';
  } else if (second <= 10 * 60) {
    // 5-10分钟内（含10分钟）
    str = '5分钟前';
  } else if (second <= 30 * 60) {
    // 10-30分钟内（含30分钟）
    str = '10分钟前';
  } else if (second <= 60 * 60) {
    // 30分钟-1小时（含1小时）
    str = '半小时前';
  } else if (second <= 12 * 60 * 60) {
    // 在12小时内的每个小时时间段内，以起始时间为标注
    str = `${Math.floor(second / 60 / 60)}小时前`;
  } else if (time.getYear() === now.getYear()) {
    //今年的显示月日
    str = formatDate(time, 'MM-DD');
  } else if (time.getYear() !== now.getYear()) {
    //非今年显示年月日
    str = formatDate(time, 'YYYY-MM-DD');
  }
  return str;
};
/**
 * 日期格式化，如下示例：
 * formatDate('20170101', 'YYYYMMDD', 'YYYY.MM.DD') 输出:2017.01.01
 * formatDate(Date.now(), 'YYYY-MM-DD') 输出：当前时间的格式化
 * @param value
 * @param format 源日期格式
 * @param newFormat 新日期格式
 * @returns {String}
 */
export const formatDate = (value, format = 'YYYYMMDD', newFormat = 'YYYY-MM-DD') => {
  if (!value || value === '--') return '';
  if (value instanceof String && value.includes('19000101')) {
    return '';
  }
  const time = new Date(value);
  if (isNaN(+time)) {
    //把日期从format转为newFormat
    const matches = format.match(/([a-zA-Z])\1{1,}/g);
    let start = 0;
    for (const match of matches) {
      if (newFormat && newFormat.indexOf(match) !== -1) {
        newFormat = newFormat.replace(new RegExp(match, 'g'), String(value).substr(start, match.length));
      }
      start += match.length;
    }
    return newFormat;
  } else {
    //把当前日期Date转为format
    const timeMaps = {
      'Y{4}': time.getFullYear(),
      'Y{2}': time
        .getFullYear()
        .toString()
        .substr(2),
      'M{2}': time.getMonth() + 1,
      'D{2}': time.getDate(),
      'H{2}': time.getHours(),
      'm{2}': time.getMinutes(),
      's{2}': time.getSeconds(),
    };

    Object.keys(timeMaps).forEach(key => {
      timeMaps[key] = String(timeMaps[key]).padStart(2, 0);
      format = format.replace(new RegExp(key, 'g'), timeMaps[key]);
    });
    return format;
  }
};

// 更改页面高度为屏幕高度1.4倍
export const change_minheight = () => {
  let $window = $(window);
  let wHeight = $window.height();
  document.querySelector('body').style.minHeight = wHeight + wHeight * 0.4 + 'px'
}

// 特殊字符处理
export const replaceSepcialTxt = (txt) => {
  let specialArr = '$()*+.[]?^{}|'.split(''),
    results = [];
  txt.split('').forEach(s => {
    results.push(specialArr.indexOf(s) == -1 ? s : '\\' + s);
  });

  return results.join('');
}
