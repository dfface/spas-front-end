import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    isOffline: false,
    accessToken: ""
  },
  getters: {
    getIsLogged: state => state.isLogged
  },
  mutations: {
    changeIsLogged(state, payload){
      state.isLogged = payload;
    },
    changeAccessToken(state, payload){
      state.accessToken = payload;
    },
    changeIsOffline(state, payload){
      state.isOffline = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
