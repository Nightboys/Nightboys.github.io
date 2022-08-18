import _extends from "@babel/runtime/helpers/esm/extends";
import { isPlainObject } from 'lodash';
/**
 * 获取url查询参数
 * @param options 默认参数
 * @return {any}
 */

export var getUrlSearches = function getUrlSearches(options) {
  if (options === void 0) {
    options = {};
  }

  // console.log('getUrlSearches  01')
  // console.log(location)
  // console.log(location.href)
  var proto = Object.create(Object.getPrototypeOf(options));
  var urlObject = urlParse(location.search);
  return _extends({}, options, urlObject, proto);
};
export var urlParse = function urlParse(urlString) {
  var searchObj = {};
  var list = urlString.match(/([^&?]*?=[^&?]*)/g);

  if (list && list.length) {
    list.forEach(function (search) {
      var searchSplit = search.split('=');
      searchObj[searchSplit[0]] = searchSplit[1];
    });
  }

  return searchObj;
};
/**
 * 对象序列化为url查询参数
 * @param queryObj 查询对象
 * @param isEncode 是否编码
 * @return {string}
 */

export var urlQueriesSerialize = function urlQueriesSerialize(queryObj, isEncode) {
  if (isEncode === void 0) {
    isEncode = false;
  }

  if (!isPlainObject(queryObj)) {
    throw new Error('argument must be an object');
  }

  var query = '';
  Object.keys(queryObj).forEach(function (key) {
    if (queryObj[key] || queryObj[key] == '0') {
      query += "&" + key + "=" + queryObj[key];
    }
  });
  return isEncode ? "?" + encodeURIComponent(query.slice(1)) : "?" + query.slice(1);
};
/**
 * url地址合并为一个地址
 * @param args 多个路径，支持不同的相对层级
 * @return {string} 完整的url地址
 */

export var urlJoin = function urlJoin() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.join('/').replace(/[/]+/g, '/').replace(/^(.+):\//, '$1://').replace(/^file:/, 'file:/').replace(/\/(\?|&|#[^!])/g, '$1').replace(/\?/g, '&').replace('&', '?');
}; // url地址拼接

export var urlConcat = function urlConcat(txt) {
  return "https://git.finchina.com/hf-develop/web/1/vue_group/blob/master/app%E7%BB%84%E4%BB%B6%E6%96%87%E6%A1%A3/app_document/src/markdown/" + txt + ".md";
};
export var contains = function contains(arrays, obj) {
  var i = arrays.length;

  while (i--) {
    if (arrays[i] === obj) {
      return i;
    }
  }

  return false;
};