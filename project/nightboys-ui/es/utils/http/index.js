import _extends from "@babel/runtime/helpers/esm/extends";
import Vue from 'vue';
import { Modal } from './modal';
import $ from 'webpack-zepto';

var isPlainObject = function isPlainObject(o) {
  return o && Object.prototype.toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
};

var urlQueriesSerialize = function urlQueriesSerialize(queryObj) {
  if (!isPlainObject(queryObj)) {
    throw new TypeError('[HTTP ERROR]:argument must be an object');
  }

  var query = '';
  Object.keys(queryObj).forEach(function (key) {
    if (queryObj[key]) {
      query += "&" + key + "=" + queryObj[key];
    }
  });
  return "?" + query.slice(1);
}; // 请求队列


var requestsQueue = [];

var resetNext = function resetNext(action, params) {
  return function () {
    var key = http.makePageParams(action, params);
    requestsQueue[key] && delete requestsQueue[key];
  };
}; // 禁止直接调用


var _request = function _request(_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      action = _ref.action,
      _ref$params = _ref.params,
      params = _ref$params === void 0 ? {} : _ref$params,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      _ref$configs = _ref.configs,
      configs = _ref$configs === void 0 ? {} : _ref$configs,
      _ref$_isNext = _ref._isNext,
      _isNext = _ref$_isNext === void 0 ? false : _ref$_isNext;

  if (!action) {
    throw new TypeError('[HTTP ERROR]:action传递错误"');
  }

  if (typeof action !== 'string') {
    if (isPlainObject(action)) {
      var _headers = action.headers,
          _action = action.action,
          _params = action.params,
          _isNext2 = action._isNext;
      return _request({
        method: method,
        action: _action,
        params: _params,
        headers: _headers,
        configs: configs,
        _isNext: _isNext2
      });
    }

    throw new TypeError("[HTTP ERROR]:action\u4F20\u9012\u9519\u8BEF\uFF0C\u4F60\u4F20\u9012\u7684action\u4E3A\"" + JSON.stringify(action) + "\"");
  }

  var requestQueueKey = action + urlQueriesSerialize(params);
  var alertMethod = this instanceof Vue ? this.$alert : Vue.alert;
  return new Promise(function (resolve, reject) {
    var xhr = $.ajax(_extends({
      url: action,
      type: method,
      data: params,
      headers: headers
    }, _extends({}, {
      timeout: 60000
    }, configs), {
      success: function success(res) {
        var _ref2 = typeof res !== 'object' ? JSON.parse(res) : res,
            info = _ref2.info,
            returncode = _ref2.returncode;

        if (returncode !== 0) {
          try {
            // console.error(info);
            if (returncode === 202
            /* 无权限 */
            ) {
              alertMethod({
                message: info,
                title: '提示',
                confirmButtonText: '提升等级',
                cancelButtonText: '稍后设置',
                showCancelButton: true,
                buttonType: 'link',
                confirmLink: location.origin + '/finchinaAPP/rights_and_interests.html' + location.search,
                beforeClose: function beforeClose(action, instance, done, event) {
                  if (action === 'confirm') {// todo 确认按钮跳转
                  } else if (action === 'cancel') {
                    // todo 取消按钮操作
                    event.preventDefault();
                  } // 调用以往下执行


                  done();
                }
              });
            } else if (returncode === 500
            /* 服务器错误 */
            ) {
              alertMethod({
                message: info,
                title: '提示',
                confirmButtonText: '我知道了'
              });
            }
          } catch (e) {
            return reject(e);
          }

          return resolve(res); //reject(typeof res !== 'object' ? JSON.parse(res) : res);
        } else {
          _isNext ? resolve(_extends({}, res, {
            __resetNext: resetNext(action, params)
          })) : resolve(res);
        }
      },
      error: function error(err) {
        reject(err);
        console.error("[HTTP ERROR]:action\u8BF7\u6C42\u5931\u8D25: " + location.origin + "/" + action + urlQueriesSerialize(params));
      },
      complete: function complete() {
        var currentRequestIndex = requestsQueue.findIndex(function (request) {
          return request.key === requestQueueKey;
        });
        currentRequestIndex > -1 && requestsQueue.splice(currentRequestIndex, 1);
      }
    }));
    requestsQueue.push({
      key: requestQueueKey,
      request: xhr
    });
  });
};

export var http = /*#__PURE__*/function () {
  function http() {}

  /**
  * 组合请求地址
  * @param action
  * @param options
  * @returns {string}
  */
  http.baseRequestUrl = function baseRequestUrl(action, options) {
    return apiBaseUrl + "/" + (action + urlQueriesSerialize(options));
  };

  http.makePageParams = function makePageParams(action, params) {
    var key = action + urlQueriesSerialize(params);

    if (!this.requestPageQueue[key]) {
      this.requestPageQueue = {};
      this.requestPageQueue[key] = {
        skip: 0,
        pagesize: 15,
        hasError: false
      };
    }

    return key;
  };

  http.get = function get(action, params, headers, _isNext) {
    return _request.call(this, {
      method: 'GET',
      action: action,
      params: params,
      headers: headers,
      configs: http.options,
      _isNext: _isNext
    });
  };

  http.post = function post(action, params, headers) {
    return _request.call(this, {
      method: 'POST',
      action: action,
      params: params,
      headers: headers,
      configs: http.options
    });
  };

  http.httpDelete = function httpDelete(action, params, headers) {
    return _request.call(this, {
      method: 'DELETE',
      action: action,
      params: params,
      headers: headers,
      configs: http.options
    });
  };

  http.put = function put(action, params, headers) {
    return _request.call(this, {
      method: 'PUT',
      action: action,
      params: params,
      headers: headers,
      configs: http.options
    });
  };

  http.nextPage = function nextPage(action, params, headers) {
    var key = http.makePageParams(action, params);
    var _http$requestPageQueu = http.requestPageQueue[key],
        skip = _http$requestPageQueu.skip,
        pagesize = _http$requestPageQueu.pagesize,
        sendOpts = {};

    _extends(sendOpts, params, {
      skip: skip,
      pagesize: pagesize
    });

    _extends(http.requestPageQueue[key], {
      skip: skip + pagesize
    });

    return this[this instanceof Vue ? '$get' : 'get'](action, sendOpts, headers, true);
  };

  http.all = function all(requests) {
    var _this = this;

    if (!Array.isArray(requests)) {
      throw new TypeError("[HTTP ERROR]:requests\u53C2\u6570\u5FC5\u987B\u4E3A\u4E00\u4E2A\u6570\u7EC4\uFF0C\u4F60\u4F20\u9012\u7684\u4E3A" + JSON.stringify(requests));
    }

    return Promise.all(requests.map(function (request) {
      if (request instanceof Promise) {
        return request;
      } else {
        var action = request.action,
            params = request.params,
            headers = request.headers;
        return _this[_this instanceof Vue ? '$get' : 'get'](action, params, headers);
      }
    }));
  };

  http.race = function race(requests) {
    var _this2 = this;

    if (!Array.isArray(requests)) {
      throw new TypeError("[HTTP ERROR]:requests\u53C2\u6570\u5FC5\u987B\u4E3A\u4E00\u4E2A\u6570\u7EC4\uFF0C\u4F60\u4F20\u9012\u7684\u4E3A" + JSON.stringify(requests));
    }

    return Promise.race(requests.map(function (request) {
      if (request instanceof Promise) {
        return request;
      } else {
        var action = request.action,
            params = request.params,
            headers = request.headers;
        return _this2[_this2 instanceof Vue ? '$get' : 'get'](action, params, headers);
      }
    }));
  } // 中断当前未完成的request请求
  ;

  http.abort = function abort() {
    requestsQueue.forEach(function (_ref3) {
      var action = _ref3.action,
          request = _ref3.request;
      console.warn("[HTTP WARN]:action: " + action + "\u8BF7\u6C42\u88AB\u4E2D\u65AD");
      request.$abort();
    });
  };

  http.install = function install(Vue, options) {
    _extends(this.options, options);

    Vue.use(Modal);
    /**
     * 发起get请求
     * @param action action地址
     * @param params 请求参数
     * @param headers header头信息
     */

    Vue.prototype.$get = this.get; // 同上

    Vue.prototype.$post = this.post; // 同上 防止与$delete命名冲突

    Vue.prototype.$httpDelete = this.httpDelete; // 同上

    Vue.prototype.$put = this.put; // 分页请求

    Vue.prototype.$nextPage = this.nextPage;
    /**
     * 一次同时发起多个请求
     * @param requests 请求数组 包含{action, options, headers}三个选项
     * @return {Promise<any[]>}
     */

    Vue.prototype.$all = this.all;
    /**
     * 以race方式发起多个请求
     * @param requests 请求数组 包含{action, options, headers}三个选项
     * @return {Promise<any>}
     */

    Vue.prototype.$race = this.race; // 中断当前未完成的request请求

    Vue.prototype.$abort = this.abort;
  };

  return http;
}();
http.options = {};
http.requestPageQueue = {};
export default http;