import axiosInstance from "../http";
import base from "../base";
import {getIdToken} from "../../common/utils";
export default {
  idToken : getIdToken(),
  newSuggestion(data){  // new 是关键字啊
    return axiosInstance.post(`${base.suggestion}/new`,JSON.stringify(data));
  },
  detail(id){
    return axiosInstance.get(`${base.suggestion}/detail/${id}`);
  },
  history(current){
    let id = getIdToken().id;
    return axiosInstance.get(`${base.suggestion}/history/${id}/${current}`);
  },
  associate(sugId){
    let idToken = getIdToken();
    return axiosInstance.post(`${base.suggestion}/associate/${idToken.id}/${sugId}/${idToken.officeId}`);
  },
  replying(){
    let idToken = getIdToken();
    return axiosInstance.get(`${base.suggestion}/replying/${idToken.id}/${idToken.officeId}`);
  },
  replyHistory(current){
    let idToken = getIdToken();
    return axiosInstance.get(`${base.suggestion}/replyHistory/${idToken.id}/${current}`);
  },
  waitingReply(){
    let idToken = getIdToken();
    return axiosInstance.get(`${base.suggestion}/waitingReply/${idToken.id}/${idToken.officeId}`);
  }
}
