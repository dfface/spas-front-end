import axiosInstance from "../http";
import base from "../base";
export default {
  newSuggestion(data){  // new 是关键字啊
    return axiosInstance.post(`${base.suggestion}/new`,JSON.stringify(data));
  },
  detail(id){  // new 是关键字啊
    return axiosInstance.get(`${base.suggestion}/detail/${id}`);
  }
}
