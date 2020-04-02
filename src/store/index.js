import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    isOffline: false,
    accessToken: "",
    roles: [],
    permissions: []
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
    },
    changePermissions(state, payload){
      state.permissions = payload;
    },
    changeRoles(state, payload){
      state.roles = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
