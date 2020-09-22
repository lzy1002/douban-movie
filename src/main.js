import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

require("./mock/index.js");  // 使用mockjs模拟数据

import "./common/stylus/index.styl";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
