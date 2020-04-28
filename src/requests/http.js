/**
 * 对 axios 的封装，使模块化，并可以挂在到 vue 上，并且是 RESTFul 风格，并且是面向对象方式。
 */
import axios from 'axios'
import store from '../store/index'
import {TIME_TO_UPDATE_TOKEN, BASE_URL} from '../common/settings'
import {IS_LOGGED_TRUE} from './apiCode'
import JWT from 'jwt-decode'

let axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
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
        console.log("axios-refresh-whether-or-not");
        let accessTokenParsed = JWT(accessToken);  // DEBUG：这里要解码JWT
        let now = new Date();
        // 时间一定要理清楚，最好前后端都用 UTC 时间
        console.log("axios-need-to-refresh-token(UTC) exp: " + ((accessTokenParsed.exp - TIME_TO_UPDATE_TOKEN) * 1000).toString() + " now: " + now.getTime().toString());
        if((accessTokenParsed.exp - TIME_TO_UPDATE_TOKEN) * 1000 > now.getTime() ){
          // 无需更新
          console.log("axios-token-is-up-to-date");
        }
        else {
          // 需要更新
          console.log("axios-refresh-start");
          refresh();
          // 添加了此行
          return config;
        }
        config.headers['Authorization'] = store.state.accessToken;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(response => {
  console.log("====== RESPONSE ======");
  console.log(response);
  if(store.state.isOffline === true){
    store.commit('changeIsOffline',false);
  }
  return response;
}, error => {
  if(!error.response){
    // 断网了
    console.log("http.js: 响应有问题，应该是断网了");
    if(store.state.isOffline === false){
      store.commit('changeIsOffline',true);
    }
  }
});

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

async function refresh() {
  // 注意这里是 axiosNew，地址有变化
  let axiosNew = axios.create();
  axiosNew.defaults.baseURL = BASE_URL;
  axiosNew.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
  axiosNew.defaults.withCredentials = true;
  await axiosNew.get(`${BASE_URL}/refresh`).then(function (res) {
    console.log(res);
    // 细节问题，res.【data】.code
    if(res.data.code === IS_LOGGED_TRUE){
      console.log("axios-refresh-changeAccessToken");
      // 这里也有问题两个 data.data
      store.commit('changeAccessToken',res.data.data.accessToken);
    }
  })
    .catch(function (err) {
      console.log(err);
    });
}
