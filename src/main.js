import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

import {created} from './common/initial'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  created,
  render: h => h(App)
}).$mount('#app');
