/**
 * 添加水印
 * @param {Number} size 设计图尺寸
 */
export var addWaterMark = function addWaterMark(size) {
  if (size === void 0) {
    size = 750;
  }

  var waterMark = document.createElement('img');
  waterMark.setAttribute('id', 'waterMark');
  waterMark.style.cssText = 'position: fixed; z-index: -1; bottom: .36rem; right: .36rem; opacity: 0.0001;';
  waterMark.src = location.origin + '/finchinaAPP/static/waterMark.png';
  document.getElementsByTagName('body')[0].appendChild(waterMark);
  var rate = size / 750;

  waterMark.onload = function () {
    waterMark.style.cssText = 'position: fixed; z-index: 9; bottom: ' + 0.36 * rate + 'rem; right: ' + 0.36 * rate + 'rem; opacity: 0.5;' + ' width: ' + waterMark.naturalWidth / 100 * rate + 'rem; height: ' + waterMark.naturalHeight / 100 * rate + 'rem;';
  };
};
/**
 * 页面尺寸初始化
 * @param {Boolean} rotate 是否可转置
 * @param {Boolean} isAddWaterMark 是否添加水印
 * @param {Number} designWidth 设计图尺寸
 */

export var resize = function resize(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$rotate = _ref.rotate,
      rotate = _ref$rotate === void 0 ? true : _ref$rotate,
      _ref$isAddWaterMark = _ref.isAddWaterMark,
      isAddWaterMark = _ref$isAddWaterMark === void 0 ? true : _ref$isAddWaterMark,
      _ref$designWidth = _ref.designWidth,
      designWidth = _ref$designWidth === void 0 ? 750 : _ref$designWidth;

  var changeView = function changeView() {
    var width = document.body.clientWidth || document.documentElement.clientWidth,
        height = document.body.clientHeight || document.documentElement.clientHeight;

    if (rotate) {
      if (width > height) {
        var _ref2 = [height, width];
        width = _ref2[0];
      }

      if (width < 320) {
        var screen = window.screen;
        width = screen[screen.width > screen.height ? 'height' : 'width'];
        if (width < 320) width = 320;
      }
    }

    if (width > 750) width = 750;
    document.getElementsByTagName('html')[0].style.setProperty('font-size', 100 * width / designWidth + 'px');
    document.getElementsByTagName('body')[0].style.setProperty('visibility', 'visible');

    if (!width) {
      setTimeout(changeView, 20);
    }
  };

  changeView();

  if (isAddWaterMark) {
    addWaterMark(designWidth);
  }
};