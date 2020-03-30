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
}
