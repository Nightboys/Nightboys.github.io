import _extends from "@babel/runtime/helpers/esm/extends";

var _this = this;

/**
 * @author Leevare Email:liwei2@finchina.com
 * @date 2019/4/4 11:36
 * @description APP内部功能调用函数封装，更多详细配置信息介绍见SVN相关文档说明
 */
import { removeObjectNil } from './utils';
import { urlQueriesSerialize } from './urls'; // 是否ios

export var isIOS = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // 是否全面屏ios(针对iphoneX之后机型)

export var isIphonex = function isIphonex() {
  if (typeof window !== 'undefined' && window) {
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
  }

  return false;
}; // 全面屏ios底部安全距离设置(针对iphoneX之后机型)

export var safeAreaInsetBottom = function safeAreaInsetBottom() {
  var result = 0;

  if (typeof window !== 'undefined' && window) {
    if (/iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812) {
      result = 34; //全面屏底部安全距离高度
    }
  }

  return result;
};
/**
 * 预加载
 * @param url webview中页面的地址，相对于"https://appdev.finchina.com/finchinaAPP/"路径下
 */

export var appPreLoad = function appPreLoad(url) {
  location = "https://ari.finchina.com/finchinaAPP/OpenLeftDraw?link=" + encodeURIComponent(url);
};
/* eslint-disable */

/**
 * 展开左侧嵌套webview，同左侧树菜单
 * @param {String} url webview中页面的地址，相对于"https://appdev.finchina.com/finchinaAPP/"路径下
 */

export var appOpenLeftWindow = function appOpenLeftWindow(url) {
  try {
    window.jsi.isShowSideslip(url, true);
  } catch (e) {}

  try {
    webkit.messageHandlers.isShowSideslip.postMessage({
      url: url,
      isShow: true
    });
  } catch (e) {}
};
export var getAppFrom = function getAppFrom() {
  var appFrom = window.appType;

  try {
    appFrom = window.jsi.getAppType();
  } catch (e) {}

  return appFrom;
};
/**
 * 头部收缩与展开
 * @param {Boolean} isCollapse 是否收起 true：收起，false：展开
 */

export var appCollapse = function appCollapse(isCollapse) {
  try {
    webkit.messageHandlers.setStick.postMessage(isCollapse);
  } catch (e) {}

  try {
    window.jsi.setStick(isCollapse);
  } catch (e) {}
};
/* eslint-enable */

/**
 * app弹窗
 * @param {String} title 标题
 * @param {String} message 描述文字
 * @param {String} okname 确定按钮文字
 * @param {String} cancelname 取消按钮名字
 * @param {String} oklink 确认事件链接
 * @param {String} cancellink 取消事件链接
 */

export var appAlert = function appAlert(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      title = _ref.title,
      message = _ref.message,
      okname = _ref.okname,
      cancelname = _ref.cancelname,
      oklink = _ref.oklink,
      cancellink = _ref.cancellink;

  location = "fcnews://alert" + urlQueriesSerialize(removeObjectNil({
    title: title,
    message: message,
    okname: okname,
    cancelname: cancelname,
    oklink: oklink,
    cancellink: cancellink
  }));
};
/**
 * * 组合web页面
 * @param {String} title 页面标题
 * @param {String} subTitle 页面子标题
 * @param {String} placeholder 搜索框的placeholder
 * @param {Array} datas 页面数组
 * [
 *   {url: "test0.html",  "name": "test0"},
 *   {"url": "test1.html",  "name": "test1"}
 * ]
 * 打开页面时，会把user, token以url参数的形式传给页面
 * @param {Number} selectedIndex 默认选中的页面索引
 * @param {Number} hideTopView （默认是0）	是否隐藏topView
 * @param {Number} hideSearch （默认是1）  是否隐藏搜索框
 * @param {String} searchResultLink 如果有搜索框，传值不为空时，搜索内容时，会弹出此页面，作为键盘宝页面，点击键盘宝页面搜索结果，传参给主页面。
 * @param {String} helpLink 帮助链接
 */

export var appCombinePage = function appCombinePage(_temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      title = _ref2.title,
      subTitle = _ref2.subTitle,
      placeholder = _ref2.placeholder,
      datas = _ref2.datas,
      selectedIndex = _ref2.selectedIndex,
      _ref2$hideTopView = _ref2.hideTopView,
      hideTopView = _ref2$hideTopView === void 0 ? 0 : _ref2$hideTopView,
      _ref2$hideSearch = _ref2.hideSearch,
      hideSearch = _ref2$hideSearch === void 0 ? 1 : _ref2$hideSearch,
      searchResultLink = _ref2.searchResultLink,
      helpLink = _ref2.helpLink,
      exportData = _ref2.exportData;

  location = "fcnews://websPage" + urlQueriesSerialize(removeObjectNil({
    title: title,
    subTitle: subTitle,
    placeholder: placeholder,
    datas: datas ? encodeURIComponent(JSON.stringify(datas)) : null,
    selectedIndex: selectedIndex,
    hideSearch: hideSearch,
    hideTopView: hideTopView,
    searchResultLink: searchResultLink,
    helpLink: helpLink,
    exportData: exportData
  }));
};
/**
 * 组合web页面集合
 * @param {Number} index 选中的索引
 * @param {Array} datas 页面数组(和组合web页面数据结构一致)
 */

export var appCombinePages = function appCombinePages(index, datas) {
  if (datas === void 0) {
    datas = [];
  }

  location = "fcnews://websPageGroup?selectedIndex=" + index + "&datas=" + encodeURIComponent(JSON.stringify(datas));
};
/**
 * 选中页面搜索结果
 * @param {String} text searchBar展示文字
 * @param result 回传给页面的搜索关键词
 */

export var appSelectSearchResult = function appSelectSearchResult(text, result) {
  location = "fcnews://searchSelectedHandler?" + urlQueriesSerialize(removeObjectNil({
    text: text,
    result: result
  }));
};
/**
 * 研究报告
 * @param {String} seminarCodes 研究报告分类组合id，可为空，为空时跳转到研究报告主页面
 */

export var appResearchReport = function appResearchReport(seminarCodes) {
  if (seminarCodes === void 0) {
    seminarCodes = '';
  }

  location = "fcnews://researchReport?seminarCodes=" + seminarCodes;
}; // 扫描二维码

export var appScanQRCode = function appScanQRCode() {
  location = 'fcnews://qrcodeScan';
};
/**
 * 打开网页
 * @param {String} link 页面地址，打开页面标题为网页的标题
 */

export var appOpenPage = function appOpenPage(link) {
  if (link === void 0) {
    link = '';
  }

  location = "fcnews://webviewPage?link=" + link;
}; // 原生搜索框内容

export var appSetSearchBarText = function appSetSearchBarText(text) {
  if (text === void 0) {
    text = '';
  }

  location = "fcnews://setSearchBarText?text=" + text;
}; // 意见反馈

export var appFeedback = function appFeedback(txt) {
  if (txt === void 0) {
    txt = '';
  }

  location = "fcnews://chat/feedback?text=" + txt;
}; // 签到

export var appCheckIn = function appCheckIn() {
  location = 'https://ari.finchina.com/finchinaAPP/checkIn';
}; // 搜新闻

export var appSearchNews = function appSearchNews() {
  location = 'https://ari.finchina.com/finchinaAPP/newsSearch';
}; // 搜公告

export var appSearchAnnouncement = function appSearchAnnouncement() {
  location = 'https://ari.finchina.com/finchinaAPP/noticeSearch';
}; // 查关系

export var appSearchRelationship = function appSearchRelationship() {
  location = 'https://ari.finchina.com/finchinaAPP/relationshipSearch';
}; // 查受益所有人

export var appSearchBeneficiary = function appSearchBeneficiary() {
  location = 'https://ari.finchina.com/finchinaAPP/profitSearch';
}; // 版本检测

export var appCheckVersion = function appCheckVersion() {
  location = 'https://ari.finchina.com/finchinaAPP/checkLasterVersion';
};
/* eslint-disable */
// 获取原始版本号，如v3.4.1

export var appGetVersion = function appGetVersion() {
  var appVersion = window.appVersion;

  try {
    appVersion = window.jsi.appVersion();
  } catch (e) {}

  return appVersion;
};
/* eslint-enable */
// 获取版本号数值，如3.41

export var appGetVersionNumber = function appGetVersionNumber() {
  var versionNumber;

  if (_this.appVersion) {
    var version = _this.appVersion.replace(/[a-zA-Z]*(.+)/, '$1');

    var index = version.indexOf('.');

    if (index > -1) {
      version = version.substring(0, index) + '.' + version.substr(index).replace(/\./g, '');
    }

    versionNumber = parseFloat(version);
  }

  return versionNumber && !Number.isNaN(versionNumber) ? versionNumber : 0;
};
/* eslint-disable */
//发送当前查询后台接口参数至APP

export var sendCondition = function sendCondition(condition) {
  var strCondtion = JSON.stringify(condition);

  try {
    webkit.messageHandlers.downloadCondition.postMessage(strCondtion);
  } catch (e) {}

  try {
    window.jsi.downloadCondition(strCondtion);
  } catch (e) {}
};
/* eslint-enable */
//隐藏/显示全屏回退按钮

export var hideBackBtn = function hideBackBtn(hide) {
  /* eslint-disable */
  try {
    window.jsi.needHideBackBtn(hide);
  } catch (e) {}

  try {
    webkit.messageHandlers.needHideBackBtn.postMessage(hide);
  } catch (e) {}
  /* eslint-disable */

}; //跳转到f9对应公司或个人

export var goToF9Detail = function goToF9Detail(_ref3) {
  var name = _ref3.name,
      id = _ref3.id,
      type = _ref3.type;
  var url = "fcnews://item?id=" + id + "&type=" + type + "&name=" + name;
  console.log('f9跳转===', url);
  window.open(url);
}; //红点舆情

export var redNews = function redNews(redNewList, code) {
  location.href = "fcnews://itemsNews?codes=" + JSON.stringify(redNewList) + "&selectedCode=" + code;
};
/*
app中f9页面跳转
url参考  https://192.168.100.188/svn/FC_APP/开发相关/配置/F9树配置.xls
如 'https://ari.finchina.com/finchinaAPP/f9/companyTree/3000/3017/3018?type=company&code=5435433543'
 */

/*个人中心分享出去的黄金权限页面点击立即领取回填邀请码，邀请码invitecode需要原生捕获后加在url上获取，
如：window.location =
  (this.isIOS9() ? 'https' : 'fcnews') +
  '://ari.finchina.com/finchinaAPP/personal_center/receiveGold?invitecode=AE46TZ15&&channelCode=1'
 */

/*个人中心至尊权限分享出去的钻石权限页面点击立即领取回填尊享卡密码，尊享卡密码password，
卡是体验卡还是尊享卡的cardType（supreme||experiment）需要原生捕获后加在url上获取，
如：window.location =
        (this.isIOS9() ? 'https' : 'fcnews') +
        '://ari.finchina.com/finchinaAPP/personal_center/share?password=12RE67ahTY89H4ds&cardType=supreme&channelCode=1';
 */

/*app活动分享
 *jumpPage,要跳转页面的相对地址，如：receiveGiftDiamond.html
 *shareTypes，分享类型，如：qq,wechat,copylink,dingding,browser,wechatgroup
 * title，活动分享出去在第三方软件展示的标题
 * content，活动分享出去在第三方软件展示的内容
 */

export var shareActivity = function shareActivity(opts) {
  opts = _extends({
    url: location.href,
    image: 'https://app.finchina.com/finchinaAPP/static/logo.png',
    title: '企业预警通-给你最省心的风控体验',
    content: '看预警信息，用企业预警通。数十万金融专业人士都在用的App'
  }, opts);
  var shareInfo = "dzh://shareActivity?url=" + encodeURIComponent(opts.url) + "&image=" + opts.image + "&title=" + opts.title + "&content=" + opts.content;
  if (opts.shareTypes) shareInfo += "&shareInfo=" + opts.shareTypes;
  return shareInfo;
}; // export const shareActivity = (jumpPage, shareTypes, otherParams, title, content) => {
//   let arr = location.href.split('/');
//   arr.pop();
//   arr.push(jumpPage);
//
//   let shareInfo =
//     'dzh://shareActivity?shareTypes=' +
//     shareTypes +
//     '&url=' +
//     encodeURIComponent(arr.join('/') + '?' + otherParams) +
//     '&image=' +
//     encodeURIComponent(location.origin + '/finchinaAPP/static/logo.png') +
//     '&title=' +
//     title +
//     '&content=' +
//     content;
//
//   return shareInfo;
// };
//原生弹窗，框内图标是小图标

export var appModalAlert1 = function appModalAlert1(_ref4) {
  var _ref4$title = _ref4.title,
      title = _ref4$title === void 0 ? '' : _ref4$title,
      _ref4$iconUrl = _ref4.iconUrl,
      iconUrl = _ref4$iconUrl === void 0 ? '' : _ref4$iconUrl,
      _ref4$message = _ref4.message,
      message = _ref4$message === void 0 ? '' : _ref4$message,
      _ref4$buttons = _ref4.buttons,
      buttons = _ref4$buttons === void 0 ? [] : _ref4$buttons;
  var str = JSON.stringify({
    title: title,
    iconUrl: iconUrl,
    message: message,
    buttons: buttons
  });

  try {
    webkit.messageHandlers.Alert1.postMessage(str);
  } catch (e) {}

  try {
    window.jsi.Alert1(str);
  } catch (e) {}
}; //原生弹窗，框内图标是大图标

export var appModalAlert2 = function appModalAlert2(_ref5) {
  var _ref5$title = _ref5.title,
      title = _ref5$title === void 0 ? '' : _ref5$title,
      _ref5$iconUrl = _ref5.iconUrl,
      iconUrl = _ref5$iconUrl === void 0 ? '' : _ref5$iconUrl,
      _ref5$message = _ref5.message,
      message = _ref5$message === void 0 ? '' : _ref5$message,
      _ref5$buttons = _ref5.buttons,
      buttons = _ref5$buttons === void 0 ? [] : _ref5$buttons;
  var str = JSON.stringify({
    title: title,
    iconUrl: iconUrl,
    message: message,
    buttons: buttons
  });

  try {
    webkit.messageHandlers.Alert2.postMessage(str);
  } catch (e) {}

  try {
    window.jsi.Alert2(str);
  } catch (e) {}
};
/* eslint-disable */

/**
 * 设置标题
 * @param str 为标题名称
 */

export var setTitle = function setTitle(str) {
  // let title = str;
  // if (typeof str === 'Object') title = str.title + (str.subTitle ? ` ${str.subTitle}` : '');
  // document.getElementsByTagName('title')[0].innerHTML = title;
  try {
    webkit.messageHandlers.setTitle.postMessage(str);
  } catch (e) {}

  try {
    window.jsi.setTitle(str);
  } catch (e) {}
};
/* eslint-enable */

/* eslint-disable */
//android 获取状态栏高度

export var statusBarHeight = function statusBarHeight() {
  var result = window.statusBarHeight || 0; // if(isIOS) {
  //   result = 20;
  //   if(isIPhoneX || isIPhoneXSMax || isIPhoneXR) result = 44;
  // }
  // try {
  //   result = parseFloat(window.jsi.statusBarHeight()) / window.devicePixelRatio;
  // } catch (e) {}

  try {
    if (isIOS) {
      result = window.fc.getStatusBarHeight();
    } else {
      result = parseFloat(window.fc.getStatusBarHeight()) / window.devicePixelRatio;
    }
  } catch (e) {}

  return result;
}; //android 获取标题栏高度

export var titleBarHeight = function titleBarHeight() {
  var result = 44; // try {
  //   result = parseFloat(window.jsi.titleBarHeight()) / window.devicePixelRatio;
  // } catch (e) {}

  try {
    if (!isIOS) {
      result = parseFloat(window.fc.getNavigationBarHeight()) / window.devicePixelRatio;
    }
  } catch (e) {}

  return result;
};
/* eslint-enable */
//跳转到查关系页面

export var gotoRelationLink = function gotoRelationLink(_ref6) {
  var from = _ref6.from,
      to = _ref6.to,
      fromType = _ref6.fromType,
      toType = _ref6.toType;
  location = "fcnews://relationshipMap?from=" + from + "&fromtype=" + fromType + "&to=" + to + "&totype=" + toType;
};
/* eslint-disable */

/**
 * 设置是否禁用app上推效果
 * @param str 为标题名称
 */

export var forbidAppPushUp = function forbidAppPushUp(isForbid) {
  try {
    webkit.messageHandlers.forbidScroll.postMessage(isForbid);
  } catch (e) {}

  try {
    window.jsi.forbidScroll(isForbid);
  } catch (e) {}
};
/* eslint-enable */

/* eslint-disable */
//设置原生标题

export var setTitleBar = function setTitleBar(opts) {
  //opts = {
  //   "showTitleBar": true,
  //   "backgroundColor": "#78828D",
  //   "title": {
  //     "text": "主标题",
  //     "color": "#78828D"
  //   },
  //   "subTitle": {
  //     "text": "副标题",
  //     "color": "#78828D"
  //    }
  // }
  var str = JSON.stringify(opts);

  try {
    window.jsi.setTitleBar(str);
  } catch (e) {}

  try {
    webkit.messageHandlers.setTitleBar.postMessage(str);
  } catch (e) {}
};
/* eslint-enable */

/* eslint-disable */
//设置原生标题左侧菜单

export var setLeftMenu = function setLeftMenu(opts) {
  //opts = [{
  //
  //  "linkUrl": "",//优先判断该字段
  //  "callBack": "",//如果linkUrl为空，则再判断该字段
  //   "imageUrl": "",//按钮优先使用图片
  //   "text": "按钮文字",//如果imageUrl为空，则使用文字
  //   "color": "#78828D"
  // }]
  var str = JSON.stringify(opts);

  try {
    window.jsi.setLeftMenu(str);
  } catch (e) {}

  try {
    webkit.messageHandlers.setLeftMenu.postMessage(str);
  } catch (e) {}
};
/* eslint-enable */

/* eslint-disable */
//设置原生标题右侧菜单

export var setRightMenu = function setRightMenu(str) {
  console.log('设置原生标题右侧菜单');

  try {
    console.log('window.jsi');
    window.jsi.setRightMenu(str);
  } catch (e) {
    console.log('window.jsi.setRightMenu');
    console.log(e);
  }

  try {
    webkit.messageHandlers.setRightMenu.postMessage(str);
  } catch (e) {
    console.log('webkit.messageHandlers.setRightMenu');
    console.log(e);
  }
};
/* eslint-enable */

/* eslint-disable */
//发送超长参数至APP，解决传递超长字符串的问题
//使用 let eventName = queryClob({
//  url,
//  params: {},
// }, this)
// this.$on(eventName, res => {...})

function getTempName() {
  return 'finchinaAPP_' + Math.random().toString().split('.')[1];
}

export var queryClob = function queryClob(data, self) {
  var name = getTempName();

  window[name] = function (res) {
    self.$root.$emit(name, res);
    delete window[name];
  };

  data = $.extend({
    method: 'POST',
    callback: name,
    url: '',
    params: {}
  }, data);
  if (data.url.indexOf('http') !== 0) data.url = location.origin + data.url;
  var dataStr = JSON.stringify(data);

  try {
    window.jsi.request(dataStr);
  } catch (e) {}

  try {
    webkit.messageHandlers.request.postMessage(dataStr);
  } catch (e) {}

  try {
    webkit.request(dataStr);
  } catch (e) {}

  return name;
};
/* eslint-enable */
//去掉橡皮精设置

export var isBounceEnable = function isBounceEnable(isEnable) {
  /* eslint-disable */
  try {
    webkit.messageHandlers.isBounceEnable.postMessage(isEnable);
  } catch (error) {}

  try {
    window.jsi.isBounceEnable(isEnable);
  } catch (e) {}
  /* eslint-disable */

}; // 获取APP版本号

export var getAppVersion = function getAppVersion() {
  // v5.7.0.4853
  if (!appGetVersion()) return 0;
  var appVersion = appGetVersion(),
      version = appVersion.replace(/[a-zA-Z]*(.+)/, '$1'),
      index = version.indexOf('.'),
      versionNumber;

  if (index > -1) {
    version = version.substring(0, index) + '.' + version.substr(index).replace(/\./g, '');
  }

  versionNumber = parseFloat(version);
  return versionNumber && !Number.isNaN(versionNumber) ? versionNumber : 0;
}; //发送横竖屏设置

export var viewChange = function viewChange(isLandscape) {
  try {
    console.log('触发啦');
    webkit.messageHandlers.changeView.postMessage(isLandscape);
  } catch (error) {}

  try {
    window.jsi.changeView(isLandscape);
  } catch (e) {}
}; //页面上推导航头设置

export var scrollChangeNavigate = function scrollChangeNavigate(isScroll) {
  try {
    webkit.messageHandlers.setStick.postMessage(isScroll);
  } catch (e) {}

  try {
    window.jsi.setStick(isScroll);
  } catch (e) {}
};
/**
 * app免登陆
 * @param isLogin 用户登录状态
 * @param title 标题
 * @param message 描述文字
 * @param okname 确定按钮文字
 * @param cancelname 取消按钮名字
 * @param oklink 确认事件链接
 * @param cancellink 取消事件链接
 * @param successBack 登录成功回调
 */

window.isLogin = false; //当前是否已登录，默认false

export var appDoLogin = function appDoLogin(_ref7) {
  var successBack = _ref7.successBack;
  var params = {
    success: function success(res) {
      window.isLogin = true;
      console.log('登录成功回调==', res); // * 1：APP未登录，打开登录页面，执行登录流程
      // * 0: APP已登录，success回调函数返回成功信息

      successBack && successBack(res); //登录成功，继续执行下一步操作
    },
    fail: function fail(res) {// console.log('登录失败回调==', res);
    },
    complete: function complete(res) {// console.log('登录接口调用结束回调==', res);
    }
  }; // 版本判断

  if (getAppVersion() >= 5.7 && !window.isLogin) {
    window.fc.login(params);
  } else {
    successBack && successBack({
      code: 2
    }); //兼容<=5.7
  }
}; // 图片上传

export var uploadImg = function uploadImg(data, self) {
  var name = getTempName();

  window[name] = function (res) {
    try {
      res = JSON.parse(res);
    } catch (e) {}

    self.$emit(name, res);
    delete window[name];
  };

  data = $.extend({
    callback: name,
    url: '',
    params: {}
  }, data);
  var temp = $.extend(true, {}, data);
  delete temp.filedata;
  if (data.url.indexOf('http') !== 0) data.url = location.origin + data.url;
  var dataStr = JSON.stringify(data);

  try {
    window.jsi.upload(dataStr);
  } catch (e) {}

  try {
    webkit.messageHandlers.upload.postMessage(dataStr);
  } catch (e) {}

  try {
    webkit.upload(dataStr);
  } catch (e) {}

  return name;
};
/*
 * 图片压缩
 * @file:{
 *     content:'', //文件路径
 *     file:{
 *       size: 10000,
 *       name: '1.png',
 *       type: 'image/png'
 *     }
 *  }
 */

export var compressImg = function compressImg(file, callback) {
  // 大于5MB的jpeg和png图片都缩小像素上传
  if (/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 5120000) {
    // 创建Canvas对象(画布)
    var canvas = document.createElement('canvas'); // 获取对应的CanvasRenderingContext2D对象(画笔)

    var context = canvas.getContext('2d'); // 创建新的图片对象

    var img = new Image(); // 指定图片的DataURL(图片的base64编码数据)

    img.src = file.content; // 监听浏览器加载图片完成，然后进行绘制

    img.onload = function () {
      // 指定canvas画布大小，该大小为最后生成图片的大小
      canvas.width = 400;
      canvas.height = 300;
      /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。*/

      /* 如果不指定缩小的像素，图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后得到的图片就是张局部图。图片小于画布就会有黑边。*/

      context.drawImage(img, 0, 0, 400, 300); // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量

      file.content = canvas.toDataURL(file.file.type, 0.92); // 最后将base64编码的图片保存到数组中，留待上传。

      callback(file);
    };
  } else {
    // 不做处理的jpg和png以及gif直接保存到数组
    callback(file);
  }
};
/* 生命周期回调函数 */

export var appPage = function appPage(opts) {
  if (opts === void 0) {
    opts = {
      onShow: function onShow() {
        console.log('监听页面显示====');
      },
      //监听页面显示v5.8.0
      onHide: function onHide() {
        console.log('监听页面隐藏====');
      },
      //监听页面隐藏v5.8.0
      onExport: function onExport() {},
      //页面导出数据时触发v5.8.0
      onTitleTap: function onTitleTap() {} //原生标题栏点击事件回调v6.0.0

    };
  }

  // 版本判断
  if (getAppVersion() >= 6.0) {
    try {
      console.log('app版本号：' + getAppVersion());
      window.page = new Page(opts);
    } catch (error) {
      console.log('Page原生API调用失败');
    }
  } else {
    console.log('版本过低，请升级至v5.8.0版本以上');
  }
};
/* 使用原生的http组件转发请求 */

export var requestNative = function requestNative(requestData) {
  if (requestData === void 0) {
    requestData = {// "url": "",
      // "params": {
      //   "key1": "value1",
      //   "key2": "value2"
      // },
      // "method": "POST",
      // "callback": 'functionName' //方法名，使用window.funtionName声明全局变量，下同
    };
  }

  try {
    window.jsi.request(JSON.stringify(requestData));
  } catch (e) {}

  try {
    webkit.messageHandlers.request.postMessage(JSON.stringify(requestData));
  } catch (e) {}
};
/* js唤起原生弹框（支持html格式内容作为弹框内容显示） */

export var alertNative = function alertNative(opts) {
  var configData = {
    style: 'v1',
    title: "<span class=\"font-size: 18px;font-family: PingFangSC, PingFangSC-Medium;font-weight: bold;color: #000000;line-height: 21px;\">\u63D0\u793A</span>",
    message: '支持纯字符串、html',
    iconUrl: '',
    //弹框顶部图片
    //权限系统弹框无图片链接时使用默认图片
    showImage: false,
    showCloseButton: false,
    buttonDirection: 'row',
    //row、column
    textAlignment: 'left',
    //center居中(默认); left左对齐; right右对齐
    buttons: [{
      title: '取消',
      titleColor: '#5C5C5C',
      fontSize: 16 // "action": 'functionName' //方法名，使用window.funtionName声明全局变量，下同

    }, {
      title: '确定',
      titleColor: '#1482F0',
      fontSize: 16
    }]
  };

  if (getAppVersion() >= 6.0) {
    var params = {
      data: _extends({}, configData, opts, {
        title: "<span style=\"font-size: 18px;font-family: PingFangSC, PingFangSC-Medium;font-weight: bold;color: #000000;line-height: 21px;\">" + (opts.title ? opts.title : '提示') + "</span>",
        message: "<span style='font-size: 15px;word-break: break-all;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;color: #3c3c3c;line-height: 22px;'>" + (opts.message ? opts.message : '') + "</span>"
      }),
      onButtonTap: opts.onButtonTap ? opts.onButtonTap : function () {}
    };

    try {
      delete params.data.onButtonTap;
      window.fc.showDialog(params);
    } catch (error) {
      console.log('showDialog失败', error);
    }
  } else {
    opts.onButtonTap && delete opts.onButtonTap;
    var dataStr = JSON.stringify(_extends({}, configData, opts));

    try {
      window.jsi.Alert(dataStr);
    } catch (e) {}

    try {
      webkit.messageHandlers.Alert.postMessage(dataStr);
    } catch (e) {}
  }
};
/* 弹出分享窗口 https://git.finchina.com/mobile-develop/cross-platform/jsapi/blob/master/%E4%BC%81%E4%B8%9A%E9%A2%84%E8%AD%A6%E9%80%9AJSAPI.md#fcshowsharedialog */

export var showShareDialog = function showShareDialog(params) {
  // 版本判断
  if (getAppVersion() >= 6.0) {
    params = _extends({}, {
      // types: ['wechat', 'wechatgroup', 'qq', 'dingding', 'workwechat', 'copylink', 'browser', 'album', 'image'],
      shareObjectCallback: function shareObjectCallback(share) {},
      //分享数据回调，调用该回调方法，取得要分享的数据
      success: function success(res) {},
      fail: function fail(res) {},
      complete: function complete(res) {}
    }, params);

    try {
      window.fc.showShareDialog(params);
    } catch (error) {}
  } else {
    return shareActivity(params);
  }
};
/* 设置导航栏标题 */

export var fcSetTitle = function fcSetTitle(params) {
  // 版本判断
  if (getAppVersion() >= 6.0) {
    params = _extends({}, {
      data: {
        title: '标题' // subTitle: '副标题',

      },
      success: function success(res) {// console.log('fcSetTitle成功', res);
      },
      fail: function fail(res) {
        console.log('fcSetTitle失败', res);
      },
      complete: function complete(res) {// console.log('fcSetTitle--complete完成', res);
      }
    }, params);

    try {
      window.fc.setTitle(params);
    } catch (error) {}
  } else {
    console.log('当前版本低于6.0，不支持fc.setTitle');
  }
};
/* 自定义导航栏中返回键-动态设置导航栏 */

export var fcSetBackButton = function fcSetBackButton(params) {
  // 版本判断
  if (getAppVersion() >= 6.0) {
    params = _extends({}, {
      data: {// icon: '',
        // title: '取消',
        // titleStyle: {
        //   color: '',
        //   font: {}
        // },
        // url: '',//点击返回键触发的路由,默认返回上一页
      },
      success: function success(res) {// console.log('fcSetBackButton成功', res);
      },
      fail: function fail(res) {
        console.log('fcSetBackButton失败', res);
      },
      complete: function complete(res) {// console.log('fcSetBackButton--complete完成', res);
      }
    }, params);

    try {
      window.fc.setBackButton(params);
    } catch (error) {}
  } else {
    console.log('当前版本低于6.0，不支持fc.setBackButton');
  }
};
/* 设置导航栏中右侧菜单按钮-动态设置导航栏右侧菜单 */

export var fcSetRightMenus = function fcSetRightMenus(params) {
  // 版本判断
  if (getAppVersion() >= 6.0) {
    try {
      window.fc.setRightMenus(params);
    } catch (error) {}
  } else {
    console.log('当前版本低于6.0，不支持fc.setRightMenus');
  }
};
/* 设置导航栏整体样式，包括背景色、透明度、返回按钮的显示与隐藏等设置 */

export var fcSetNavigationBarStyle = function fcSetNavigationBarStyle(params) {
  // 版本判断
  if (getAppVersion() >= 6.0) {
    params = _extends({}, {
      data: {// backgroundColor: '#FFFF0000',
        // backgroundImageUrl: '',//导航栏背景图
        // style: 1,//导航栏样式，取值，0：隐藏，1：不透明显示 ，2：透明显示
        // hideBackButton: true
      },
      success: function success(res) {// console.log('fcSetNavigationBarStyle成功', res);
      },
      fail: function fail(res) {
        console.log('fcSetNavigationBarStyle失败', res);
      },
      complete: function complete(res) {// console.log('fcSetNavigationBarStyle--complete完成', res);
      }
    }, params);

    try {
      window.fc.setNavigationBarStyle(params);
    } catch (error) {}
  } else {
    console.log('当前版本低于6.0，不支持fc.setNavigationBarStyle');
  }
};
/* 状态栏文字颜色仅支持白色、黑色，可以通过该方法进行设置 */

export var fcSetStatusBarStyle = function fcSetStatusBarStyle(params) {
  // 版本判断
  if (getAppVersion() >= 6.0) {
    params = _extends({}, {
      data: {
        statusBarStyle: 0 //状态栏文字颜色，0：白色，1：黑色

      },
      success: function success(res) {// console.log('fcSetStatusBarStyle成功', res);
      },
      fail: function fail(res) {
        console.log('fcSetStatusBarStyle失败', res);
      },
      complete: function complete(res) {// console.log('fcSetStatusBarStyle--complete完成', res);
      }
    }, params);

    try {
      window.fc.setStatusBarStyle(params);
    } catch (error) {}
  } else {
    console.log('当前版本低于6.0，不支持fc.setStatusBarStyle');
  }
};
/* 新版委托原生请求方法：包括http请求、文件上传等 */

export var fcRequest = function fcRequest(params) {
  if (getAppVersion() >= 6.0) {
    params = _extends({}, {
      data: {//以文件上传为例
        // url: 'https://appdevwifi.finchina.com/finchinaAPP/xxxxxx.action',
        // method: 'post', //get,post
        // headers: { 'content-type': 'multipart/form-data' },
        // queryParameters: { '111': '222' },
        // data: { //get时不需要该字段
        //   file: {
        //     name: 'xxx.jpg',//文件名
        //     path: '',//文件路径,优先使用文件数据,当文件数据不存在时取路径上传
        //     data: '',//文件数据 bas64编码
        //   },
        // },
      }
    }, params);

    try {
      window.fc.request(params);
    } catch (error) {
      console.log('window.fc.request ERROR', error);
    }
  } else {
    console.log('当前版本低于6.0，不支持fc.request');
  }
};
/* 新版路由跳转方式 */

/*
 *目前原生提供的一套新的加载html页面的壳子，可以通过特定路由【fcnews://fcmodule/<type>/<id>】、
 *或者在http/https链接后面添加指定参数【navigationBar(0:隐藏导航栏，1:显示导航栏)】进入
 * */

export var fcWebview = function fcWebview(params) {
  params = _extends({}, {
    hideNavigation: 0,
    //1: 隐藏, 0: 不隐藏
    link: '' //url路径

  }, params); // 版本判断

  if (getAppVersion() >= 6.0) {
    if (params.link.indexOf('html?') == '-1') {
      params.link += "?navigationBar=" + (params.hideNavigation ? 0 : 1);
    } else {
      params.link += "&navigationBar=" + (params.hideNavigation ? 0 : 1);
    }

    window.open(params.link);
  } else {
    // console.log('当前版本低于6.0，不支持fcWebview');
    if (params.hideNavigation) {
      var url = "fcnews://commonWebviewPage?hideNavigation=" + params.hideNavigation + "&link=" + encodeURIComponent(params.link);
      window.open(url);
    } else {
      window.open(params.link);
    }
  }
};
/**
 * 调用接口执行数据导出功能
*/

export var fcExportData = function fcExportData(params) {
  // 版本判断
  if (getAppVersion() >= 6.0) {
    try {
      console.log('执行数据导出功能传参====', params);
      window.fc.exportData(params);
    } catch (error) {}
  } else {
    console.log('当前版本低于6.0，不支持fc.exportData');
  }
};
/**
 * 调用原生将企业添加到组合功能
*/

export var fcAddBlock = function fcAddBlock(params) {
  params = _extends({}, {
    fail: function fail(res) {
      console.log('fcAddBlock失败', res);
    },
    complete: function complete(res) {// console.log('fcAddBlock--complete完成', res);
    }
  }, params); // 版本判断6.2

  if (getAppVersion() >= 6.0) {
    try {
      console.log('调用原生将企业添加到组合功能传参====', params);
      window.fc.addBlock(params);
    } catch (error) {
      console.log('当前版本低于6.2，不支持fc.addBlock');
    }
  } else {
    console.log('当前版本低于6.0，不支持fc.addBlock');
  }
};