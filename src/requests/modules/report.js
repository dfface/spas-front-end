import axiosInstance from "../http";
import base from "../base";

export default {
  newReport(data){
    return axiosInstance.post(`${base.report}/new`, JSON.stringify(data));
  },
  detail(id){
    return axiosInstance.get(`${base.report}/detail/${id}`);
  },
  evaluate(data){
    return axiosInstance.post(`${base.report}/evaluate`, JSON.stringify(data));
  }
}
