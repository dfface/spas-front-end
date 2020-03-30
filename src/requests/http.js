/**
 * 对 axios 的封装，使模块化，并可以挂在到 vue 上，并且是 RESTFul 风格，并且是面向对象方式。
 */
import axios from 'axios'
import store from '../store/index'
import {TIME_TO_UPDATE_TOKEN} from '../common/settings'
import {IS_LOGGED_TRUE} from './apiCode'

let axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://localhost:8888';
axiosInstance.defaults.timeout = 10000;  // 10s 超时
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axiosInstance.defaults.withCredentials = true;  // 允许跨域携带 cookie
axiosInstance.interceptors.request.use(
    function (config) {
      console.log("axios-isLoggedVuex: " + store.state.isLogged);
      console.log("axios-accessToken: " + store.state.accessToken);
      let accessToken = store.state.accessToken;
      if(accessToken){
        // 是否需要刷新
        let accessTokenParsed = JSON.parse(accessToken);
        let now = new Date();
        if((accessTokenParsed.exp - TIME_TO_UPDATE_TOKEN) * 1000 > (now.getTime() + now.getTimezoneOffset() * 60 * 1000) ){
          // 无需更新
        }
        else {
          // 需要更新
          console.log("axios-need-to-refresh-token(UTC) exp: " + (accessTokenParsed.exp - TIME_TO_UPDATE_TOKEN) * 1000 + "now: " + (now.getTime() + now.getTimezoneOffset() * 60 * 1000))
          axios.get('/refresh').then(function (res) {
            if(res.code === IS_LOGGED_TRUE){
              store.commit('changeAccessToken',res.data.accessToken);
            }
          })
        }
        config.headers['Authorization'] = store.state.accessToken;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

// post 历史遗留封装
export function post(url, object) {
  return new Promise(function (resolve,reject) {
    axiosInstance.post(url,object)
        .then(res => resolve(res.data))
        .catch(err => reject(err.value))
  })
}

// get 历史遗留封装
export function get(url, params = null) {
  return new Promise(function (resolve, reject) {
    axiosInstance.get(url,params)
        .then(res => resolve(res.data))
        .catch(err => reject(err.value))
  })
}

export default axiosInstance;
