// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import './common/stylus/index.styl';

Vue.config.productionTip = false;

// 这个是因为eslint校验js的new的时候需要赋值给一个变量  这里就是忽略eslint这个校验
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
