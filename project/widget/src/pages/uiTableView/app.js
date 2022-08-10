import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';

import { Button, Popup, ActionSheet } from 'vant';
Vue.use(Button).use(Popup).use(ActionSheet);

import 'normalize.css';
import 'github-markdown-css';

FastClick.attach(document.body);

new Vue({
  el: '#app',
  render: h => h(App),
});
