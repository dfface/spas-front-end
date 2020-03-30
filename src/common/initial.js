
// 检查是否登录
import {apiInit, apiIsLogged} from "../requests/api";
import {IS_LOGGED_TRUE} from '../requests/apiCode';
import {setIdToken} from './utils'
import store from '../store'

export default function(){
  apiIsLogged().then(function (res) {
    console.log("init-你打开了系统");
    console.log("beforeInit-isLoggedServer：" + res.msg);
    console.log("beforeInit-isLoggedVuex：" + store.state.isLogged);
    if(res.code === IS_LOGGED_TRUE){
      // 如果成功登录，获取Access和ID令牌
      apiInit().then(function (result) {
        if(result.code === IS_LOGGED_TRUE){
          // 存储 accessToken
          // 虽然读不到更新的值，但可以提交 mutation
          store.commit('changeAccessToken',result.data.accessToken);
          store.commit('changeIsLogged',true);
          // 存储 idToken
          setIdToken(result.data.idToken);
        }
        else{
          alert(result.msg);
        }
      })
    }
    else{
      alert(res.msg)
    }
    // 读不到更新的值，正常，vue 挂载完成之后其他的文件就可以读到了
    console.log("afterInit-isLoggedVuex：" + store.getters.getIsLogged);
  });
}
