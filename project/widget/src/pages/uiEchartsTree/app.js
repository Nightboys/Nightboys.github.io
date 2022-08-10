import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';

import { Button } from 'vant';
import { Popup } from 'vant';
Vue.use(Popup);
Vue.use(Button);

import 'normalize.css';
import 'github-markdown-css';
import echarts from 'echarts/lib/echarts'
// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/treemap'
import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
Vue.prototype.$echarts = echarts
FastClick.attach(document.body);

new Vue({
  el: '#app',
  render: h => h(App),
});

