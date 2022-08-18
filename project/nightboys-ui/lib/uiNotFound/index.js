"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _images = _interopRequireDefault(require("./js/images"));

require("./index-sfc.css");

/**
 * @property {String} type 缺省类型
 * @property {Function} reloadHTML 重新加载页面方法 仅load-fail类型有用
 * @property {Function} addMembers 添加组内成员方法 仅no-group-member类型有用
 */
var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": "default-comp"
    }
  }, [_c('img', {
    staticClass: "default-img",
    class: _vm.type + '-img',
    attrs: {
      "src": _vm.getImgByType
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "default-msg",
    class: _vm.type + '-msg',
    on: {
      "click": _vm.filterClickEvent
    }
  }, [_vm._t("default", function () {
    return [_c('div', {
      domProps: {
        "innerHTML": _vm._s(_vm.htmlMsg)
      }
    })];
  })], 2)]);
};

var __vue_staticRenderFns__ = [];
var _default2 = {
  _scopeId: 'data-v-fccf35c4',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'uiNotFound',
  props: {
    type: {
      type: String,
      default: 'no-data'
    },
    reloadHTML: {
      type: Function,
      default: function _default() {
        console.log('刷新页面');
      }
    },
    addMembers: {
      type: Function,
      default: function _default() {
        console.log('添加成员');
      }
    }
  },
  data: function data() {
    return {
      htmlMsg: ''
    };
  },
  methods: {
    filterClickEvent: function filterClickEvent(e) {
      var type = e.target.getAttribute('data-type');
      if (!type) return;

      switch (type) {
        case 'load-fail':
          this.reloadHTML();
          break;

        case 'no-group-member':
          this.addMembers();
          break;
      }
    }
  },
  computed: {
    getImgByType: function getImgByType() {
      switch (this.type) {
        case 'no-data':
          this.htmlMsg = '暂无相关数据';
          break;

        case 'no-msg':
          this.htmlMsg = '暂无任何消息通知';
          break;

        case 'load-fail':
          this.htmlMsg = '页面加载失败<br />请重新 <span class="span-a" data-type="load-fail">刷新页面</span>';
          break;

        case 'no-network':
          this.htmlMsg = '网络已断开,请检查网络设置';
          break;

        case 'no-filter-data':
          this.htmlMsg = '此筛选条件下无结果,<br />请重新筛选';
          break;

        case 'no-search-data':
          this.htmlMsg = '没有搜索结果？<a href="fcnews://chat/feedback">点击反馈</a>';
          break;

        case 'no-group-member':
          this.htmlMsg = '组合内暂无成员,请添加成员<br /><button @click="addMembers" data-type="no-group-member">添加成员</button>';
          break;

        case 'no-collection':
          this.htmlMsg = '暂无收藏记录';
          break;

        case 'in-developing':
          this.htmlMsg = '披星戴月开发中,敬请期待!';
          break;

        case 'have-deleted':
          this.htmlMsg = '此资讯已被删除';
          break;

        case 'no-authority':
          this.htmlMsg = '暂无估值查看权限';
          break;

        case 'have-cancelled':
          this.htmlMsg = '该企业已经注销无信息';
          break;

        case 'have-default':
          this.htmlMsg = '此债券已违约,无信息';
          break;

        case 'have-expired':
          this.htmlMsg = '此债券已到期,无信息';
          break;
      } // return require(`./images/${this.type}.png`);


      return _images.default[this.type];
    }
  }
};
exports.default = _default2;