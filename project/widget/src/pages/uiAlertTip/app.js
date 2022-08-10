import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';

import { Button } from 'vant';
Vue.use(Button);

import Model from '../../plugins/http/model';
Vue.use(Model);

import 'normalize.css';
import 'github-markdown-css';

FastClick.attach(document.body);

new Vue({
  el: '#app',
  render: h => h(App),
});
