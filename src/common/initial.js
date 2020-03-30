import {apiIsLogged} from '../requests/api'
import * as ApiCode from '../requests/apiCode'

// 刷新 access 令牌
export let getIsLogged = function (store) {
  apiIsLogged().then(function (res) {
  console.log(res);
  // 还有待继续更改
  if(res.code === ApiCode.IS_LOGGED_TRUE) {
    // 登录状态

    store.commit('changeAccessToken', res.data.accessToken);
    return ApiCode.IS_LOGGED_TRUE;
  }
  else{
    return ApiCode.IS_LOGGED_FALSE;
  }
})
};

export let created = function () {
  /* 检查登录状态，设置 vuex */
  // 首先进行登录状态获取 服务端API
  console.log("初始化系统");
  let that = this;
  getIsLogged(that.$store);
};
