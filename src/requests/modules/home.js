import axios from "../http";
import base from "../base";

/**
 * 对应后端 HomeController
 */
export default {
  refresh() {
    // 使用了模板字面量
    return axios.get(`${base.home}/refresh`);
  },
  register(data) {
    return axios.post(`${base.home}/register`, JSON.stringify(data));
  },
  logout(userId){
    return axios.get(`${base.home}/logout/${userId}`);
  }
}
