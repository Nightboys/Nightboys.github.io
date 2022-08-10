import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';

import { Button, Toast } from 'vant';
Vue.use(Button).use(Toast);

import 'normalize.css';
import 'github-markdown-css';

FastClick.attach(document.body);

// import vconsole from 'vconsole';
// new vconsole();

new Vue({
  el: '#app',
  render: h => h(App),
});
