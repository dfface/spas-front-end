import axiosInstance  from "../http";
import base from "../base";
export default {
  newCase(data){
    return axiosInstance.post(`${base.cases}/new`,JSON.stringify(data));
  },
  detail(id){
    return axiosInstance.get(`${base.cases}/detail/${id}`);
  },
  handling(id){
    return axiosInstance.get(`${base.cases}/handling/${id}`);
  },
  history(id,current){
    return axiosInstance.get(`${base.cases}/history/${id}/${current}`);
  },
  auditing(id){
    return axiosInstance.get(`${base.cases}/auditing/${id}`);
  }
}
