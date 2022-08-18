function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 去除对象中为空或undefined的值
 * @param object 指定对象
 * @return {{}}
 */
export var removeObjectNil = function removeObjectNil(object) {
  if (!object) return {};
  var newObject = {};
  Object.keys(object).forEach(function (key) {
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

export var isNull = function isNull(val) {
  return val === null;
};
export var isEmpty = function isEmpty(val) {
  return isNull(val) || !(Object.keys(val) || val).length;
};
export var oneOf = function oneOf(val, list) {
  return list.indexOf(val) > -1;
};
export var isUndefined = function isUndefined(val, unit, num) {
  if (unit === void 0) {
    unit = "";
  }

  if (num === void 0) {
    num = 2;
  }

  if (typeof val === "undefined" || val === null || val === "" || val === "-") {
    return "-";
  } else {
    // return (typeof val == "number" ? val.toFixed(num) : val) + "" + unit;
    return val + "" + unit;
  }
}; // 不同时间间隔-时间提示  2020-05-22 17:58:45

/**
 * 时间格式处理成
 * 刚刚、5分钟前、10分钟前、半小时前、n小时前、月日、年月日
 * @param value:'2019-04-26 12:12:12'
 * @returns {string}
 */

export var dateDesc = function dateDesc(value) {
  if (!value) return '';
  var dataFormat = value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + value.substr(6, 2) + ' ' + value.substr(8, 2) + ':' + value.substr(10, 2) + ':' + value.substr(12, 2);
  var now = new Date(),
      time = new Date(dataFormat),
      endTime = now.getTime(),
      startTime = time.getTime();
  var str = '',
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
    str = Math.floor(second / 60 / 60) + "\u5C0F\u65F6\u524D";
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

export var formatDate = function formatDate(value, format, newFormat) {
  if (format === void 0) {
    format = 'YYYYMMDD';
  }

  if (newFormat === void 0) {
    newFormat = 'YYYY-MM-DD';
  }

  if (!value || value === '--') return '';

  if (value instanceof String && value.includes('19000101')) {
    return '';
  }

  var time = new Date(value);

  if (isNaN(+time)) {
    //把日期从format转为newFormat
    var matches = format.match(/([a-zA-Z])\1{1,}/g);
    var start = 0;

    for (var _iterator = _createForOfIteratorHelperLoose(matches), _step; !(_step = _iterator()).done;) {
      var match = _step.value;

      if (newFormat && newFormat.indexOf(match) !== -1) {
        newFormat = newFormat.replace(new RegExp(match, 'g'), String(value).substr(start, match.length));
      }

      start += match.length;
    }

    return newFormat;
  } else {
    //把当前日期Date转为format
    var timeMaps = {
      'Y{4}': time.getFullYear(),
      'Y{2}': time.getFullYear().toString().substr(2),
      'M{2}': time.getMonth() + 1,
      'D{2}': time.getDate(),
      'H{2}': time.getHours(),
      'm{2}': time.getMinutes(),
      's{2}': time.getSeconds()
    };
    Object.keys(timeMaps).forEach(function (key) {
      timeMaps[key] = String(timeMaps[key]).padStart(2, 0);
      format = format.replace(new RegExp(key, 'g'), timeMaps[key]);
    });
    return format;
  }
}; // 更改页面高度为屏幕高度1.4倍

export var change_minheight = function change_minheight() {
  var $window = $(window);
  var wHeight = $window.height();
  document.querySelector('body').style.minHeight = wHeight + wHeight * 0.4 + 'px';
}; // 特殊字符处理

export var replaceSepcialTxt = function replaceSepcialTxt(txt) {
  var specialArr = '$()*+.[]?^{}|'.split(''),
      results = [];
  txt.split('').forEach(function (s) {
    results.push(specialArr.indexOf(s) == -1 ? s : '\\' + s);
  });
  return results.join('');
};