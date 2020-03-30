/*
 Axios 封装
 */
import axios from 'axios'
import store from '../store/index'

axios.defaults.baseURL = 'http://localhost:8888';
axios.defaults.timeout = 10000;  // 10s 超时
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;  // 允许跨域携带 cookie
axios.interceptors.request.use(
    function (config) {
      console.log("axios-isLoggedVuex: " + store.state.isLogged);
      console.log("axios-accessToken: " + store.state.accessToken);
      if(store.state.accessToken){
        // 先验证有效性，再看是否需要刷新

        config.headers['Authorization'] = store.state.accessToken;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

export function post(url, object) {
  return new Promise(function (resolve,reject) {
    axios.post(url,object)
        .then(res => resolve(res.data))
        .catch(err => reject(err.value))
  })
}

export function get(url, params = null) {
  return new Promise(function (resolve, reject) {
    axios.get(url,params)
        .then(res => resolve(res.data))
        .catch(err => reject(err.value))
  })
}
