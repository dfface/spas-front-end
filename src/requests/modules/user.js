import axiosInstance from "../http";
import base from "../base"
export default {
  revise(userRoleUpdateDto){
    console.log(userRoleUpdateDto);
    return axiosInstance.post(`${base.user}`,JSON.stringify(userRoleUpdateDto));  // 两点须知：用户基本信息要全；角色改不改通过为空与否判断
  },
  all(officeId,current,size = 5){
    return axiosInstance.get(`${base.user}`,{
      params: {
        officeId,current,size
      }
    });
  },
  allOnce(officeId){
    return axiosInstance.get(`${base.user}/all`,{
      params: {
        officeId
      }
    })
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
