import axiosInstance from "../http";
import base from "../base";
import {getIdToken} from "../../common/utils";
export default {
  newSuggestion(data){  // new 是关键字啊
    return axiosInstance.post(`${base.suggestion}/new`,JSON.stringify(data));
  },
  detail(id){
    return axiosInstance.get(`${base.suggestion}/detail/${id}`);
  },
  history(current){
    let id = getIdToken().id;
    return axiosInstance.get(`${base.suggestion}/history/${id}/${current}`);
  }
}
