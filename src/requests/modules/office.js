import axiosInstance from "../http";
import base from "../base";

export default {
  all(){
    return axiosInstance.get(`${base.office}`);
  },
  allByPage(current, size){
    return axiosInstance.get(`${base.office}`,{params: {current, size}});
  },
  revise(office){
    return axiosInstance.put(`${base.office}`, office);
  },
  newOffice(office){
    return axiosInstance.post(`${base.office}`,office);
  },
  deleteOffice(id){
    return axiosInstance.delete(`${base.office}/${id}`);
  }
}
