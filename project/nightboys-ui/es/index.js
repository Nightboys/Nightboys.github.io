import DemoButton from './demo-button';
import UiCityPicker from './uiCityPicker';
import UiDatePicker from './uiDatePicker';
import UiLoading from './uiLoading';
import UiMenuHead from './uiMenuHead';
import UiNotFound from './uiNotFound';
import UiPicker from './uiPicker';
import UiTableScrollView from './uiTableScrollView';
import UiTableView from './uiTableView';
import UiTreePickerNew from './uiTreePickerNew';
var version = '1.0.0';

function install(Vue) {
  var components = [DemoButton, UiCityPicker, UiDatePicker, UiLoading, UiMenuHead, UiNotFound, UiPicker, UiTableScrollView, UiTableView, UiTreePickerNew];
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

export { install, version, DemoButton, UiCityPicker, UiDatePicker, UiLoading, UiMenuHead, UiNotFound, UiPicker, UiTableScrollView, UiTableView, UiTreePickerNew };
export default {
  install: install,
  version: version
};