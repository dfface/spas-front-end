import Vue from 'vue'
import Vuex from 'vuex'
import JWT from 'jwt-decode'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    idToken: "",
    accessToken: ""
  },
  mutations: {
    changeIsLogged(state, payload){
      state.isLogged = payload;
      // 同时加上 LocalStorage 的改变
      localStorage.setItem('isLogged',JSON.stringify(payload));
    },
    changeIdToken(state, payload){
      state.idToken = payload;
      // idToken 中的信息并不重要，可以解析之后存储
      let idToken= JWT(payload)
      localStorage.setItem('idToken',JSON.stringify(idToken));
    },
    changeAccessToken(state, payload){
      state.accessToken = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
