import {apiIsLogged} from '../requests/api'
import * as ApiCode from '../requests/apiCode'

export let created = function () {
  /* 检查登录状态，设置 vuex */
  // 首先进行登录状态获取 服务端API
  console.log("初始化系统");
  let that = this;
  apiIsLogged().then(function (res) {
      console.log(res);
      // 还有待继续更改
      if(res.code === ApiCode.IS_LOGGED_TRUE) {
        that.$store.commit('changeIsLogged',true);
        that.$store.commit('changeIdToken',res.data.idToken);
        that.$store.commit('changeAccessToken', res.data.accessToken);
      }
  })
};
