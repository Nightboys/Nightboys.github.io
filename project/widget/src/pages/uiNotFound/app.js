import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';

import { Popup, Button, Icon } from 'vant';
Vue.use(Popup);
Vue.use(Button);
Vue.use(Icon);

import 'normalize.css';
import 'github-markdown-css';

FastClick.attach(document.body);

new Vue({
  el: '#app',
  render: h => h(App),
});
