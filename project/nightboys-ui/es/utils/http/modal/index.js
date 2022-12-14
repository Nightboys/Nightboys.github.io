import _extends from "@babel/runtime/helpers/esm/extends";
import ModalVue from './modal';
import Vue from 'vue';
var defaults = {
  title: null,
  message: '',
  beforeClose: null,
  confirmButtonText: 'ζη₯ιδΊ',
  cancelButtonText: '',
  confirmButtonClass: '',
  cancelButtonClass: '',
  showConfirmButton: true,
  showCancelButton: false,
  buttonType: 'button',
  confirmLink: '',
  cancelLink: '',
  onClose: null
};
var msgQueue = [],
    instance,
    currentMsg;

var defaultCallback = function defaultCallback(action) {
  if (currentMsg) {
    var callback = currentMsg.callback;

    if (typeof callback === 'function') {
      callback(action);
    }

    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve(action);
      } else if (currentMsg.reject && action === 'cancel') {
        currentMsg.reject(action);
      }
    }
  }
};

var merge = Object.assign;
var modalConstructor = Vue.extend(ModalVue);

var initInstance = function initInstance() {
  instance = new modalConstructor({
    el: document.createElement('div')
  });
};

var showNextMsg = function showNextMsg() {
  if (!instance) {
    initInstance();
  }

  if (!instance.visible) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
      var options = currentMsg.options;

      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }

      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      var oldCb = instance.callback;

      instance.callback = function (action, instance) {
        oldCb(action, instance);
        showNextMsg();
      };

      document.body.appendChild(instance.$el);
      Vue.nextTick(function () {
        instance.visible = true;
      });
    }
  }
};

var MsgBox = /*#__PURE__*/function () {
  function MsgBox(options, callback) {
    if (Vue.prototype.$isServer) {
      return;
    }

    if (typeof options === 'string') {
      options = {
        message: options
      };

      if (typeof arguments[1] === 'string') {
        options.title = arguments[1];
      }
    } else if (options.callback && !callback) {
      callback = options.callback;
    }

    if (typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        msgQueue.push({
          options: _extends({}, defaults, MsgBox.defaults, options),
          callback: callback,
          resolve: resolve,
          reject: reject
        });
        showNextMsg();
      });
    }
  }

  MsgBox.alert = function alert(message, title, options) {
    if (typeof message === 'object') {
      options = message;
      message = options.message || '';
    } else if (title === undefined) {
      title = '';
    }

    return new MsgBox(merge({
      title: title,
      message: message
    }, options));
  };

  MsgBox.close = function close() {
    instance.doClose();
    instance.visible = false;
    msgQueue = [];
    currentMsg = null;
  };

  return MsgBox;
}();

MsgBox.setDefaults = function (defaults) {
  if (defaults === void 0) {
    defaults = {};
  }

  MsgBox.defaults = defaults;
};

export var Modal = /*#__PURE__*/function () {
  function Modal() {}

  Modal.install = function install(Vue) {
    Vue.prototype.$msgbox = MsgBox;
    Vue.msgbox = MsgBox;
    Vue.prototype.$alert = MsgBox.alert;
    Vue.alert = MsgBox.alert;
  };

  return Modal;
}();
export default Modal;