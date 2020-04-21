import axiosInstance from "../http";
import base from "../base"
export default {
  revise(userOutlineVo){
    return axiosInstance.put(`${base.user}`,userOutlineVo);
  },
  all(officeId,current,size = 5){
    return axiosInstance.get(`${base.user}`,{
      params: {
        officeId,current,size
      }
    });
  },
  deleteUser(userId){
    return axiosInstance.delete(`${base.user}/${userId}`);
  },
  audit(userId,state){
    return axiosInstance.patch(`${base.user}/${userId}/${state}`);
  },
  changePassword(userId,password){
    return axiosInstance.patch(`${base.user}/${userId}`,password);  // String 值
  }
}
