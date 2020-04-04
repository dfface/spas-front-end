import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import Vue from 'vue'
import App from './App.vue'

import created from './common/initial'
import api from './requests/api'
// import './mock/index'

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  store,
  router,
  vuetify,
  created,
  render: h => h(App)
}).$mount('#app');
