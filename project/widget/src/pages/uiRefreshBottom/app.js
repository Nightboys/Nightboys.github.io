import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';

import { Button } from 'vant';
import { Popup } from 'vant';
Vue.use(Popup);
Vue.use(Button);

import 'normalize.css';
import 'github-markdown-css';

FastClick.attach(document.body);

new Vue({
  el: '#app',
  render: h => h(App),
});

