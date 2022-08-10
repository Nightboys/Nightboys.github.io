import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';

import { Button } from 'vant';
Vue.use(Button);
import { Popup } from 'vant';
Vue.use(Popup);
import { Icon } from 'vant';
Vue.use(Icon);

import 'normalize.css';
import 'github-markdown-css';

FastClick.attach(document.body);

new Vue({
  el: '#app',
  render: h => h(App),
});
