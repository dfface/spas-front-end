import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
// import axios from "./requests/http";
import Vue from 'vue'
import App from './App.vue'

import created from './common/initial'

Vue.config.productionTip = false;
// Vue.prototype.$axios = axios;

new Vue({
  store,
  router,
  vuetify,
  created,
  render: h => h(App)
}).$mount('#app');
