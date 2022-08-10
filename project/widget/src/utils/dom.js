/**
 * 添加水印
 * @param {Number} size 设计图尺寸
 */
export const addWaterMark = (size = 750) => {

  let waterMark = document.createElement('img');
  waterMark.setAttribute('id', 'waterMark');

  waterMark.style.cssText = 'position: fixed; z-index: -1; bottom: .36rem; right: .36rem; opacity: 0.0001;';
  waterMark.src = location.origin + '/finchinaAPP/static/waterMark.png';

  document.getElementsByTagName('body')[0].appendChild(waterMark);

  let rate = size / 750;
  waterMark.onload = function() {
    waterMark.style.cssText =
      'position: fixed; z-index: 9; bottom: ' +
      0.36 * rate +
      'rem; right: ' +
      0.36 * rate +
      'rem; opacity: 0.5;' +
      ' width: ' +
      (waterMark.naturalWidth / 100) * rate +
      'rem; height: ' +
      (waterMark.naturalHeight / 100) * rate +
      'rem;';
  };
};

/**
 * 页面尺寸初始化
 * @param {Boolean} rotate 是否可转置
 * @param {Boolean} isAddWaterMark 是否添加水印
 * @param {Number} designWidth 设计图尺寸
 */
export const resize = ({ rotate = true, isAddWaterMark = true, designWidth = 750 } = {}) => {
  const changeView = () => {
    let width = document.body.clientWidth || document.documentElement.clientWidth,
      height = document.body.clientHeight || document.documentElement.clientHeight;

    if (rotate) {
      if (width > height) {
        [width] = [height, width];
      }

      if (width < 320) {
        let screen = window.screen;
        width = screen[screen.width > screen.height ? 'height' : 'width'];
        if (width < 320) width = 320;
      }
    }

    if (width > 750) width = 750;

    document.getElementsByTagName('html')[0].style.setProperty('font-size', (100 * width) / designWidth + 'px');
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
