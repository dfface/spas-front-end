import axiosInstance  from "../http";
import base from "../base";
export default {
  newCase(data){
    return axiosInstance.post(`${base.cases}/new`,JSON.stringify(data));
  },
  detail(id){
    return axiosInstance.get(`${base.cases}/detail/${id}`);
  }
}
