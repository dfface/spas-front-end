import axiosInstance from "../http";
import base from "../base";

export default {
  all(officeId){
    return axiosInstance.get(`${base.role}/all/${officeId}`);
  }
}
