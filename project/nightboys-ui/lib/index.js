"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;
exports.install = install;
exports.version = void 0;

var _demoButton = _interopRequireDefault(require("./demo-button"));

exports.DemoButton = _demoButton.default;

var _uiCityPicker = _interopRequireDefault(require("./uiCityPicker"));

exports.UiCityPicker = _uiCityPicker.default;

var _uiDatePicker = _interopRequireDefault(require("./uiDatePicker"));

exports.UiDatePicker = _uiDatePicker.default;

var _uiLoading = _interopRequireDefault(require("./uiLoading"));

exports.UiLoading = _uiLoading.default;

var _uiMenuHead = _interopRequireDefault(require("./uiMenuHead"));

exports.UiMenuHead = _uiMenuHead.default;

var _uiNotFound = _interopRequireDefault(require("./uiNotFound"));

exports.UiNotFound = _uiNotFound.default;

var _uiPicker = _interopRequireDefault(require("./uiPicker"));

exports.UiPicker = _uiPicker.default;

var _uiTableScrollView = _interopRequireDefault(require("./uiTableScrollView"));

exports.UiTableScrollView = _uiTableScrollView.default;

var _uiTableView = _interopRequireDefault(require("./uiTableView"));

exports.UiTableView = _uiTableView.default;

var _uiTreePickerNew = _interopRequireDefault(require("./uiTreePickerNew"));

exports.UiTreePickerNew = _uiTreePickerNew.default;
var version = '1.0.0';
exports.version = version;

function install(Vue) {
  var components = [_demoButton.default, _uiCityPicker.default, _uiDatePicker.default, _uiLoading.default, _uiMenuHead.default, _uiNotFound.default, _uiPicker.default, _uiTableScrollView.default, _uiTableView.default, _uiTreePickerNew.default];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var _default = {
  install: install,
  version: version
};
exports.default = _default;