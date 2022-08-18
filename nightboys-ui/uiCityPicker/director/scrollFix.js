export default {
  bind: function bind(el) {
    var lastTouch = {};
    el.addEventListener('touchstart', function (e) {
      lastTouch = e.touches[0];
    });
    el.addEventListener('touchmove', function (e) {
      e.stopPropagation();
      var scrollEl = e.currentTarget,
          touch = e.touches[0]; // 判定当前滚动容器是否可以滚动

      if (scrollEl.scrollHeight <= scrollEl.offsetHeight || !scrollEl.scrollTop && touch.screenY > lastTouch.screenY || scrollEl.scrollTop === scrollEl.scrollHeight - scrollEl.offsetHeight && touch.screenY < lastTouch.screenY) {
        // 不能滚动的时候依然需要阻止滚动穿透
        e.preventDefault();
      }

      lastTouch = touch;
    }, false);
  }
};