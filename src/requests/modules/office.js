import axiosInstance from "../http";
import base from "../base";

export default {
  all(){
    return axiosInstance.get(`${base.office}/all`);
  }
}
